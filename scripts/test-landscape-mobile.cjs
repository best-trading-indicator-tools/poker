#!/usr/bin/env node
/**
 * Landscape mobile layout regression (844×390).
 * Run: npm run test:landscape
 */
const { chromium } = require('playwright');

const BASE = process.argv[2] || 'http://127.0.0.1:8123/poker.html';
const VIEWPORT = { width: 844, height: 390 };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: VIEWPORT });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => { if (typeof updateOrient === 'function') updateOrient(); });
  await page.click('#startBtn');
  await page.waitForSelector('.seat.human .hole .card', { timeout: 10000 });
  await page.evaluate(() => { if (typeof updateOrient === 'function') updateOrient(); if (typeof layoutSeats === 'function') layoutSeats(); });
  await page.waitForTimeout(200);

  const metrics = await page.evaluate(() => {
    const felt = document.getElementById('felt');
    const W = felt?.clientWidth ?? 0;
    const H = felt?.clientHeight ?? 0;
    const n = state?.players?.length ?? 0;
    const overlaps = typeof countLayoutOverlaps === 'function' ? countLayoutOverlaps(1) : -1;
    const card = document.querySelector('.seat.human .hole .card');
    const cardW = card?.getBoundingClientRect().width ?? 0;
    const pname = document.querySelector('.pname');
    const namePx = pname ? parseFloat(getComputedStyle(pname).fontSize) : 0;
    const seatScale = felt ? getComputedStyle(felt).getPropertyValue('--seatScale').trim() : '';
    const lls = document.body.classList.contains('lls');
    const mobile = typeof isMobile === 'function' && isMobile();
    const center = document.getElementById('centerArea');
    const cz = typeof centerRectDOM === 'function' ? centerRectDOM(center) : null;
    let centerOverlaps = [];
    if (cz) {
      let topT = Infinity;
      for (const p of state.players) {
        if (p.isHuman) continue;
        const s = document.getElementById('seat' + p.i);
        if (!s?.offsetHeight) continue;
        const sr = elementRectSeatLayout(s);
        if (sr.t < topT) topT = sr.t;
      }
      for (const p of state.players) {
        const s = document.getElementById('seat' + p.i);
        if (!s?.offsetHeight) continue;
        const sr = elementRectSeatLayout(s);
        if (!p.isHuman && sr.t > topT + 2) continue;
        const ox = Math.min(sr.r, cz.r) - Math.max(sr.l, cz.l);
        const oy = Math.min(sr.b, cz.b) - Math.max(sr.t, cz.t);
        if (ox > 1 && oy > 1) centerOverlaps.push(p.name);
      }
    }
    return {
      W, H, n, overlaps, centerOverlaps, cardW, namePx, seatScale, lls, mobile,
      pass:
        mobile && lls && n === 9 && overlaps === 0 && centerOverlaps.length === 0 &&
        cardW >= 48 && namePx >= 13,
    };
  });

  console.log(JSON.stringify(metrics, null, 2));
  await page.screenshot({ path: '/tmp/poker-landscape-mobile.png' });
  await browser.close();
  process.exit(metrics.pass ? 0 : 1);
})();
