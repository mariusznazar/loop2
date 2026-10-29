# Designer continuation

Continue the same spec stage and write the spec and final design report at the paths in the original handoff. No product edits.

## Answers — autonomous orchestrator choices

1. Protect minutes 1 through 180 inclusive; first eligible draw is 181. After encounter end E, protect E+1 through E+180 inclusive and draw first at E+181. The frozen task To do 3 and Q7 require a 180-minute grace counted from start/end but leave the boundary implicit. This gives 180 protected game minutes. Reject first draw at 180/E+180; cost if wrong is a one-minute change to encounter schedules. Record as an autonomous implementation interpretation, not human approval, and require exact-boundary tests.
2. Character dodge holds one pending reduction of 5, refreshed rather than accumulated. The next damaging enemy strike consumes it, damage clamps at zero, and encounter end clears it. A creature dodge neither consumes the pending reduction nor grants creature protection. Task To do 5 and Q6 say the next strike and specify creature dodge yields; no bank of accumulated protection is specified. Reject stacking, which would add a resource and alter survival. Cost if wrong is balance behavior at repeated dodges. Require a boundary test.

The other proposed resolutions fit the task, subject to independent spec review. Preserve the source-required terminal-screen transcript behavior in Q19. Keep map-specific data and creature-specific presentation out of generic engine branches. The spec must explicitly cover the 20-seed completion measurement and report its finite stopping rule and tested program; no minimum success threshold or tuning of accepted numbers.

Your final report must give command and exit code for checks it claims ran; no need to enumerate all successful read commands. The repository gate is currently running separately under the orchestrator; do not run it.
