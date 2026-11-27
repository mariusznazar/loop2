async (page) => {
  await page.getByRole("button", { name: "Wznów", exact: true }).click();
  const seen = new Map();
  const start = Date.now();
  while (Date.now() - start < 40000) {
    const lines = await page.evaluate(() => document.querySelector("main").innerText.split("\n").filter((l) => l.trim() !== ""));
    const key = lines.filter((l) => /^(Minuta|Wyposażenie:|Zakłada|Bierze|Mag |Wilk|Uderz|Kopnij|Zaczyna|Walka|reguła|tylko|trwa|już)/.test(l) || /bierze|Zakłada|wilk/i.test(l)).join(" | ");
    if (!seen.has(key)) seen.set(key, Date.now() - start);
    if (lines.some((l) => /Pokonane napaści [1-9]|Koniec|Mag padł|Zdrowie\s*0/.test(l)) && Date.now() - start > 10000) break;
    await page.waitForTimeout(120);
  }
  return [...seen.entries()].map(([k, t]) => `${t}ms: ${k}`).join("\n");
}
