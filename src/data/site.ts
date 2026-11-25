export const site = {
  name: "A-XS",
  title: "A-XS",
  description:
    "A-XS is a full-stack developer building privacy-first web apps, automation and developer tools that leave your data alone.",
  url: "https://axs-official.github.io",
  github: "https://github.com/axs-official",
  githubHandle: "@axs-official",
  repo: "https://github.com/axs-official/axs-official.github.io",
  email: "axs.contact.me@gmail.com",
  emailNote: "Paid work and business enquiries only",
  location: "Algeria",
  timezone: "UTC+1",
  role: "Full-stack developer",
  mission: "I build software that does the job and leaves your data alone.",
  availability: "Open to paid work",
  year: new Date().getUTCFullYear(),
};

export const socials = [
  { label: "X", handle: "@axs_officiall", href: "https://x.com/axs_officiall" },
  {
    label: "Reddit",
    handle: "u/axs_official",
    href: "https://www.reddit.com/user/axs_official/",
  },
  {
    label: "Instagram",
    handle: "@axs.officiall",
    href: "https://www.instagram.com/axs.officiall/",
  },
];

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
    title: "Full-stack web apps",
    body: "Front end, API, database and deploy, built as one piece. React and Next.js on the way in, Node or Python behind it.",
    tags: ["Next.js", "Node", "SQLite"],
  },
  {
    index: "02",
    title: "Automation",
    body: "Scripts and workflows that take the repetitive part of a job off your hands, then keep running without babysitting.",
    tags: ["Python", "Actions", "CLI"],
  },
  {
    index: "03",
    title: "Privacy-first builds",
    body: "Software that does its job without harvesting data: no accounts nobody needs, no analytics, no third-party scripts.",
    tags: ["No tracking", "Local first", "Open code"],
  },
];

export const principles = [
  {
    title: "Privacy is the default",
    body: "No analytics, no cookies, no trackers, and no accounts nobody asked for. I'd rather drop a feature than collect something I don't need.",
  },
  {
    title: "Secure by default",
    body: "A short dependency list, careful permissions, and code I'm comfortable leaving running unattended.",
  },
  {
    title: "Easy to hand over",
    body: "Code and docs someone else can read. If I can't explain how it works, it isn't finished yet.",
  },
];

export const builds = [
  {
    number: "01",
    title: "This site",
    tag: "Next.js · Three.js · Tailwind",
    body: "This page. A 3D hero, a contribution map built from my own GitHub data, and a static build on GitHub Pages — no analytics and no fonts from anyone else.",
    href: site.repo,
    status: "Live",
  },
  {
    number: "02",
    title: "GitHub profile",
    tag: "SVG · Python",
    body: "The cards on my GitHub profile. A Python script turns my own contribution data into SVG, animated with CSS inside the file.",
    href: site.github,
    status: "Live",
  },
  {
    number: "03",
    title: "Private work",
    tag: "Private",
    body: "Client builds, apps and ideas still in progress. Private until they're solid, but I'm happy to walk you through one.",
    href: "/contact",
    status: "Private",
  },
];

export const stackGroups = [
  {
    index: "01",
    label: "Front end",
    level: "Most days",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Figma"],
  },
  {
    index: "02",
    label: "Back end",
    level: "Comfortable",
    items: ["Node.js", "Python", "REST APIs", "SQLite", "Auth flows", "Data cleanup"],
  },
  {
    index: "03",
    label: "Ship and automate",
    level: "Comfortable",
    items: ["Git", "GitHub Actions", "Linux", "Docker", "CLI tools"],
  },
  {
    index: "04",
    label: "Learning",
    level: "Getting there",
    items: ["Rust", "C++", "Postgres", "Data analysis"],
  },
];
