# Measures of the cycle run

- Calls in all: 210
- Calls of the orchestrator: 104
- Calls of subagents: 106
- Mean context per call: 165422
- Mean context per call of the orchestrator: 208061
- Share of the context in calls above 200000 tokens: 45.2%
- Context of the orchestrator's first call: 44203
- Context of the orchestrator's middle call: 209298
- Context of the orchestrator's last call: 302760
- Cache written, 5 minutes: 377925
- Cache written, 1 hour: 410508
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 184000
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator d6bdbbbc-64ba-48e4-bc93-3aa41474cbc8 | Claude Code | 104 | 44203 | 209298 | 302760 | 0 | 278588 | 0 | 0 | 30969 | 11 | 0 | 0 |
| Review whole change D-234 (the-way-stage) | Claude Code | 58 | 24899 | 162479 | 204910 | 377925 | 0 | 184000 | 1 | 63297 | 16 | 19161 | 2 |
| Author: D-234 trial condition (the-way-author) | Claude Code | 48 | 24743 | 118083 | 142953 | 0 | 131920 | 0 | 0 | 84291 | 21 | 0 | 0 |
