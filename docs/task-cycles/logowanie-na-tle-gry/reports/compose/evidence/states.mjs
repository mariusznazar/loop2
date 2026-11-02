// One-off inspection: where the picture stands and where it does not (not part of the product).
import { createRequire } from "node:module";
const require = createRequire("/opt/node-tools/node_modules/");
const { chromium } = require("playwright");
const [base, outDir] = process.argv.slice(2);
const browser = await chromium.launch();
const out = {};
async function look(page, name) {
  await page.waitForTimeout(300);
  out[name] = await page.evaluate(() => {
    const screen = document.querySelector(".account-card-screen");
    const withPicture = [...document.querySelectorAll("body, body *")].filter(
      (e) => getComputedStyle(e).backgroundImage !== "none").map((e) => e.className || e.tagName);
    return {
      card: screen !== null,
      withPicture,
      notice: document.querySelector(".confirmation-notice")?.textContent ?? null,
      noticeInCard: document.querySelector(".account-card .confirmation-notice") !== null,
      visibleText: document.body.innerText.slice(0, 160),
    };
  });
  await page.screenshot({ path: `${outDir}/${name}.png` });
}
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, ignoreHTTPSErrors: true });
const page = await context.newPage();
// The session check held for 1.5 s, so its waiting screen can be seen.
let hold = true;
await page.route("**/api/account", async (route) => {
  if (hold) await new Promise((r) => setTimeout(r, 1500));
  await route.continue();
});
await page.goto(base + "/");
await look(page, "waiting-session-check");
await page.waitForSelector(".account-card");
hold = false;
// A refused reset link for a signed-out visitor: the sentence in the card, on the picture.
await page.goto(base + "/#reset-password=not-a-token");
await page.waitForSelector(".account-card");
await page.reload();
await page.waitForSelector(".account-card h2");
await page.getByLabel("Nowe hasło").fill("correct horse battery");
await page.getByLabel("Powtórz hasło").fill("correct horse battery");
await page.getByRole("button", { name: "Ustaw hasło" }).click();
await page.waitForSelector(".account-card .confirmation-notice");
await look(page, "refused-link-signed-out");
// The sentence stays at a switch (D-261).
await page.getByRole("button", { name: "Załóż konto" }).first().click();
await look(page, "refused-link-after-switch");
// Register: the game, without the picture.
await page.getByLabel("Adres e-mail").fill(`agent-${Date.now()}@example.test`);
await page.getByLabel("Hasło", { exact: true }).fill("correct horse battery");
await page.getByLabel("Powtórz hasło").fill("correct horse battery");
await page.locator(".account-form").getByRole("button", { name: "Załóż konto" }).click();
await page.waitForSelector("header button:not([hidden])");
await look(page, "game-signed-in");
// A signed-in player opening a reset link: the card on the picture.
await page.goto(base + "/#reset-password=anything");
await page.reload();
await page.waitForSelector(".account-card h2");
await look(page, "reset-signed-in");
// The refusal for a signed-in player: the sentence above the game, no picture.
await page.getByLabel("Nowe hasło").fill("correct horse battery");
await page.getByLabel("Powtórz hasło").fill("correct horse battery");
await page.getByRole("button", { name: "Ustaw hasło" }).click();
await page.waitForSelector("header button:not([hidden])");
await look(page, "refused-link-signed-in");
// Confirmation link: „Potwierdzanie adresu…” waiting screen, no picture.
await page.route("**/api/email-confirmation", async (route) => {
  await new Promise((r) => setTimeout(r, 1500));
  await route.continue();
});
await page.goto(base + "/#confirm-email=not-a-token");
await page.reload();
await page.waitForSelector(".session-check-text:not([hidden])");
await look(page, "waiting-confirmation");
// Retry warning: the account request fails at the network.
await page.unroute("**/api/account");
await page.route("**/api/account", (route) => route.abort());
await page.goto(base + "/");
await page.reload();
await page.waitForSelector("text=Spróbuj ponownie");
await look(page, "waiting-retry-warning");
console.log(JSON.stringify(out, null, 1));
await browser.close();
