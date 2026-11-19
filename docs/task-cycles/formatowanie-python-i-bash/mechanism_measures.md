# Measures of the cycle run

- Calls in all: 347
- Calls of the orchestrator: 102
- Calls of subagents: 245
- Mean context per call: 220489
- Mean context per call of the orchestrator: 203351
- Share of the context in calls above 200000 tokens: 75.8%
- Context of the orchestrator's first call: 48178
- Context of the orchestrator's middle call: 208658
- Context of the orchestrator's last call: 307758
- Cache written, 5 minutes: 614179
- Cache written, 1 hour: 649297
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 298663
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator c9014128-21e8-45e8-91f6-cc1ba6d7eaf1 | Claude Code | 102 | 48178 | 208658 | 307758 | 0 | 285319 | 0 | 0 | 2222 | 10 | 0 | 0 |
| Author of the formatter change (the-way-author) | Claude Code | 145 | 25100 | 246034 | 375205 | 0 | 363978 | 0 | 0 | 71108 | 28 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 100 | 25166 | 201120 | 315518 | 614179 | 0 | 298663 | 1 | 10288 | 6 | 70454 | 3 |
