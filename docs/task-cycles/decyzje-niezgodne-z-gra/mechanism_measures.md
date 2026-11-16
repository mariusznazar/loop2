# Measures of the cycle run

- Calls in all: 300
- Calls of the orchestrator: 54
- Calls of subagents: 246
- Mean context per call: 210251
- Mean context per call of the orchestrator: 176873
- Share of the context in calls above 200000 tokens: 70.0%
- Context of the orchestrator's first call: 46142
- Context of the orchestrator's middle call: 184501
- Context of the orchestrator's last call: 237025
- Cache written, 5 minutes: 534480
- Cache written, 1 hour: 585073
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 255527
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 85454104-04b9-495f-b739-4ef483246293 | Claude Code | 54 | 46142 | 184501 | 237025 | 0 | 215616 | 0 | 0 | 5941 | 4 | 0 | 0 |
| Author of the whole change (the-way-author) | Claude Code | 162 | 25031 | 243512 | 380490 | 0 | 369457 | 0 | 0 | 186574 | 56 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 84 | 25086 | 183641 | 289938 | 534480 | 0 | 255527 | 1 | 30799 | 10 | 861 | 3 |
