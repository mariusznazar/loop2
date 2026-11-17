# Measures of the cycle run

- Calls in all: 622
- Calls of the orchestrator: 136
- Calls of subagents: 486
- Mean context per call: 331157
- Mean context per call of the orchestrator: 246350
- Share of the context in calls above 200000 tokens: 91.3%
- Context of the orchestrator's first call: 44743
- Context of the orchestrator's middle call: 238958
- Context of the orchestrator's last call: 402337
- Cache written, 5 minutes: 779569
- Cache written, 1 hour: 1049662
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 287877
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 0b10e9af-504f-4f41-ab76-e1a77f8e3b98 | Claude Code | 136 | 44743 | 238958 | 402337 | 0 | 381915 | 0 | 0 | 3844 | 3 | 4847 | 1 |
| One author: browser session task (the-way-author) | Claude Code | 352 | 25467 | 414102 | 667749 | 0 | 667747 | 0 | 0 | 84451 | 14 | 5096 | 2 |
| Review return step of correction 1 (the-way-stage) | Claude Code | 33 | 25371 | 123023 | 150716 | 139654 | 0 | 0 | 0 | 29459 | 9 | 0 | 0 |
| Review whole change (the-way-stage) | Claude Code | 101 | 25401 | 249097 | 362464 | 639915 | 0 | 287877 | 1 | 44832 | 14 | 7936 | 2 |
