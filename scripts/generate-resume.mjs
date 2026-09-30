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

  .note {
    font-size: 8.8pt;
    color: #334155;
    margin-top: 1px;
  }
</style>
</head>
<body>

<div class="header">
  <div class="name-block">
    <h1>TRAN HAU <span>(김진호)</span></h1>
    <div class="title">Web Developer &amp; BrSE (Bridge Software Engineer)</div>
  </div>
  <div class="contact-block">
    <div>Seoul, South Korea · Soongsil Univ.</div>
    <div><a href="mailto:onlydev.321@gmail.com">onlydev.321@gmail.com</a></div>
    <div>Portfolio: <a href="https://onlydev321.github.io">onlydev321.github.io</a></div>
    <div>GitHub: <a href="https://github.com/OnlyDev321">github.com/OnlyDev321</a></div>
  </div>
</div>

<div class="section">
  <div class="section-title">About Me</div>
  <p class="summary">
    Software Engineering student at <strong>Soongsil University</strong> in Seoul, graduating 2027. I build web apps from the design stage to the deploy stage: Figma screens, React and TypeScript on the front, Java or Node.js on the back, and the database in between. I work in <strong>Vietnamese and Korean</strong>, so I can help a client explain the idea and a developer build it without anything getting lost in between. Looking for a role as a <strong>BrSE</strong> or a full-stack web developer.
  </p>
</div>

<div class="section">
  <div class="section-title">Skills</div>
  <div class="skills-grid">
    <div class="skill-category">Frontend:</div>
    <div class="skill-list">React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS,</div>
    <div class="skill-category">Backend:</div>
    <div class="skill-list">Java, Spring Boot, Node.js, Express, REST APIs, WebSockets, MySQL, MongoDB.</div>
    <div class="skill-category">AI:</div>
    <div class="skill-list">Speech recognition, computer vision, emotion detection, web scraping, OpenAI API.</div>
    <div class="skill-category">Other languages:</div>
    <div class="skill-list">Python, C++, C.</div>
    <div class="skill-category">Design:</div>
    <div class="skill-list">Figma, design systems, responsive layout, UI design</div>
    <div class="skill-category">Tools:</div>
    <div class="skill-list">Git, GitHub, Docker, Postman, VS Code, Vercel, Render.</div>
    <div class="skill-category">Languages:</div>
    <div class="skill-list"><strong>Vietnamese</strong> (native), <strong>Korean</strong> (fluent, TOPIK 5), <strong>English</strong> (working).</div>
  </div>
</div>

<div class="section">
  <div class="section-title">Projects</div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Deepterview v2</span>
        <span class="item-role"> — AI video interview analysis</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/deepterview-v2 · 2025</span>
    </div>
    <div class="item-tech">TypeScript · React · Node.js · Tailwind CSS · Computer vision</div>
    <ul class="item-desc">
      <li>Scores a candidate from their video: emotion, focus, and where in the recording the cues showed up.</li>
      <li>Works on a live call or a saved recording, and exports a report the interviewer can check.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">CoffeeAI</span>
        <span class="item-role"> — voice ordering system</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/CoffeeAI · 2025</span>
    </div>
    <div class="item-tech">Java · Spring Boot · MySQL · REST API · Speech recognition</div>
    <ul class="item-desc">
      <li>Turns a normal sentence into an order: "large iced latte, less ice, oat milk" becomes a priced order.</li>
      <li>Built the backend as a Java service, so it can sit behind a POS counter later.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Demian-Shop</span>
        <span class="item-role"> — product scraper</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/Demian-shop · 2025</span>
    </div>
    <div class="item-tech">Python · Layout analysis · Async crawling · JSON export</div>
    <ul class="item-desc">
      <li>Finds products by where they sit on the page, so it keeps working after a site gets redesigned.</li>
      <li>Output is clean JSON with price and stock already tidied up.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">MFC-ChatApp</span>
        <span class="item-role"> — desktop chat with a word filter</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321/MFC-ChatAppWithoutBadWord · 2024</span>
    </div>
    <div class="item-tech">C++ · MFC · Winsock sockets · Multi-threading</div>
    <ul class="item-desc">
      <li>Chat over raw sockets, with a blocked-word list per person that is checked before a message shows.</li>
      <li>Room manager sees every flagged message.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Portfolio Site</span>
        <span class="item-role"> — design and build</span>
      </div>
      <span class="item-meta">onlydev321.github.io · 2026</span>
    </div>
    <div class="item-tech">React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Three.js</div>
    <ul class="item-desc">
      <li>Built the whole site myself, from the design system in Figma to the deploy on GitHub Pages.</li>
      <li>Dark and light mode, a keyboard shortcut palette, and a reduced-motion fallback for accessibility.</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Smaller builds</span>
        <span class="item-role"> — MOJI, TrafficSafe, todoX, Figma-To-HTML</span>
      </div>
      <span class="item-meta">github.com/OnlyDev321 · 2024</span>
    </div>
    <div class="item-tech">React · Node.js · WebSockets · Arduino · JavaScript · Figma</div>
    <ul class="item-desc">
      <li>Real-time web chat, an Arduino crosswalk safety system, a customisable to-do app, and Figma-to-code practice.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Education</div>
  <div class="item">
    <div class="item-header">
      <div>
        <span class="item-title">Soongsil University (숭실대학교)</span>
        <span class="item-role"> — Seoul, South Korea</span>
      </div>
      <span class="item-meta">2023 – 2027</span>
    </div>
    <div class="note">
      <strong>BSc Software Engineering</strong> · Courses include web programming, HCI, UI/UX engineering, and software architecture.
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">How I Work</div>
  <p class="summary">
    Design first, then build, then test, then deploy. I write the spec so both sides agree on what to build, and I keep the code readable enough that the next person can pick it up. See <a href="https://onlydev321.github.io">onlydev321.github.io</a> for the full write-up.
  </p>
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
