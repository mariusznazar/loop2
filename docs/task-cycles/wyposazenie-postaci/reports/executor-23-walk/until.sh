#!/bin/sh
# usage: until.sh <regex> : resume, wait until the text of main matches the regex, then pause
cat > .runs/executor-23/until.js <<EOF
async (page) => {
  const resume = page.getByRole("button", { name: "Wznów", exact: true });
  if (await resume.count()) await resume.tap();
  await page.waitForFunction((re) => new RegExp(re).test(document.querySelector("main").innerText), "$1", { timeout: 60000, polling: 50 });
  await page.getByRole("button", { name: "Pauza", exact: true }).tap();
  return "paused";
}
EOF
playwright-cli --raw run-code --filename .runs/executor-23/until.js
