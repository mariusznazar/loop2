#!/usr/bin/env bash
# usage: scan.sh ROOT  -- limits 2 and 3, 8 runs each
here=$(cd "$(dirname "$0")" && pwd)
for w in 2 3; do
  WAIT=$w bash "$here/series.sh" "scan$w" 8 "$1" tests/deploy/test_loop2_watch.py TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down
done
