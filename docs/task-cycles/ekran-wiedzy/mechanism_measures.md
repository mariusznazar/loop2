# Measures of the cycle run

- Calls in all: 466
- Calls of the orchestrator: 111
- Calls of subagents: 355
- Mean context per call: 314246
- Mean context per call of the orchestrator: 223098
- Share of the context in calls above 200000 tokens: 89.9%
- Context of the orchestrator's first call: 44418
- Context of the orchestrator's middle call: 221321
- Context of the orchestrator's last call: 371138
- Cache written, 5 minutes: 548066
- Cache written, 1 hour: 932133
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 83634ffe-6be8-4dbb-9d86-dfc40e40b699 | Claude Code | 111 | 44418 | 221321 | 371138 | 0 | 349967 | 0 | 0 | 22013 | 9 | 5044 | 2 |
| One author: ekran Wiedza change (the-way-author) | Claude Code | 229 | 25207 | 429281 | 593199 | 0 | 582166 | 0 | 0 | 81991 | 30 | 0 | 0 |
| Review whole change, ekran Wiedza (the-way-stage) | Claude Code | 94 | 25264 | 311034 | 443965 | 433616 | 0 | 0 | 0 | 13724 | 6 | 8508 | 2 |
| Review return-step commit (the-way-stage) | Claude Code | 32 | 25374 | 96198 | 125435 | 114450 | 0 | 0 | 0 | 53812 | 17 | 0 | 0 |
