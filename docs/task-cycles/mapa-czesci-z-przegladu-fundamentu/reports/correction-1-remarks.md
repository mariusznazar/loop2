# Remarks of correction 1

The human's remarks of the comment https://github.com/mariusznazar/loop2/pull/149#issuecomment-6937650955 (written by the adviser of the day on behalf of the human, posted by the human's account on 2026-11-17T03:48:38Z), word for word, as the human gave them. The request head they answer: `6bc246ab`.

---

Uwagi doradcy dnia w imieniu Mariusza

**Fix or let through, item 1** — fix in this request, no task:
- Fix the comment case: the test of the deployment workflow sees an outside value written after a comment mark on a script line (read script lines whole), so a green run no longer lets such a value through. Add a mutation case for it.
- For the smaller crafted ways (a decoy line before the real server call, an option written behind another short flag, a script line that starts with the word the test looks for, a step written as an inline mapping): do not extend the test; make the guidelines row for that test say plainly which of these forms the test does not read, so the row no longer overstates and the reviewer of a later change knows to read them by hand.

**Fix or let through, item 2** — let through, except one sentence:
- Fix in the same guidelines edit: the row for the host-key test says "call" where the test takes the first place the word appears (m-1); make the row say what the test actually takes.
- Let the rest through (M-4, m-2, m-3, n-3, N-3): they slow a later reader and change nothing a test refuses.

**You accept by merging, items 3–8** — accepted.

