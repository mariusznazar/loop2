# Measures of the cycle run

- Calls in all: 325
- Calls of the orchestrator: 75
- Calls of subagents: 250
- Mean context per call: 201554
- Mean context per call of the orchestrator: 188166
- Share of the context in calls above 200000 tokens: 71.7%
- Context of the orchestrator's first call: 46753
- Context of the orchestrator's middle call: 191699
- Context of the orchestrator's last call: 275618
- Cache written, 5 minutes: 700088
- Cache written, 1 hour: 1023804
- Cache written again by the orchestrator: 176506
- Calls of the orchestrator with a cache write again: 1
- Cache written again by subagents: 515683
- Calls of subagents with a cache write again: 2

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 601c45f7-617f-4bd1-ae06-a4de79fc8267 | Claude Code | 75 | 46753 | 191699 | 275618 | 0 | 430058 | 176506 | 1 | 1390 | 3 | 4684 | 2 |
| Review of return step range (the-way-stage) | Claude Code | 35 | 24974 | 90273 | 114377 | 114375 | 0 | 0 | 0 | 11802 | 4 | 0 | 0 |
| Review of whole change (the-way-stage) | Claude Code | 80 | 24901 | 214020 | 312773 | 585713 | 0 | 272942 | 1 | 115589 | 11 | 1907 | 1 |
| One author of CI change (the-way-author) | Claude Code | 135 | 24892 | 241184 | 361354 | 0 | 593746 | 242741 | 1 | 56343 | 22 | 0 | 0 |
