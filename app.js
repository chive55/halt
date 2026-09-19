const KEY = "halt.v1";
const $ = (id) => document.getElementById(id);

const state = {
  view: "list",
  filter: "all",
  editing: null,
  subs: []
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      state.subs = JSON.parse(raw).subs || [];
      return;
    }
  } catch {}
  state.subs = demoSubs();
  save();
}

function save() {
  localStorage.setItem(KEY, JSON.stringify({ subs: state.subs }));
}

function demoSubs() {
  const addDays = (n) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  };
  const past = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
  };
  return [
    { id: uid(), name: "Peacock", amount: 14.99, cycle: "month", next: addDays(9), lastUsed: past(62), source: "Visa 8821", status: "active", notes: "" },
    { id: uid(), name: "Crunch Fitness", amount: 29.99, cycle: "month", next: addDays(12), lastUsed: past(20), source: "Visa 8821", status: "active", notes: "Alamo Ranch" },
    { id: uid(), name: "NYT Cooking", amount: 8, cycle: "month", next: addDays(4), lastUsed: past(3), source: "trial", status: "trial", trialEnds: addDays(4), notes: "" },
    { id: uid(), name: "Spotify", amount: 12.99, cycle: "month", next: addDays(18), lastUsed: past(1), source: "Apple", status: "active", notes: "" },
    { id: uid(), name: "iCloud+", amount: 2.99, cycle: "month", next: addDays(6), lastUsed: past(0), source: "Apple", status: "active", notes: "" },
    { id: uid(), name: "Runna", amount: 19.99, cycle: "month", next: addDays(6), lastUsed: past(2), source: "App Store", status: "trial", trialEnds: addDays(6), notes: "" }
  ];
}

function monthly(s) {
  const n = Number(s.amount) || 0;
  if (s.cycle === "year") return n / 12;
  if (s.cycle === "week") return n * 4.345;
  return n;
}

function daysFrom(dateStr) {
  if (!dateStr) return null;
  return Math.round((new Date(dateStr) - new Date()) / 86400000);
}

function unused(s) {
  if (!s.lastUsed) return false;
  return daysFrom(s.lastUsed) <= -45;
}

function colorFor(name) {
  const palette = ["#1c1914", "#1f6b4a", "#b85a2a", "#8a6a16", "#3d4f6f", "#5a3d4a"];
  let h = 0;
  for (const c of name) h = (h + c.charCodeAt(0)) % palette.length;
  return palette[h];
}

function guideFor(name) {
  const n = name.toLowerCase();
  return (window.HALT_GUIDES || []).find((g) => g.keys.some((k) => n.includes(k))) || {
    name,
    difficulty: "walkthrough",
    url: "",
    steps: [
      "Search \u201c[service] cancel subscription\u201d and sign in.",
      "Prefer the account page over chat support.",
      "Save the confirmation and mark it canceled here."
    ]
  };
}

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 2400);
}

function show(view) {
  state.view = view;
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("on", v.id === "view-" + view));
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.view === view));
  $("fab").style.display = view === "list" ? "block" : "none";
  if (view === "list") renderList();
  if (view === "trials") renderTrials();
}

function money(n) {
  return "$" + (Math.round(n * 100) / 100).toFixed(2);
}

function renderList() {
  const active = state.subs.filter((s) => s.status !== "canceled");
  const month = active.reduce((a, s) => a + monthly(s), 0);
  const waste = active.filter((s) => unused(s) || s.status === "trial").reduce((a, s) => a + monthly(s), 0);
  $("month-total").textContent = money(month);
  $("waste-total").textContent = money(waste);
  $("count-active").textContent = String(active.length);
  $("count-cut").textContent = String(active.filter((s) => unused(s) || s.status === "trial").length);

  let rows = active;
  if (state.filter === "cut") rows = active.filter((s) => unused(s) || s.status === "trial");
  if (state.filter === "keep") rows = active.filter((s) => !unused(s) && s.status !== "trial");
  $("list").innerHTML = rows.map(rowHTML).join("") || `<div class="empty sub">Nothing in this filter. Add a subscription.</div>`;
}

