// Baut den Hero-Teaser: Einzelbilder per Playwright, dann ffmpeg → assets/video/hero-teaser.mp4 + hero-poster.jpg
const { chromium } = require('/Users/martinkrutzfeld/dev/active-projects/durager/node_modules/playwright-core');
const path = require('path'), fs = require('fs'), { execSync } = require('child_process');
const R = path.resolve(__dirname, '..');
const FPS = 24, OUT = process.argv[2] || '/tmp/teaser-frames';
(async () => {
  fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(R, 'video', 'teaser.html'));
  await page.evaluate(() => document.fonts.ready);
  const D = await page.evaluate(() => window.DAUER);
  const n = Math.round(D * FPS);
  const stage = await page.$('#stage');
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => window.render(t), i / FPS);
    await stage.screenshot({ path: path.join(OUT, 'f' + String(i).padStart(4, '0') + '.png') });
  }
  // Poster: Bild bei 14,5 s (die 7-Tage-Zeile)
  await page.evaluate(t => window.render(t), 14.5);
  await stage.screenshot({ path: path.join(R, 'assets', 'video', 'hero-poster.jpg'), type: 'jpeg', quality: 86 });
  await browser.close();
  const mp4 = path.join(R, 'assets', 'video', 'hero-teaser.mp4');
  execSync(`ffmpeg -y -hide_banner -loglevel error -framerate ${FPS} -i "${OUT}/f%04d.png" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart -an "${mp4}"`);
  console.log('frames', n, '| mp4', (fs.statSync(mp4).size / 1024).toFixed(0) + ' KB', '| poster', (fs.statSync(path.join(R, 'assets', 'video', 'hero-poster.jpg')).size / 1024).toFixed(0) + ' KB');
})().catch(e => { console.error(e); process.exit(1); });
