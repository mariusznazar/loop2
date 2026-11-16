#!/bin/bash
# Focused checks of the review of fix 1, run in the worktree of the head a9a95479.
cd .runs/review-fix-1/head || exit 2
R=../results.txt
npm run build > ../out_build.txt 2>&1; echo "build exit $?" > $R
for f in run-screen-state scene world-area run-header rule-signs headquarters-screen camp-picture run-screen; do
  node scripts/test-node-file.mjs tests/view/$f.test.mjs > ../out_$f.txt 2>&1; echo "$f exit $?" >> $R
done
npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html tests/view/run-screen-state.test.mjs > ../out_prettier.txt 2>&1; echo "prettier exit $?" >> $R
for t in test_browser_view_focus_outline test_browser_view_token_values test_application_build_kitchen_sink test_application_build_output; do
  python -B scripts/test.py tests/invariants/$t.py > ../out_$t.txt 2>&1; echo "$t exit $?" >> $R
done
echo DONE >> $R
