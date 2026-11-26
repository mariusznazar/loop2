#!/usr/bin/env bash
# usage: send.sh <minute> <temp> <sat> <health> [fire]
set -e
node .runs/fix-1/compose.mjs "$@" > .playwright-cli/state.json
{ printf 'async (page) => {\n  const saved = '; tr -d '\n' < .playwright-cli/state.json; cat <<'EOS'
;
  const answer = await page.evaluate(async (saved) => {
    const current = await (await fetch("/api/saved-game")).json();
    const reply = await fetch("/api/saved-game", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version: saved.version, basedOn: current.save?.revision ?? 0, game: saved.game }),
    });
    return `${reply.status} ${await reply.text()}`;
  }, saved);
  await page.reload();
  await page.waitForTimeout(1500);
  const back = page.getByRole('link', { name: /Wróć do przejścia/ }); if (await back.count()) await back.click();
  await page.waitForTimeout(1000);
  await page.mouse.move(5, 5);
  return answer + " | " + (await page.evaluate(() => document.body.innerText.match(/Minuta[^\n]*/)?.[0]));
}
EOS
} > .playwright-cli/send-state.js
playwright-cli --raw run-code --filename .playwright-cli/send-state.js
