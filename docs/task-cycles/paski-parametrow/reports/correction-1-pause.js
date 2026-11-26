async (page) => {
  // At 1×, waits for a blow, pauses the run 300 ms after the marker appears, records the marker and the
  // shake for 1.5 s of the pause, takes a screenshot in the pause, then resumes and records until the
  // marker is gone.
  await page.getByRole("button", { name: "1×", exact: true }).click();
  await page.getByRole("button", { name: "Wznów", exact: true }).click();
  await page.mouse.move(5, 5);
  await page.waitForSelector(".body-blow-text", { timeout: 20000 });
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Pauza", exact: true }).click();
  await page.mouse.move(5, 5);
  const record = (span) =>
    page.evaluate(
      (span) =>
        new Promise((resolve) => {
          const t0 = performance.now();
          const frames = [];
          const tick = () => {
            const now = performance.now();
            const cell = document.querySelector(".value-cell-static");
            const text = document.querySelector(".body-blow-text");
            const ts = text ? getComputedStyle(text) : null;
            frames.push({
              t: Math.round(now - t0),
              minute: document.body.innerText.match(/Minuta[^\n]*/)?.[0] ?? null,
              standing: document.querySelector(".body-row")?.dataset.standing ?? null,
              opacity: ts ? Number(ts.opacity).toFixed(3) : null,
              rise: ts ? ts.translate : null,
              play: ts ? ts.animationPlayState : null,
              shake: getComputedStyle(cell).translate,
              shakePlay: getComputedStyle(cell).animationPlayState,
            });
            if (now - t0 > span) return resolve(frames);
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      span,
    );
  const paused = await record(1500);
  await page.screenshot({ path: ".runs/correction-1/shots/desk-pause-blow.png" });
  await page.getByRole("button", { name: "Wznów", exact: true }).click();
  await page.mouse.move(5, 5);
  const resumed = await record(1500);
  await page.getByRole("button", { name: "Pauza", exact: true }).click();
  return JSON.stringify({ paused, resumed });
}
