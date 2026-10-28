# Findings to fix — review of the return step `5cb8d0b..de899fa` (report `35-return-review.md`), in the reviewer's words

**I-1 — The streak's counting rule now stands in two decisions, D-71 and D-136, against WAY-19.**
(Within the task; blocking.)

- Place: `foundations/decisions.md:1325` (D-71, binding sentence) and
  `foundations/decisions.md:2460-2463` (D-136, binding sentences); D-71 *Relations*
  (`derives from D-04 · derives from D-23 · derives from D-118`) unchanged.
- What is wrong: D-71, whose question is the order of a game minute, says of the streak "which grows
  by one where the character lost no health for being chilled or starving in that minute and falls to
  zero where it did". D-136, written by this commit, answers that same question as its own: "A
  streak counts the successive game minutes in which the character loses no health to cold or
  hunger: a game minute with such a loss sets it to zero". D-71's *Verification* also carries a
  counting example ("violates: … a game minute in which the character is chilled growing the
  streak") that duplicates D-136's ("a game minute in which the character is starving leaving the
  streak as it stood"). The commit leaves D-71 untouched and without a relation to D-136; the step's
  report records this as a choice ("D-71 left without a relation to D-136").
- Why it matters: pinned WAY-19 — "When a new decision answers a question that an older one answered
  in passing, the sentence moves to the new decision, and the older one loses it in the same change";
  its *violates*: "the sentence stays in both decisions"; its rationale: "two entries answering one
  question drift apart". Also restated in `.the-way/elements/decisions/template.md:120-121`, and
  WAY-126's rationale ("keeps one entry per rule"). The drift is concrete: task 8 is to write the rest
  of the projected entry into D-136 ("wounds taken in combat do not" set it to zero); a reader or
  agent changing the counting in one place has no relation pointing to the other.
- What the task mandates: row 5 of *Settlements to record* (`task.md:174`) put the counting into the
  sentence added to D-71, written by the foundation step before D-136 existed; once D-136 holds the
  counting, row 5's meaning stays held across the two entries (D-71 keeps where the streak moves in
  the order, D-136 what it counts), so the move changes no accepted meaning.
- Recommended correction, in this return step: D-71 keeps the streak's place in the order — e.g.
  "— and with it the streak of the map run, as D-136 counts it;" (or the same placement without the
  counting clause) — and loses "which grows by one … and falls to zero where it did"; D-71
  *Relations* gains `derives from D-136`; D-71's *violates* example "a game minute in which the
  character is chilled growing the streak" is dropped or moved into D-136. D-71's *Rationale* ("The
  streak follows the body …") is about the order and stays. The request then lists D-71 among the
  entries changed, with its Polish sentence.
- Evidence: `grep -n "grows by one\|falls to zero" foundations/decisions.md` → only `:1325`;
  `sed -n 2458-2481p foundations/decisions.md` (D-136); `awk` over D-71 → *Relations* without D-136;
  pinned WAY-19 read whole.

