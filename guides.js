window.HALT_GUIDES = [
  {
    keys: ["netflix"],
    name: "Netflix",
    difficulty: "link",
    url: "https://www.netflix.com/cancelplan",
    steps: [
      "Open the Netflix cancel-plan page while signed in.",
      "Choose Finish cancellation. Skip pause if you want it gone.",
      "Come back and mark it canceled. Watch the next statement."
    ]
  },
  {
    keys: ["spotify"],
    name: "Spotify",
    difficulty: "link",
    url: "https://www.spotify.com/account/subscription/",
    steps: [
      "Open Spotify subscription settings.",
      "Tap Cancel Premium and confirm.",
      "Family / duo plans cancel for the whole plan."
    ]
  },
  {
    keys: ["peacock"],
    name: "Peacock",
    difficulty: "link",
    url: "https://www.peacocktv.com/account",
    steps: [
      "Open Peacock account while signed in.",
      "Open Membership or Subscription and cancel.",
      "Ignore the pause offer if you want it dead."
    ]
  },
  {
    keys: ["hulu"],
    name: "Hulu",
    difficulty: "link",
    url: "https://secure.hulu.com/account",
    steps: [
      "Open Hulu account.",
      "Cancel Your Subscription.",
      "If it is bundled with Disney, cancel the bundle owner account."
    ]
  },
  {
    keys: ["disney+", "disney plus", "disneyplus"],
    name: "Disney+",
    difficulty: "link",
    url: "https://www.disneyplus.com/account",
    steps: ["Open Disney+ account.", "Cancel subscription.", "Confirm the end date."]
  },
  {
    keys: ["max", "hbo"],
    name: "Max",
    difficulty: "link",
    url: "https://play.max.com/profile/subscription",
    steps: ["Open Max subscription settings.", "Cancel plan.", "Confirm."]
  },
  {
    keys: ["prime video", "amazon prime", "prime"],
    name: "Amazon Prime",
    difficulty: "walkthrough",
    url: "https://www.amazon.com/gp/primecentral",
    steps: [
      "Open Prime Central.",
      "End membership. Amazon will offer a reminder or pause.",
      "If billed through a card ending in store credit, check both cards."
    ]
  },
  {
    keys: ["youtube premium", "youtube"],
    name: "YouTube Premium",
    difficulty: "link",
    url: "https://www.youtube.com/paid_memberships",
    steps: ["Open paid memberships.", "Manage membership → Cancel.", "Family plan cancels for everyone."]
  },
  {
    keys: ["apple", "icloud", "apple one", "apple tv", "apple music", "arcade"],
    name: "Apple subscription",
    difficulty: "walkthrough",
    url: "https://apps.apple.com/account/subscriptions",
    steps: [
      "On iPhone: Settings → your name → Subscriptions.",
      "Or open the Apple subscriptions page on the web.",
      "Cancel the individual service. Apple One bundles hide several charges as one."
    ]
  },
  {
    keys: ["google play", "play store"],
    name: "Google Play subscription",
    difficulty: "link",
    url: "https://play.google.com/store/account/subscriptions",
    steps: ["Open Play subscriptions.", "Select the app.", "Cancel subscription."]
  },
  {
    keys: ["nyt", "new york times", "nytimes", "cooking"],
    name: "New York Times",
    difficulty: "walkthrough",
    url: "https://myaccount.nytimes.com/seg/subscription",
    steps: [
      "Open NYT subscription account.",
      "Cancel. They often route you through a retain offer.",
      "Screenshot the confirmation email."
    ]
  },
  {
    keys: ["adobe"],
    name: "Adobe",
    difficulty: "walkthrough",
    url: "https://account.adobe.com/plans",
    steps: [
      "Open Adobe plans.",
      "Cancel plan. Annual prepaid plans may have an early-end fee.",
      "Read the end date before you confirm."
    ]
  },
  {
    keys: ["microsoft 365", "office 365", "xbox"],
    name: "Microsoft",
    difficulty: "link",
    url: "https://account.microsoft.com/services",
    steps: ["Open Microsoft services.", "Manage → Cancel.", "Confirm the last paid day."]
  },
  {
    keys: ["dropbox"],
    name: "Dropbox",
    difficulty: "link",
    url: "https://www.dropbox.com/account/plan",
    steps: ["Open plan settings.", "Cancel plan.", "Files above the free cap freeze after the period."]
  },
  {
    keys: ["chatgpt", "openai"],
    name: "ChatGPT",
    difficulty: "link",
    url: "https://chatgpt.com/#settings",
    steps: ["Open ChatGPT settings → My plan.", "Cancel plan.", "Access lasts through the billed month."]
  },
  {
    keys: ["audible"],
    name: "Audible",
    difficulty: "link",
    url: "https://www.audible.com/account/overview",
    steps: ["Open Audible account.", "Cancel membership.", "Unused credits usually vanish."]
  },
  {
    keys: ["paramount"],
    name: "Paramount+",
    difficulty: "link",
    url: "https://www.paramountplus.com/account/",
    steps: ["Open account.", "Cancel subscription.", "Confirm."]
  },
  {
    keys: ["crunch", "planet fitness", "la fitness", "anytime fitness", "gym", "fitness"],
    name: "Gym membership",
    difficulty: "desk",
    url: "",
    steps: [
      "Most gyms will not accept an app tap. They want a desk visit or a letter.",
      "Halt can fill a cancellation letter with your name, member ID, and last draft date.",
      "Take it in or mail it certified. Snap the receipt and mark it pending.",
      "Watch the next two drafts. Freeze is not cancel."
    ]
  }
];

window.HALT_MERCHANTS = {
  netflix: "Netflix",
  spotify: "Spotify",
  hulu: "Hulu",
  peacock: "Peacock",
  disney: "Disney+",
  disneyplus: "Disney+",
  max: "Max",
  hbo: "Max",
  prime: "Amazon Prime",
  audible: "Audible",
  youtube: "YouTube Premium",
  adobe: "Adobe",
  dropbox: "Dropbox",
  openai: "ChatGPT",
  chatgpt: "ChatGPT",
  apple: "Apple",
  icloud: "iCloud+",
  microsoft: "Microsoft 365",
  office: "Microsoft 365",
  nyt: "NYT",
  "new york times": "NYT",
  paramount: "Paramount+",
  crunch: "Crunch Fitness",
  "planet fitness": "Planet Fitness",
  linkedin: "LinkedIn Premium",
  slack: "Slack",
  notion: "Notion",
  canva: "Canva",
  figma: "Figma",
  github: "GitHub",
  verizon: "Verizon",
  att: "AT&T",
  tmobile: "T-Mobile",
  xfinity: "Xfinity",
  spectrum: "Spectrum"
};
