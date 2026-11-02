# Findings to fix — review of the whole change, range 6864463..f8d8e52

Source: `reports/whole-review.md` (first line `FAIL f8d8e525c4ceec9f5696b770695952f2086bdfb3`). The blocking finding below is copied in the reviewer's words. Minor findings M1–M3 are not yours to fix; they go to the request.

**I1. D-273 narrows the settled condition with "of the pack", and the testing guidelines restate it
without that qualification.**

- Place: `foundations/decisions.md:5669-5673` (D-273, binding sentence: "what changes the boundary
  is read as D-76 reads it, so a further PNG file of the pack does not") and `:5679-5680` (its
  *complies* example: "a task adding a further PNG picture of the pack"); against
  `guidelines/testing.md:181-183` ("kolejny plik PNG w `assets/sprites/` nie zmienia granicy
  obrazków") and the frozen task.
- What is wrong: the task's settlement C1 and its question 3 say, without qualification, "Kolejny
  plik PNG nie kończy odstępstwa i plan się nie zmienia", "kolejny plik PNG go nie kończy". D-273
  writes "a further PNG file *of the pack*". D-273 itself names no pack, so "the pack" has no
  antecedent in the entry; read beside D-271 it means Pixel Crawler. A PNG from another pack — the
  LPC Wolf sprite that task 20 adds to `assets/sprites/` by the projected "Where do the scene's
  pictures come from?" — is then not covered by the sentence, and D-76's reading ("another kind
  of file, another way in, another recipient") leaves open whether a new pack, a new external
  partner, is "another way in". The guidelines this change writes say any further PNG does not end
  the deferral; the decision it writes says only a further PNG of the pack does not. The two
  artifacts of one change disagree, and the decision departs from the human's settlement.
- Why it matters: C1 was recorded exactly so that a later task would not guess ("zadanie 6, które
  pierwsze dokłada obrazek, samo zgadywałoby, czy dodaje stały test"). With "of the pack", task 20
  has to guess again whether its LPC Wolf PNG ends the deferral and brings a refusal test — the
  cost the human rejected under question 3 ("test przy zadaniu 6 …, zmiana odpowiedzi „pliki
  testów żadne", zmiana planu"). By WAY-263 a change's file that restates an entry it writes
  differently, here without the qualification (or, seen from the task, an entry that adds a
  qualification its settlement does not hold), is Important. Within the task (To do 7, row C1).
- Evidence: `grep -n "of the pack" foundations/decisions.md` → lines 5672 and 5679 (and 5617,
  D-271, where it is correct); task `task.md`, question 3 *Answer* and *Settlements to record* C1;
  `guidelines/testing.md` lines 179-186 at the head.
- Fix suggested: drop "of the pack" in both places of D-273 ("so a further PNG file does not";
  "a task adding a further PNG picture to `assets/sprites/`"), so the decision says what C1 and
  `guidelines/testing.md` say.
