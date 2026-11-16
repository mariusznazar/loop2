#!/usr/bin/env bash
# Usage (worktree root): bash .runs/fix-1/record-all.sh <label> <address>
set -u
label="$1"; address="$2"; dir=.runs/fix-1; out="$dir/out-$label"
mkdir -p "$out"
playwright-cli close >/dev/null 2>&1
playwright-cli open "$address" >/dev/null 2>&1
playwright-cli --raw run-code --filename "$dir/drive-register.js" > "$out/register.txt" 2>&1
cat "$out/register.txt"
for state in run-live run-fire run-fire-walk run-discovery run-death run-completion headquarters headquarters-camp; do
  playwright-cli --raw run-code --filename "$dir/drive-$state.js" > "$out/$state.json" 2> "$out/$state.err"
  echo "$state: $(wc -c < "$out/$state.json") bytes, $(wc -c < "$out/$state.err") err bytes"
done
playwright-cli close >/dev/null 2>&1
