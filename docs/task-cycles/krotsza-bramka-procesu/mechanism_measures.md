# Measures of the cycle run

- Calls in all: 235
- Calls of the orchestrator: 108
- Calls of subagents: 127
- Mean context per call: 161399
- Mean context per call of the orchestrator: 188668
- Share of the context in calls above 200000 tokens: 34.4%
- Context of the orchestrator's first call: 44034
- Context of the orchestrator's middle call: 189210
- Context of the orchestrator's last call: 284205
- Cache written, 5 minutes: 621255
- Cache written, 1 hour: 263947
- Cache written again by the orchestrator: 0
- Calls of the orchestrator with a cache write again: 0
- Cache written again by subagents: 156715
- Calls of subagents with a cache write again: 1

## Agents

| Agent | Tool | Calls | First call | Middle call | Last call | Cache written, 5 minutes | Cache written, 1 hour | Cache written again | Calls with a cache write again |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| orchestrator 324d980c-a7d6-40a0-b3ff-183f5cb3e0a7 | Claude Code | 108 | 44034 | 189210 | 284205 | 0 | 263947 | 0 | 0 |
| Review of the merge with main (general-purpose) | Claude Code | 15 | 36480 | 62389 | 71102 | 71100 | 0 | 0 | 0 |
| Review of the whole change (general-purpose) | Claude Code | 63 | 36474 | 160770 | 219970 | 208091 | 0 | 0 | 0 |
| One author of the gate change (general-purpose) | Claude Code | 49 | 36406 | 158036 | 197228 | 342064 | 0 | 156715 | 1 |
