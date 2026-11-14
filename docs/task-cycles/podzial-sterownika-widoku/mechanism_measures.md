# Measures of the cycle run

- Calls in all: 592
- Calls of the orchestrator: 154
- Calls of subagents: 438
- Mean context per call: 216971
- Mean context per call of the orchestrator: 233333
- Share of the context in calls above 200000 tokens: 75.6%
- Context of the orchestrator's first call: 43726
- Context of the orchestrator's middle call: 234192
- Context of the orchestrator's last call: 361166
- Cache written, 5 minutes: 3211083
- Cache written, 1 hour: 340451
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 1548012
- Calls of subagents with a cache write again: 5

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 9f6f8000-7991-49d5-9aae-fb79bc4b1f3e | Claude Code | 154 | 43726 | 234192 | 361166 | 0 | 340451 | 0 | 0 |
| Play the four steps in a real browser (the-way-stage) | Claude Code | 73 | 24558 | 65940 | 105496 | 95147 | 0 | 0 | 0 |
| Make the view controller split change (general-purpose) | Claude Code | 136 | 36312 | 333108 | 462657 | 1342113 | 0 | 879458 | 2 |
| Review spec for view controller split (general-purpose) | Claude Code | 50 | 36275 | 186506 | 281306 | 269427 | 0 | 0 | 0 |
| Review whole change of view split (the-way-stage) | Claude Code | 89 | 24550 | 226154 | 382932 | 382930 | 0 | 0 | 0 |
| Write spec for view controller split (general-purpose) | Claude Code | 53 | 36242 | 239204 | 352377 | 916345 | 0 | 563970 | 2 |
| Review return step commits (the-way-stage) | Claude Code | 37 | 24538 | 79328 | 111522 | 205121 | 0 | 104584 | 1 |
