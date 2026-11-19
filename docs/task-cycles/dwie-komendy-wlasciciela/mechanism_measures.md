# Measures of the cycle run

- Calls in all: 225
- Calls of the orchestrator: 69
- Calls of subagents: 156
- Mean context per call: 177488
- Mean context per call of the orchestrator: 176703
- Share of the context in calls above 200000 tokens: 56.3%
- Context of the orchestrator's first call: 45646
- Context of the orchestrator's middle call: 175558
- Context of the orchestrator's last call: 247747
- Cache written, 5 minutes: 246091
- Cache written, 1 hour: 510268
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator f77aea49-30f4-4fe4-b286-10a2f69282ff | Claude Code | 69 | 45646 | 175558 | 247747 | 0 | 226519 | 0 | 0 | 7425 | 3 | 44833 | 2 |
| Author of the owner-commands change (the-way-author) | Claude Code | 76 | 25773 | 208205 | 283751 | 0 | 283749 | 0 | 0 | 93597 | 17 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 80 | 25699 | 149021 | 246093 | 246091 | 0 | 0 | 0 | 7937 | 7 | 6482 | 2 |
