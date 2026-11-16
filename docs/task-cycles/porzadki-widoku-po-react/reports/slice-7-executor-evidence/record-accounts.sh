#!/usr/bin/env bash
set -u
label="$1"; address="$2"; dir=.runs/slice-7-executor; out="$dir/out-$label"
playwright-cli close >/dev/null 2>&1
playwright-cli open "$address" >/dev/null 2>&1
db=$(ls .runs/local-start/*/accounts.sqlite | head -n 1)
LOOP2_DATABASE_PATH="$db" node dist/server/account-role.js owner compare@example.test >/dev/null
for state in accounts accounts-confirm; do
  playwright-cli --raw run-code --filename "$dir/drive-$state.js" > "$out/$state.json" 2> "$out/$state.err"
  echo "$state: $(wc -c < "$out/$state.json") bytes"
done
LOOP2_DATABASE_PATH="$db" node dist/server/account-role.js player compare@example.test >/dev/null
playwright-cli close >/dev/null 2>&1
