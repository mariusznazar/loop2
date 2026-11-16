# Measures of the cycle run

- Calls in all: 1758
- Calls of the orchestrator: 210
- Calls of subagents: 1548
- Mean context per call: 213162
- Mean context per call of the orchestrator: 257518
- Share of the context in calls above 200000 tokens: 73.7%
- Context of the orchestrator's first call: 44553
- Context of the orchestrator's middle call: 258832
- Context of the orchestrator's last call: 414553
- Cache written, 5 minutes: 7976453
- Cache written, 1 hour: 394259
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 1110784
- Calls of subagents with a cache write again: 3

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 472625ab-4d4c-4452-843f-a88e4431bc1b | Claude Code | 210 | 44553 | 258832 | 414553 | 0 | 394259 | 0 | 0 | 6114 | 17 | 2615 | 1 |
| Fix 1 of whole-change review (the-way-stage) | Claude Code | 69 | 25380 | 138762 | 203999 | 193650 | 0 | 0 | 0 | 75487 | 22 | 0 | 0 |
| Slice 11: chronicle changed-rule entry (the-way-stage) | Claude Code | 23 | 25409 | 160994 | 176932 | 165947 | 0 | 0 | 0 | 13479 | 4 | 0 | 0 |
| Slice 20: practice of a run vs tree (the-way-stage) | Claude Code | 24 | 25342 | 65031 | 79266 | 68281 | 0 | 0 | 0 | 15616 | 3 | 0 | 0 |
| Slice 1: units of conditions (the-way-stage) | Claude Code | 19 | 25336 | 124436 | 139590 | 139588 | 0 | 0 | 0 | 10461 | 4 | 0 | 0 |
| Slice 15: login card focus (the-way-stage) | Claude Code | 66 | 25596 | 233238 | 318043 | 307058 | 0 | 0 | 0 | 48205 | 8 | 0 | 0 |
| Return step of the cycle (the-way-stage) | Claude Code | 67 | 25296 | 166363 | 238195 | 446705 | 0 | 219495 | 1 | 134186 | 36 | 77697 | 1 |
| Slice 4: unit beside number field (the-way-stage) | Claude Code | 31 | 25408 | 197600 | 220047 | 209062 | 0 | 0 | 0 | 18045 | 5 | 0 | 0 |
| Slice 10: line of changed program (the-way-stage) | Claude Code | 29 | 25361 | 236157 | 262155 | 251170 | 0 | 0 | 0 | 20562 | 2 | 0 | 0 |
| Fix 2: gate failure end-window test (the-way-stage) | Claude Code | 60 | 25428 | 76854 | 105629 | 95280 | 0 | 0 | 0 | 13799 | 3 | 0 | 0 |
| Whole-change review pass 2 (docs) (the-way-stage) | Claude Code | 108 | 25363 | 247826 | 369393 | 686505 | 0 | 328097 | 1 | 46914 | 22 | 4725 | 2 |
| Review fix 2 (the-way-stage) | Claude Code | 24 | 25366 | 84180 | 106728 | 106726 | 0 | 0 | 0 | 31496 | 2 | 0 | 0 |
| Slice 16: save rhythm after failure (the-way-stage) | Claude Code | 17 | 25416 | 125191 | 133066 | 122717 | 0 | 0 | 0 | 12774 | 2 | 0 | 0 |
| Slice 9: new copy groups unfolded (the-way-stage) | Claude Code | 52 | 25314 | 245218 | 285339 | 274354 | 0 | 0 | 0 | 16427 | 7 | 0 | 0 |
| Review the return step commit (the-way-stage) | Claude Code | 31 | 25296 | 93988 | 122956 | 122954 | 0 | 0 | 0 | 26201 | 10 | 0 | 0 |
| Slice 18: mage stops where reached (the-way-stage) | Claude Code | 27 | 25443 | 157400 | 179805 | 169456 | 0 | 0 | 0 | 6039 | 3 | 0 | 0 |
| Slice 21: stylesheet comments (the-way-stage) | Claude Code | 32 | 25454 | 169881 | 192638 | 192636 | 0 | 0 | 0 | 34910 | 3 | 0 | 0 |
| Slice 3: unit in rule sentence (the-way-stage) | Claude Code | 31 | 25357 | 219455 | 244604 | 233619 | 0 | 0 | 0 | 25096 | 1 | 0 | 0 |
| Slice 19: cut walk not replayed (the-way-stage) | Claude Code | 88 | 25321 | 236242 | 301164 | 290179 | 0 | 0 | 0 | 27594 | 6 | 0 | 0 |
| Slice 2: pick cell fixes (the-way-stage) | Claude Code | 84 | 25331 | 213518 | 263443 | 252458 | 0 | 0 | 0 | 39262 | 7 | 0 | 0 |
| Write foundation entries of the plan (the-way-stage) | Claude Code | 84 | 25318 | 275835 | 346559 | 336210 | 0 | 0 | 0 | 132624 | 50 | 77697 | 1 |
| Slice 13: long name in team row (the-way-stage) | Claude Code | 27 | 25466 | 120611 | 143593 | 143591 | 0 | 0 | 0 | 29092 | 6 | 0 | 0 |
| Slice 8: rule panel follows its rule (the-way-stage) | Claude Code | 74 | 25344 | 277125 | 308272 | 297287 | 0 | 0 | 0 | 22596 | 9 | 0 | 0 |
| Whole-change review pass 1 (code) (the-way-stage) | Claude Code | 144 | 25345 | 399023 | 591018 | 1154208 | 0 | 563192 | 1 | 62661 | 17 | 21177 | 2 |
| Slice 7: credits and paused-run test (the-way-stage) | Claude Code | 41 | 25357 | 231856 | 258342 | 247357 | 0 | 0 | 0 | 19101 | 4 | 0 | 0 |
| Slice 14: focus after Zatrzymaj (the-way-stage) | Claude Code | 65 | 25468 | 215808 | 252936 | 241951 | 0 | 0 | 0 | 45568 | 5 | 0 | 0 |
| Slice 12: hover line and tile table (the-way-stage) | Claude Code | 46 | 25304 | 160176 | 187444 | 177095 | 0 | 0 | 0 | 6069 | 3 | 0 | 0 |
| Slice 5: unit in wolf sentence (the-way-stage) | Claude Code | 30 | 25360 | 164033 | 191564 | 180579 | 0 | 0 | 0 | 13333 | 4 | 0 | 0 |
| Slice 17: click outside Konto menu (the-way-stage) | Claude Code | 34 | 25531 | 192615 | 216291 | 205306 | 0 | 0 | 0 | 15964 | 5 | 0 | 0 |
| Slice 6: program editor module tidy (the-way-stage) | Claude Code | 26 | 25339 | 210944 | 236172 | 225187 | 0 | 0 | 0 | 11863 | 2 | 0 | 0 |
| Plan slices for drobne-bledy-ekranow (the-way-stage) | Claude Code | 95 | 25241 | 309029 | 449686 | 439337 | 0 | 0 | 0 | 72199 | 20 | 83090 | 2 |
