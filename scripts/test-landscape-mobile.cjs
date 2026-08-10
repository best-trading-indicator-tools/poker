#!/usr/bin/env node
/**
 * Landscape mobile layout regression (844×390).
 * Run: npm run test:landscape
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const EXTERNAL_BASE = process.argv[2] || '';
const VIEWPORT = { width: 844, height: 390 };

(async () => {
  let server=null;
  let base=EXTERNAL_BASE;
  if(!base){
    const root=path.resolve(__dirname,'..');
    server=http.createServer((req,res)=>{
      const rel=decodeURIComponent((req.url||'/').split('?')[0]);
      const file=path.resolve(root,'.'+(rel==='/'?'/poker.html':rel));
      if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
      fs.readFile(file,(err,data)=>{
        if(err){res.writeHead(404).end();return;}
        const ext=path.extname(file);
        const type=ext==='.html'?'text/html':ext==='.js'?'text/javascript':ext==='.json'?'application/json':ext==='.svg'?'image/svg+xml':'application/octet-stream';
        res.writeHead(200,{'Content-Type':type});res.end(data);
      });
    });
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    base=`http://127.0.0.1:${server.address().port}/poker.html`;
  }
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: VIEWPORT });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.check('#fourColorChk');
  const deckMetrics = await page.evaluate(() => {
    const probe=document.createElement('div');
    probe.innerHTML=[0,1,2,3].map(s=>cardHTML({r:14,s})).join('');
    document.body.appendChild(probe);
    const colors=[...probe.querySelectorAll('.card')].map(card=>getComputedStyle(card).color);
    probe.remove();
    const button=document.getElementById('deckBtn'),checkbox=document.getElementById('fourColorChk');
    return {
      colors,
      persisted:localStorage.getItem('sg_poker_four_color'),
      bodyClass:document.body.classList.contains('four-color'),
      checkbox:checkbox?.checked,
      buttonPressed:button?.getAttribute('aria-pressed'),
      pass:new Set(colors).size===4&&localStorage.getItem('sg_poker_four_color')==='1'&&
        document.body.classList.contains('four-color')&&checkbox?.checked&&button?.getAttribute('aria-pressed')==='true'
    };
  });
  await page.evaluate(() => { if (typeof updateOrient === 'function') updateOrient(); });
  await page.click('#startBtn');
  await page.waitForSelector('.seat.human .hole .card', { timeout: 10000 });
  await page.evaluate(() => {
    /* Keep the table-height assertion independent of who randomly acts first. */
    document.getElementById('humanCtls')?.classList.add('hidden');
    if (typeof updateOrient === 'function') updateOrient();
    if (typeof layoutSeats === 'function') layoutSeats();
  });
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
        mobile && lls && n === 6 && overlaps === 0 && centerOverlaps.length === 0 &&
        cardW >= 48 && namePx >= 13,
    };
  });

  const portraitPage = await browser.newPage({ viewport: { width: 960, height: 1100 } });
  await portraitPage.goto(base, { waitUntil: 'networkidle' });
  await portraitPage.click('#startBtn');
  await portraitPage.waitForSelector('.seat.human .hole .card', { timeout: 10000 });
  const portraitMetrics = await portraitPage.evaluate(() => {
    const actor=state.players[state.players.length-1];
    for(const p of state.players){p.bet=0;p.totalBet=0;p.folded=false;p.out=false;p.allIn=false;p.lastAct='';}
    state.stage='preflop';state.board=[];state.handOver=false;state.currentBet=state.bb;
    state.turnIdx=actor.i;actor.bet=state.bb;actor.totalBet=state.bb;actor.lastAct='Call '+usd(state.bb);
    render();layoutSeats();
    const felt=document.getElementById('felt'),seat=document.getElementById('seat'+actor.i),bet=document.getElementById('bet'+actor.i);
    const fr=felt.getBoundingClientRect(),sr=seat.getBoundingClientRect(),br=bet.getBoundingClientRect();
    const fc={x:fr.left+fr.width/2,y:fr.top+fr.height/2};
    const sc={x:sr.left+sr.width/2,y:sr.top+sr.height/2};
    const bc={x:br.left+br.width/2,y:br.top+br.height/2};
    const border=parseFloat(getComputedStyle(felt).borderLeftWidth)||0;
    const rx=fr.width*.48-border-br.width/2-6,ry=fr.height*.46-border-br.height/2-6;
    const ellipse=((bc.x-fc.x)**2)/(rx**2)+((bc.y-fc.y)**2)/(ry**2);
    const seatDistance=Math.hypot(sc.x-fc.x,sc.y-fc.y),betDistance=Math.hypot(bc.x-fc.x,bc.y-fc.y);
    return {ellipse,seatDistance,betDistance,visible:getComputedStyle(bet).visibility!=='hidden',
      pass:ellipse<=1.01&&betDistance<seatDistance&&getComputedStyle(bet).visibility!=='hidden'};
  });

  console.log(JSON.stringify({fourColorDeck:deckMetrics,landscape:metrics,halfScreenPortrait:portraitMetrics}, null, 2));
  await page.screenshot({ path: '/tmp/poker-landscape-mobile.png' });
  await portraitPage.close();
  await browser.close();
  if(server)await new Promise(resolve=>server.close(resolve));
  process.exit(deckMetrics.pass&&metrics.pass&&portraitMetrics.pass ? 0 : 1);
})();
