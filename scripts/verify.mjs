import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = 'http://localhost:4173/'
const OUT = 'd:/ReactJS/aashir-athar/.verify'
mkdirSync(OUT, { recursive: true })

const errors = []
const browser = await chromium.launch()

async function shot(name, { width, height, theme, fullPage = false, scrollTo }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme === 'dark' ? 'dark' : 'light',
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  page.on('console', m => { if (m.type() === 'error') errors.push(`[${name}] console.error: ${m.text()}`) })
  page.on('pageerror', e => errors.push(`[${name}] pageerror: ${e.message}`))
  // Force theme deterministically via localStorage before any script runs.
  await page.addInitScript(t => { try { localStorage.setItem('theme', t) } catch {} }, theme)
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  if (scrollTo) {
    await page.evaluate(id => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
    }, scrollTo)
    await page.waitForTimeout(900)
  }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage })
  // Quick sanity: is the hero wordmark present and is there horizontal overflow?
  const info = await page.evaluate(() => ({
    bodyText: (document.body.innerText || '').slice(0, 60),
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    hasHero: !!document.querySelector('.hero-name'),
    font: getComputedStyle(document.querySelector('.hero-name') || document.body).fontFamily,
  }))
  console.log(`${name}: hero=${info.hasHero} overflowX=${info.overflowX}px font="${info.font}" text="${info.bodyText.replace(/\n/g, ' ')}"`)
  await ctx.close()
}

// Desktop light — hero, then work intro, then contact (scrolled)
await shot('desktop-light-hero', { width: 1440, height: 900, theme: 'light' })
await shot('desktop-light-about', { width: 1440, height: 900, theme: 'light', scrollTo: 'about' })
await shot('desktop-light-work', { width: 1440, height: 900, theme: 'light', scrollTo: 'work' })
await shot('desktop-light-stack', { width: 1440, height: 900, theme: 'light', scrollTo: 'stack' })
await shot('desktop-light-experience', { width: 1440, height: 900, theme: 'light', scrollTo: 'experience' })
await shot('desktop-light-contact', { width: 1440, height: 900, theme: 'light', scrollTo: 'contact' })
// Desktop dark — hero
await shot('desktop-dark-hero', { width: 1440, height: 900, theme: 'dark' })
await shot('desktop-dark-work', { width: 1440, height: 900, theme: 'dark', scrollTo: 'work' })
// Mobile light — hero + work
await shot('mobile-light-hero', { width: 375, height: 812, theme: 'light' })
await shot('mobile-light-work', { width: 375, height: 812, theme: 'light', scrollTo: 'work' })
// XS 320 — overflow check
await shot('xs-light-hero', { width: 320, height: 700, theme: 'light' })

await browser.close()

console.log('\n=== CONSOLE / PAGE ERRORS ===')
console.log(errors.length ? errors.join('\n') : 'none')
