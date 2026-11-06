# Remarks for correction 1 — the human's decision on request #58

- Request: https://github.com/mariusznazar/loop2/pull/58 (draft, blocked by a finding that remained after its fix)
- The human's decision, in this session on 2026-11-05, answering item 1 of *For you to decide*
  („Fix it as the finding says, or keep the code despite it?”): „tak, popraw proszę” — fix it as the
  finding says. The remark binds.

## The finding to fix, in the reviewer's words (`reports/report-review-fix-1.md`)

**N1 — D-312's *violates* example says the sentence must not stand after the rule or its group is deleted, but its binding sentence keeps the sentence in that case when another group holds a rule „Zawsze → Eksploruj”. The stated cost covers the drag case only.**

- Place: `foundations/decisions.md`, D-312 at `9defb90`. Binding: „{nazwa grupy} being the name of the first rule group of the copy, in the order of the program editor, that holds a program rule „Zawsze → Eksploruj” … Where no rule group of the copy holds such a rule, the band leaves that sentence out.” *Verification*, violates: „the sentence still standing after the rule or its group was deleted”. *Rationale*: „Its further cost: where the player keeps a rule „Zawsze → Eksploruj” of their own in a group dragged above the one the game wrote into, the band names that earlier group, where the same rule also stands.”
- What is wrong: the binding keys on any rule „Zawsze → Eksploruj”. „+ reguła” adds exactly that rule (D-124), and the player can use it during the pause the band stands in. Example: groups „Ogień” and „Głód”; the first chill writes the rule into „Ogień”; while the band stands, the player presses „+ reguła” in „Głód” and then deletes the game's rule in „Ogień”, or the whole group „Ogień”. The binding sentence then makes the band say „Gra dopisała regułę w grupie „Głód”…”; the *violates* example forbids that very sentence, with no qualification. The *Rationale*'s cost names only the drag case.
- What would clear it (the rule itself stays as the orchestrator chose): qualify the example, e.g. „the sentence still standing after the rule or its group was deleted while no other group holds „Zawsze → Eksploruj””; widen the further cost to both ways another group's rule „Zawsze → Eksploruj” can come first: dragged above the one the game wrote into, or left standing after the game's rule or its group is deleted.

Fix only this, in D-312, through `the-way-record-decision`; keep its binding sentence and its mark `the cycle's`; leave M1 and M2 as they are.
