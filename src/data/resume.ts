import type { Experience, Education, Certification, Skill } from "../types";

export const experience: Experience[] = [
  {
    role: "Full-Stack Developer & BrSE Skill Development",
    company: "Soongsil University (숭실대학교)",
    location: "Seoul, South Korea",
    period: "2023 – Present",
    current: true,
    bullets: [
      "I build web and desktop apps with React, Next.js, Spring Boot and C++.",
      "Two of my projects use AI: deepterview-v2 reads emotions from interview videos, and CoffeeAI takes coffee orders by voice.",
      "I write specs in Korean and Vietnamese, so the person explaining the idea and the person coding understand each other.",
      "I try to keep my code tidy and set up CI/CD, mostly on my own open-source projects.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "BSc Software Engineering",
    institution: "Soongsil University (숭실대학교)",
    period: "2023 – Present",
    note: "Seoul, South Korea · Focus on Web Development, UX/UI Design",
  },
];

export const certifications: Certification[] = [
  {
    name: "TOPIK Level 5",
    issuer: "National Institute for International Education",
    year: "2023 - present",
  },
];

/* Skills — grouped to mirror the <Stack /> bento. Verified against the actual
 * stack used across the shipped open-source projects. `level` is unused in the
 * UI; kept for type back-compat. */
export const skills: Skill[] = [
  // Core engineering — foundational languages
  { name: "TypeScript", category: "Core" },
  { name: "JavaScript", category: "Core" },
  { name: "Java", category: "Core" },
  { name: "Python", category: "Core" },
  { name: "C++", category: "Core" },
  { name: "C", category: "Core" },

  // Web — building the pages users see
  { name: "React", category: "Web" },
  { name: "Next.js", category: "Web" },
  { name: "Vite", category: "Web" },
  { name: "Tailwind CSS", category: "Web" },
  { name: "HTML", category: "Web" },
  { name: "CSS", category: "Web" },
  { name: "Framer Motion", category: "Web" },
  { name: "Bootstrap", category: "Web" },

  // Backend & data — the server and the database
  { name: "Spring Boot", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "WebSockets", category: "Backend" },
  { name: "MySQL", category: "Backend" },
  { name: "MongoDB", category: "Backend" },

  // AI / ML — the parts that read or understand something
  { name: "Emotion detection", category: "AI" },
  { name: "Speech recognition", category: "AI" },
  { name: "Web scraping", category: "AI" },
  { name: "Computer vision", category: "AI" },
  { name: "OpenAI API", category: "AI" },
  { name: "Data cleaning", category: "AI" },

  // Systems & tooling
  { name: "Git & GitHub", category: "Systems" },
  { name: "Docker", category: "Systems" },
  { name: "Sockets (C++)", category: "Systems" },
  { name: "Multi-threading", category: "Systems" },
  { name: "Arduino", category: "Systems" },
  { name: "Postman", category: "Systems" },
  { name: "VS Code", category: "Systems" },
  { name: "Vercel & Render", category: "Systems" },

  // Design & craft
  { name: "Figma", category: "Design" },
  { name: "UI design", category: "Design" },
  { name: "Prototyping", category: "Design" },
  { name: "Design tokens", category: "Design" },
  { name: "Responsive layout", category: "Design" },
];
