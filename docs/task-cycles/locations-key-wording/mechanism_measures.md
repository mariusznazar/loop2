# Measures of the cycle run

- Calls in all: 93
- Calls of the orchestrator: 35
- Calls of subagents: 58
- Mean context per call: 95806
- Mean context per call of the orchestrator: 119842
- Share of the context in calls above 200000 tokens: 0.0%
- Context of the orchestrator's first call: 45627
- Context of the orchestrator's middle call: 125611
- Context of the orchestrator's last call: 173837
- Cache written, 5 minutes: 111112
- Cache written, 1 hour: 273232
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 0
- Calls of subagents with a cache write again: 0

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again | Decision log bytes | Decision log reads | Decision index bytes | Decision index reads |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 4bedb17d-489a-46c1-aa1f-411727050289 | Claude Code | 35 | 45627 | 125611 | 173837 | 0 | 154980 | 0 | 0 | 6901 | 6 | 0 | 0 |
| One author: key wording change (the-way-author) | Claude Code | 28 | 25559 | 84781 | 118254 | 0 | 118252 | 0 | 0 | 33082 | 15 | 0 | 0 |
| Review of the whole change (the-way-stage) | Claude Code | 30 | 25562 | 80795 | 111114 | 111112 | 0 | 0 | 0 | 14980 | 6 | 30745 | 2 |
