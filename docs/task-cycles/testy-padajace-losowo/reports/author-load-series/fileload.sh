#!/usr/bin/env bash
# usage: fileload.sh LOOPS STOPFILE ROOT
here=$(cd "$(dirname "$0")" && pwd)
export STOPFILE="$2"
files="tests/deploy/test_loop2_watch.py tests/deploy/test_loop2_backup.py tests/invariants/test_account_save_backup_failure_notice.py tests/deploy/test_loop2_watch_message.py"
loop() {
  local n=$1 runs=0 bad=0
  while [ ! -e "$STOPFILE" ]; do
    for f in $files; do
      [ -e "$STOPFILE" ] && break
      if python -B "$here/run_case.py" "$2" "$f" >/dev/null 2>&1; then :; else bad=$((bad+1)); fi
      runs=$((runs+1))
    done
  done
  echo "loop $n: $runs file runs, $bad not ok"
}
for i in $(seq "$1"); do loop "$i" "$3" & done
wait
echo "file loops ended"
