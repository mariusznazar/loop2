#!/usr/bin/env bash
set -u
cd the task's worktree
B=$(grep -o 'https://127.0.0.1:[0-9]*' .runs/slice-16/local.log | head -1)
PORT=${B##*:}
DIR=$(ls -d .runs/local-start/*-"$PORT"-* | head -1)
export LOOP2_DATABASE_PATH="$(pwd)/$DIR/accounts.sqlite"
node dist/server/account-previous-save.js revoke gracz.dlugi.adres.bez.spacji.do.sprawdzenia.lamania@example.test | tail -1
