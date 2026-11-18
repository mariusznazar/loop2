#!/bin/bash
# Same scripted steps for both builds; prints focus and field text after each step.
cd <worktree root>
GAME=$(grep -o "https://127.0.0.1:[0-9]*" .playwright-cli/local.txt | head -1)
ref() { playwright-cli snapshot 2>&1 | sed -n '/```yaml/,/```$/p' | grep -m1 -- "$1" | grep -o 'ref=[^] ]*' | head -1 | cut -d= -f2; }
FOCUS="(() => { const a = document.activeElement; return (a.textContent||'').trim().slice(0,40) + ' | ' + a.className + ' | tab=' + a.tabIndex; })()"
FIELDS="[...document.querySelectorAll('.rule-panel-field')].map(x => x.innerText.split('\n').slice(0,2).join(' / ')).join(' || ')"
show() { echo "== $1"; playwright-cli eval "$FOCUS" 2>&1 | sed -n 2p; playwright-cli eval "$FIELDS" 2>&1 | sed -n 2p; }
playwright-cli open $GAME >/dev/null 2>&1
playwright-cli click e8 >/dev/null 2>&1
playwright-cli fill e26 "agent@example.test" >/dev/null 2>&1
playwright-cli fill e29 "correct horse battery 1" >/dev/null 2>&1
playwright-cli fill e32 "correct horse battery 1" >/dev/null 2>&1
playwright-cli click e33 >/dev/null 2>&1; sleep 2
playwright-cli --raw run-code --filename .playwright-cli/send-nobranch.js >/dev/null 2>&1
playwright-cli reload >/dev/null 2>&1; sleep 2
playwright-cli click "$(ref 'link "Mapy"')" >/dev/null 2>&1; sleep 1
playwright-cli click "$(ref 'link "Skraj lasu"')" >/dev/null 2>&1; sleep 1
playwright-cli click "$(ref 'Wejdź: Agent')" >/dev/null 2>&1; sleep 2
playwright-cli click "$(ref 'button "+ reguła"')" >/dev/null 2>&1; sleep 1
show "1 panel opened by + reguła"
playwright-cli press ArrowRight >/dev/null 2>&1; playwright-cli press ArrowDown >/dev/null 2>&1
show "2 after ArrowRight, ArrowDown"
playwright-cli press Enter >/dev/null 2>&1; sleep 1
show "3 after Enter on that cell"
playwright-cli press 3 >/dev/null 2>&1; playwright-cli press 5 >/dev/null 2>&1; playwright-cli press Enter >/dev/null 2>&1; sleep 1
show "4 after typing 35 and Enter"
for i in 1 2 3 4; do playwright-cli press ArrowRight >/dev/null 2>&1; done
show "5 after four ArrowRight in action grid"
playwright-cli press Enter >/dev/null 2>&1; sleep 1
show "6 after Enter on the cell reached"
playwright-cli click "$(ref 'button "Zamknij panel"')" >/dev/null 2>&1; sleep 1
show "7 after close button"
playwright-cli close >/dev/null 2>&1
