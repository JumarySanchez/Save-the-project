// Pre-renders every route into static HTML so crawlers that don't run JS can read the content.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";
import { getRoutePaths, getRouteMeta, getRouteSchemas, SITE_URL } from "../src/seo.js";

const DIST = path.resolve("dist");
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".json": "application/json" };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(DIST, urlPath);
  if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, "index.html");
  res.setHeader("Content-Type", MIME[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const esc = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const routes = getRoutePaths();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => (/tailwindcss|fonts/.test(r.request().url()) ? r.continue() : r.abort()));
  await page.goto(base + route, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForSelector("#root h1, #root h2", { timeout: 15000 });
  const body = await page.evaluate(() => {
    const root = document.getElementById("root").cloneNode(true);
    root.querySelectorAll("script,iframe,video,[id^='lc_'],[class*='lc_'],chat-widget").forEach((n) => n.remove());
    return root.innerHTML;
  });
  await page.close();

  const meta = getRouteMeta(route);
  const url = SITE_URL + (route === "/" ? "/" : route);
  const ld = getRouteSchemas(route).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n");
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`)
    .replace(/(name="description"\s+content=")[^"]*/s, `$1${esc(meta.description)}`)
    .replace(/(property="og:title" content=")[^"]*/, `$1${esc(meta.title)}`)
    .replace(/(property="og:description"\s+content=")[^"]*/s, `$1${esc(meta.description)}`)
    .replace(/(property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(name="twitter:title" content=")[^"]*/, `$1${esc(meta.title)}`)
    .replace(/(name="twitter:description"\s+content=")[^"]*/s, `$1${esc(meta.description)}`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<script type="application\/ld\+json">.*?<\/script>/s, ld)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const out = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log("prerendered", route);
}

const urls = routes.map((r) => `  <url><loc>${SITE_URL}${r === "/" ? "/" : r}</loc></url>`).join("\n");
fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await browser.close();
server.close();
