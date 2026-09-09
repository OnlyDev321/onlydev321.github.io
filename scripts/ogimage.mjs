import { chromium } from 'playwright'

/* Renders the 1200x630 social/OG card to public/og-preview.png using the
 * site's self-hosted brand fonts. PNG (not SVG) so Facebook, LinkedIn, X,
 * Slack, Discord and AI scrapers all render it. */

const FONT = f => `file:///D:/ReactJS/aashir-athar/public/fonts/${f}`

const html = `<!doctype html><html><head><meta charset="utf8"><style>
@font-face{font-family:Bricolage;src:url('${FONT('bricolage.woff2')}') format('woff2');font-weight:200 800}
@font-face{font-family:Geist;src:url('${FONT('geist.woff2')}') format('woff2');font-weight:100 900}
@font-face{font-family:GeistMono;src:url('${FONT('geist-mono.woff2')}') format('woff2')}
@font-face{font-family:Instrument;src:url('${FONT('instrument-serif-italic.woff2')}') format('woff2');font-style:italic}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#f7f8fb;color:#0c1322;font-family:Geist;position:relative;overflow:hidden;padding:74px 84px;display:flex;flex-direction:column;justify-content:space-between}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(13,21,38,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(13,21,38,.05) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse at 78% 26%,#000,transparent 68%)}
.glow{position:absolute;top:-140px;right:-90px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(10,127,163,.20),transparent 64%);filter:blur(36px)}
.kicker{font-family:GeistMono;font-size:21px;letter-spacing:.16em;text-transform:uppercase;color:#586585;position:relative}
.name{font-family:Bricolage;font-weight:800;font-size:152px;line-height:.9;letter-spacing:-.045em;position:relative;margin-top:16px}
.it{font-family:Instrument;font-style:italic;font-weight:400}
.dot{color:#0a7fa3}
.sub{font-size:31px;line-height:1.4;color:#475067;max-width:900px;position:relative;margin-top:26px}
.foot{display:flex;justify-content:space-between;align-items:flex-end;position:relative;font-family:GeistMono;font-size:23px;color:#586585}
.foot b{color:#9a4a06}
.url{color:#0a7fa3}
</style></head><body>
<div class="grid"></div><div class="glow"></div>
<div>
  <div class="kicker">Full-Stack Engineer &amp; UX/UI Designer &middot; Seoul, South Korea</div>
  <div class="name">Tran Hau <span class="it">(김진호)</span><span class="it dot">.</span></div>
  <div class="sub">Software Engineering at Soongsil University. Bridging Vietnam and South Korea through AI-driven web systems, mobile apps, and refined UI craft.</div>
</div>
<div class="foot">
  <div><b>8</b> open-source projects &nbsp;&middot;&nbsp; <b>6</b> languages &nbsp;&middot;&nbsp; <b>3+</b> AI &amp; systems</div>
  <div class="url">onlydev321.github.io</div>
</div>
</body></html>`

const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
const p = await ctx.newPage()
await p.setContent(html, { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
await p.waitForTimeout(300)
await p.screenshot({ path: 'public/og-preview.png' })
await b.close()
console.log('og-preview.png written')
