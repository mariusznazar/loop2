async (page) => {
  // Phone: resumes at 1×, pauses by a tap as soon as the blow's marker shows, so that it stands; returns
  // where the text stands against the bar and the cells.
  await page.getByRole("button", { name: "1×", exact: true }).tap();
  await page.getByRole("button", { name: "Wznów", exact: true }).tap();
  await page.waitForSelector(".body-blow-text", { timeout: 20000 });
  await page.getByRole("button", { name: "Pauza", exact: true }).tap();
  await page.evaluate(() => document.querySelector(".body-row").scrollIntoView({ block: "center" }));
  const r = (s) => page.evaluate((s) => { const b = document.querySelector(s)?.getBoundingClientRect(); return b ? [Math.round(b.left), Math.round(b.top * 10) / 10, Math.round(b.right), Math.round(b.bottom * 10) / 10] : null; }, s);
  return JSON.stringify({ text: await r(".body-blow-text"), bar: await r(".value-cell-static .value-cell-bar"), cell: await r(".value-cell-static"), opacity: await page.evaluate(() => getComputedStyle(document.querySelector(".body-blow-text")).opacity), standing: await page.evaluate(() => document.querySelector(".body-row").dataset.standing) });
}
