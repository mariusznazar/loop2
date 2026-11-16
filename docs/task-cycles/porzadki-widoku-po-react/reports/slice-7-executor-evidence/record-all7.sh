#!/usr/bin/env bash
# Working copy of slice 7. Usage (worktree root): bash .runs/slice-7-executor/record-all7.sh <label> <address>
set -u
label="$1"
address="$2"
dir=.runs/slice-7-executor
out="$dir/out-$label"
mkdir -p "$out"
playwright-cli close >/dev/null 2>&1
playwright-cli open "$address" >/dev/null 2>&1
playwright-cli --raw run-code --filename "$dir/drive-register.js" > "$out/register.txt" 2>&1
cat "$out/register.txt"
for state in login-in login-register login-forgot headquarters character maps maps-card knowledge waiting-held waiting-refused; do
  playwright-cli --raw run-code --filename "$dir/drive-$state.js" > "$out/$state.json" 2> "$out/$state.err"
  echo "$state: $(wc -c < "$out/$state.json") bytes, $(wc -c < "$out/$state.err") err bytes"
done
db=$(ls .runs/local-start/*/accounts.sqlite | head -n 1)
LOOP2_DATABASE_PATH="$db" node dist/server/account-role.js owner compare@example.test
for state in accounts accounts-confirm; do
  playwright-cli --raw run-code --filename "$dir/drive-$state.js" > "$out/$state.json" 2> "$out/$state.err"
  echo "$state: $(wc -c < "$out/$state.json") bytes, $(wc -c < "$out/$state.err") err bytes"
done
LOOP2_DATABASE_PATH="$db" node dist/server/account-role.js player compare@example.test
playwright-cli --raw run-code --filename "$dir/drive-kitchen-sink.js" > "$out/kitchen-sink.json" 2> "$out/kitchen-sink.err"
echo "kitchen-sink: $(wc -c < "$out/kitchen-sink.json") bytes, $(wc -c < "$out/kitchen-sink.err") err bytes"
playwright-cli close >/dev/null 2>&1
