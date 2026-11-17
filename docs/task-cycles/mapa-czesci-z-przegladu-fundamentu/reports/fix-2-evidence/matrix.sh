#!/bin/bash
# Usage: matrix.sh <test file>; prints variant and the exit code of the sha case on it
T="$1"
for v in variants/*.yml; do
  python -B runner.py "$T" "$v" test_sha_reaches_the_script_only_through_env > /dev/null 2>&1
  rc=$?
  echo "$(basename $v .yml) sha-case-exit=$rc"
done
