# Measures of the cycle run

- Calls in all: 296
- Calls of the orchestrator: 63
- Calls of subagents: 233
- Mean context per call: 216862
- Mean context per call of the orchestrator: 156542
- Share of the context in calls above 200000 tokens: 74.1%
- Context of the orchestrator's first call: 47360
- Context of the orchestrator's middle call: 168431
- Context of the orchestrator's last call: 214948
- Cache written, 5 minutes: 424871
- Cache written, 1 hour: 613363
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 2338dd80-71cd-4abe-8604-6b13fd254289 | Claude Code | 63 | 47360 | 168431 | 214948 | 0 | 213054 | 0 | 0 | 4438 | 5 | 5036 | 2 |
| Review of the whole change (the-way-stage) | Claude Code | 84 | 25409 | 225028 | 348339 | 348337 | 0 | 0 | 0 | 54631 | 20 | 11424 | 2 |
| Review of the return step (the-way-stage) | Claude Code | 22 | 25411 | 73659 | 87596 | 76534 | 0 | 0 | 0 | 43249 | 8 | 0 | 0 |
| Author: four code and name fixes (the-way-author) | Claude Code | 127 | 25347 | 298758 | 400311 | 0 | 400309 | 0 | 0 | 56627 | 22 | 52954 | 1 |
