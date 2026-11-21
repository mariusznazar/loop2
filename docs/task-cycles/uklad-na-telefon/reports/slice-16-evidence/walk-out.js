async (page) => {
  const BASE = "https://127.0.0.1:52683/";
  const DIR = ".runs/slice-16/shots";
  const width = page.viewportSize().width;
  const tag = `w${width}`;
  const touch = (await page.evaluate(() => navigator.maxTouchPoints)) > 0;
  const hit = (loc) => (touch ? loc.tap() : loc.click());
  const min = 48;
  const measure = () =>
    page.evaluate((min) => {
      const root = document.documentElement;
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && el.checkVisibility({ visibilityProperty: true });
      };
      const name = (el) =>
        `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).trim().split(/\s+/)[0] : ""} "${(el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40)}"`;
      const all = [...document.body.querySelectorAll("*")].filter(visible);
      const crossing = all
        .filter((el) => el.clientWidth > 0 && el.scrollWidth > el.clientWidth)
        .map((el) => `${name(el)} content ${el.scrollWidth} > box ${el.clientWidth}`);
      const outside = all
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > root.clientWidth + 0.5 || r.left < -0.5;
        })
        .map((el) => `${name(el)} spans ${Math.round(el.getBoundingClientRect().left)}..${Math.round(el.getBoundingClientRect().right)}`);
      const controls = "button, a[href], input, select, textarea, summary, [role=button], [role=menuitem], [role=tab], [tabindex]:not([tabindex='-1'])";
      const small = [...document.querySelectorAll(controls)]
        .filter(visible)
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width < min || r.height < min;
        })
        .map((el) => {
          const r = el.getBoundingClientRect();
          return `${name(el)} ${Math.round(r.width * 10) / 10} x ${Math.round(r.height * 10) / 10}`;
        });
      const out = { page: `${innerWidth}x${innerHeight}`, side: root.scrollWidth > root.clientWidth };
      if (innerWidth < 1280) {
        if (crossing.length) out.crossing = crossing;
        if (outside.length) out.outside = outside;
        if (small.length) out.small = small;
      }
      return out;
    }, min);
  const results = {};
  const snap = async (state) => {
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${DIR}${tag}-${state}.png`, fullPage: true });
    results[state] = await measure();
  };
  const fresh = async (url = BASE) => {
    await page.goto("about:blank");
    await page.goto(url);
    await page.waitForLoadState("networkidle");
  };

  // The login card.
  await fresh();
  await page.evaluate(() => fetch("/api/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }));
  await fresh();
  await page.getByRole("button", { name: "Zaloguj się" }).first().waitFor();
  await snap("01-login");
  await hit(page.getByText("Autorzy grafiki"));
  await snap("02-login-credits");
  // Refusal under the login form.
  await page.getByLabel("Adres e-mail").fill("nikt@example.test");
  await page.getByLabel("Hasło").fill("zle-haslo-123456");
  await hit(page.locator("form button[type=submit]"));
  await page.getByText(/Nieprawidłowy|nieprawidłowe|Nie udało|Błędny/).first().waitFor({ timeout: 5000 }).catch(() => {});
  await snap("03-login-refusal");
  // Sign-up tab.
  await fresh();
  await hit(page.locator(".account-card-switch").getByRole("button", { name: "Załóż konto" }));
  await snap("04-signup");
  // Sign-up refusal (short password).
  await page.getByLabel("Adres e-mail").fill("zly");
  await hit(page.locator("form button[type=submit]"));
  await snap("05-signup-error");
  // Forgot password.
  await fresh();
  await hit(page.getByRole("button", { name: "Nie pamiętam hasła" }));
  await snap("06-forgot");
  await page.getByLabel("Adres e-mail").fill("nikt@example.test");
  await hit(page.locator("form button[type=submit]"));
  await page.waitForTimeout(800);
  await snap("07-forgot-answer");
  // Set new password.
  await fresh(BASE + "#reset-password=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  await page.getByRole("heading", { name: "Ustaw nowe hasło" }).waitFor();
  await snap("08-reset");
  await page.getByLabel("Nowe hasło", { exact: true }).fill("nowe-haslo-12345");
  await page.getByLabel("Powtórz hasło").fill("inne-haslo-12345");
  await hit(page.locator("form button[type=submit]"));
  await page.waitForTimeout(800);
  await snap("09-reset-error");

  // Waiting screens: the answer of the account request delayed, refused.
  await page.route("**/api/account", () => {});
  await page.goto("about:blank");
  await page.goto(BASE);
  await page.getByText("Sprawdzanie logowania…").waitFor();
  await snap("10-waiting-asking");
  await page.unroute("**/api/account");
  await page.route("**/api/account", (route) => route.abort());
  await page.goto("about:blank");
  await page.goto(BASE);
  await page.getByRole("button", { name: "Spróbuj ponownie" }).waitFor();
  await snap("11-waiting-refused");
  await page.unroute("**/api/account");
  await page.route("**/api/email-confirmation", () => {});
  await page.goto("about:blank");
  await page.goto(BASE + "#confirm-email=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  await page.getByText("Potwierdzanie adresu…").waitFor();
  await snap("12-waiting-confirm");
  await page.unroute("**/api/email-confirmation");
  return results;
}
