# Measures of the cycle run

- Calls in all: 386
- Calls of the orchestrator: 96
- Calls of subagents: 290
- Mean context per call: 264720
- Mean context per call of the orchestrator: 243599
- Share of the context in calls above 200000 tokens: 83.0%
- Context of the orchestrator's first call: 47489
- Context of the orchestrator's middle call: 244031
- Context of the orchestrator's last call: 360050
- Cache written, 5 minutes: 718040
- Cache written, 1 hour: 831130
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 322792
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 1fa69605-6b14-409c-9d84-81aed3dd9d59 | Claude Code | 96 | 47489 | 244031 | 360050 | 0 | 339628 | 0 | 0 | 20342 | 13 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 84 | 25430 | 199957 | 334881 | 657671 | 0 | 322792 | 1 | 61262 | 18 | 43305 | 3 |
| One author: drobne poprawki task (the-way-author) | Claude Code | 192 | 25327 | 326306 | 491504 | 0 | 491502 | 0 | 0 | 73272 | 54 | 5588 | 2 |
| Review of the return step commits (the-way-stage) | Claude Code | 14 | 25305 | 59440 | 71431 | 60369 | 0 | 0 | 0 | 15037 | 9 | 0 | 0 |
