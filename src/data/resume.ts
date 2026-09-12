import type { Experience, Education, Certification, Skill } from "../types";

export const experience: Experience[] = [
  {
    role: "Full-Stack Developer & BrSE Skill Development",
    company: "Soongsil University (숭실대학교)",
    location: "Seoul, South Korea",
    period: "2023 – Present",
    current: true,
    bullets: [
      "Engineering full-stack web and desktop applications across React, Next.js, Spring Boot, and C++.",
      "Architected AI-powered integrations: deepterview-v2 for interview video emotion analysis and CoffeeAI for real-time voice speech ordering.",
      "Formulating bilingual technical specs (Korean & Vietnamese) to bridge product requirements and engineering execution.",
      "Practicing clean code, modular architecture, and CI/CD automation across multiple open-source repositories.",
    ],
  },
  {
    role: "Frontend Developer & UX/UI Designer",
    company: "Soongsil University (숭실대학교)",
    location: "Seoul & Remote",
    period: "2023 – Present",
    current: true,
    bullets: [
      "Transformed intricate Figma design systems into responsive, accessible HTML5/CSS3 and React codebases (Figma-To-HTML).",
      "Designed modern, fluid UI components with Tailwind CSS and Framer Motion, lifting interactive responsiveness.",
      "Built lightweight web productivity and chat apps (todoX, MOJI) with WebSocket real-time communication and offline-first storage.",
    ],
  },
  {
    role: "Software Engineering Researcher",
    company: "Soongsil University (숭실대학교)",
    location: "Seoul, South Korea",
    period: "2023 – Present",
    current: true,
    bullets: [
      "Conducted research on ViDE (Visual Data Extraction) layout analysis for unstructured e-commerce data extraction (Demian-shop).",
      "Built multi-threaded C++ Winsock desktop systems with custom regex blacklist filtering (MFC-ChatAppWithoutBadWord).",
      "Engineered IoT pedestrian crosswalk protection hardware with Arduino, ultrasonic sensors, and automated barrier servos (TrafficSafe).",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "BSc Software Engineering",
    institution: "Soongsil University (숭실대학교)",
    period: "2023 – Present",
    note: "Seoul, South Korea · Focus on Web Development, UX/UI Design & AI Systems",
  },
];

export const certifications: Certification[] = [
  {
    name: "TOPIK Level 5",
    issuer: "National Institute for International Education",
    year: "2023 - present",
  },
  {
    name: "Software Engineering & Full-Stack Track",
    issuer: "Soongsil University SE Lab",
    year: "2023 - present",
  },
];

/* Skills — grouped to mirror the <Stack /> bento. Verified against the actual
 * stack used across the shipped open-source projects. `level` is unused in the
 * UI; kept for type back-compat. */
export const skills: Skill[] = [
  // Core engineering — foundational languages
  { name: "TypeScript (strict)", category: "Core" },
  { name: "JavaScript (ES2024)", category: "Core" },
  { name: "Java (Spring Boot)", category: "Core" },
  { name: "Python", category: "Core" },
  { name: "C++", category: "Core" },
  { name: "C", category: "Core" },

  // Web — modern responsive interfaces
  { name: "React 19", category: "Web" },
  { name: "Next.js", category: "Web" },
  { name: "Vite", category: "Web" },
  { name: "Tailwind CSS v4", category: "Web" },
  { name: "HTML5 / Semantic Web", category: "Web" },
  { name: "CSS3 / Modern Layouts", category: "Web" },
  { name: "Framer Motion", category: "Web" },
  { name: "Bootstrap", category: "Web" },

  // Backend & data — APIs, realtime, databases
  { name: "Spring Boot", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "RESTful APIs", category: "Backend" },
  { name: "WebSockets", category: "Backend" },
  { name: "MySQL", category: "Backend" },
  { name: "MongoDB Atlas", category: "Backend" },

  // AI / ML — vision, audio & visual data mining
  { name: "Video Emotion Analysis", category: "AI" },
  { name: "Speech Recognition (STT)", category: "AI" },
  { name: "ViDE Visual Layout Extraction", category: "AI" },
  { name: "Computer Vision", category: "AI" },
  { name: "OpenAI API & Prompting", category: "AI" },
  { name: "Data Normalization", category: "AI" },

  // Systems & tooling
  { name: "Git & GitHub Actions", category: "Systems" },
  { name: "Docker", category: "Systems" },
  { name: "Winsock / Sockets (C++)", category: "Systems" },
  { name: "Multi-threading", category: "Systems" },
  { name: "Arduino / Embedded IoT", category: "Systems" },
  { name: "Postman", category: "Systems" },
  { name: "VS Code", category: "Systems" },
  { name: "Vercel", category: "Systems" },

  // Design & craft
  { name: "Figma", category: "Design" },
  { name: "UX/UI Design", category: "Design" },
  { name: "Pixel-perfect Prototyping", category: "Design" },
  { name: "Design Tokens", category: "Design" },
  { name: "Responsive Layouts", category: "Design" },
  { name: "Accessibility (A11y)", category: "Design" },
];
