# Measures of the cycle run

- Calls in all: 145
- Calls of the orchestrator: 67
- Calls of subagents: 78
- Mean context per call: 131722
- Mean context per call of the orchestrator: 164634
- Share of the context in calls above 200000 tokens: 22.6%
- Context of the orchestrator's first call: 44198
- Context of the orchestrator's middle call: 166487
- Context of the orchestrator's last call: 227046
- Cache written, 5 minutes: 145459
- Cache written, 1 hour: 329327
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator de795d77-c29f-4911-85e1-4dd3111f48cc | Claude Code | 67 | 44198 | 166487 | 227046 | 0 | 206724 | 0 | 0 | 35921 | 6 | 5353 | 1 |
| Review of whole security-notes change (the-way-stage) | Claude Code | 42 | 24840 | 112487 | 155808 | 145459 | 0 | 0 | 0 | 21931 | 5 | 48416 | 2 |
| Author of security-notes change (the-way-author) | Claude Code | 36 | 24856 | 106064 | 133636 | 0 | 122603 | 0 | 0 | 37278 | 11 | 0 | 0 |
