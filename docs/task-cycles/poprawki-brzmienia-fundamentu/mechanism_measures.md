# Measures of the cycle run

- Calls in all: 979
- Calls of the orchestrator: 126
- Calls of subagents: 853
- Mean context per call: 156903
- Mean context per call of the orchestrator: 249227
- Share of the context in calls above 200000 tokens: 45.2%
- Context of the orchestrator's first call: 44756
- Context of the orchestrator's middle call: 249932
- Context of the orchestrator's last call: 371009
- Cache written, 5 minutes: 3958453
- Cache written, 1 hour: 350587
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 319326
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator badc9543-d7a4-4c2b-8c58-1540cb82cf22 | Claude Code | 126 | 44756 | 249932 | 371009 | 0 | 350587 | 0 | 0 | 30532 | 39 | 0 | 0 |
| Plan slices for wording task (the-way-stage) | Claude Code | 99 | 25376 | 201220 | 329579 | 329577 | 0 | 0 | 0 | 27736 | 23 | 0 | 0 |
| Executor slice 12 D-44 and D-03 (the-way-stage) | Claude Code | 21 | 25881 | 96897 | 197031 | 185969 | 0 | 0 | 0 | 40350 | 10 | 0 | 0 |
| Executor slice 3 simulation test comments (the-way-stage) | Claude Code | 28 | 25521 | 116047 | 139902 | 139900 | 0 | 0 | 0 | 243 | 1 | 0 | 0 |
| Fix whole-change review findings (the-way-stage) | Claude Code | 54 | 25784 | 135474 | 171449 | 171447 | 0 | 0 | 0 | 41529 | 14 | 0 | 0 |
| Executor slice 11 scene decisions (the-way-stage) | Claude Code | 32 | 25853 | 141984 | 175487 | 175485 | 0 | 0 | 0 | 70293 | 24 | 0 | 0 |
| Executor slice 16 picture band comments (the-way-stage) | Claude Code | 24 | 25839 | 186003 | 213751 | 202689 | 0 | 0 | 0 | 9075 | 2 | 0 | 0 |
| Executor slice 15 picture band foundation (the-way-stage) | Claude Code | 30 | 25761 | 83649 | 102353 | 102351 | 0 | 0 | 0 | 37148 | 8 | 0 | 0 |
| Executor slice 5 invariant decision links (the-way-stage) | Claude Code | 19 | 25634 | 74808 | 92324 | 92322 | 0 | 0 | 0 | 32607 | 7 | 0 | 0 |
| Executor slice 1 glossary part map (the-way-stage) | Claude Code | 17 | 25385 | 104994 | 116818 | 116816 | 0 | 0 | 0 | 24471 | 8 | 0 | 0 |
| Return step comparison with code (the-way-stage) | Claude Code | 57 | 25767 | 131263 | 175561 | 164499 | 0 | 0 | 0 | 33908 | 17 | 0 | 0 |
| Review return step commit (the-way-stage) | Claude Code | 14 | 25678 | 59518 | 72860 | 61798 | 0 | 0 | 0 | 12083 | 5 | 0 | 0 |
| Executor slice 9 game decisions (the-way-stage) | Claude Code | 22 | 25805 | 146756 | 176028 | 164966 | 0 | 0 | 0 | 87991 | 14 | 0 | 0 |
| Executor slice 13 saving decisions (the-way-stage) | Claude Code | 24 | 25857 | 179483 | 199638 | 188576 | 0 | 0 | 0 | 48790 | 10 | 0 | 0 |
| Review whole change (the-way-stage) | Claude Code | 118 | 25702 | 253857 | 342035 | 661359 | 0 | 319326 | 1 | 14113 | 16 | 15321 | 3 |
| Executor slice 10 run screen decisions (the-way-stage) | Claude Code | 51 | 25926 | 115422 | 229257 | 229255 | 0 | 0 | 0 | 68696 | 30 | 0 | 0 |
| Executor slice 17 styleguide security notes (the-way-stage) | Claude Code | 24 | 25763 | 76883 | 96731 | 96729 | 0 | 0 | 0 | 14441 | 2 | 0 | 0 |
| Executor slice 14 screens decisions (the-way-stage) | Claude Code | 48 | 25754 | 90409 | 117050 | 105988 | 0 | 0 | 0 | 27473 | 21 | 0 | 0 |
| Executor slice 2 environment facts (the-way-stage) | Claude Code | 46 | 25455 | 98400 | 141928 | 130866 | 0 | 0 | 0 | 18410 | 7 | 0 | 0 |
| Executor slice 6 server decisions (the-way-stage) | Claude Code | 43 | 25679 | 162077 | 204593 | 193531 | 0 | 0 | 0 | 68940 | 24 | 0 | 0 |
| Executor slice 7 testing decisions (the-way-stage) | Claude Code | 24 | 25742 | 150449 | 166807 | 155745 | 0 | 0 | 0 | 41656 | 22 | 0 | 0 |
| Executor slice 8 D-104 D-271 D-49 (the-way-stage) | Claude Code | 39 | 25729 | 168934 | 192238 | 181176 | 0 | 0 | 0 | 37928 | 12 | 0 | 0 |
| Executor slice 4 invariant wording (the-way-stage) | Claude Code | 19 | 25517 | 100853 | 118471 | 107409 | 0 | 0 | 0 | 8427 | 2 | 0 | 0 |
