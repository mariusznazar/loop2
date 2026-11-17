# Measures of the cycle run

- Calls in all: 439
- Calls of the orchestrator: 66
- Calls of subagents: 373
- Mean context per call: 312336
- Mean context per call of the orchestrator: 157198
- Share of the context in calls above 200000 tokens: 89.5%
- Context of the orchestrator's first call: 44743
- Context of the orchestrator's middle call: 153194
- Context of the orchestrator's last call: 225080
- Cache written, 5 minutes: 287877
- Cache written, 1 hour: 785484
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 0b10e9af-504f-4f41-ab76-e1a77f8e3b98 | Claude Code | 66 | 44743 | 153194 | 225080 | 0 | 204658 | 0 | 0 | 3629 | 2 | 4847 | 1 |
| One author: browser session task (the-way-author) | Claude Code | 300 | 25467 | 387852 | 580828 | 0 | 580826 | 0 | 0 | 62363 | 9 | 5096 | 2 |
| Review whole change (the-way-stage) | Claude Code | 73 | 25401 | 219118 | 298303 | 287877 | 0 | 0 | 0 | 39912 | 12 | 7936 | 2 |
