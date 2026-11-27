# Measures of the cycle run

- Calls in all: 1768
- Calls of the orchestrator: 229
- Calls of subagents: 1539
- Mean context per call: 233487
- Mean context per call of the orchestrator: 381852
- Share of the context in calls above 200000 tokens: 72.5%
- Context of the orchestrator's first call: 48880
- Context of the orchestrator's middle call: 376600
- Context of the orchestrator's last call: 608052
- Cache written, 5 minutes: 7110710
- Cache written, 1 hour: 1022774
- Cache written again by the orchestrator: 439252
- Calls of the orchestrator with a cache write again: 1
- Cache written again by subagents: 829471
- Calls of subagents with a cache write again: 2

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator d9513e70-7350-4dd8-9434-35210563b7c9 | Claude Code | 229 | 48880 | 376600 | 608052 | 0 | 1022774 | 439252 | 1 | 14492 | 17 | 0 | 0 |
| Walk the game for rana-i-opatrunek (the-way-stage) | Claude Code | 119 | 26464 | 184470 | 240666 | 229321 | 0 | 0 | 0 | 3694 | 1 | 0 | 0 |
| model probe 1 (the-way-stage) | Claude Code | 1 | 25997 | 25997 | 25997 | 25995 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Whole-change review (the-way-stage) | Claude Code | 146 | 26571 | 374727 | 475551 | 893764 | 0 | 418215 | 1 | 2304 | 4 | 5642 | 2 |
| Slice 4 executor: Ucisk in sim (the-way-stage) | Claude Code | 121 | 26457 | 367786 | 439572 | 850826 | 0 | 411256 | 1 | 94295 | 12 | 0 | 0 |
| Review correction 1 (the-way-stage) | Claude Code | 70 | 26515 | 175476 | 317525 | 317523 | 0 | 0 | 0 | 52470 | 12 | 0 | 0 |
| Slice 10 executor: view lists (the-way-stage) | Claude Code | 18 | 26551 | 150794 | 163929 | 152561 | 0 | 0 | 0 | 2867 | 2 | 0 | 0 |
| Slice 8 executor: branch values (the-way-stage) | Claude Code | 22 | 26743 | 229779 | 245847 | 234479 | 0 | 0 | 0 | 13204 | 3 | 0 | 0 |
| Correction 1B: guideline sentence (the-way-stage) | Claude Code | 14 | 26527 | 68564 | 75271 | 75269 | 0 | 0 | 0 | 13424 | 4 | 0 | 0 |
| Slice 3 executor: healing effects (the-way-stage) | Claude Code | 34 | 26469 | 190693 | 220488 | 209120 | 0 | 0 | 0 | 24198 | 7 | 0 | 0 |
| Review Slice 6 (trust boundary) (the-way-stage) | Claude Code | 53 | 26869 | 168691 | 209042 | 209040 | 0 | 0 | 0 | 17165 | 4 | 0 | 0 |
| Plan rana-i-opatrunek slices (the-way-stage) | Claude Code | 111 | 26311 | 380601 | 525725 | 514380 | 0 | 0 | 0 | 1276 | 3 | 37628 | 1 |
| Slice 1 executor: pairs in skills (the-way-stage) | Claude Code | 36 | 26322 | 162863 | 185380 | 174035 | 0 | 0 | 0 | 23320 | 6 | 0 | 0 |
| Review return step commits (the-way-stage) | Claude Code | 39 | 26563 | 119347 | 192607 | 192605 | 0 | 0 | 0 | 40997 | 8 | 0 | 0 |
| Slice 5 executor: tests agree (the-way-stage) | Claude Code | 51 | 26722 | 148165 | 187703 | 187701 | 0 | 0 | 0 | 20902 | 8 | 0 | 0 |
| Slice 2 executor: tending tree (the-way-stage) | Claude Code | 32 | 26421 | 218763 | 249180 | 249178 | 0 | 0 | 0 | 26730 | 4 | 0 | 0 |
| Review second return step (the-way-stage) | Claude Code | 21 | 26546 | 72248 | 92948 | 81603 | 0 | 0 | 0 | 22931 | 9 | 0 | 0 |
| Return step over correction 1 (the-way-stage) | Claude Code | 31 | 26482 | 79200 | 112730 | 112728 | 0 | 0 | 0 | 6799 | 8 | 0 | 0 |
| Slice 7 executor: paragraph words (the-way-stage) | Claude Code | 34 | 26885 | 184690 | 215467 | 215465 | 0 | 0 | 0 | 31640 | 6 | 0 | 0 |
| Slice 6 executor: saved game v12 (the-way-stage) | Claude Code | 85 | 26724 | 244646 | 296739 | 296737 | 0 | 0 | 0 | 19771 | 6 | 0 | 0 |
| Repair eight quotation lines (the-way-stage) | Claude Code | 12 | 26465 | 48671 | 56967 | 45622 | 0 | 0 | 0 | 15634 | 3 | 0 | 0 |
| Slice 11 executor: reference program (the-way-stage) | Claude Code | 50 | 26516 | 154913 | 189682 | 189680 | 0 | 0 | 0 | 27973 | 5 | 0 | 0 |
| Correction 1A: pair at rule check (the-way-stage) | Claude Code | 57 | 26414 | 197935 | 226630 | 226628 | 0 | 0 | 0 | 17350 | 2 | 0 | 0 |
| Fix whole-change review findings (the-way-stage) | Claude Code | 82 | 26545 | 189026 | 243297 | 243295 | 0 | 0 | 0 | 15462 | 4 | 0 | 0 |
| Slice 9 executor: Ucisk in pick (the-way-stage) | Claude Code | 37 | 26656 | 172295 | 210318 | 198950 | 0 | 0 | 0 | 27526 | 2 | 0 | 0 |
| Foundation entries for rana-i-opatrunek (the-way-stage) | Claude Code | 42 | 26302 | 153629 | 192717 | 192715 | 0 | 0 | 0 | 25328 | 23 | 0 | 0 |
| Correction 1C: Teraz row at 360 px (the-way-stage) | Claude Code | 59 | 26393 | 224692 | 250803 | 239458 | 0 | 0 | 0 | 30141 | 2 | 0 | 0 |
| Return step for rana-i-opatrunek (the-way-stage) | Claude Code | 90 | 26398 | 251894 | 316205 | 316203 | 0 | 0 | 0 | 137922 | 54 | 0 | 0 |
| Review Slice 4 (trust boundary) (the-way-stage) | Claude Code | 72 | 26680 | 196458 | 247174 | 235829 | 0 | 0 | 0 | 46349 | 4 | 0 | 0 |
