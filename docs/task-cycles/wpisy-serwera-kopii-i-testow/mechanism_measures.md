# Measures of the cycle run

- Calls in all: 357
- Calls of the orchestrator: 113
- Calls of subagents: 244
- Mean context per call: 225015
- Mean context per call of the orchestrator: 221758
- Share of the context in calls above 200000 tokens: 78.2%
- Context of the orchestrator's first call: 46765
- Context of the orchestrator's middle call: 225165
- Context of the orchestrator's last call: 332747
- Cache written, 5 minutes: 787895
- Cache written, 1 hour: 685328
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 331892
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator f0956bd0-f111-4c25-8345-f27faf7df949 | Claude Code | 113 | 46765 | 225165 | 332747 | 0 | 311040 | 0 | 0 | 12947 | 8 | 5504 | 1 |
| Review of the return step (the-way-stage) | Claude Code | 27 | 25453 | 74844 | 94116 | 83054 | 0 | 0 | 0 | 24323 | 6 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 94 | 25422 | 260209 | 372951 | 704841 | 0 | 331892 | 1 | 48771 | 15 | 63049 | 3 |
| One author of the change (the-way-author) | Claude Code | 123 | 25389 | 273928 | 385398 | 0 | 374288 | 0 | 0 | 144741 | 50 | 57343 | 1 |
