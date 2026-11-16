#!/bin/bash
# Focused checks of the review of the whole change, run in the worktree of the head.
cd .runs/review-whole/head || exit 2
R=../results.txt
npm run build > ../out_build.txt 2>&1; echo "build exit $?" > $R
for f in run-screen-state run-screen end-question end-window-game end-window program-panel previous-save chronicle-game uncaught-failure world-area run-header rule-signs scene shared-controls; do
  if [ -f tests/view/$f.test.mjs ]; then
    node scripts/test-node-file.mjs tests/view/$f.test.mjs > ../out_$f.txt 2>&1; echo "$f exit $?" >> $R
  else echo "$f missing" >> $R; fi
done
npm run typecheck > ../out_typecheck.txt 2>&1; echo "typecheck exit $?" >> $R
FILES="src/browser/view/run-screen-state.ts src/browser/view/run-screen-reading.ts src/browser/view/run-screen.tsx src/browser/view/program-panel.tsx src/browser/view/run-entry.ts src/browser/view/email-status.ts src/browser/view/accounts-screen.tsx src/browser/view/knowledge-screen.tsx src/browser/view/rule-panel.tsx tests/view/game-stylesheets.mjs tests/view/rule-signs.test.mjs tests/view/run-header.test.mjs tests/view/run-screen-state.test.mjs tests/view/run-screen.test.mjs tests/view/scene.test.mjs tests/view/world-area.test.mjs"
npx --no-install eslint --max-warnings 0 $FILES > ../out_eslint.txt 2>&1; echo "eslint exit $?" >> $R
npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html $FILES > ../out_prettier.txt 2>&1; echo "prettier exit $?" >> $R
for t in test_browser_view_focus_outline test_browser_view_token_values test_application_build_output test_application_build_kitchen_sink test_cross_part_imports test_browser_view_framework; do
  python -B scripts/test.py tests/invariants/$t.py > ../out_$t.txt 2>&1; echo "$t exit $?" >> $R
done
echo DONE >> $R
