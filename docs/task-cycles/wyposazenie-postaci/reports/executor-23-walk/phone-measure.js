async (page) => {
  const min = 48;
  return page.evaluate((min) => {
    const root = document.documentElement;
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && el.checkVisibility({ visibilityProperty: true });
    };
    const name = (el) =>
      `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).trim().split(/\s+/)[0] : ""} "${(el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40)}"`;
    const all = [...document.body.querySelectorAll("*")].filter(visible);
    const crossing = all
      .filter((el) => el.clientWidth > 0 && el.scrollWidth > el.clientWidth)
      .map((el) => `${name(el)} content ${el.scrollWidth} > box ${el.clientWidth}`);
    const outside = all
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.right > root.clientWidth + 0.5 || r.left < -0.5;
      })
      .map((el) => `${name(el)} spans ${Math.round(el.getBoundingClientRect().left)}..${Math.round(el.getBoundingClientRect().right)}`);
    const controls = "button, a[href], input, select, textarea, summary, [role=button], [role=menuitem], [role=tab], [tabindex]:not([tabindex='-1'])";
    const small = [...document.querySelectorAll(controls)]
      .filter(visible)
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width < min || r.height < min;
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        return `${name(el)} ${Math.round(r.width * 10) / 10} x ${Math.round(r.height * 10) / 10}`;
      });
    return { page: `${innerWidth} x ${innerHeight}`, scrollsToTheSide: root.scrollWidth > root.clientWidth, contentWiderThanItsBox: crossing, outsideTheWindow: outside, controlsSmallerThan48: small };
  }, min);
}
