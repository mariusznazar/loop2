#!/usr/bin/env bash
# usage: make-send.sh <state.json> <out.js>
{ printf 'async (page) => {\n  const saved = '; tr -d '\n' < "$1"; cat <<'EOT'
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
} > "$2"
