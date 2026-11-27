# Measures of the cycle run

- Calls in all: 332
- Calls of the orchestrator: 55
- Calls of subagents: 277
- Mean context per call: 353203
- Mean context per call of the orchestrator: 157859
- Share of the context in calls above 200000 tokens: 90.9%
- Context of the orchestrator's first call: 47171
- Context of the orchestrator's middle call: 153444
- Context of the orchestrator's last call: 232006
- Cache written, 5 minutes: 442228
- Cache written, 1 hour: 795141
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 21ef124e-a415-4473-8610-f16e854b637d | Claude Code | 55 | 47171 | 153444 | 232006 | 0 | 210972 | 0 | 0 | 3894 | 5 | 0 | 0 |
| Author of the change (opus) (the-way-author) | Claude Code | 197 | 25963 | 481604 | 595562 | 0 | 584169 | 0 | 0 | 122861 | 40 | 5202 | 2 |
| Review of the whole change (opus) (the-way-stage) | Claude Code | 79 | 25925 | 245148 | 437980 | 427271 | 0 | 0 | 0 | 40950 | 8 | 5468 | 2 |
| model probe 1 (the-way-stage) | Claude Code | 1 | 25666 | 25666 | 25666 | 14957 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
