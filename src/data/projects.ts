import type { Project } from "../types";

/* -------------------------------------------------------------------------- *
 *  PROJECTS — open-source work by Tran Hau (김진호 / OnlyDev321).               *
 *  All repositories are public: https://github.com/OnlyDev321                    *
 *                                                                              *
 *  Copy rule for the case-study modal: one idea per project. The tagline says  *
 *  what it is, the description says why it exists, the features are short       *
 *  single-clause lines. Long feature sentences were reading like a spec sheet   *
 *  on a phone, so everything is capped well under a full line.                  *
 *                                                                              *
 *  Flagships:                                                                  *
 *    01 Deepterview-v2  — scores candidate emotion from video (TS)              *
 *    02 CoffeeAI        — voice coffee ordering with Java & STT                 *
 *    03 Demian-shop     — reads product info from page layout (Python)         *
 *    04 MFC-ChatApp     — C++ desktop chat with a word filter                  *
 *                                                                              *
 *  Secondary ("also shipped"):                                                 *
 *    05 MOJI            — real-time web chat (React + WebSockets)               *
 *    06 TrafficSafe     — Arduino pedestrian safety system                     *
 *    07 todoX           — to-do app with your own colors                       *
 *    08 Figma-To-HTML   — Figma design to responsive code                     *
 * -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: "deepterview-v2",
    name: "Deepterview v2",
    repo: "OnlyDev321/deepterview-v2",
    year: "2025",
    platform: "AI video analysis",
    tagline: "Scores how a candidate comes across, using only their video.",
    description:
      "Built for interviewers, who have to watch a lot of footage. It reads the video and turns what it sees into scores and a timeline you can actually check.",
    features: [
      "Reads emotion from the video stream",
      "Timeline of where the cues showed up",
      "Works live or on a recording",
      "Report you can export and share",
    ],
    tech: ["TypeScript", "React", "Node.js", "Tailwind CSS", "Computer vision"],
    github: "https://github.com/OnlyDev321/deepterview-v2",
    accent: "#0284c7",
    accentGlow: "rgba(2,132,199,0.22)",
    category: "AI & machine learning",
    status: "completed",
    tier: "flagship",
    highlights: [
      { label: "Reads", value: "Face & voice" },
      { label: "Scores", value: "Mood, focus" },
      { label: "Stack", value: "TypeScript + Java Spring + Python" },
      { label: "Output", value: "Timeline report" },
    ],
  },
  {
    id: "coffee-ai",
    name: "CoffeeAI",
    repo: "OnlyDev321/CoffeeAI",
    year: "2025",
    platform: "Voice ordering",
    tagline: "Order a coffee by talking instead of tapping a screen.",
    description:
      'I wanted to see if a normal sentence was enough to place an order. Say "large iced latte, less ice, oat milk" and it works out the drink and the price on its own.',
    features: [
      "Turns speech into an order",
      "Understands the details, like less ice",
      "Confirms back before you pay",
      "Works over real shop noise",
    ],
    tech: ["Java", "Spring Boot", "Speech recognition", "MySQL", "REST API"],
    github: "https://github.com/OnlyDev321/CoffeeAI",
    accent: "#d97706",
    accentGlow: "rgba(217,119,06,0.22)",
    category: "Voice AI",
    status: "completed",
    tier: "flagship",
    highlights: [
      { label: "Input", value: "Your voice" },
      { label: "Language", value: "Java" },
      { label: "Understands", value: "Modifiers" },
      { label: "Result", value: "Paid order" },
    ],
  },
  {
    id: "demian-shop",
    name: "Demian-Shop",
    repo: "OnlyDev321/Demian-shop",
    year: "2025",
    platform: "Web scraping",
    tagline:
      "Reads a shop page like a person scans it, not like a script does.",
    description:
      "Most scrapers break when a site changes its CSS. This one looks at where things sit on the screen, so renaming a class does not break it. The output is clean JSON.",
    features: [
      "Finds items by screen position",
      "Survives redesigns and renames",
      "Normalizes price and stock",
      "Crawls many pages, quietly",
    ],
    tech: ["Python", "Layout analysis", "Async crawling", "JSON export"],
    github: "https://github.com/OnlyDev321/Demian-shop",
    accent: "#059669",
    accentGlow: "rgba(5,150,105,0.22)",
    category: "Data & vision",
    status: "completed",
    tier: "flagship",
    highlights: [
      { label: "How it works", value: "Looks at the page" },
      { label: "Still works when", value: "Website is redesigned" },
      { label: "Language", value: "Python + Javascript" },
      { label: "Output", value: "Clean JSON" },
    ],
  },
  {
    id: "mfc-chatapp",
    name: "MFC-ChatApp",
    repo: "OnlyDev321/MFC-ChatAppWithoutBadWord",
    year: "2024",
    platform: "Desktop chat",
    tagline: "A desktop chat that hides the words you don't want.",
    description:
      "My first real networking project, and the first time sockets actually clicked. Each person has their own blocked-word list, and messages are checked before anyone sees them.",
    features: [
      "Live chat over raw sockets",
      "Your own blocked-word list",
      "Filter runs before the message shows",
      "Room manager sees every flag",
    ],
    tech: ["C++", "MFC", "Sockets", "Multi-threading"],
    github: "https://github.com/OnlyDev321/MFC-ChatAppWithoutBadWord",
    accent: "#db2777",
    accentGlow: "rgba(219,39,119,0.22)",
    category: "Systems & C++",
    status: "completed",
    tier: "flagship",
    highlights: [
      { label: "Language", value: "C++" },
      { label: "Chat", value: "Real sockets" },
      { label: "Filter", value: "Per user" },
      { label: "Runs on", value: "Windows" },
    ],
  },
  {
    id: "moji",
    name: "MOJI Chat",
    repo: "OnlyDev321/MOJI",
    year: "2024",
    platform: "Web chat",
    tagline: "A quick web chat that stays in sync while you type.",
    description:
      "A small project to get comfortable with WebSockets. Messages arrive as you send them, and it reconnects on its own if the network drops.",
    features: [
      "Messages arrive instantly",
      "Shows when people are typing",
      "Reconnects by itself",
      "Works on a phone",
    ],
    tech: ["TypeScript", "React", "Node.js", "WebSockets", "Tailwind CSS"],
    github: "https://github.com/OnlyDev321/MOJI",
    accent: "#7c3aed",
    accentGlow: "rgba(124,58,237,0.22)",
    category: "Web app",
    status: "shipped",
    tier: "secondary",
    highlights: [
      { label: "Protocol", value: "WebSockets" },
      { label: "Built with", value: "React" },
    ],
  },
  {
    id: "trafficsafe",
    name: "TrafficSafe",
    repo: "OnlyDev321/TrafficSafe",
    year: "2024",
    platform: "IoT & hardware",
    tagline: "A crosswalk barrier that knows a car is coming.",
    description:
      "A class project that needed real hardware, which made it the most fun one. An ultrasonic sensor watches for cars, and a servo drops the barrier before anyone steps off the kerb.",
    features: [
      "Sensor spots an approaching car",
      "Barrier drops on its own",
      "Lights flash at night and in rain",
      "Ignores sensor noise",
    ],
    tech: ["Arduino", "C++", "Ultrasonic sensors", "Servo"],
    github: "https://github.com/OnlyDev321/TrafficSafe",
    accent: "#0891b2",
    accentGlow: "rgba(8,145,178,0.22)",
    category: "IoT & hardware",
    status: "shipped",
    tier: "secondary",
    highlights: [
      { label: "Hardware", value: "Arduino" },
      { label: "Watches for", value: "Cars" },
    ],
  },
  {
    id: "todox",
    name: "todoX",
    repo: "OnlyDev321/todoX",
    year: "2024",
    platform: "Productivity",
    tagline: "A to-do list you can make look like your own.",
    description:
      "I got tired of apps that look the same as everyone else's, so the colors are the main feature. Everything is saved in the browser, so nothing to sign up for.",
    features: [
      "Pick your own colors",
      "Search and filter by tag",
      "Saved in the browser, works offline",
      "No account needed",
    ],
    tech: ["JavaScript", "HTML", "CSS", "Local storage"],
    github: "https://github.com/OnlyDev321/todoX",
    accent: "#0d9488",
    accentGlow: "rgba(13,148,136,0.22)",
    category: "Productivity",
    status: "shipped",
    tier: "secondary",
    highlights: [
      { label: "Main thing", value: "Your colors" },
      { label: "Storage", value: "In browser" },
    ],
  },
  {
    id: "figma-to-html",
    name: "Figma-To-HTML",
    repo: "OnlyDev321/Figma-To-HTML",
    year: "2024",
    platform: "Design to code",
    tagline: "Turning a Figma file into code that still looks right.",
    description:
      "The gap between a design and a working page. This is my practice at keeping the spacing and type sizes from Figma and getting the same result in the browser.",
    features: [
      "Spacing and type match the design",
      "Works on phone, tablet, desktop",
      "Clean readable markup",
      "Keyboard and screen reader friendly",
    ],
    tech: ["Figma", "HTML", "CSS", "Responsive design"],
    github: "https://github.com/OnlyDev321/Figma-To-HTML",
    accent: "#9333ea",
    accentGlow: "rgba(147,51,238,0.22)",
    category: "Design & frontend",
    status: "shipped",
    tier: "secondary",
    highlights: [
      { label: "Source", value: "Figma file" },
      { label: "Result", value: "Working page" },
    ],
  },
];

export const flagshipProjects: Project[] = projects.filter(
  (p) => p.tier === "flagship",
);
export const secondaryProjects: Project[] = projects.filter(
  (p) => p.tier === "secondary",
);
