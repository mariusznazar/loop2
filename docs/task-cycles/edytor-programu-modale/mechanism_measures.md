# Measures of the cycle run

- Calls in all: 638
- Calls of the orchestrator: 76
- Calls of subagents: 562
- Mean context per call: 395352
- Mean context per call of the orchestrator: 190920
- Share of the context in calls above 200000 tokens: 90.5%
- Context of the orchestrator's first call: 46799
- Context of the orchestrator's middle call: 193460
- Context of the orchestrator's last call: 285596
- Cache written, 5 minutes: 1495926
- Cache written, 1 hour: 1074712
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 601216
- Calls of subagents with a cache write again: 2

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 777aca79-b74e-4d92-89de-6e3ae71523b6 | Claude Code | 76 | 46799 | 193460 | 285596 | 0 | 262723 | 0 | 0 | 9827 | 7 | 2761 | 2 |
| Author of the editor-window change (the-way-author) | Claude Code | 327 | 26305 | 586206 | 811991 | 0 | 811989 | 0 | 0 | 212467 | 48 | 0 | 0 |
| Review of the repeated return step (the-way-stage) | Claude Code | 32 | 26348 | 125527 | 163793 | 152448 | 0 | 0 | 0 | 23570 | 3 | 0 | 0 |
| Review of the two requested changes (the-way-stage) | Claude Code | 64 | 26344 | 124099 | 199507 | 351296 | 0 | 162498 | 1 | 35724 | 7 | 0 | 0 |
| Review of the return step (the-way-stage) | Claude Code | 22 | 26371 | 84511 | 101328 | 89983 | 0 | 0 | 0 | 17738 | 8 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 117 | 26357 | 382447 | 474826 | 902199 | 0 | 438718 | 1 | 93503 | 18 | 80034 | 2 |
