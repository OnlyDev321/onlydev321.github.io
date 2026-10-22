import { chromium } from "playwright";
import { resolve } from "path";
import fs from "fs";

// Read and convert avatar to Base64 for seamless embedding in Playwright PDF
const avatarBase64 = fs
  .readFileSync(resolve("src/assets/avatar.JPG"))
  .toString("base64");
const avatarSrc = `data:image/jpeg;base64,${avatarBase64}`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>TRAN HAU (김진호) — Resume</title>
<style>
  @page {
    size: A4;
    margin: 9mm 12mm;
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
    color: #1e293b;
    background: #ffffff;
    font-size: 8.9pt;
    line-height: 1.45;
  }
  a {
    color: #0284c7;
    text-decoration: none;
    font-weight: 500;
  }
  a:hover {
    text-decoration: underline;
  }

  /* Header with Avatar */
  .header {
    border-bottom: 2pt solid #0284c7;
    padding-bottom: 6px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .avatar-wrap {
    flex-shrink: 0;
    width: 66px;
    height: 84px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .header-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .name-block h1 {
    font-size: 17pt;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #0f172a;
    line-height: 1.15;
  }
  .name-block h1 span {
    font-size: 10.5pt;
    font-weight: 600;
    color: #64748b;
    margin-left: 5px;
  }
  .name-block .title {
    font-size: 9.2pt;
    font-weight: 700;
    color: #0284c7;
    margin-top: 2px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .contact-block {
    text-align: right;
    font-size: 8.1pt;
    color: #475569;
    line-height: 1.48;
  }

  /* Section Styling */
  .section {
    margin-bottom: 5px;
  }
  .section-title {
    font-size: 9.2pt;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #0f172a;
    border-bottom: 1pt solid #cbd5e1;
    padding-bottom: 1.5px;
    margin-bottom: 3.5px;
    display: flex;
    align-items: center;
    break-after: avoid;
    page-break-after: avoid;
  }
  .section-title::before {
    content: "";
    display: inline-block;
    width: 3.5px;
    height: 9.5px;
    background: #0284c7;
    margin-right: 5px;
    border-radius: 1px;
  }

  .summary {
    color: #334155;
    font-size: 8.3pt;
    line-height: 1.38;
  }

  /* Education & Awards item protection */
  .edu-item, .award-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .edu-item {
    margin-bottom: 2.5px;
  }
  .edu-item:last-child {
    margin-bottom: 0;
  }
  .edu-row-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
    color: #0f172a;
    font-size: 8.8pt;
  }
  .edu-row-sub {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.2pt;
    color: #475569;
    margin-top: 0.5px;
  }
  .edu-badge {
    color: #0284c7;
    font-weight: 600;
  }
  .meta-date {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 7.9pt;
    color: #64748b;
    white-space: nowrap;
  }

  /* Honors & Awards */
  .award-item {
    margin-bottom: 2px;
  }
  .award-item:last-child {
    margin-bottom: 0;
  }
  .award-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.6pt;
    color: #0f172a;
  }
  .award-name strong {
    color: #0284c7;
    font-weight: 700;
  }
  .award-sub {
    font-size: 7.8pt;
    color: #64748b;
    margin-top: 0.5px;
  }
  .reward-link {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 7.6pt;
    font-weight: 600;
    color: #0284c7;
    border: 1px solid #bae6fd;
    background: #f0f9ff;
    padding: 1px 5px;
    border-radius: 3px;
    transition: all 0.2s;
  }
  .reward-link:hover {
    background: #0284c7;
    color: #ffffff;
    text-decoration: none;
  }

  /* Project Item */
  .project-item {
    margin-bottom: 3.5px;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .project-item:last-child {
    margin-bottom: 0;
  }
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .project-name {
    font-size: 8.9pt;
    font-weight: 700;
    color: #0f172a;
  }
  .project-role {
    font-size: 8.1pt;
    font-weight: 600;
    color: #0284c7;
  }
  .project-tech {
    font-size: 7.6pt;
    color: #0369a1;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    margin-top: 0.5px;
    margin-bottom: 1px;
  }
  .project-desc {
    list-style-type: square;
    padding-left: 13px;
    color: #334155;
    font-size: 8.1pt;
    line-height: 1.34;
  }
  .project-desc li {
    margin-bottom: 0.5px;
  }
  .project-desc li::marker {
    color: #0284c7;
    font-size: 5.5pt;
  }
  .project-links {
    margin-top: 1px;
    font-size: 7.8pt;
    color: #64748b;
  }
  .project-links a {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }
  .project-links .sep {
    margin: 0 5px;
    color: #cbd5e1;
  }

  /* Skills & Languages Grid */
  .skills-table {
    width: 100%;
    font-size: 8.4pt;
    border-collapse: collapse;
  }
  .skills-table td {
    padding: 1.5px 0;
    vertical-align: top;
  }
  .skills-table .cat {
    font-weight: 700;
    color: #1e293b;
    width: 130px;
    white-space: nowrap;
  }
  .skills-table .val {
    color: #475569;
  }
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="avatar-wrap">
    <img src="${avatarSrc}" alt="Avatar" class="avatar-img" />
  </div>
  <div class="header-content">
    <div class="name-block">
      <h1>TRAN HAU <span>(김진호)</span></h1>
      <div class="title">Software Engineer &amp; BrSE</div>
    </div>
    <div class="contact-block">
      <div>Seoul, South Korea (Soongsil University)</div>
      <div>Email: <a href="mailto:onlydev.321@gmail.com">onlydev.321@gmail.com</a></div>
      <div>Portfolio: <a href="https://onlydev321.github.io">onlydev321.github.io</a></div>
      <div>GitHub: <a href="https://github.com/OnlyDev321">github.com/OnlyDev321</a></div>
    </div>
  </div>
</div>

<!-- About Me -->
<div class="section">
  <div class="section-title">About Me</div>
  <p class="summary">
    Software Engineering student at <strong>Soongsil University</strong> in Seoul with a strong foundation in full-stack web development. Experienced in building practical web applications using <strong>React</strong>, <strong>Spring Boot</strong>, and <strong>Node.js</strong>. Native in <strong>Vietnamese</strong> and fluent in <strong>Korean (TOPIK Level 5)</strong>, Eager to learn and use my software skills in real projects as a Full-Stack Developer or BrSE.
  </p>
</div>

<!-- Education -->
<div class="section">
  <div class="section-title">Education</div>
  <div class="edu-item">
    <div class="edu-row-top">
      <span>• Soongsil University — Software Engineering</span>
      <span>Seoul, South Korea</span>
    </div>
    <div class="edu-row-sub">
      <span>BSc Program · <strong class="edu-badge">GPA: 3.8 / 4.5</strong></span>
      <span class="meta-date">Mar 2023 – Mar 2027(Expected)</span>
    </div>
  </div>
  <div class="edu-item">
    <div class="edu-row-top">
      <span>• Seoul National University — Korean Language Program</span>
      <span>Seoul, South Korea</span>
    </div>
    <div class="edu-row-sub">
      <span>2-Year Full-Time Korean Language Training · <strong class="edu-badge">TOPIK Level 5</strong></span>
      <span class="meta-date">Mar 2021 – Feb 2023</span>
    </div>
  </div>
</div>

<!-- Honors & Awards -->
<div class="section">
  <div class="section-title">Honors &amp; Awards</div>


   <div class="award-item">
    <div class="award-row">
      <span class="award-name">• Capstone Design Exhibition &amp; Competition — <strong>Silver Award</strong></span>
      <span><a href="https://drive.google.com/file/d/12xN4hSJNioMsMj6GasDYWtrXtzI-udNy/view?usp=sharing" target="_blank" class="reward-link">Reward ↗</a></span>
    </div>
    <div class="award-sub">Soongsil University</div>
  </div>

  <div class="award-item">
    <div class="award-row">
      <span class="award-name">• Creative Engineering Design Competition — <strong>Encouragement Award</strong></span>
      <span><a href="https://drive.google.com/file/d/1CiZMEgxf0X1etHOtpRNGfKiPKyQCEfDp/view?usp=sharing" target="_blank" class="reward-link">Reward ↗</a></span>
    </div>
    <div class="award-sub">Soongsil University</div>
  </div>

  <div class="award-item">
    <div class="award-row">
      <span class="award-name">• Korean Language Training Certificate — <strong>TOPIK Level 5</strong></span>
      <span><a href="https://drive.google.com/file/d/13mtINXR8kFavMt-cp7zj3X_9ZzGB2ldQ/view?usp=sharing" target="_blank" class="reward-link">Reward ↗</a></span>
    </div>
    <div class="award-sub">Seoul National University Institute</div>
  </div>
</div>

<!-- Projects (6 Projects in Chronological Order) -->
<div class="section">
  <div class="section-title">Featured Projects</div>

  <!-- 1. CampusMatch -->
  <div class="project-item">
    <div class="project-header">
      <div>
        <span class="project-name">• CampusMatch</span>
        <span class="project-role"> — University Study &amp; Team Matching Platform</span>
      </div>
      <span class="meta-date">2026</span>
    </div>
    <div class="project-tech">Next.js · React · TypeScript · Tailwind CSS · Spring Boot · PostgreSQL</div>
    <ul class="project-desc">
      <li>Web platform connecting students for course study and project teams with student SSO verification.</li>
      <li>Implemented academic filters (major, year), role quotas (FE/BE/Design), and real-time application dashboard.</li>
    </ul>
    <div class="project-links">
      Link: <a href="https://github.com/OnlyDev321/campus-match" target="_blank">GitHub Repo</a>
    </div>
  </div>

  <!-- 2. Wumpus World -->
  <div class="project-item">
    <div class="project-header">
      <div>
        <span class="project-name">• Wumpus World</span>
        <span class="project-role"> — Knowledge-Based AI Agent Simulation</span>
      </div>
      <span class="meta-date">2026</span>
    </div>
    <div class="project-tech">Python · Pygame · BFS</div>
    <ul class="project-desc">
      <li>Built an autonomous agent that collects percepts (stench, breeze, glitter) to navigate hazards using propositional logic.</li>
      <li>Implemented safe BFS pathfinding and rendered an interactive 2D Pygame game interface with a real-time reasoning HUD.</li>
    </ul>
    <div class="project-links">
      Link: <a href="https://github.com/OnlyDev321/wumpus-world" target="_blank">GitHub Repo</a>
    </div>
  </div>

  <!-- 3. MMDL -->
  <div class="project-item">
    <div class="project-header">
      <div>
        <span class="project-name">• MMDL</span>
        <span class="project-role"> — Multimodal LLM Reasoning Benchmark Research</span>
      </div>
      <span class="meta-date">2026</span>
    </div>
    <div class="project-tech">Python · PyTorch · Qwen-VL · Deep Learning</div>
    <ul class="project-desc">
      <li>Fine-tuned Qwen-VL vision-language models on college-level reasoning benchmarks (MMMU &amp; MMMU-Pro).</li>
      <li>Automated evaluation pipeline for model generation, strict rule-based scoring, and error pattern analysis.</li>
    </ul>
    <div class="project-links">
      Link: <a href="https://github.com/fijitlwkr/MMDL" target="_blank">GitHub Repo</a>
    </div>
  </div>

  <!-- 4. Deepterview v2 -->
  <div class="project-item">
    <div class="project-header">
      <div>
        <span class="project-name">• Deepterview v2</span>
        <span class="project-role"> — AI Video Interview &amp; Behavioral Analysis</span>
      </div>
      <span class="meta-date">2026</span>
    </div>
    <div class="project-tech">React · TypeScript · Node.js · Tailwind CSS · Computer Vision</div>
    <ul class="project-desc">
      <li>Web application analyzing candidate webcam video to track facial expressions, focus levels, and emotional cues.</li>
      <li>Built webcam recording interface and interactive visual timeline feedback reports to summarize candidate responses.</li>
    </ul>
    <div class="project-links">
      Link: <a href="https://github.com/OnlyDev321/deepterview-v2" target="_blank">GitHub Repo</a>
    </div>
  </div>

  <!-- 5. MOJI Chat -->
  <div class="project-item">
    <div class="project-header">
      <div>
        <span class="project-name">• MOJI Chat</span>
        <span class="project-role"> — Real-Time Collaborative Messaging App</span>
      </div>
      <span class="meta-date">2025</span>
    </div>
    <div class="project-tech">React · TypeScript · Node.js · WebSocket · Tailwind CSS</div>
    <ul class="project-desc">
      <li>Real-time chat web app supporting live messaging, user presence status, and typing indicators via WebSockets.</li>
      <li>Engineered auto-reconnect logic upon network interruptions with an ergonomic, responsive interface.</li>
    </ul>
    <div class="project-links">
      Links: <a href="https://moji-frontend.vercel.app/" target="_blank">Live Demo</a><span class="sep">|</span><a href="https://github.com/OnlyDev321/MOJI" target="_blank">GitHub Repo</a>
    </div>
  </div>
</div>

 <!-- 6. todoX -->
  <div class="project-item">
    <div class="project-header">
      <div>
        <span class="project-name">• todoX</span>
        <span class="project-role"> — Minimalist Task &amp; Productivity Web App</span>
      </div>
      <span class="meta-date">2025</span>
    </div>
    <div class="project-tech">JavaScript · HTML · CSS · LocalStorage</div>
    <ul class="project-desc">
      <li>Lightweight task tracker with custom theme palettes, real-time tag search, and completion status filtering.</li>
      <li>Stores data directly in browser LocalStorage for instant, zero-login offline usage and fast responsiveness.</li>
    </ul>
    <div class="project-links">
      Links: <a href="https://todox-jo2t.onrender.com/" target="_blank">Live Demo</a><span class="sep">|</span><a href="https://github.com/OnlyDev321/todoX" target="_blank">GitHub Repo</a>
    </div>
  </div>

<!-- Skills & Languages -->
<div class="section">
  <div class="section-title">Technical Skills &amp; Languages</div>
  <table class="skills-table">
    <tr>
      <td class="cat">Languages:</td>
      <td class="val">JavaScript, TypeScript, Java, C</td>
    </tr>
    <tr>
      <td class="cat">Web &amp; Backend:</td>
      <td class="val">React, Node.js, Spring Boot, Tailwind CSS</td>
    </tr>
    <tr>
      <td class="cat">Databases &amp; Tools:</td>
      <td class="val">SQL, Git, Docker, Figma</td>
    </tr>
    <tr>
      <td class="cat">Languages:</td>
      <td class="val"><strong>Vietnamese</strong> (Native), <strong>Korean</strong> (Fluent, TOPIK Level 5), <strong>English</strong> (Working proficiency)</td>
    </tr>
  </table>
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
      top: "5mm",
      bottom: "5mm",
      left: "8mm",
      right: "8mm",
    },
  });
  await browser.close();
  console.log("✅ Generated public/resume.pdf successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
