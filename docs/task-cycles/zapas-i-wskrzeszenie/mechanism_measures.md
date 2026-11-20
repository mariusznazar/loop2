# Measures of the cycle run

- Calls in all: 2448
- Calls of the orchestrator: 238
- Calls of subagents: 2210
- Mean context per call: 219682
- Mean context per call of the orchestrator: 382752
- Share of the context in calls above 200000 tokens: 72.5%
- Context of the orchestrator's first call: 45719
- Context of the orchestrator's middle call: 367355
- Context of the orchestrator's last call: 642143
- Cache written, 5 minutes: 11640686
- Cache written, 1 hour: 620452
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 3042362
- Calls of subagents with a cache write again: 11

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 54f8e36c-afad-4b49-905f-0d7b067dba02 | Claude Code | 238 | 45719 | 367355 | 642143 | 0 | 620452 | 0 | 0 | 10772 | 16 | 0 | 0 |
| Slice 4: measurement mode of three maps (the-way-stage) | Claude Code | 74 | 25722 | 259583 | 304854 | 304852 | 0 | 0 | 0 | 31843 | 4 | 0 | 0 |
| Slice 15: card of a solved map (the-way-stage) | Claude Code | 75 | 25826 | 262638 | 309878 | 298699 | 0 | 0 | 0 | 35918 | 10 | 4828 | 1 |
| Walk through the running game (the-way-stage) | Claude Code | 78 | 25810 | 125317 | 171342 | 171340 | 0 | 0 | 0 | 18101 | 4 | 0 | 0 |
| Review slice 2 (trust boundary) (the-way-stage) | Claude Code | 38 | 25672 | 137418 | 162385 | 151206 | 0 | 0 | 0 | 30179 | 7 | 0 | 0 |
| Slice 3: solved-map run takes from chest (the-way-stage) | Claude Code | 69 | 25674 | 200042 | 260736 | 481008 | 0 | 230815 | 1 | 38165 | 7 | 0 | 0 |
| Review slices 8-10 together (the-way-stage) | Claude Code | 105 | 25913 | 246419 | 373815 | 982691 | 0 | 608878 | 2 | 44852 | 6 | 0 | 0 |
| Review slice 1 foundation rules (the-way-stage) | Claude Code | 45 | 25647 | 141009 | 193505 | 193503 | 0 | 0 | 0 | 61602 | 15 | 0 | 0 |
| Review the return step (the-way-stage) | Claude Code | 82 | 25851 | 141923 | 228867 | 410571 | 0 | 181706 | 1 | 28634 | 12 | 0 | 0 |
| Review slice 7 (trust boundary) (the-way-stage) | Claude Code | 66 | 25776 | 194360 | 244812 | 244810 | 0 | 0 | 0 | 29507 | 12 | 0 | 0 |
| Slice 16: remove take from nowhere (the-way-stage) | Claude Code | 36 | 25802 | 136413 | 161328 | 150149 | 0 | 0 | 0 | 9838 | 4 | 1526 | 1 |
| Slice 5: view reads resurrection via function (the-way-stage) | Claude Code | 36 | 25726 | 182640 | 205205 | 194026 | 0 | 0 | 0 | 20704 | 4 | 0 | 0 |
| Slice 14: end-of-run window lines (the-way-stage) | Claude Code | 53 | 25904 | 227646 | 274416 | 263237 | 0 | 0 | 0 | 23107 | 6 | 8008 | 1 |
| Slice 7: tests of the load v8 (the-way-stage) | Claude Code | 90 | 25758 | 223926 | 287456 | 545291 | 0 | 268378 | 1 | 34306 | 12 | 0 | 0 |
| Slice 8: tests of death and completion (the-way-stage) | Claude Code | 46 | 25799 | 201591 | 237440 | 226261 | 0 | 0 | 0 | 23393 | 8 | 3829 | 1 |
| Fix findings of slices 8-10 review (the-way-stage) | Claude Code | 90 | 25999 | 191812 | 293272 | 533222 | 0 | 239952 | 1 | 4333 | 2 | 0 | 0 |
| Review the whole change (the-way-stage) | Claude Code | 101 | 25820 | 386008 | 519561 | 995357 | 0 | 475798 | 1 | 24655 | 9 | 38462 | 3 |
| Slice 9: catch-up and loops on uses (the-way-stage) | Claude Code | 73 | 25893 | 237360 | 288219 | 277040 | 0 | 0 | 0 | 19926 | 4 | 0 | 0 |
| Review slices 3-4 together (the-way-stage) | Claude Code | 68 | 25716 | 201030 | 264650 | 264648 | 0 | 0 | 0 | 30641 | 5 | 0 | 0 |
| Slice 1: foundation rules (the-way-stage) | Claude Code | 64 | 25670 | 170272 | 232023 | 453268 | 0 | 221247 | 1 | 98361 | 60 | 0 | 0 |
| Plan the slices of the task (the-way-stage) | Claude Code | 92 | 25629 | 329788 | 496334 | 496332 | 0 | 0 | 0 | 143994 | 19 | 54761 | 3 |
| Return step of the cycle (the-way-stage) | Claude Code | 165 | 25970 | 290087 | 382046 | 660950 | 0 | 290085 | 1 | 151211 | 37 | 0 | 0 |
| Slice 17: screen of solved-map run (the-way-stage) | Claude Code | 44 | 25806 | 208733 | 240040 | 228861 | 0 | 0 | 0 | 27948 | 6 | 1111 | 1 |
| Slice 13: clock tests on uses (the-way-stage) | Claude Code | 57 | 25892 | 252046 | 302607 | 565311 | 0 | 273883 | 1 | 52065 | 10 | 842 | 1 |
| Slice 2: load admits deposit (the-way-stage) | Claude Code | 32 | 25648 | 142118 | 166223 | 155680 | 0 | 0 | 0 | 21902 | 9 | 2932 | 2 |
| Review slices 15-18 together (the-way-stage) | Claude Code | 38 | 25795 | 171737 | 265638 | 265636 | 0 | 0 | 0 | 60134 | 6 | 0 | 0 |
| Slice 10: balance instrument counts uses (the-way-stage) | Claude Code | 73 | 25936 | 187594 | 253354 | 242175 | 0 | 0 | 0 | 14496 | 6 | 0 | 0 |
| Slice 12: resurrection line at characters (the-way-stage) | Claude Code | 53 | 25892 | 223902 | 269251 | 258708 | 0 | 0 | 0 | 28654 | 5 | 0 | 0 |
| Fix Minor findings of the whole review (the-way-stage) | Claude Code | 102 | 25840 | 166496 | 282653 | 282651 | 0 | 0 | 0 | 32541 | 11 | 0 | 0 |
| Slice 18: the page test (the-way-stage) | Claude Code | 36 | 25808 | 125316 | 145437 | 145435 | 0 | 0 | 0 | 5417 | 2 | 6698 | 2 |
| Slice 6: resurrection uses in state (the-way-stage) | Claude Code | 77 | 25743 | 220530 | 260927 | 512545 | 0 | 251620 | 1 | 36867 | 6 | 0 | 0 |
| Review slices 5-6 (trust boundary) (the-way-stage) | Claude Code | 53 | 25726 | 209276 | 250016 | 250014 | 0 | 0 | 0 | 41861 | 7 | 0 | 0 |
| Slice 11: foundation texts of the screens (the-way-stage) | Claude Code | 38 | 25901 | 116659 | 150157 | 138978 | 0 | 0 | 0 | 96442 | 28 | 0 | 0 |
| Review slices 11-14 together (the-way-stage) | Claude Code | 61 | 25832 | 191516 | 296233 | 296231 | 0 | 0 | 0 | 30716 | 5 | 0 | 0 |
