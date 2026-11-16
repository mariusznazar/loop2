# Findings of the review of the return step's range to fix

Source: `reports/review-return-report.md` (`FAIL 80cdb843c85a95e12773753cb47af6632e643ba5`), the blocking finding copied in the reviewer's words. The Minor finding m1 of that review is not in this file: a Minor finding of the review of the return step is not fixed in the cycle and goes to the request's list.

### Important

**I1 — The second sentence of D-402's new paragraph says that the new game's saver outcomes act at once. The code holds them in two cases, and paragraph 1 of D-402 holds them in one of the two.** From commit `937e4b0a`. The test line in `80cdb843` quotes the same sentence.

Place: `foundations/decisions.md:3939`, the sentence: "An outcome of the saver of the game a reset built acts at once, also while the logout of the old game waits for its answer."

What is wrong: the sentence has no qualification, so it says the new game's outcomes are never held. The code holds an outcome of any game, including the game a reset built, in two cases. `src/browser/view/app.ts:508-522` (`whenNotBusy`) holds it:
- while that game's own reset waits (`current.reset.kind === "waiting"`, `:511-515`);
- while that game's own logout waits for its answer (`current.logout.kind === "ending"`, `:516-520`).

Both cases are reachable. The game a reset built has „Zacznij od zera” again when the account has the privilege (`app.ts:556`), and it has „Wyloguj” (`logOut`, `:682-724`, which checks only the state of its own game).

In the second case, D-402 contradicts itself. The player confirms a second reset. While that reset waits, the game the first reset built is "the old game" of paragraph 1, whose outcomes are held "while it waits" (`:3937`). Read literally, paragraph 2 says the same outcomes act at once.

The sentence means something narrower. The entry's own *Rationale* says so (`:3949`): "its outcomes are held neither with those of the old game nor until the old game's logout answers". The clause `tests:` also keeps to that scope: "while the logout of the old game still waits, acting at once". The binding sentence is the one broader than the code.

Why it matters: this is a binding sentence, and a later change is compared against it. Suppose a later agent follows it and removes the hold of the new game's outcomes during its own logout or during a second reset. That agent would be applying D-402 as written, and it would break paragraph 1 of D-402 and the logout's handling of a held outcome (`app.ts:705-722`). As the text stands, the code at the head breaks the sentence too. Under the grading rule on WAY-263, an entry the change writes that states a rule more broadly, or without the qualification the code keeps, is Important.

Evidence: `app.ts:508-522`, `:556`, `:682-724`, `:735-771`; D-402 `:3937` (paragraph 1), `:3939` (paragraph 2), `:3949` (*Rationale*).

Fix: limit the sentence to the old game's logout, the way the *Rationale* does. For example: "An outcome of the saver of the game a reset built is not held for the logout of the old game, which may still wait for its answer." Or: "While the logout of the old game waits for its answer, an outcome of the saver of the game a reset built is not held for it." Change the quotation at `tests/view/previous-save.test.mjs:1498` to the new sentence, so that it still begins a sentence of D-402. The clause `tests:` can stay as it is. Then run `python -B .the-way/elements/common/foundation_check.py`.
