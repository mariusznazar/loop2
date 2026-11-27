async (page) => {
  return page.evaluate(() => {
    const wa = document.querySelector(".world-area");
    const head = wa ? wa.innerText.replace(/\s*\n+\s*/g, " | ").slice(0, 700) : "(no world-area)";
    const rows = [...document.querySelectorAll(".rule-number")].map((n) => n.parentElement).filter((r) => /Załóż/i.test(r.innerText));
    const seen = new Set();
    const rowInfo = [];
    for (const row of rows) {
      const text = row.innerText.replace(/\s*\n+\s*/g, " | ");
      if (seen.has(text)) continue;
      seen.add(text);
      rowInfo.push({
        row: text,
        rowClass: row.className,
        reasons: [...row.querySelectorAll("*")].filter((e) => e.children.length === 0 && /rule-reason|reason/.test(e.className)).map((e) => `${e.textContent.trim()} ${getComputedStyle(e).color}`),
      });
    }
    return { head, rowInfo };
  });
}
