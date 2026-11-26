#!/usr/bin/env bash
# Applies one mutation at a time in the copy of 2f3c89a5, runs the focused test file there,
# prints the exit code and the names of the failing cases, and restores the copy.
set -u
copy=".runs/review-gate-2/wt"
logs=".runs/review-gate-2"
screen="src/browser/view/maps-screen.tsx"
tests="tests/view/maps-screen.test.mjs"

guard_map() { sed -i 's/if (cardMap.current !== judgedMap) {/if (false \&\& cardMap.current !== judgedMap) {/' "$copy/$screen"; }
guard_alive() { sed -i 's/if (!alive.current) return;/if (false \&\& !alive.current) return;/' "$copy/$screen"; }
never_release() { sed -i 's/for (const callback of held.splice(0)) callback(window.performance.now());/held.splice(0);/' "$copy/$tests"; }

run() {
  name="$1"; shift
  for change in "$@"; do "$change"; done
  git -C "$copy" diff --stat | tail -1
  (cd "$copy" && npm test -- "$tests" > "$logs/mutation-$name.log" 2>&1)
  code=$?
  echo "== $name: exit $code"
  grep -E "^✖ " "$logs/mutation-$name.log" | sed 's/ ([0-9.]*ms)$//' | sort -u
  grep -E "^ℹ (pass|fail)" "$logs/mutation-$name.log"
  git -C "$copy" checkout -- "$screen" "$tests"
  git -C "$copy" diff --quiet && echo "restored"
}

run guard-map guard_map
run guard-alive guard_alive
run never-release never_release
run never-release-and-guard-alive never_release guard_alive
