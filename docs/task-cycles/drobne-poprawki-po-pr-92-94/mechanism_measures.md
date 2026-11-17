# Measures of the cycle run

- Calls in all: 321
- Calls of the orchestrator: 56
- Calls of subagents: 265
- Mean context per call: 242992
- Mean context per call of the orchestrator: 182102
- Share of the context in calls above 200000 tokens: 77.7%
- Context of the orchestrator's first call: 47489
- Context of the orchestrator's middle call: 187136
- Context of the orchestrator's last call: 252870
- Cache written, 5 minutes: 383161
- Cache written, 1 hour: 701676
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 1fa69605-6b14-409c-9d84-81aed3dd9d59 | Claude Code | 56 | 47489 | 187136 | 252870 | 0 | 232448 | 0 | 0 | 13010 | 7 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 77 | 25430 | 162808 | 322794 | 322792 | 0 | 0 | 0 | 55127 | 15 | 43305 | 3 |
| One author: drobne poprawki task (the-way-author) | Claude Code | 174 | 25327 | 309242 | 469230 | 0 | 469228 | 0 | 0 | 52820 | 44 | 5588 | 2 |
| Review of the return step commits (the-way-stage) | Claude Code | 14 | 25305 | 59440 | 71431 | 60369 | 0 | 0 | 0 | 15037 | 9 | 0 | 0 |
