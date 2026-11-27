#!/bin/sh
# usage: send.sh <scenario>; builds the run-code file for the state and sends it as the page does
v=$1
{ printf 'async (page) => {\n  const saved = '; tr -d '\n' < .runs/correction-1b/state-$v.json; cat <<'EOT'
;
  return page.evaluate(async (saved) => {
    const current = await (await fetch("/api/saved-game")).json();
    const reply = await fetch("/api/saved-game", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: saved.version,
        basedOn: current.save?.revision ?? 0,
        game: saved.game,
      }),
    });
    return `${reply.status} ${await reply.text()}`;
  }, saved);
}
EOT
} > .runs/correction-1b/send-$v.js
playwright-cli ${SESSION:+-s=$SESSION} --raw run-code --filename .runs/correction-1b/send-$v.js
