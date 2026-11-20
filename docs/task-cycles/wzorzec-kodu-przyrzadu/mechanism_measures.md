# Measures of the cycle run

- Calls in all: 225
- Calls of the orchestrator: 45
- Calls of subagents: 180
- Mean context per call: 216652
- Mean context per call of the orchestrator: 155300
- Share of the context in calls above 200000 tokens: 76.7%
- Context of the orchestrator's first call: 45524
- Context of the orchestrator's middle call: 156912
- Context of the orchestrator's last call: 236640
- Cache written, 5 minutes: 292408
- Cache written, 1 hour: 572855
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 1092541c-972a-418c-88dd-92290f7a3681 | Claude Code | 45 | 45524 | 156912 | 236640 | 0 | 215774 | 0 | 0 | 60 | 1 | 0 | 0 |
| Whole-change review of wzorzec-kodu-przyrzadu (the-way-stage) | Claude Code | 68 | 25738 | 220152 | 292410 | 292408 | 0 | 0 | 0 | 17748 | 7 | 32385 | 2 |
| Author of wzorzec-kodu-przyrzadu change (the-way-author) | Claude Code | 112 | 25691 | 258506 | 368308 | 0 | 357081 | 0 | 0 | 35079 | 10 | 28794 | 2 |
