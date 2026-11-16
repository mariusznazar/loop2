# Measures of the cycle run

- Calls in all: 512
- Calls of the orchestrator: 147
- Calls of subagents: 365
- Mean context per call: 324446
- Mean context per call of the orchestrator: 266757
- Share of the context in calls above 200000 tokens: 91.1%
- Context of the orchestrator's first call: 44418
- Context of the orchestrator's middle call: 273344
- Context of the orchestrator's last call: 427823
- Cache written, 5 minutes: 988351
- Cache written, 1 hour: 993870
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 432980
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 83634ffe-6be8-4dbb-9d86-dfc40e40b699 | Claude Code | 147 | 44418 | 273344 | 427823 | 0 | 405752 | 0 | 0 | 22225 | 10 | 5044 | 2 |
| One author: ekran Wiedza change (the-way-author) | Claude Code | 234 | 25207 | 432641 | 599151 | 0 | 588118 | 0 | 0 | 83937 | 33 | 0 | 0 |
| Review whole change, ekran Wiedza (the-way-stage) | Claude Code | 99 | 25264 | 340427 | 451270 | 873901 | 0 | 432980 | 1 | 13942 | 7 | 8508 | 2 |
| Review return-step commit (the-way-stage) | Claude Code | 32 | 25374 | 96198 | 125435 | 114450 | 0 | 0 | 0 | 53812 | 17 | 0 | 0 |
