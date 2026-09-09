import type { Project } from '../types'

/* -------------------------------------------------------------------------- *
 *  PROJECTS — open-source product work by Tran Hau (김진호 / OnlyDev321).      *
 *  All repositories are public on GitHub: https://github.com/OnlyDev321         *
 *                                                                             *
 *  Flagships:                                                                 *
 *    01 Deepterview-v2  — AI-powered video interview emotion analysis (TS)    *
 *    02 CoffeeAI        — Voice AI coffee ordering with Java & STT            *
 *    03 Demian-shop     — ViDE visual layout web extraction (Python)          *
 *    04 MFC-ChatApp     — High-performance C++ chat with profanity filtering  *
 *                                                                             *
 *  Secondary ("also shipped"):                                                *
 *    05 MOJI            — Modern real-time web chat (React + WebSockets)      *
 *    06 TrafficSafe     — Arduino pedestrian safety IoT system                *
 *    07 todoX           — Personalized productivity app (JS)                  *
 *    08 Figma-To-HTML   — Pixel-perfect responsive web conversion             *
 * -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: 'deepterview-v2',
    name: 'Deepterview v2',
    repo: 'OnlyDev321/deepterview-v2',
    year: '2025',
    platform: 'AI Video Analysis Platform',
    tagline: 'AI-powered interview analysis system evaluating candidates’ emotional expressions and behavioral cues in real time.',
    description:
      'Deepterview-v2 is an intelligent recruitment assessment system that analyzes candidate video feeds. It processes facial landmarks, micro-expressions, speech fluctuations, and behavioral signals to generate quantitative, objective performance reports for interviewers and HR teams.',
    features: [
      'Multi-modal emotion and micro-expression detection from video streams',
      'Real-time candidate engagement, composure, and confidence metrics scoring',
      'Interactive dashboard featuring timeline-based behavioral cue breakdowns',
      'High-performance TypeScript and React architecture with fluid visual telemetry',
      'Privacy-conscious video processing pipeline with exportable analytical summaries',
    ],
    tech: ['TypeScript', 'React 19', 'AI Video Analysis', 'Computer Vision', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/OnlyDev321/deepterview-v2',
    accent: '#0284c7',
    accentGlow: 'rgba(2,132,199,0.22)',
    category: 'AI & Machine Learning',
    status: 'in-development',
    tier: 'flagship',
    highlights: [
      { label: 'Analysis', value: 'Emotion & Cues' },
      { label: 'Video Feed', value: 'Real-time & Recorded' },
      { label: 'Core Stack', value: 'TypeScript + AI' },
      { label: 'Dashboard', value: 'Interactive Metrics' },
    ],
  },
  {
    id: 'coffee-ai',
    name: 'CoffeeAI',
    repo: 'OnlyDev321/CoffeeAI',
    year: '2025',
    platform: 'Voice AI Ordering System',
    tagline: 'AI-powered voice coffee ordering system built with Java, real-time speech recognition, and automatic menu parsing.',
    description:
      'CoffeeAI re-imagines retail ordering with a conversational voice interface. Engineered in Java, it captures live customer speech, extracts menu items and fine-grained customization parameters (ice level, syrups, milk alternatives) through natural language parsing, and processes automated checkout.',
    features: [
      'Real-time Speech-to-Text (STT) audio stream processing with ambient noise mitigation',
      'Intelligent natural language parser for multi-item orders and complex customizations',
      'Automated state machine managing item availability, modifiers, and dynamic pricing',
      'Seamless checkout workflow with digital receipt generation and voice confirmation',
      'Modular object-oriented Java architecture designed for POS kiosk integration',
    ],
    tech: ['Java', 'Spring Boot', 'Speech Recognition (STT)', 'NLP Parsing', 'REST API', 'MySQL'],
    github: 'https://github.com/OnlyDev321/CoffeeAI',
    accent: '#d97706',
    accentGlow: 'rgba(217,119,6,0.22)',
    category: 'Voice AI & Retail POS',
    status: 'shipped',
    tier: 'flagship',
    highlights: [
      { label: 'Input', value: 'Real-time Voice STT' },
      { label: 'Backend', value: 'Java / OOP Engine' },
      { label: 'Parser', value: 'Menu & Modifier NLP' },
      { label: 'Checkout', value: 'Automated Billing' },
    ],
  },
  {
    id: 'demian-shop',
    name: 'Demian-Shop',
    repo: 'OnlyDev321/Demian-shop',
    year: '2025',
    platform: 'Visual Web Extraction Engine',
    tagline: 'Lightweight product information extraction based on ViDE visual layout analysis for unstructured e-commerce sites.',
    description:
      'Demian-Shop tackles the brittleness of DOM-based web scraping by employing ViDE (Visual Data Extraction) methodologies. Rather than depending strictly on unstable CSS selectors, it evaluates the visual layout geometry and render tree of e-commerce pages to accurately locate titles, prices, specs, and images across diverse layouts.',
    features: [
      'ViDE (Visual Data Extraction) spatial layout analysis and content block segmentation',
      'Resilient against CSS class obfuscation, dynamic client-side hydration, and DOM mutations',
      'Automated product schema normalization (prices, currency, stock status, specs)',
      'High-throughput asynchronous crawling engine with rate limiting and structured JSON export',
    ],
    tech: ['Python', 'ViDE Visual Layout', 'DOM Tree Analysis', 'Web Mining', 'Data Normalization'],
    github: 'https://github.com/OnlyDev321/Demian-shop',
    accent: '#059669',
    accentGlow: 'rgba(5,150,105,0.22)',
    category: 'Data Mining & Vision',
    status: 'shipped',
    tier: 'flagship',
    highlights: [
      { label: 'Method', value: 'ViDE Visual Layout' },
      { label: 'Target', value: 'Unstructured E-comm' },
      { label: 'Resilience', value: 'DOM Mutation-Proof' },
      { label: 'Language', value: 'Python 3' },
    ],
  },
  {
    id: 'mfc-chatapp',
    name: 'MFC-ChatApp (BadWord Filter)',
    repo: 'OnlyDev321/MFC-ChatAppWithoutBadWord',
    year: '2024',
    platform: 'Desktop Chat & Moderation',
    tagline: 'Real-time C++ chat system with personalized prohibited-word filtering and automated content moderation.',
    description:
      'A high-performance Windows desktop chat application engineered with C++ and Microsoft Foundation Classes (MFC). Features client-server socket communication, multi-threaded message routing, and an ultra-fast in-memory pattern matching engine for custom user blacklists and automated profanity sanitization.',
    features: [
      'Low-latency asynchronous socket networking powered by native Winsock APIs',
      'Personalized blacklist management with real-time text masking and content moderation',
      'Safe multi-threaded UI event queue ensuring zero UI freezing during heavy network traffic',
      'Comprehensive audit logging and visual moderation violation alerts for room managers',
    ],
    tech: ['C++', 'MFC (Microsoft Foundation Classes)', 'Winsock Sockets', 'Multi-threading', 'Pattern Matching'],
    github: 'https://github.com/OnlyDev321/MFC-ChatAppWithoutBadWord',
    accent: '#db2777',
    accentGlow: 'rgba(219,39,119,0.22)',
    category: 'Systems & C++',
    status: 'shipped',
    tier: 'flagship',
    highlights: [
      { label: 'Language', value: 'C++ / Win32 / MFC' },
      { label: 'Networking', value: 'Raw Winsock Sockets' },
      { label: 'Moderation', value: 'In-Memory Filter' },
      { label: 'Concurrency', value: 'Multi-Threaded' },
    ],
  },
  {
    id: 'moji',
    name: 'MOJI Chat',
    repo: 'OnlyDev321/MOJI',
    year: '2024',
    platform: 'Modern Web Chat',
    tagline: 'Real-time expressive web chat application with live messaging, clean aesthetics, and instant sync.',
    description:
      'MOJI is a modern, responsive messaging web app built for fast and expressive conversations. It combines WebSocket-backed real-time bi-directional message dispatch, typing indicators, user presence detection, and an intuitive, mobile-friendly interface.',
    features: [
      'Bi-directional instant messaging via WebSockets with automatic reconnection',
      'Real-time user presence, active status indicators, and live typing previews',
      'Responsive interface styled with Tailwind CSS and accessible navigation',
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'Tailwind CSS'],
    github: 'https://github.com/OnlyDev321/MOJI',
    accent: '#7c3aed',
    accentGlow: 'rgba(124,58,237,0.22)',
    category: 'Web Application',
    status: 'shipped',
    tier: 'secondary',
    highlights: [
      { label: 'Protocol', value: 'WebSockets' },
      { label: 'Frontend', value: 'TypeScript + React' },
    ],
  },
  {
    id: 'trafficsafe',
    name: 'TrafficSafe',
    repo: 'OnlyDev321/TrafficSafe',
    year: '2024',
    platform: 'Smart Pedestrian IoT System',
    tagline: 'Arduino-powered pedestrian safety system with ultrasonic vehicle detection and automatic barrier control.',
    description:
      'An embedded smart crosswalk safety mechanism designed to protect pedestrians. Utilizes ultrasonic distance sensors to monitor approaching traffic speeds, evaluates safe crossing intervals, and triggers physical servo barriers alongside visual LED alerts.',
    features: [
      'Ultrasonic distance sensing with algorithmic noise filtering for reliable vehicle detection',
      'Automated servo-driven safety barrier control synchronized with pedestrian signals',
      'High-contrast visual warning system for enhanced night-time and bad-weather visibility',
    ],
    tech: ['C++', 'Arduino', 'Ultrasonic Sensors', 'Servo Actuators', 'Embedded Systems'],
    github: 'https://github.com/OnlyDev321/TrafficSafe',
    accent: '#0891b2',
    accentGlow: 'rgba(8,145,178,0.22)',
    category: 'IoT & Embedded Hardware',
    status: 'shipped',
    tier: 'secondary',
    highlights: [
      { label: 'Hardware', value: 'Arduino + Sensors' },
      { label: 'Domain', value: 'Smart City IoT' },
    ],
  },
  {
    id: 'todox',
    name: 'todoX',
    repo: 'OnlyDev321/todoX',
    year: '2024',
    platform: 'Productivity Application',
    tagline: 'Create and organize your daily tasks according to your personal workflow and visual style.',
    description:
      'A sleek productivity application that emphasizes user customization and distraction-free workflow. Features customizable theme palettes, tag grouping, local persistence, and fluid animations designed to keep users in flow state.',
    features: [
      'Dynamic visual theme customization and personalized palette selector',
      'Instant search, priority categorizing, and tag-based filtering',
      'Offline-first local storage persistence ensuring zero data loss',
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage', 'UX Design'],
    github: 'https://github.com/OnlyDev321/todoX',
    accent: '#0d9488',
    accentGlow: 'rgba(13,148,136,0.22)',
    category: 'Productivity & Web',
    status: 'shipped',
    tier: 'secondary',
    highlights: [
      { label: 'Focus', value: 'Customizable UX' },
      { label: 'Storage', value: 'Local Persistence' },
    ],
  },
  {
    id: 'figma-to-html',
    name: 'Figma-To-HTML',
    repo: 'OnlyDev321/Figma-To-HTML',
    year: '2024',
    platform: 'Pixel-Perfect Web Craft',
    tagline: 'Handcrafted, pixel-perfect responsive HTML5/CSS3 conversion adhering strictly to design token specifications.',
    description:
      'A showcase of translating intricate Figma design files into production-ready, clean, semantic HTML5 and CSS3 code with smooth interactions, responsive breakpoints, and accessibility standards.',
    features: [
      'Faithful replication of Figma design tokens, spacing scales, and typography hierarchies',
      'Pure semantic HTML5 layout structure with modular, maintainable CSS',
      'Fluid responsiveness tested across mobile, tablet, and widescreen desktop viewports',
    ],
    tech: ['Figma', 'HTML5', 'CSS3', 'Responsive Design', 'A11y'],
    github: 'https://github.com/OnlyDev321/Figma-To-HTML',
    accent: '#9333ea',
    accentGlow: 'rgba(147,51,234,0.22)',
    category: 'Design & Frontend',
    status: 'shipped',
    tier: 'secondary',
    highlights: [
      { label: 'Craft', value: 'Pixel-Perfect UI' },
      { label: 'Source', value: 'Figma System' },
    ],
  },
]

export const flagshipProjects: Project[] = projects.filter(p => p.tier === 'flagship')
export const secondaryProjects: Project[] = projects.filter(p => p.tier === 'secondary')

