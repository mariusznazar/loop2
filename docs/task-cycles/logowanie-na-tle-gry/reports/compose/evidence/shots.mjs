// One-off inspection of the login card on the picture of the game (not part of the product).
import { createRequire } from "node:module";
const require = createRequire("/opt/node-tools/node_modules/");
const { chromium } = require("playwright");
const [base, outDir] = process.argv.slice(2);
const browser = await chromium.launch();
const result = {};
async function shot(name, width, height, hash = "", act = null) {
  const context = await browser.newContext({ viewport: { width, height }, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const requests = [];
  page.on("response", (r) => { if (r.url().includes("/sprites/")) requests.push(`${r.status()} ${r.url()}`); });
  await page.goto(base + "/" + hash);
  await page.waitForSelector(".account-card");
  if (act) await act(page);
  await page.waitForTimeout(300);
  const info = await page.evaluate(() => {
    const screen = document.querySelector(".account-card-screen");
    const card = document.querySelector(".account-card");
    const cs = getComputedStyle(screen);
    const r = screen.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    return {
      screen: [r.left, r.top, r.width, r.height],
      card: [c.left, c.top, c.width, c.height],
      cardBackground: getComputedStyle(card).backgroundColor,
      backgroundImage: cs.backgroundImage,
      backgroundPosition: cs.backgroundPosition,
      backgroundSize: cs.backgroundSize,
      window: [innerWidth, innerHeight],
      docHeight: document.documentElement.scrollHeight,
      headerHidden: document.querySelector("header").hidden,
      texts: [...document.querySelectorAll("body *")]
        .filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
        .filter((e) => e.offsetParent !== null)
        .filter((e) => !e.closest(".account-card"))
        .map((e) => e.tagName + ":" + e.textContent.trim().slice(0, 40)),
    };
  });
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  result[name] = { ...info, requests };
  await context.close();
}
await shot("login-1280x720", 1280, 720);
await shot("login-1920x1080", 1920, 1080);
await shot("login-1280x1024", 1280, 1024);
await shot("login-2560x1440", 2560, 1440);
await shot("login-390x844", 390, 844);
await shot("register-1280x720", 1280, 720, "", async (p) => { await p.getByRole("button", { name: "Załóż konto" }).click(); });
await shot("forgotten-1280x720", 1280, 720, "", async (p) => { await p.getByRole("button", { name: "Nie pamiętam hasła" }).click(); });
await shot("reset-1280x720", 1280, 720, "#reset-password=anything");
await shot("credits-open-1280x720", 1280, 720, "", async (p) => { await p.locator(".account-card summary").click(); });
console.log(JSON.stringify(result, null, 1));
await browser.close();
