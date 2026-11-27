#!/bin/sh
# usage: resume-until.sh <session> <regex> ; resume, wait until the main text matches, pause
s=$1
cat > .runs/correction-1b/until.js <<EOT
async (page) => {
  const resume = page.getByRole("button", { name: "Wznów", exact: true });
  if (await resume.count()) await resume.first().click();
  await page.waitForFunction((re) => new RegExp(re).test(document.querySelector("main").innerText), "$2", { timeout: 60000, polling: 50 });
  await page.getByRole("button", { name: "Pauza", exact: true }).first().click();
  return "paused";
}
EOT
playwright-cli -s=$s --raw run-code --filename .runs/correction-1b/until.js
