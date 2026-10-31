# Findings to fix — Slice 1, task `reset-hasla`

The blocking findings of the review `reports/08-slice1-review-report.md`, in the reviewer's words.
Reviewed head: `25345f1`. The fix's range runs from it.

### I-1. D-160 now says a player signs in to ask for a password-reset link

- **Where:** `foundations/decisions.md:2902`, last sentence; its echo in
  `tests/account-storage.test.mjs:1346`.
- **What is wrong:** the sentence reads "A link that a block stopped stays stopped after the account
  is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij
  ponownie”, or asks for a new password-reset link with „Wyślij odnośnik”." At the base "signed in
  again" belonged to the confirmation message alone; commit `e8755e8` hung the reset clause on the
  same subject, so the participle now governs both.
- **Why it matters:** this is a binding sentence and it is false for the player it speaks of.
  „Wyślij odnośnik” stands only on the form „Nie pamiętam hasła”, which the button under „Zaloguj się”
  opens on the signed-out screen (D-96 as this range changes it, To do 1: "prośbę wysyła odwiedzający
  bez sesji"). A signed-in player has no such button, and a player who forgot the password cannot sign
  in, which is the reason the link exists. So D-160 restates who asks for a link differently from
  D-96, an entry the same commit changes; by WAY-263 that is Important. Slices 6 and 9 are listed as
  depending on D-160, and later agents read the entry as what binds.
- **It also has no source.** The clause is in no row and no To do. Row 10 and the spec's table give
  D-160 only "the refusal's sentence and place hold for a reset link too"; the task's *Decisions in
  play* says the same. The writer's report (`06-foundation-report.md`) does not name it among its
  *Choices and concerns*. Search for "signed in again" in `task.md`, `spec.md`, `plan.md`: 0 hits,
  with the positive control of the same phrase found in the base's `foundations/decisions.md:2898`.
- **Evidence:** reading of the three passages above; the test's comment at `:1346` copies the claim
  ("Signed in again, the player asks for a new link, whose reset works."), and its neighbouring
  confirmation case at `:1171`, where the phrase is true, shows where the wording came from.
- **The way out:** through `the-way-record-decision`, either drop the clause (row 10 asks nothing
  more), or separate the two ways, for example "…and the player asks anew: signed in again, for a
  confirmation message with „Wyślij ponownie”; on the form „Nie pamiętam hasła”, for a password-reset
  link with „Wyślij odnośnik”." Reword the comment at `:1346` to match; the session the test stores
  there is worth keeping, since it proves a session made after the unblock also ends. The assertions
  need no change.
