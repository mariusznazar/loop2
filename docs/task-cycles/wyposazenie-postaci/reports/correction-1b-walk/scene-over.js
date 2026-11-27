async (page) => {
  return page.evaluate(() => {
    const s = document.querySelector(".scene");
    const sr = s.getBoundingClientRect();
    return { scene: [Math.round(sr.left), Math.round(sr.right)], scrollWidth: s.scrollWidth, over: [...s.querySelectorAll("*")].filter((e) => { const r = e.getBoundingClientRect(); return r.right > sr.right + 0.5 || r.left < sr.left - 0.5; }).map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName.toLowerCase()}.${e.className} ${Math.round(r.left)}..${Math.round(r.right)} w=${Math.round(r.width)}`; }).slice(0, 10) };
  });
}
