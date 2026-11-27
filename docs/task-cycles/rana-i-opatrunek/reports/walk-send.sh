#!/bin/sh
# usage: send.sh <state-file> [version-override]
cd the worktree's root
f=$1
{ printf 'async (page) => {\n  const saved = '; tr -d '\n' < "$f"; cat <<'EOT'
;
  const override = OVERRIDE;
  return page.evaluate(async ([saved, override]) => {
    const current = await (await fetch("/api/saved-game")).json();
    const reply = await fetch("/api/saved-game", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: override ?? saved.version,
        basedOn: current.save?.revision ?? 0,
        game: saved.game,
      }),
    });
    return `${reply.status} ${await reply.text()}`;
  }, [saved, override]);
}
EOT
} | sed "s/OVERRIDE/${2:-null}/" > .runs/walk/send-state.js
playwright-cli --raw run-code --filename .runs/walk/send-state.js
