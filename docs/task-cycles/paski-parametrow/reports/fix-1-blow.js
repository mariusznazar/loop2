async (page) => {
  return page.evaluate(() => {
    const cell = document.querySelector('.value-cell-static');
    const text = document.createElement('span');
    text.className = 'body-blow-text';
    text.textContent = '−21 · wilk';
    cell.append(text);
    const r = (e) => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.right), Math.round(b.bottom)]; };
    return { standing: document.querySelector('.body-row').dataset.standing, cell: r(cell), bar: r(cell.querySelector('.value-cell-bar')), text: r(text), play: getComputedStyle(text).animationPlayState };
  });
}
