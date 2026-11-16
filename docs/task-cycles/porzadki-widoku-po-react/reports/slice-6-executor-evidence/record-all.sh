#!/usr/bin/env bash
# Working copy of slice 6. Usage (worktree root): bash .runs/slice-6-executor/record-all.sh <label> <address>
# Records the computed styles of every state into .runs/slice-6-executor/out-<label>/<state>.json
set -u
label="$1"
address="$2"
dir=.runs/slice-6-executor
out="$dir/out-$label"
mkdir -p "$out"
playwright-cli close >/dev/null 2>&1
playwright-cli open "$address" >/dev/null 2>&1
playwright-cli --raw run-code --filename "$dir/drive-register.js" > "$out/register.txt" 2>&1
cat "$out/register.txt"
db=$(ls .runs/local-start/*/accounts.sqlite | head -n 1)
LOOP2_DATABASE_PATH="$db" node dist/server/account-previous-save.js grant compare@example.test
for state in run-kronika run-teren run-rulepanel run-discovery run-question run-death run-completion programs programs-reset programs-trip programs-rulepanel; do
  playwright-cli --raw run-code --filename "$dir/drive-$state.js" > "$out/$state.json" 2> "$out/$state.err"
  echo "$state: $(wc -c < "$out/$state.json") bytes, $(wc -c < "$out/$state.err") err bytes"
done
playwright-cli --raw run-code --filename "$dir/drive-kitchen-sink.js" > "$out/kitchen-sink.json" 2> "$out/kitchen-sink.err"
echo "kitchen-sink: $(wc -c < "$out/kitchen-sink.json") bytes, $(wc -c < "$out/kitchen-sink.err") err bytes"
playwright-cli close >/dev/null 2>&1
