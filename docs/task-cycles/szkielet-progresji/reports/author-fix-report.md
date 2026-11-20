Status: done with concerns

# Author fix report — task szkielet-progresji, Minor finding 1 of the whole-change review

## Status

`done with concerns`. No change and no commit: the finding is answered with evidence, not fixed. The concern is the one the finding raises and the reviewer assigned to the human.

## Commits

None. Head stays `216b8bf9`.

## The finding and the decision

Finding 1 (`foundations/glossary.md:304`): the definition of `wall` is a noun phrase with no main verb, where the glossary template asks for one sentence and the other entries read "A <term> is ...". The reviewer offered two ways: leave it, or change it to "A wall is a map that ...". The handoff allowed a fix only if it adds a subject and verb in front and leaves every word of the projected sentence in place.

Decision: option 2, no change. The fix that gives a main verb is "A wall is a map that asks ...". It is not the projected text with words added in front: the projected sentence begins with the capital "A", and the fix turns that word into a lowercase "a" in the middle of the sentence. That changes the first word of the projected sentence, and the frozen task requires that sentence word for word:

- Task, *To do* item 1 (`.runs/task-cycles/szkielet-progresji/task.md`): "w brzmieniu rzutowanym z definicji projektu" and "z samym zdaniem definicji" — the projected sentence, quoted in the task's *Decisions in play*:
  > A map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely.
- The same reading applies to my own first attempt in the first run: I had written "A wall is a map that ...", found it departs from the projected text, and restored the projected sentence before the commit (`216b8bf9`).
- The reviewer's note that the change "means departing from the meaning approved at the readiness approval" also applies: the approved text is the projected one.

The "item, a spell or another idea of a program" list is untouched, as the handoff requires; the reviewer's second reading note stays with the human as the reviewer says.

## The choice for the human (the cost of each way)

- Keep the projected sentence (current state, `216b8bf9`): the entry stays the only fragment-form definition in `foundations/glossary.md`. Its meaning is unaffected and the reader takes the subject from the heading. Cost: the file's form is not uniform, and the next reader may flag it again. Unchanged the cost does not grow.
- Change to "A wall is a map that asks ...": the file reads uniformly. Cost: the sentence is no longer the approved projected wording word for word; the human has to approve the new wording at the merge or accept it as a wording change of the projected entry, and the projected entry in the task's *Decisions in play* then differs from the foundation.

Recommendation: keep the projected sentence, since the task fixes it word for word and the fix leaves the meaning unchanged. The human decides; if the human wants the uniform form, the entry changes and the task's wording note needs the same change.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | run again, no change; 0 errors (per the output of the first run) |
| Whitespace | `git diff --check` | 0 | clean |

The instruction-files check was not run again: this fix changes no file. The product's gate (`npm test`) was not run, as the handoff directs.

## Own-work check

- Requirement: the glossary entry matches the projected sentence word for word, and the fix either keeps the sentence or changes it only by adding a subject and verb with the projected words unchanged.
- Check: read `foundations/glossary.md` lines 302–306 after the re-run; the entry is `## wall`, the projected sentence, and `- **Not:** none`.
- Result: the entry stays as committed; no fault found.

## Text of the entry as it stands (whole)

```markdown
## wall

A map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely.

- **Not:** none
```

## Unread material

- None of this fix's named material is unread. The findings file `reports/fix-findings.md` was not at its path in `.runs/task-cycles/szkielet-progresji/`; the finding was read from the copy at `.runs/task-cycles/szkielet-progresji/fix-findings.md` (the handoff names `reports/fix-findings.md`, so this path was taken from it: the handoff says "in `.runs/task-cycles/szkielet-progresji/`"). Both are the same text as the coordinator quoted.

## Searches not found or unclear

- `.runs/task-cycles/szkielet-progresji/reports/fix-findings.md` (the path the handoff names) — not found; the file exists at `.runs/task-cycles/szkielet-progresji/fix-findings.md` and I read that one. Its content matches the handoff's description.

## Working copies

None made in this fix. `.runs/author/` is not present.
