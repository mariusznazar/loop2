# Measures of the cycle run

- Calls in all: 229
- Calls of the orchestrator: 79
- Calls of subagents: 150
- Mean context per call: 173003
- Mean context per call of the orchestrator: 174022
- Share of the context in calls above 200000 tokens: 56.2%
- Context of the orchestrator's first call: 44600
- Context of the orchestrator's middle call: 180011
- Context of the orchestrator's last call: 251226
- Cache written, 5 minutes: 271548
- Cache written, 1 hour: 468679
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 25465325-6d65-4ae1-94e5-db35b1483cb3 | Claude Code | 79 | 44600 | 180011 | 251226 | 0 | 230157 | 0 | 0 | 6841 | 10 | 1810 | 1 |
| Review of the whole change (the-way-stage) | Claude Code | 73 | 25228 | 158153 | 281897 | 271548 | 0 | 0 | 0 | 77956 | 14 | 8798 | 2 |
| Author of restored decisions (the-way-author) | Claude Code | 77 | 25270 | 192662 | 249555 | 0 | 238522 | 0 | 0 | 74339 | 35 | 15941 | 2 |
