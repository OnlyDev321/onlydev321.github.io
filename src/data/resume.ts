import type { Experience, Education, Certification, Skill } from "../types";

export const experience: Experience[] = [
  {
    role: "Software Engineer & BrSE Skill Development",
    company: "Soongsil University (숭실대학교)",
    location: "Seoul, South Korea",
    period: "2023 – Present",
    current: true,
    bullets: [
      "I build web with React, Spring Boot.",
      "I write specs in Korean, English and Vietnamese, so the person explaining the idea and the person coding understand each other.",
      "I try to keep my code tidy and set up CI/CD, mostly on my own open-source projects.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "BSc Software Engineering",
    institution: "Soongsil University (숭실대학교)",
    period: "Mar 2023 – Mar 2027(Expected)",
    note: "Seoul, South Korea · Software Engineer",
  },
];

export const certifications: Certification[] = [
  {
    name: "TOPIK Level 5",
    issuer: "National Institute for International Education",
  },
];

export const certification2: Certification[] = [
  {
    name: "Level VI",
    issuer: "Seoul National University — Korean Language Program",
    year: "03/2021 – 02/2023",
  },
];

/* Skills — grouped to mirror the <Stack /> bento. Verified against the actual
 * stack used across the shipped open-source projects. `level` is unused in the
 * UI; kept for type back-compat. */
export const skills: Skill[] = [
  // Core engineering — foundational languages
  { name: "JavaScript", category: "Core" },
  { name: "TypeScript", category: "Core" },
  { name: "Java", category: "Core" },
  { name: "C", category: "Core" },

  // Web — building the pages users see
  { name: "HTML", category: "Web" },
  { name: "CSS", category: "Web" },
  { name: "React", category: "Web" },
  { name: "Tailwind CSS", category: "Web" },

  // Backend & data — the server and the database
  { name: "Spring Boot", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  // { name: "Express.js", category: "Backend" },
  // { name: "NestJS", category: "Backend" },
  // { name: "REST APIs", category: "Backend" },
  // { name: "WebSockets", category: "Backend" },
  // { name: "MySQL", category: "Backend" },
  // { name: "MongoDB", category: "Backend" },
  // { name: "PostgreSQL", category: "Backend" },

  // AI / ML — the parts that read or understand something
  // { name: "Emotion detection", category: "AI" },
  // { name: "Speech recognition", category: "AI" },
  // { name: "Web scraping", category: "AI" },
  // { name: "Computer vision", category: "AI" },
  // { name: "OpenAI API", category: "AI" },
  // { name: "Data cleaning", category: "AI" },

  // Systems & tooling
  { name: "Git & GitHub", category: "Systems" },
  { name: "Docker", category: "Systems" },
  // { name: "Sockets (C++)", category: "Systems" },
  // { name: "Multi-threading", category: "Systems" },
  // { name: "Arduino", category: "Systems" },
  // { name: "Postman", category: "Systems" },
  // { name: "VS Code", category: "Systems" },
  // { name: "Vercel & Render", category: "Systems" },

  // Design & craft
  { name: "Figma", category: "Design" },
  // { name: "UI design", category: "Design" },
  // { name: "Prototyping", category: "Design" },
  // { name: "Design tokens", category: "Design" },
  // { name: "Responsive layout", category: "Design" },
];
