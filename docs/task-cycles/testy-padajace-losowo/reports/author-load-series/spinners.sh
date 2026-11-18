#!/usr/bin/env bash
# usage: spinners.sh COUNT STOPFILE
here=$(cd "$(dirname "$0")" && pwd)
for _ in $(seq "$1"); do
  node "$here/spin.mjs" "$2" &
done
wait
echo "spinners ended"
