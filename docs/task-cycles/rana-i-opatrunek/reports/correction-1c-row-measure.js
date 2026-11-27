async (page) => {
  return page.evaluate(() => {
    const r = (el) => {
      const b = el.getBoundingClientRect();
      return { top: Math.round(b.top * 10) / 10, h: Math.round(b.height * 10) / 10, w: Math.round(b.width * 10) / 10, left: Math.round(b.left * 10) / 10 };
    };
    const wa = document.querySelector(".world-area");
    const kids = [...wa.children].map((el) => ({ cls: String(el.className).split(/\s+/)[0] || el.tagName, ...r(el) }));
    const nt = document.querySelector(".now-text");
    const nr = document.querySelector(".now-row");
    const cs = getComputedStyle(nt);
    const sc = document.querySelector(".scene");
    const sp = document.querySelector(".scene-place");
    return {
      page: `${innerWidth} x ${innerHeight}`,
      scrollsToTheSide: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      nowText: nt.textContent,
      nowRight: nr.querySelector(".now-right") ? nr.querySelector(".now-right").textContent : null,
      nowTextBox: r(nt),
      nowTextContent: nt.scrollWidth,
      nowTextClient: nt.clientWidth,
      nowTextScrollH: nt.scrollHeight,
      nowTextClientH: nt.clientHeight,
      lineHeight: cs.lineHeight,
      whiteSpace: cs.whiteSpace,
      textOverflow: cs.textOverflow,
      nowRow: r(nr),
      scene: sc ? r(sc) : null,
      scenePlace: sp ? r(sp) : null,
      worldArea: r(wa),
      worldChildren: kids,
    };
  });
}
