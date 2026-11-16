# Measures of the cycle run

- Calls in all: 151
- Calls of the orchestrator: 69
- Calls of subagents: 82
- Mean context per call: 127527
- Mean context per call of the orchestrator: 169245
- Share of the context in calls above 200000 tokens: 21.9%
- Context of the orchestrator's first call: 44186
- Context of the orchestrator's middle call: 181827
- Context of the orchestrator's last call: 220613
- Cache written, 5 minutes: 138590
- Cache written, 1 hour: 305815
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator f73b4148-7037-43cc-b41b-b4d23d586e82 | Claude Code | 69 | 44186 | 181827 | 220613 | 0 | 199530 | 0 | 0 | 7998 | 13 | 5341 | 1 |
| Review of the whole change (the-way-stage) | Claude Code | 44 | 24925 | 108362 | 149575 | 138590 | 0 | 0 | 0 | 11946 | 10 | 38549 | 2 |
| Author: split decision log into sections (the-way-author) | Claude Code | 38 | 24985 | 89467 | 117318 | 0 | 106285 | 0 | 0 | 33058 | 21 | 5341 | 1 |
