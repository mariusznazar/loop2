#!/usr/bin/env bash
# Makes the made-up accounts of the check in the running local start and gives the roles with the product's own commands.
set -u
cd the task's worktree
B=$(grep -o 'https://127.0.0.1:[0-9]*' .runs/slice-16/local.log | head -1)
PORT=${B##*:}
DIR=$(ls -d .runs/local-start/*-"$PORT"-* | head -1)
export LOOP2_DATABASE_PATH="$(pwd)/$DIR/accounts.sqlite"
for e in owner@example.test gracz.dlugi.adres.bez.spacji.do.sprawdzenia.lamania@example.test blokada@example.test uprawnienie@example.test; do
  curl -sk -o /dev/null -w "$e %{http_code}\n" -X POST "$B/api/accounts" -H "Origin: $B" -H "Content-Type: application/json" -d "{\"email\":\"$e\",\"password\":\"Haslo-testowe-12345\",\"passwordConfirmation\":\"Haslo-testowe-12345\"}"
done
node dist/server/account-role.js owner owner@example.test | tail -1
node dist/server/account-block.js block blokada@example.test | tail -1
node dist/server/account-previous-save.js grant uprawnienie@example.test | tail -1
echo "$B"
