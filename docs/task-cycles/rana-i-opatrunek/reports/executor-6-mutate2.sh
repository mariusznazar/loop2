#!/bin/bash
cd the worktree's root
cp .runs/executor-6/saved-game.ts.good src/browser/sim/saved-game.ts
if [ -n "$2" ]; then sed -i "$2" src/browser/sim/saved-game.ts; if cmp -s .runs/executor-6/saved-game.ts.good src/browser/sim/saved-game.ts; then echo "$1: NO CHANGE"; exit 1; fi; fi
npm test -- tests/sim/zz-exec6-probe.test.mjs > .runs/executor-6/mut2-$1.txt 2>&1
echo "$1: exit=$?"
grep -n "a crafted document of the current version is refused" -A 40 .runs/executor-6/mut2-$1.txt | grep -E "^\S*[0-9]+[-:]\s+[+-]\s+'" | head -20
cp .runs/executor-6/saved-game.ts.good src/browser/sim/saved-game.ts
