#!/usr/bin/env bash
# usage: series.sh LABEL COUNT ROOT FILE CASE
here=$(cd "$(dirname "$0")" && pwd)
label=$1; count=$2; root=$3; file=$4; case=$5
pass=0; fail=0
for i in $(seq "$count"); do
  start=$(date +%s)
  RUNLOG="$here/out/$label-$i.runs" python -B "$here/run_case.py" "$root" "$file" "$case" >"$here/out/$label-$i.txt" 2>&1
  code=$?
  echo "$label run $i exit $code seconds $(( $(date +%s) - start ))" >>"$here/out/$label.log"
  if [ "$code" = 0 ]; then pass=$((pass+1)); else fail=$((fail+1)); fi
done
echo "$label: $count runs, $pass passed, $fail failed" | tee -a "$here/out/$label.log"
