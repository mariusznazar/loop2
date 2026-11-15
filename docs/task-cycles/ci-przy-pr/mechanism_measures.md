# Measures of the cycle run

- Calls in all: 443
- Calls of the orchestrator: 139
- Calls of subagents: 304
- Mean context per call: 218917
- Mean context per call of the orchestrator: 259579
- Share of the context in calls above 200000 tokens: 78.1%
- Context of the orchestrator's first call: 46753
- Context of the orchestrator's middle call: 258983
- Context of the orchestrator's last call: 393983
- Cache written, 5 minutes: 803094
- Cache written, 1 hour: 1172735
- Cache written again by the orchestrator: 176506
- Calls of the orchestrator with a cache write again: 1
- Cache written again by subagents: 515683
- Calls of subagents with a cache write again: 2

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 601c45f7-617f-4bd1-ae06-a4de79fc8267 | Claude Code | 139 | 46753 | 258983 | 393983 | 0 | 545320 | 176506 | 1 | 2147 | 8 | 4684 | 2 |
| Review of correction 1 (the-way-stage) | Claude Code | 36 | 24990 | 76573 | 103008 | 103006 | 0 | 0 | 0 | 14541 | 6 | 0 | 0 |
| Review of return step range (the-way-stage) | Claude Code | 35 | 24974 | 90273 | 114377 | 114375 | 0 | 0 | 0 | 11802 | 4 | 0 | 0 |
| Review of whole change (the-way-stage) | Claude Code | 80 | 24901 | 214020 | 312773 | 585713 | 0 | 272942 | 1 | 115589 | 11 | 1907 | 1 |
| One author of CI change (the-way-author) | Claude Code | 153 | 24892 | 252413 | 395023 | 0 | 627415 | 242741 | 1 | 68102 | 30 | 0 | 0 |
