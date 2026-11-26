async (page) => {
  // Picks the pace __PACE__, resumes the run and watches the health cell for a blow coming from the
  // simulation: the marker's rectangle against its own cell and the other cells, its opacity and
  // rise, the cell's shake, sampled every animation frame for 1.6 s from its appearance; one
  // screenshot __SHOT_DELAY__ ms after it appears.
  const pace = "__PACE__";
  await page.getByRole("button", { name: pace, exact: true }).click();
  const resume = page.getByRole("button", { name: "Wznów", exact: true });
  if (await resume.count()) await resume.click();
  await page.mouse.move(5, 5);
  const started = Date.now();
  const sampler = page.evaluate(
    ({ limit }) =>
      new Promise((resolve) => {
        const rect = (el) => {
          const r = el.getBoundingClientRect();
          return [Math.round(r.left * 10) / 10, Math.round(r.top * 10) / 10, Math.round(r.right * 10) / 10, Math.round(r.bottom * 10) / 10];
        };
        const t0 = performance.now();
        const samples = [];
        let seenAt = null;
        const minutes = [];
        const tick = () => {
          const now = performance.now();
          const minute = document.body.innerText.match(/Minuta[^\n]*/)?.[0];
          if (minutes.at(-1) !== minute) minutes.push(minute);
          const text = document.querySelector(".body-blow-text");
          const cell = document.querySelector(".value-cell-static");
          if (text && seenAt === null) seenAt = now;
          if (seenAt !== null || text) {
            const cells = [...document.querySelectorAll(".body-cells .body-cell-pair > *")];
            const ts = text ? getComputedStyle(text) : null;
            samples.push({
              t: Math.round(now - (seenAt ?? now)),
              text: text ? text.textContent : null,
              textRect: text ? rect(text) : null,
              opacity: ts ? Number(ts.opacity).toFixed(2) : null,
              translate: ts ? ts.translate : null,
              play: ts ? ts.animationPlayState : null,
              cellTranslate: getComputedStyle(cell).translate,
              cellBlow: cell.dataset.blow ?? null,
              standing: document.querySelector(".body-row").dataset.standing,
              cellRects: cells.map(rect),
              barRect: rect(cell.querySelector(".value-cell-bar")),
            });
          }
          if (seenAt !== null && now - seenAt > 1600) return resolve({ samples, minutes });
          if (now - t0 > limit) return resolve({ samples, minutes, timedOut: true });
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { limit: __LIMIT__ },
  );
  let shot = null;
  try {
    await page.waitForSelector(".body-blow-text", { timeout: __LIMIT__ });
    await page.waitForTimeout(__SHOT_DELAY__);
    const op = () => page.evaluate(() => { const e = document.querySelector(".body-blow-text"); return e ? Number(getComputedStyle(e).opacity).toFixed(2) : "gone"; });
    const before = await op();
    await page.screenshot({ path: "__SHOT__" });
    shot = `${Date.now() - started} ms, opacity before ${before}, after ${await op()}`;
  } catch (error) {
    shot = `no marker: ${error.name}`;
  }
  const result = await sampler;
  const pause = page.getByRole("button", { name: "Pauza", exact: true });
  if (await pause.count()) await pause.click();
  return JSON.stringify({ shot, ...result, after: await page.evaluate(() => document.body.innerText.match(/Minuta[^\n]*/)?.[0] + " | " + document.querySelector(".value-cell-static").innerText.replace(/\s+/g, " ")) });
}
