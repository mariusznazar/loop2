# Measures of the cycle run

- Calls in all: 424
- Calls of the orchestrator: 75
- Calls of subagents: 349
- Mean context per call: 384109
- Mean context per call of the orchestrator: 188140
- Share of the context in calls above 200000 tokens: 91.8%
- Context of the orchestrator's first call: 47098
- Context of the orchestrator's middle call: 189634
- Context of the orchestrator's last call: 281275
- Cache written, 5 minutes: 611911
- Cache written, 1 hour: 985673
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 5266e683-02ca-46ba-a361-06534d5f6f8c | Claude Code | 75 | 47098 | 189634 | 281275 | 0 | 260243 | 0 | 0 | 8562 | 6 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 85 | 26593 | 386914 | 511703 | 500994 | 0 | 0 | 0 | 11926 | 12 | 9159 | 2 |
| Author: kafelek postaci w Siedzibie (the-way-author) | Claude Code | 228 | 26350 | 560387 | 725432 | 0 | 725430 | 0 | 0 | 135659 | 54 | 73615 | 2 |
| Review of the return step (the-way-stage) | Claude Code | 35 | 26526 | 81242 | 96523 | 85178 | 0 | 0 | 0 | 23853 | 7 | 0 | 0 |
| model probe 1 (the-way-stage) | Claude Code | 1 | 25741 | 25741 | 25741 | 25739 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
