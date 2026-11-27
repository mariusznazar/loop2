async (page) => {
  return page.evaluate(() => {
    const rows = [...document.querySelectorAll(".rule-number")].map((n) => n.parentElement).filter((r) => /Załóż|Uderz|Kopnij/i.test(r.innerText));
    return rows.map((row) => ({
      row: row.innerText.replace(/\s*\n+\s*/g, " | "),
      colours: [...row.querySelectorAll("*")].filter((e) => e.children.length === 0 && true).map((e) => `${e.className}: ${e.textContent.trim()} ${getComputedStyle(e).color}`),
      rowClass: row.className,
    }));
  });
}
