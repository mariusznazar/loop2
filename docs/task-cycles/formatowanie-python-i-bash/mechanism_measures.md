# Measures of the cycle run

- Calls in all: 274
- Calls of the orchestrator: 59
- Calls of subagents: 215
- Mean context per call: 198908
- Mean context per call of the orchestrator: 152872
- Share of the context in calls above 200000 tokens: 66.1%
- Context of the orchestrator's first call: 48178
- Context of the orchestrator's middle call: 148573
- Context of the orchestrator's last call: 226386
- Cache written, 5 minutes: 298663
- Cache written, 1 hour: 538668
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator c9014128-21e8-45e8-91f6-cc1ba6d7eaf1 | Claude Code | 59 | 48178 | 148573 | 226386 | 0 | 205368 | 0 | 0 | 695 | 3 | 0 | 0 |
| Author of the formatter change (the-way-author) | Claude Code | 125 | 25100 | 234447 | 344527 | 0 | 333300 | 0 | 0 | 53833 | 17 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 90 | 25166 | 191273 | 298665 | 298663 | 0 | 0 | 0 | 9792 | 4 | 70454 | 3 |
