async (page) => {
  // Picks the pace __PACE__, resumes, and for __SPAN__ ms records every animation frame the markers of
  // the health cell: how many stand, their words and opacity, the cell's blow mark and its shake.
  await page.getByRole("button", { name: "__PACE__", exact: true }).click();
  const resume = page.getByRole("button", { name: "Wznów", exact: true });
  if (await resume.count()) await resume.click();
  await page.mouse.move(5, 5);
  const result = await page.evaluate(
    (span) =>
      new Promise((resolve) => {
        const t0 = performance.now();
        const frames = [];
        const tick = () => {
          const now = performance.now();
          const cell = document.querySelector(".value-cell-static");
          const texts = [...document.querySelectorAll(".body-blow-text")];
          frames.push({
            t: Math.round(now - t0),
            minute: document.body.innerText.match(/Minuta \d+/)?.[0],
            health: cell.querySelector(".value-cell-number").textContent,
            count: texts.length,
            words: texts.map((text) => text.textContent).join(" | "),
            opacity: texts.map((text) => Number(getComputedStyle(text).opacity).toFixed(2)).join(" | "),
            blow: cell.dataset.blow ?? null,
            shake: getComputedStyle(cell).translate,
            animation: getComputedStyle(cell).animationName,
          });
          if (now - t0 > span) return resolve(frames);
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    __SPAN__,
  );
  const pause = page.getByRole("button", { name: "Pauza", exact: true });
  if (await pause.count()) await pause.click();
  return JSON.stringify(result);
}
