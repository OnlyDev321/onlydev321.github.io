import { chromium } from "playwright";
import { resolve } from "path";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Tran Hau (김진호) — Resume</title>
<style>
  @page {
    size: A4;
    margin: 12mm 14mm;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1a202c;
    background: #ffffff;
    font-size: 9.5pt;
    line-height: 1.42;
  }
  a {
    color: #0369a1;
    text-decoration: none;
  }
  .header {
    border-bottom: 1.5pt solid #0284c7;
    padding-bottom: 8px;
    margin-bottom: 11px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .name-block h1 {
    font-size: 20pt;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #0f172a;
    line-height: 1.1;
  }
  .name-block h1 span {
    font-size: 13pt;
    font-weight: 600;
    color: #64748b;
    margin-left: 6px;
  }
  .name-block .title {
    font-size: 10.5pt;
    font-weight: 600;
    color: #0284c7;
    margin-top: 3px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .contact-block {
    text-align: right;
    font-size: 8.5pt;
    color: #475569;
    line-height: 1.5;
  }
  .contact-block a {
    color: #0369a1;
    font-weight: 500;
  }

  .section {
    margin-bottom: 10px;
  }
  .section-title {
    font-size: 10pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #0f172a;
    border-bottom: 0.75pt solid #cbd5e1;
    padding-bottom: 2px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
  }
  .section-title::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 10px;
    background: #0284c7;
    margin-right: 6px;
    border-radius: 1px;
  }

  .summary {
    color: #334155;
    font-size: 9pt;
    text-align: justify;
    line-height: 1.45;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    row-gap: 3.5px;
    column-gap: 10px;
    font-size: 8.8pt;
  }
  .skill-category {
    font-weight: 700;
    color: #1e293b;
    white-space: nowrap;
  }
  .skill-list {
    color: #475569;
  }

  .item {
    margin-bottom: 7px;
  }
  .item:last-child {
    margin-bottom: 0;
  }
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .item-title {
    font-size: 9.5pt;
    font-weight: 700;
    color: #0f172a;
  }
  .item-role {
    font-size: 8.8pt;
    font-weight: 600;
    color: #0284c7;
  }
  .item-meta {
    font-size: 8pt;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    color: #64748b;
  }
  .item-tech {
    font-size: 8pt;
    color: #0369a1;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    margin-top: 1px;
    margin-bottom: 2px;
  }
  .item-desc {
    list-style-type: square;
    padding-left: 14px;
    margin-top: 2px;
    color: #334155;
    font-size: 8.7pt;
  }
  .item-desc li {
    margin-bottom: 1.5px;
  }
  .item-desc li::marker {
    color: #0284c7;
    font-size: 7pt;
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
</style>
</head>
<body>

<div class="header">
  <div class="name-block">
    <h1>TRAN HAU <span>(김진호)</span></h1>
    <div class="title">Web Developer &amp; UI/UX Designer</div>
  </div>
  <div class="contact-block">
    <div>Seoul, South Korea · Soongsil Univ.</div>
    <div><a href="mailto:onlydev.321@gmail.com">onlydev.321@gmail.com</a></div>
    <div>Portfolio: <a href="https://onlydev321.github.io">onlydev321.github.io</a></div>
    <div>GitHub: <a href="https://github.com/OnlyDev321">github.com/OnlyDev321</a></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Professional Summary</div>
  <p class="summary">
    Creative and engineering-disciplined <strong>Web Developer &amp; UI/UX Designer</strong> currently studying Software Engineering at <strong>Soongsil University</strong> in Seoul. Combines strong computer science fundamentals with refined design sensibilities, specializing in translating Figma design systems and user workflows into high-performance, responsive, accessible web applications using <strong>React 19, TypeScript, Tailwind CSS, and Framer Motion</strong>. Trilingual communicator (Vietnamese, Korean, English) passionate about design tokens, micro-interactions, WCAG AA standards, and building intuitive cross-cultural web interfaces.
  </p>
</div>

<div class="section">
  <div class="section-title">Technical &amp; Design Skills</div>
  <div class="skills-grid">
    <div class="skill-category">UI/UX Design:</div>
    <div class="skill-list">Figma, Wireframing, High-Fidelity Prototyping, Design Systems, Typography, Responsive Grids, WCAG 2.1 AA Accessibility, User Journey Mapping.</div>
    <div class="skill-category">Frontend &amp; Web:</div>
    <div class="skill-list">React 19, TypeScript, JavaScript (ES6+), Next.js, HTML5 Semantic Markup, CSS3 / Modern Flexbox &amp; Grid, Tailwind CSS (v3 &amp; v4), Framer Motion, Lenis Scroll.</div>
    <div class="skill-category">APIs &amp; Browser Tech:</div>
    <div class="skill-list">WebSocket (Real-time), MediaStream API, Web Audio API, RESTful Integration, LocalStorage / State Management, Vite, Three.js / WebGL.</div>
    <div class="skill-category">Languages:</div>
    <div class="skill-list"><strong>Vietnamese</strong> (Native), <strong>Korean</strong> (Fluent — TOPIK, Academic/Daily Seoul), <strong>English</strong> (Professional Working Proficiency).</div>
  </div>
</div>

<div class="section">
  <div class="section-title">Featured Web &amp; Design Projects</div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Portfolio Web Architecture &amp; Design System</span>
        <span class="item-role"> — Lead Designer &amp; Developer</span>
      </div>
      <span class="item-meta">onlydev321.github.io · 2024</span>
    </div>
    <div class="item-tech">React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Three.js · Vite</div>
    <ul class="item-desc">
      <li>Designed and engineered an editorial, kinetic web portfolio with dark/light mode contrast parity and custom design tokens.</li>
      <li>Implemented interactive UI components: fuzzy-match Command Palette (<code>⌘K</code>), 60fps horizontal work reel, magnetic cursor, and reduced-motion fallback.</li>
      <li>Achieved 100/100 performance and accessibility scores with semantic HTML5, zero render blocking, and optimized asset delivery.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Deepterview-v2 (AI Video Interview Web Platform)</span>
        <span class="item-role"> — Frontend &amp; UI/UX</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/deepterview-v2 · 2024</span>
    </div>
    <div class="item-tech">TypeScript · React 19 · Tailwind CSS · MediaStream API · Web Audio API</div>
    <ul class="item-desc">
      <li>Designed a low-cognitive-load, distraction-free interview UI prioritizing user comfort during automated AI video assessments.</li>
      <li>Integrated browser MediaStream and audio analysis APIs to deliver real-time webcam feedback and interactive audio waveform meters.</li>
      <li>Engineered comprehensive analytical dashboards with clear metric hierarchy, visual scoring charts, and responsive layouts.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">MOJI (Real-Time Collaborative Web Messenger)</span>
        <span class="item-role"> — Frontend Developer</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/MOJI · 2024</span>
    </div>
    <div class="item-tech">React · TypeScript · WebSocket · CSS3 · Modern UI Components</div>
    <ul class="item-desc">
      <li>Crafted a modern, frictionless messaging UI featuring room switching, live chat feeds, typing indicators, and emoji reactions.</li>
      <li>Designed fluid responsive drawer navigation for seamless usability across both mobile screens and desktop viewports.</li>
      <li>Integrated WebSocket event listeners for instant two-way message updates with efficient, re-render-minimized state flow.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">todoX (Personalized Task &amp; Habit Workflow)</span>
        <span class="item-role"> — Solo Designer &amp; Dev</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/todoX · 2023</span>
    </div>
    <div class="item-tech">JavaScript (ES6+) · HTML5 · CSS3 Flexbox &amp; Grid · LocalStorage API</div>
    <ul class="item-desc">
      <li>Designed a clean, habit-forming productivity app featuring customizable color themes and tactile micro-interactions.</li>
      <li>Architected an intuitive task management system with priority filters, drag-and-drop workflows, and offline persistence.</li>
      <li>Built with zero external CSS frameworks, delivering instant load performance (&lt;50ms) and lightweight bundle footprint.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Figma-To-HTML (Design-to-Code Engineering)</span>
        <span class="item-role"> — UI Implementer</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/Figma-To-HTML · 2023</span>
    </div>
    <div class="item-tech">Figma · Semantic HTML5 · CSS3 Custom Properties · Responsive Design</div>
    <ul class="item-desc">
      <li>Translated complex multi-screen Figma design specifications into 100% pixel-perfect, accessible, semantic web pages.</li>
      <li>Established a maintainable CSS architecture leveraging reusable design tokens for typography, spacing, and elevation.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Education &amp; Academic Background</div>
  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Soongsil University (숭실대학교)</span>
        <span class="item-role"> — Seoul, South Korea</span>
      </div>
      <span class="item-meta">2022 – Present</span>
    </div>
    <div style="font-size: 8.8pt; color: #334155; margin-top: 1px;">
      <strong>Bachelor of Science in Software Engineering</strong> · Key studies: Human-Computer Interaction (HCI), Web Systems &amp; Programming, UI/UX Engineering, Software Architecture. Active contributor in student tech initiatives.
    </div>
  </div>
</div>

</body>
</html>`;

async function run() {
  const browser = await chromium.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.pdf({
    path: resolve("public/resume.pdf"),
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "12mm",
      right: "12mm",
    },
  });
  await browser.close();
  console.log("✅ Generated public/resume.pdf successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
