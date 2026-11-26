#!/usr/bin/env bash
# usage: send.sh <session> <compose-script> [args of the script...]
# Composes a saved document with the script, sends it by the page's own save request, reloads and
# opens the screen of the map run.
set -e
session="$1"
shift
node "$@" > .runs/correction-1/state.json
{ printf 'async (page) => {\n  const saved = '; tr -d '\n' < .runs/correction-1/state.json; cat <<'EOS'
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
  const back = page.getByRole('link', { name: /Wróć do przejścia/ }); if (await back.count()) await back.first().click();
  await page.waitForTimeout(1000);
  return answer + " | " + (await page.evaluate(() => document.body.innerText.match(/Minuta[^\n]*/)?.[0]));
}
EOS
} > .runs/correction-1/send-state.js
playwright-cli -s="$session" --raw run-code --filename .runs/correction-1/send-state.js
