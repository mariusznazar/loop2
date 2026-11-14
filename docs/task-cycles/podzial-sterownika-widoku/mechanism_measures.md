# Measures of the cycle run

- Calls in all: 460
- Calls of the orchestrator: 104
- Calls of subagents: 356
- Mean context per call: 227371
- Mean context per call of the orchestrator: 190430
- Share of the context in calls above 200000 tokens: 75.3%
- Context of the orchestrator's first call: 43726
- Context of the orchestrator's middle call: 197536
- Context of the orchestrator's last call: 272445
- Cache written, 5 minutes: 2541761
- Cache written, 1 hour: 252057
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 987933
- Calls of subagents with a cache write again: 3

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 9f6f8000-7991-49d5-9aae-fb79bc4b1f3e | Claude Code | 104 | 43726 | 197536 | 272445 | 0 | 252057 | 0 | 0 |
| Make the view controller split change (general-purpose) | Claude Code | 131 | 36312 | 321771 | 455497 | 879458 | 0 | 423963 | 1 |
| Review spec for view controller split (general-purpose) | Claude Code | 50 | 36275 | 186506 | 281306 | 269427 | 0 | 0 | 0 |
| Review whole change of view split (the-way-stage) | Claude Code | 89 | 24550 | 226154 | 382932 | 382930 | 0 | 0 | 0 |
| Write spec for view controller split (general-purpose) | Claude Code | 53 | 36242 | 239204 | 352377 | 916345 | 0 | 563970 | 2 |
| Review return step commits (the-way-stage) | Claude Code | 33 | 24538 | 78355 | 104586 | 93601 | 0 | 0 | 0 |
