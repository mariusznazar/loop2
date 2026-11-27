async (page) => {
  return page.evaluate(() => {
    const nt = document.querySelector(".now-text");
    const nr = document.querySelector(".now-row");
    const right = nr.querySelector(".now-right");
    const cases = [
      ["Wytwórz — Opatrunek", "reguła 12.10 · zostało 120 z 120 min"],
      ["Ucisk — Opatrunek", "reguła 12.10 · zostało 120 z 120 min"],
      ["Zakłada opatrunek", "reguła 12.10 · zostało 120 z 120 min"],
      ["Wytwórz — Opatrunek z bardzo długą nazwą", "reguła 1.1 · zostało 10 z 10 min"],
    ];
    const out = [];
    for (const [t, r] of cases) {
      nt.textContent = t; right.textContent = r;
      out.push({ t, r, w: nt.clientWidth, scrollH: nt.scrollHeight, clientH: nt.clientHeight, rowH: nr.getBoundingClientRect().height, nextTop: document.querySelector(".next-row").getBoundingClientRect().top });
    }
    return out;
  });
}
