export interface ProcessStep {
  id: string;
  index: string;
  title: string;
  body: string;
  artifacts: string[];
}

/* How a project actually goes out, from the first sketch to a live URL. */
export const processSteps: ProcessStep[] = [
  {
    id: "design",
    index: "01",
    title: "Design",
    body: "I start in Figma, not in code. I set the colors, the fonts and the spacing first, then build a small design system out of them, so the screens I design later already look like one app.",
    artifacts: ["Design tokens", "UI components", "Figma screens"],
  },
  {
    id: "frontend",
    index: "02",
    title: "Frontend",
    body: "Then I build the interface from that design system. It has to work on a phone and on a laptop, and it has to show what is loading, what worked and what went wrong. Most of the real work here is the small states nobody notices until they are missing.",
    artifacts: ["Responsive layout", "State & data flow", "Loading + error UI"],
  },
  {
    id: "backend",
    index: "03",
    title: "Backend",
    body: "After that I write the server side: what the data looks like in the database, and what the API lets you do with it. I decide the shape of the data first, because changing it later is much more work than getting it right at the start.",
    artifacts: ["Database schema", "API endpoints", "Error handling"],
  },
  {
    id: "connect",
    index: "04",
    title: "Connect & test",
    body: "Now I join the two halves together and actually break them on purpose. Empty inputs, a request that times out, a user who is not logged in. I want to find those problems myself, because otherwise real users find them for me.",
    artifacts: ["tests", "pass"],
  },
  {
    id: "deploy",
    index: "05",
    title: "Deploy & watch",
    body: "I put it live on Vercel or Render, and then I do not walk away. I read the logs, check the speed and the errors, and fix whatever shows up. A deploy that used to take a whole day now takes about ten minutes.",
    artifacts: ["CI auto deploy", "Logs & error tracking", "Live fixes"],
  },
];
