async (page) => {
  const BASE = "https://127.0.0.1:52683/";
  const DIR = ".runs/slice-16/shots";
  const PASSWORD = "Haslo-testowe-12345";
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
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${DIR}${tag}-${state}.png`, fullPage: true });
    results[state] = await measure();
  };
  const signIn = async (email) => {
    await page.goto("about:blank");
    await page.goto(BASE);
    await page.getByLabel("Adres e-mail").fill(email);
    await page.getByLabel("Hasło").fill(PASSWORD);
    await hit(page.locator("form button[type=submit]"));
    await page.getByRole("link", { name: "Siedziba", exact: true }).waitFor();
  };
  const signOut = async () => {
    await page.evaluate(() => fetch("/api/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }));
  };

  // The owner: bar, menu, owner panel.
  await page.goto("about:blank");
  await page.goto(BASE);
  await page.waitForLoadState("networkidle");
  await signOut();
  await signIn("owner@example.test");
  await snap("20-bar");
  await hit(page.getByRole("button", { name: "Konto", exact: true }));
  await snap("21-menu-owner");
  await hit(page.getByRole("button", { name: "Wyślij ponownie" }));
  await page.waitForTimeout(1500);
  await snap("22-menu-resent");
  await hit(page.getByRole("link", { name: "Panel właściciela" }));
  await page.getByRole("heading", { name: "Panel właściciela" }).waitFor();
  await page.getByRole("list", { name: "Konta" }).waitFor();
  await snap("23-accounts-list");
  // Confirmation of „Zablokuj”.
  await hit(page.getByRole("button", { name: /^Zablokuj: gracz\.dlugi/ }));
  await snap("24-accounts-confirm");
  await hit(page.getByRole("button", { name: /^Wróć: gracz\.dlugi/ }));
  // The list while read and when it failed.
  await page.route("**/api/owner/accounts", () => {});
  await page.reload();
  await page.getByText("Wczytywanie listy kont…").waitFor();
  await snap("25-accounts-loading");
  await page.unroute("**/api/owner/accounts");
  await page.route("**/api/owner/accounts", (route) => route.abort());
  await page.reload();
  await page.getByRole("button", { name: "Spróbuj ponownie" }).waitFor();
  await snap("26-accounts-failed");
  await page.unroute("**/api/owner/accounts");
  // An action waiting for the server.
  await page.reload();
  await page.getByRole("list", { name: "Konta" }).waitFor();
  await page.route("**/api/owner/grant-previous-save", () => {});
  await hit(page.getByRole("button", { name: /^Nadaj uprawnienie do poprzedniego zapisu: gracz\.dlugi/ }));
  await snap("27-accounts-waiting");
  await page.unroute("**/api/owner/grant-previous-save");
  // A refusal of an operation.
  await page.reload();
  await page.getByRole("list", { name: "Konta" }).waitFor();
  await page.route("**/api/owner/unblock", (route) => route.abort());
  await hit(page.getByRole("button", { name: /^Odblokuj: blokada@/ }));
  await page.waitForTimeout(1200);
  await snap("28-accounts-operation-failed");
  await page.unroute("**/api/owner/unblock");

  // A player with a long address: the menu.
  await signOut();
  await signIn("gracz.dlugi.adres.bez.spacji.do.sprawdzenia.lamania@example.test");
  await hit(page.getByRole("button", { name: "Konto", exact: true }));
  await snap("29-menu-player-long");
  return results;
}
