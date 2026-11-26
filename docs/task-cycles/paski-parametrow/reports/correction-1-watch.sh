#!/usr/bin/env bash
# usage: watch.sh <session> <pace> <shot-name> [shot-delay-ms] [limit-ms]
set -e
root=".runs/correction-1"
sed -e "s/__PACE__/$2/" -e "s#__SHOT__#$root/shots/$3.png#" -e "s/__SHOT_DELAY__/${4:-200}/" -e "s/__LIMIT__/${5:-20000}/g" \
  .runs/correction-1/watch-blow.template.js > .runs/correction-1/watch-blow.js
playwright-cli -s="$1" --raw run-code --filename .runs/correction-1/watch-blow.js > ".runs/correction-1/watch-$3.json"
