export const site = {
  name: "axs",
  title: "axs",
  description:
    "axs is a privacy-focused developer in Algeria. I build software and automations that don't collect your data.",
  url: "https://axs-official.github.io",
  github: "https://github.com/axs-official",
  githubHandle: "@axs-official",
  repo: "https://github.com/axs-official/axs-official.github.io",
  email: "axs.contact.me@gmail.com",
  emailNote: "Paid work and business enquiries only",
  location: "Algeria",
  timezone: "UTC+1",
  languages: "Arabic and English",
  role: "Privacy-focused developer and automation builder",
  mission:
    "I build privacy-first software that solves real problems and takes away friction caused by closed, paywalled tools.",
  availability: "Open to paid work",
  year: new Date().getUTCFullYear(),
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Stack", href: "/stack" },
  { label: "Contact", href: "/contact" },
  { label: "Links", href: "/links" },
];

/** Pulled from my own contribution graph. Verified figures only. */
export const signal = {
  synced: "22 Nov 2026",
  contributions: 1767,
  activeDays: 62,
  longestStreak: 18,
  publicRepos: 2,
  starred: 11,
};

export const tools = [
  "Python",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Three.js",
  "Git",
  "GitHub Actions",
  "Linux",
  "SQLite",
  "REST APIs",
  "Rust",
  "C++",
  "Figma",
  "Docker",
];

export const focus = [
  {
    index: "01",
    title: "Privacy-first software",
    body: "Tools that do the job and keep nothing. No accounts you didn't ask for, no analytics, no tracking quietly paying the bill.",
    tags: ["No tracking", "Local first", "Open code"],
  },
  {
    index: "02",
    title: "Automation",
    body: "Scripts that take a repeated job off someone's hands. Python most days, GitHub Actions when it has to run on its own.",
    tags: ["Python", "Actions", "CLI"],
  },
  {
    index: "03",
    title: "Utilities",
    body: "The feature something closed and paid left out. Written to be read, and free to keep using.",
    tags: ["Next.js", "Node", "REST"],
  },
];

export const principles = [
  {
    title: "I don't collect data",
    body: "No analytics, no cookies, no trackers, no accounts. If a tool needs your data to work, the design is wrong.",
  },
  {
    title: "Secure by default",
    body: "Few dependencies, no ports I don't understand, and I'd rather drop a feature than ship a hole in it.",
  },
  {
    title: "Readable over clever",
    body: "Code and docs that someone else can pick up. If I can't explain how it works, it isn't finished yet.",
  },
];

export const builds = [
  {
    number: "01",
    title: "This site",
    tag: "Next.js · Three.js · Tailwind",
    body: "The page you're on. A 3D hero, a contribution map built from my own GitHub data, and a static build on GitHub Pages. No analytics, no fonts from anyone else.",
    href: site.repo,
    status: "Live",
  },
  {
    number: "02",
    title: "GitHub profile",
    tag: "SVG · Python",
    body: "The cards on my profile page. Generated with a Python script from the same contribution data, animated with CSS inside the SVG.",
    href: site.github,
    status: "Live",
  },
  {
    number: "03",
    title: "Everything else",
    tag: "Private",
    body: "Automation scripts, private apps and half-finished ideas. They stay private while they're rough. Ask and I'll walk you through one.",
    href: "/contact",
    status: "Private",
  },
];

export const stackGroups = [
  {
    index: "01",
    label: "Build",
    level: "Most days",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Node.js", "Next.js", "Git"],
  },
  {
    index: "02",
    label: "Automate",
    level: "Comfortable",
    items: ["Python", "GitHub Actions", "REST APIs", "CLI tools", "Data cleanup"],
  },
  {
    index: "03",
    label: "Front end",
    level: "Comfortable",
    items: ["React", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    index: "04",
    label: "Learning",
    level: "Getting there",
    items: ["Rust", "C++", "Linux", "SQLite", "Data analysis"],
  },
];
