# Measures of the cycle run

- Calls in all: 385
- Calls of the orchestrator: 121
- Calls of subagents: 264
- Mean context per call: 304603
- Mean context per call of the orchestrator: 227822
- Share of the context in calls above 200000 tokens: 90.3%
- Context of the orchestrator's first call: 47163
- Context of the orchestrator's middle call: 223866
- Context of the orchestrator's last call: 333600
- Cache written, 5 minutes: 464094
- Cache written, 1 hour: 836212
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator f5ea6cfb-68f6-4403-9889-5819e252f650 | Claude Code | 121 | 47163 | 223866 | 333600 | 0 | 312416 | 0 | 0 | 8402 | 6 | 2251 | 1 |
| Review whole change (the-way-stage) | Claude Code | 71 | 25901 | 323859 | 415530 | 404821 | 0 | 0 | 0 | 83016 | 13 | 6332 | 2 |
| model probe 1 (the-way-stage) | Claude Code | 1 | 25691 | 25691 | 25691 | 14982 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Review correction 1 (the-way-stage) | Claude Code | 10 | 25911 | 41624 | 55000 | 44291 | 0 | 0 | 0 | 25465 | 4 | 0 | 0 |
| Author: Wiedza screen change (the-way-author) | Claude Code | 182 | 25947 | 404379 | 535189 | 0 | 523796 | 0 | 0 | 68361 | 18 | 72936 | 1 |
