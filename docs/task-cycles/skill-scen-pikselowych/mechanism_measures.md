# Measures of the cycle run

- Calls in all: 375
- Calls of the orchestrator: 102
- Calls of subagents: 273
- Mean context per call: 268065
- Mean context per call of the orchestrator: 246582
- Share of the context in calls above 200000 tokens: 87.7%
- Context of the orchestrator's first call: 44639
- Context of the orchestrator's middle call: 259132
- Context of the orchestrator's last call: 354994
- Cache written, 5 minutes: 940139
- Cache written, 1 hour: 774981
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 598372
- Calls of subagents with a cache write again: 2

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 4d713769-4c0f-49ac-bc49-5d93bccc1842 | Claude Code | 102 | 44639 | 259132 | 354994 | 0 | 332446 | 0 | 0 | 1353 | 2 | 4787 | 1 |
| One author: scene-graphics skill (the-way-author) | Claude Code | 167 | 24962 | 332573 | 453568 | 0 | 442535 | 0 | 0 | 103069 | 23 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 106 | 25204 | 222195 | 352752 | 940139 | 0 | 598372 | 2 | 74280 | 18 | 40278 | 4 |
