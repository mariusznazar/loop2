# Measures of the cycle run

- Calls in all: 208
- Calls of the orchestrator: 116
- Calls of subagents: 92
- Mean context per call: 167313
- Mean context per call of the orchestrator: 212671
- Share of the context in calls above 200000 tokens: 51.6%
- Context of the orchestrator's first call: 44198
- Context of the orchestrator's middle call: 216461
- Context of the orchestrator's last call: 308360
- Cache written, 5 minutes: 299286
- Cache written, 1 hour: 419686
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 144823
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator de795d77-c29f-4911-85e1-4dd3111f48cc | Claude Code | 116 | 44198 | 216461 | 308360 | 0 | 287263 | 0 | 0 | 39442 | 8 | 5353 | 1 |
| Review of whole security-notes change (the-way-stage) | Claude Code | 47 | 24840 | 114378 | 164812 | 299286 | 0 | 144823 | 1 | 21931 | 5 | 48416 | 2 |
| Author of security-notes change (the-way-author) | Claude Code | 45 | 24856 | 112323 | 143456 | 0 | 132423 | 0 | 0 | 37494 | 12 | 0 | 0 |
