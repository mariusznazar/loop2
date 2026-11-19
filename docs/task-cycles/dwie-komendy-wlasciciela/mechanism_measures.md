# Measures of the cycle run

- Calls in all: 316
- Calls of the orchestrator: 125
- Calls of subagents: 191
- Mean context per call: 213740
- Mean context per call of the orchestrator: 237461
- Share of the context in calls above 200000 tokens: 74.1%
- Context of the orchestrator's first call: 45646
- Context of the orchestrator's middle call: 240264
- Context of the orchestrator's last call: 354656
- Cache written, 5 minutes: 519476
- Cache written, 1 hour: 650282
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 246091
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator f77aea49-30f4-4fe4-b286-10a2f69282ff | Claude Code | 125 | 45646 | 240264 | 354656 | 0 | 330477 | 0 | 0 | 21562 | 6 | 45103 | 3 |
| Author of the owner-commands change (the-way-author) | Claude Code | 98 | 25773 | 229901 | 319807 | 0 | 319805 | 0 | 0 | 103377 | 20 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 93 | 25699 | 190780 | 273387 | 519476 | 0 | 246091 | 1 | 14262 | 9 | 6482 | 2 |
