#!/bin/sh
# usage: send.sh A|B|C ; builds the run-code file for the state and sends it
v=$1
{ printf 'async (page) => {\n  const saved = '; tr -d '\n' < .runs/executor-23/state-$v.json; cat <<'EOF'
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
EOF
} > .runs/executor-23/send-$v.js
playwright-cli --raw run-code --filename .runs/executor-23/send-$v.js
