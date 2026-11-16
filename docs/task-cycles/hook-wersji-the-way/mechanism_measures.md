# Measures of the cycle run

- Calls in all: 270
- Calls of the orchestrator: 76
- Calls of subagents: 194
- Mean context per call: 175183
- Mean context per call of the orchestrator: 165009
- Share of the context in calls above 200000 tokens: 53.4%
- Context of the orchestrator's first call: 46115
- Context of the orchestrator's middle call: 178224
- Context of the orchestrator's last call: 228827
- Cache written, 5 minutes: 543280
- Cache written, 1 hour: 517173
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 191227
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator c95d9d80-ba94-4d02-8fff-9e38106dfc60 | Claude Code | 76 | 46115 | 178224 | 228827 | 0 | 208128 | 0 | 0 | 15013 | 6 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 59 | 24970 | 161970 | 234670 | 414912 | 0 | 191227 | 1 | 35251 | 10 | 41327 | 3 |
| Author of the hook change (the-way-author) | Claude Code | 111 | 24973 | 211845 | 320078 | 0 | 309045 | 0 | 0 | 78588 | 28 | 0 | 0 |
| Review of the return step (the-way-stage) | Claude Code | 24 | 25016 | 113897 | 139353 | 128368 | 0 | 0 | 0 | 25483 | 7 | 0 | 0 |
