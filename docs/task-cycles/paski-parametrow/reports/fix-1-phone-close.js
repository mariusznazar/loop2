async (page) => {
  const b = page.locator('.body-cells button.value-cell').nth(1);
  await b.tap();
  await page.waitForTimeout(300);
  return b.evaluate((el) => [el.matches(':hover'), el.getAttribute('aria-expanded'), getComputedStyle(el.querySelector('.value-cell-name')).color]);
}
