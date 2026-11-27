# Measures of the cycle run

- Calls in all: 3312
- Calls of the orchestrator: 373
- Calls of subagents: 2939
- Mean context per call: 217484
- Mean context per call of the orchestrator: 315069
- Share of the context in calls above 200000 tokens: 71.9%
- Context of the orchestrator's first call: 46848
- Context of the orchestrator's middle call: 460758
- Context of the orchestrator's last call: 552567
- Cache written, 5 minutes: 12002666
- Cache written, 1 hour: 970027
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 750264
- Calls of subagents with a cache write again: 3

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 28b9e285-2cdf-4b51-b187-3940c22ac842 | Claude Code | 183 | 49854 | 356862 | 552567 | 0 | 521209 | 0 | 0 | 7021 | 13 | 0 | 0 |
| Fix of return step findings (the-way-stage) | Claude Code | 16 | 26876 | 82606 | 93210 | 93208 | 0 | 0 | 0 | 30956 | 12 | 0 | 0 |
| model probe 2 (the-way-stage) | Claude Code | 1 | 26458 | 26458 | 26458 | 26456 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Review of the return step (the-way-stage) | Claude Code | 67 | 26855 | 240545 | 305982 | 590718 | 0 | 296081 | 1 | 44301 | 15 | 0 | 0 |
| Return step over gate fix (the-way-stage) | Claude Code | 7 | 26693 | 44276 | 58996 | 47651 | 0 | 0 | 0 | 2862 | 2 | 0 | 0 |
| Correction 1a: chronicle line, tile name (the-way-stage) | Claude Code | 95 | 26324 | 250038 | 313198 | 313196 | 0 | 0 | 0 | 83350 | 16 | 0 | 0 |
| Fix of the red CI gate (the-way-stage) | Claude Code | 14 | 26657 | 74060 | 80602 | 80600 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Correction 1b: walk and layout (the-way-stage) | Claude Code | 118 | 26516 | 152790 | 231511 | 220166 | 0 | 0 | 0 | 22805 | 9 | 0 | 0 |
| Return step over correction (the-way-stage) | Claude Code | 21 | 26623 | 87775 | 126110 | 126108 | 0 | 0 | 0 | 70442 | 12 | 0 | 0 |
| Review of correction 1 (the-way-stage) | Claude Code | 72 | 26571 | 140788 | 340719 | 340717 | 0 | 0 | 0 | 75672 | 12 | 0 | 0 |
| Return step, second dispatch (the-way-stage) | Claude Code | 102 | 26742 | 276712 | 353212 | 353210 | 0 | 0 | 0 | 127252 | 78 | 0 | 0 |
| orchestrator ae74e0ed-75ca-467c-a601-d3775e106b90 | Claude Code | 190 | 46848 | 300637 | 469850 | 0 | 448818 | 0 | 0 | 24700 | 15 | 0 | 0 |
| Executor Slice 2 gear acts (the-way-stage) | Claude Code | 48 | 26453 | 119120 | 151346 | 151344 | 0 | 0 | 0 | 21304 | 4 | 0 | 0 |
| Executor Slice 6 condition Puste (the-way-stage) | Claude Code | 81 | 26578 | 183264 | 224843 | 213475 | 0 | 0 | 0 | 18702 | 8 | 0 | 0 |
| Executor Slice 9 icon (the-way-stage) | Claude Code | 76 | 26652 | 176980 | 223588 | 223586 | 0 | 0 | 0 | 223 | 1 | 0 | 0 |
| Foundation entries part B (the-way-stage) | Claude Code | 99 | 26173 | 256231 | 320278 | 308933 | 0 | 0 | 0 | 235380 | 128 | 0 | 0 |
| Executor Slice 5 view defaults (the-way-stage) | Claude Code | 19 | 26623 | 165494 | 178621 | 167253 | 0 | 0 | 0 | 15340 | 3 | 0 | 0 |
| Fix part 1 code and tests (the-way-stage) | Claude Code | 111 | 26644 | 302324 | 379399 | 368054 | 0 | 0 | 0 | 54105 | 11 | 0 | 0 |
| model probe 1 (the-way-stage) | Claude Code | 1 | 25854 | 25854 | 25854 | 15145 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Executor Slice 13 editor pick (the-way-stage) | Claude Code | 73 | 26477 | 268553 | 322070 | 310702 | 0 | 0 | 0 | 22610 | 2 | 0 | 0 |
| Executor Slice 23 fight walk (the-way-stage) | Claude Code | 104 | 26659 | 156271 | 232350 | 232348 | 0 | 0 | 0 | 9867 | 5 | 0 | 0 |
| Executor Slice 12 map-run words (the-way-stage) | Claude Code | 40 | 26640 | 96593 | 136104 | 136102 | 0 | 0 | 0 | 19106 | 3 | 0 | 0 |
| Executor Slice 11 styleguide (the-way-stage) | Claude Code | 35 | 26562 | 219037 | 244413 | 233068 | 0 | 0 | 0 | 107123 | 12 | 0 | 0 |
| Review Slice 10 (the-way-stage) | Claude Code | 62 | 26621 | 198935 | 234940 | 224231 | 0 | 0 | 0 | 56358 | 3 | 0 | 0 |
| Foundation entries part C (the-way-stage) | Claude Code | 53 | 26367 | 127686 | 165001 | 153656 | 0 | 0 | 0 | 78217 | 29 | 0 | 0 |
| Executor Slice 3 transfers (the-way-stage) | Claude Code | 68 | 26514 | 275301 | 324382 | 313673 | 0 | 0 | 0 | 117975 | 9 | 0 | 0 |
| Executor Slice 15 gear line and browser check (the-way-stage) | Claude Code | 94 | 26490 | 241931 | 294961 | 283593 | 0 | 0 | 0 | 18455 | 2 | 0 | 0 |
| Review Slice 9 (the-way-stage) | Claude Code | 37 | 26641 | 83946 | 165159 | 154450 | 0 | 0 | 0 | 7104 | 1 | 0 | 0 |
| Foundation entries part A (the-way-stage) | Claude Code | 43 | 26091 | 172638 | 256218 | 256216 | 0 | 0 | 0 | 73788 | 21 | 3003 | 1 |
| Executor Slice 10 judging cache (the-way-stage) | Claude Code | 47 | 26592 | 115532 | 159522 | 310364 | 0 | 150844 | 1 | 30102 | 2 | 0 | 0 |
| Executor Slice 22 balance loop campaign (the-way-stage) | Claude Code | 57 | 26725 | 137737 | 180447 | 169079 | 0 | 0 | 0 | 224 | 1 | 0 | 0 |
| Executor Slice 1 gear state (the-way-stage) | Claude Code | 114 | 26340 | 356736 | 433146 | 422437 | 0 | 0 | 0 | 67122 | 12 | 0 | 0 |
| Executor Slice 17 kitchen-sink tile (the-way-stage) | Claude Code | 41 | 26438 | 117337 | 146704 | 146702 | 0 | 0 | 0 | 5911 | 3 | 0 | 0 |
| Executor Slice 4b test citations (the-way-stage) | Claude Code | 22 | 26639 | 77198 | 94720 | 94718 | 0 | 0 | 0 | 29462 | 8 | 0 | 0 |
| Executor Slice 4 strike and combat (the-way-stage) | Claude Code | 91 | 26596 | 266754 | 324025 | 312680 | 0 | 0 | 0 | 61693 | 8 | 0 | 0 |
| Review Slice 4 (the-way-stage) | Claude Code | 56 | 26615 | 190154 | 222454 | 211109 | 0 | 0 | 0 | 49522 | 3 | 0 | 0 |
| Planner for wyposazenie-postaci (the-way-stage) | Claude Code | 109 | 26073 | 435963 | 657126 | 645781 | 0 | 0 | 0 | 236230 | 25 | 6946 | 1 |
| Return step (the-way-stage) | Claude Code | 46 | 26571 | 218420 | 267626 | 256281 | 0 | 0 | 0 | 26375 | 6 | 0 | 0 |
| Review Slice 8 (the-way-stage) | Claude Code | 56 | 26680 | 115054 | 198079 | 187370 | 0 | 0 | 0 | 20382 | 4 | 0 | 0 |
| Executor Slice 14 rule panel (the-way-stage) | Claude Code | 47 | 26552 | 184393 | 284763 | 273395 | 0 | 0 | 0 | 11222 | 4 | 0 | 0 |
| Executor Slice 18 figure moves (the-way-stage) | Claude Code | 35 | 26465 | 210063 | 237353 | 226008 | 0 | 0 | 0 | 19689 | 4 | 0 | 0 |
| Executor Slice 8 Zaloz in combat (the-way-stage) | Claude Code | 80 | 26467 | 217707 | 283425 | 272080 | 0 | 0 | 0 | 37928 | 8 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 86 | 26619 | 279459 | 351104 | 654441 | 0 | 303339 | 1 | 69507 | 12 | 1964 | 1 |
| Executor Slice 21 balance instrument (the-way-stage) | Claude Code | 90 | 26782 | 180424 | 225418 | 225416 | 0 | 0 | 0 | 13085 | 2 | 0 | 0 |
| Executor Slice 19 gear tiles (the-way-stage) | Claude Code | 67 | 26445 | 292083 | 331199 | 319854 | 0 | 0 | 0 | 27762 | 10 | 0 | 0 |
| Executor Slice 20 pick and screenshots (the-way-stage) | Claude Code | 99 | 26596 | 261756 | 302315 | 290970 | 0 | 0 | 0 | 7069 | 2 | 0 | 0 |
| Fix part 2 foundation and guidelines (the-way-stage) | Claude Code | 38 | 26591 | 133658 | 171687 | 171685 | 0 | 0 | 0 | 63786 | 16 | 0 | 0 |
| Review Slice 1 and foundation (the-way-stage) | Claude Code | 58 | 26431 | 255887 | 299337 | 287992 | 0 | 0 | 0 | 8773 | 6 | 0 | 0 |
| Executor Slice 7b encounters tests (the-way-stage) | Claude Code | 12 | 26588 | 56010 | 67667 | 67665 | 0 | 0 | 0 | 3003 | 2 | 0 | 0 |
| Executor Slice 16 tile control (the-way-stage) | Claude Code | 41 | 26459 | 178569 | 197262 | 197260 | 0 | 0 | 0 | 17309 | 4 | 0 | 0 |
| Executor Slice 7 action Zaloz (the-way-stage) | Claude Code | 90 | 26563 | 276593 | 321522 | 321520 | 0 | 0 | 0 | 76465 | 11 | 0 | 0 |