function tagHTML(s) {
  if (s.status === "canceled") return `<span class="tag mute">Canceled</span>`;
  if (s.status === "pending") return `<span class="tag warn">Pending confirm</span>`;
  if (s.status === "trial") {
    const d = daysFrom(s.trialEnds || s.next);
    return `<span class="tag warn">Trial ${d == null ? "" : d <= 0 ? "ends today" : "ends in " + d + "d"}</span>`;
  }
  if (unused(s)) return `<span class="tag bad">Unused ${Math.abs(daysFrom(s.lastUsed))} days</span>`;
  return `<span class="tag ok">In use</span>`;
}

function rowHTML(s) {
  const due = daysFrom(s.next);
  const dueLabel = due == null ? "" : due < 0 ? "overdue" : due === 0 ? "today" : "in " + due + "d";
  return `<button class="row" onclick="openSub('${s.id}')">
    <div class="mark" style="background:${colorFor(s.name)}">${s.name.slice(0,1).toUpperCase()}</div>
    <div>
      <b>${escapeHtml(s.name)}</b><br>
      ${tagHTML(s)}
    </div>
    <div class="price">${money(monthly(s))}<small>${dueLabel}</small></div>
  </button>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderTrials() {
  const trials = state.subs.filter((s) => s.status === "trial" && s.status !== "canceled");
  $("trial-list").innerHTML = trials.map(rowHTML).join("") || `<div class="empty sub">No trials tracked. Mark one when you start a free week.</div>`;
}

function openSub(id) {
  const s = state.subs.find((x) => x.id === id);
  if (!s) return;
  state.editing = id;
  const g = guideFor(s.name);
  $("d-kicker").textContent = `${s.name}${s.source ? " · " + s.source : ""}`;
  $("d-title").textContent = money(Number(s.amount)) + " / " + s.cycle;
  $("d-sub").textContent = detailBlurb(s, g);
  $("d-steps").innerHTML = g.steps.map((step, i) => `<div class="step"><div class="n">${i + 1}</div><div>${escapeHtml(step)}</div></div>`).join("");
  $("d-open").style.display = g.url ? "block" : "none";
  $("d-open").onclick = () => window.open(g.url, "_blank", "noopener");
  $("d-letter").style.display = g.difficulty === "desk" ? "block" : "none";
  show("detail");
}

function detailBlurb(s, g) {
  const bits = [];
  if (s.lastUsed) bits.push("Last used " + s.lastUsed);
  if (s.next) bits.push("Renews " + s.next);
  if (g.difficulty === "link") bits.push("This one has a cancel page.");
  if (g.difficulty === "desk") bits.push("This is not one-click.");
  if (g.difficulty === "walkthrough") bits.push("Cancel is a walkthrough, not a magic tap.");
  return bits.join(". ") + ".";
}

function markCanceled() {
  const s = state.subs.find((x) => x.id === state.editing);
  if (!s) return;
  s.status = "canceled";
  s.canceledOn = new Date().toISOString().slice(0, 10);
  save();
  toast(s.name + " marked canceled. Watch the next statement.");
  show("list");
}

function markPending() {
  const s = state.subs.find((x) => x.id === state.editing);
  if (!s) return;
  s.status = "pending";
  save();
  toast("Pending. Check the next draft.");
  show("list");
}

function removeSub() {
  state.subs = state.subs.filter((x) => x.id !== state.editing);
  save();
  toast("Removed.");
  show("list");
}

function openEdit(id) {
  const existing = id ? state.subs.find((x) => x.id === id) : null;
  const s = existing || {
    id: uid(), name: "", amount: "", cycle: "month", next: "", lastUsed: "", source: "", status: "active", trialEnds: "", notes: ""
  };
  state.editing = s.id;
  state.draftNew = !existing;
  $("f-name").value = s.name || "";
  $("f-amount").value = s.amount || "";
  $("f-cycle").value = s.cycle || "month";
  $("f-next").value = s.next || "";
  $("f-used").value = s.lastUsed || "";
  $("f-source").value = s.source || "";
  $("f-status").value = s.status || "active";
  $("f-trial").value = s.trialEnds || "";
  $("f-notes").value = s.notes || "";
  show("edit");
}

function saveEdit(e) {
  e.preventDefault();
  let s = state.subs.find((x) => x.id === state.editing);
  if (!s) {
    s = { id: state.editing };
    state.subs.push(s);
  }
  s.name = $("f-name").value.trim() || "Untitled";
  s.amount = Number($("f-amount").value) || 0;
  s.cycle = $("f-cycle").value;
  s.next = $("f-next").value;
  s.lastUsed = $("f-used").value;
  s.source = $("f-source").value.trim();
  s.status = $("f-status").value;
  s.trialEnds = $("f-trial").value;
  s.notes = $("f-notes").value.trim();
  if (s.status === "trial" && !s.trialEnds && s.next) s.trialEnds = s.next;
  save();
  toast("Saved.");
  openSub(s.id);
}

function parseStatement() {
  const text = $("scan-text").value;
  if (!text.trim()) return toast("Paste a statement first.");
  const found = [];
  const lines = text.split(/\n+/);
  const merchants = window.HALT_MERCHANTS || {};
  for (const line of lines) {
    const moneyMatch = line.match(/\$?\s*(\d{1,4}\.\d{2})/);
    if (!moneyMatch) continue;
    const low = line.toLowerCase();
    let name = null;
    for (const [key, label] of Object.entries(merchants)) {
      if (low.includes(key)) { name = label; break; }
    }
    if (!name) {
      const cleaned = line.replace(/\$?\s*\d{1,4}\.\d{2}.*/, "").replace(/\d{2}\/\d{2}.*/, "").trim();
      if (cleaned.length >= 4 && /[a-zA-Z]/.test(cleaned)) name = cleaned.slice(0, 28);
    }
    if (!name) continue;
    found.push({ name, amount: Number(moneyMatch[1]) });
  }
  const unique = [];
  for (const f of found) {
    if (!unique.some((u) => u.name.toLowerCase() === f.name.toLowerCase() && u.amount === f.amount)) unique.push(f);
  }
  if (!unique.length) return toast("No recurring-looking lines found.");
  let added = 0;
  unique.forEach((f) => {
    const exists = state.subs.some((s) => s.name.toLowerCase() === f.name.toLowerCase() && s.status !== "canceled");
    if (exists) return;
    state.subs.push({
      id: uid(),
      name: f.name,
      amount: f.amount,
      cycle: "month",
      next: "",
      lastUsed: "",
      source: "statement paste",
      status: "active",
      notes: ""
    });
    added++;
  });
  save();
  toast(added ? `Added ${added} charge${added === 1 ? "" : "s"}.` : "Those were already on the list.");
  show("list");
}

function downloadLetter() {
  const s = state.subs.find((x) => x.id === state.editing);
  if (!s) return;
  const today = new Date().toLocaleDateString();
  const body = `Date: ${today}\n\nTo whom it may concern:\n\nPlease cancel my membership with ${s.name} effective immediately.\nMember / account: ${s.notes || "[member ID]"}\nLast draft amount: ${money(Number(s.amount))}\nLast / next draft date: ${s.next || "[date]"}\nCard on file ending: ${s.source || "[last 4]"}\n\nDo not convert this request into a freeze. I want the membership ended and no further drafts.\n\nPrinted name: ______________________\nSignature: ______________________\n`;
  const blob = new Blob([body], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = s.name.replace(/\s+/g, "-").toLowerCase() + "-cancel-letter.txt";
  a.click();
}

function exportData() {
  const blob = new Blob([JSON.stringify({ subs: state.subs }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "halt-backup.json";
  a.click();
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data.subs)) throw new Error("bad");
      state.subs = data.subs;
      save();
      toast("Backup restored.");
      show("list");
    } catch {
      toast("Could not read that file.");
    }
  };
  reader.readAsText(file);
}

function resetDemo() {
  state.subs = demoSubs();
  save();
  toast("Demo list restored.");
  show("list");
}

function wipe() {
  if (!confirm("Erase every subscription stored on this device?")) return;
  state.subs = [];
  save();
  show("list");
}

function setFilter(f) {
  state.filter = f;
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c.dataset.filter === f));
  renderList();
}

window.state = state;
window.openSub = openSub;
window.show = show;
window.setFilter = setFilter;
window.openEdit = openEdit;
window.saveEdit = saveEdit;
window.markCanceled = markCanceled;
window.markPending = markPending;
window.removeSub = removeSub;
window.parseStatement = parseStatement;
window.downloadLetter = downloadLetter;
window.exportData = exportData;
window.resetDemo = resetDemo;
window.wipe = wipe;

load();
show("list");
$("file-import").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) importData(file);
});
