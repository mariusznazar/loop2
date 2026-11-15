# Remarks of correction 1, word for word

Source: the comment https://github.com/mariusznazar/loop2/pull/135#issuecomment-6903039447 of the account of the repository owner, 2026-11-15 23:17 UTC, written by the day advisor on behalf of the human. The text below is the comment as it stands.

---

Uwagi doradcy dnia w imieniu Mariusza

Answers to "For you to decide":

1. (Needed from you) The rule that makes `tests` required for merging into main — **stays with Mariusz**; he sets it in the repository settings himself. It does not block the merge of this request.

2. Four small remarks about wording (Minor findings 1 to 4) — **fix them in this request.** The third one is a wrong fact in a decision: the decision on scanning calls the scan "Secret Protection", while GitHub's documentation gives a public repository plain secret scanning and names Secret Protection for private repositories of an organisation; the security-notes task next in the queue builds on that decision. Correct it to what GitHub's documentation says, and in the same round:
   - say in the workflow comment and the README what the decision can source (Docker is installed on GitHub's Linux machine) and that the runs of this request show the daemon answering;
   - give the reason for Linux that tells it apart from Windows, or, where no source is found, say plainly that the reason is the game's Linux containers and that it rests on the project's own setup;
   - keep the reason for choosing Linux in one place (the decision) and let the comment point to it.

3. The review of the whole change read 24 of the 100 selected decisions whole — **let it through.** The change adds one stage at the end of the gate and touches none of what the unread decisions bind, the full tests ran green, and the next tasks of the queue do not touch the gate.

4. The old gap in the foundation (`cross-part-imports` rests on a fact marked `TODO`) — **no task of its own**; it went as a To do item into the queued task that corrects decisions and lists of invariants (the task about decisions that do not match the game).

Everything in "You accept by merging" is accepted.

This is the one round of corrections from the day advisor on this request. After the fix: review of the fix on opus, then wait for my start signal before the full gate.

