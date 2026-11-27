async (page) => {
  return page.evaluate(() => {
    const root = document.documentElement;
    const wa = document.querySelector(".world-area");
    const q = (sel) => document.querySelector(sel);
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        el: `${el.tagName.toLowerCase()}.${String(el.className).trim().split(/\s+/).join(".")}`,
        x: Math.round(r.left * 10) / 10, w: Math.round(r.width * 10) / 10,
        client: el.clientWidth, scroll: el.scrollWidth,
        display: cs.display, width: cs.width, minWidth: cs.minWidth, maxWidth: cs.maxWidth, flex: cs.flex, overflowX: cs.overflowX,
        padding: `${cs.paddingLeft}/${cs.paddingRight}`, border: `${cs.borderLeftWidth}/${cs.borderRightWidth}`, boxSizing: cs.boxSizing,
      };
    };
    const kids = wa ? [...wa.children].map((c) => ({ ...box(c), text: c.innerText.slice(0, 20) })) : [];
    const chain = [];
    let p = q(".scene img") || q(".scene");
    while (p && p !== document.body) { chain.push(box(p)); if (p === wa) break; p = p.parentElement; }
    return {
      viewport: { innerWidth, rootClient: root.clientWidth, rootScroll: root.scrollWidth, scrollsToTheSide: root.scrollWidth > root.clientWidth },
      worldArea: box(wa),
      parentOfWorldArea: wa && box(wa.parentElement),
      children: kids,
      chainFromSceneUp: chain,
    };
  });
}
