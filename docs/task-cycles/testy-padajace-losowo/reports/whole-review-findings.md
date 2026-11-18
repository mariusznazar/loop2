# Findings of the review of the whole change (cut from `reports/review-whole-report.md`, lines 51-178, in the reviewer's words)

Review head: `4cf96da13b44240d6f9460409068d6887b4fa783`. Three blocking findings (I-1 to I-3, within the task, from no slice) and six Minor findings within the task (M-1 to M-6), which the review of the whole change asks to be fixed in this same round (WAY-161).

### Important (blocking, within the task; from no slice)

**I-1. `guidelines/testing.md:313-314` drops a qualification that D-432 has.**

The guideline sentence reads: „Test padający losowo bez ustalonej przyczyny dostaje wpis w rejestrze
`tests/flaky-tests.md`, a wpis znika, gdy przyczyna się wyjaśni.” D-432, which the same change
writes, binds it more narrowly: "A test that fails at random, **with no change of the code behind the
failure** and with no cause found, has an entry…". The register's own opening carries that
qualification too: „bez związku ze zmianą kodu” (`tests/flaky-tests.md:4`).

Why it matters: agents read `guidelines/testing.md` before every change to a test; they rarely open
D-432. Take a change whose own code makes a test fail now and then. By the guideline sentence that
test is "padający losowo bez ustalonej przyczyny", so it goes into the register. D-432 excludes
exactly that case, because the cause there is the change, which is to be fixed, not recorded. WAY-263
grades a restatement of an entry the change writes, made without its qualification, as Important.

The task's point 5 gives this wording, so it is a defect the task mandates, named as such.

Fix: add the qualification to the sentence, e.g. „Test padający losowo bez związku ze zmianą kodu i
bez ustalonej przyczyny…”. Or, if the human prefers the shorter rule, drop the qualification from
D-432. One of the two, in this change.

**I-2. `tests/flaky-tests.md:53-55`: entry b does not name its conditions, and the register leads the reader to the wrong ones.**

Entry b says „150 z 150 osobnych uruchomień w pięciu warunkach” and does not say which five.

Requirements: task point 3 asks for „co próbowano (z liczbami uruchomień i warunkami)”. D-432's
binding sentence asks for "what was tried … with the numbers of runs and the conditions".

How the register misleads: its common section (`tests/flaky-tests.md:25-29`) lists exactly five
conditions: sam; 40 wirujących; 24 pętle startów; pętle całych plików; obciążenie dysku. A reader of
entry b matches "five conditions" to those five. But executor 19's report (table "Every attempt")
gives b's five as:

- alone;
- 40 spinning node processes;
- 24 fork loops;
- 6 whole-file loops;
- 6 whole-file loops together with 40 spinners.

So b had no disk load, and it had the combined load that the common list does not hold. The next
diagnosis would believe disk load was tried on the watcher and the combination was not.

Entries a and c name their conditions, which shows the gap is not a limit of the source. The task's
*Context* gives b only as „w pięciu warunkach”. The author named this gap in *Searches* and left it.

Fix: name b's conditions in the entry, quoted from `executor-19-report.md` as entry a quotes executor
18: „sam; pod 40 wirującymi procesami node; pod 24 pętlami startującymi krótkie procesy; pod 6
pętlami całych plików; pod 6 pętlami całych plików razem z 40 wirującymi procesami — po 30
uruchomień”.

**I-3. `tests/deploy/test_loop2_watch.py:1172-1173`: the new comment is labelled as the defect the case catches, and the case does not catch it.**

The comment reads: `# The break: a limit that cuts the quick `inspect` calls of a busy computer,
so that a healthy game is read as down; one limit covers `inspect` and `logs` alike.`

In this file, the 35 other `# The break:` comments each name the fault of the watcher script that
their case catches. Examples:

- line 119: „a notice paired with the wrong kind, or two calls for one trouble”;
- line 389: „a lost state file that reads as an outage and floods the owner”.

Read by that convention, the new comment says the case catches a watcher whose Docker limit cuts
quick `inspect` calls and so reports a healthy game as down. It does not. The case writes its own
limit into the copy, so the script's limit never reaches it. Its "inspect *" variant asserts the
opposite: an `inspect` that is cut is read as `down` (`assert_sent(result, "down")`). The comment
actually describes why the test's own setup was flaky, a fact about the test, under the label for a
fault of the product.

It also departs from the rule "Where the expected value comes from" of `guidelines/testing.md`, a
rule with no invariant (lines 102-104). The rule says: „Komentarz, który niesie informację ważną dla
kodu, przenosi ją do fundamentu; komentarz bez takiej informacji się nie pisze — kod ma być
zrozumiały sam”. D-82's *Verification* "complies" case for such a comment requires "that
information entered into the foundation in the same change". The comment does carry needed
information: why the two variants have different limits. Without it, a reader would set both back to
1 and bring the flake back. Yet the change enters it nowhere in the foundation. D-432 keeps no entry
for a test whose cause is found, so after this change the reason lives only in this comment.

Why it matters: a maintainer who trusts the label believes a too-short limit in the script is
guarded by a test when it is not. And the guideline rule on comments is binding.

Fix, one of:

- (a) Drop the comment and let the code carry the reason, e.g. a named value for the "logs *"
  limit whose name says it leaves the `inspect` calls time to answer, beside the 1 s of the
  "inspect *" variant.
- (b) Enter the reason into the foundation (a decision of how this one case is tested has a
  precedent in D-422) and keep a comment only if it then still tells the code something the
  foundation and the code do not.

Either way, no `The break:` label on a fault the case does not catch.

### Minor (within the task)

- **M-1. `tests/flaky-tests.md:76-77` — wrong line for the check in entry d.** „w sprawdzeniu
  liczby zarejestrowanych żądań (wtedy linia 1221)”. Line 1221 is where the case begins (`test("reportBrowserFailure posts …`). The check of the count, `assert.equal(seen.length, 1)`, stands
  at line 1234. That is the line executor 18's report gives ("failed once on `2 !== 1` at line
  1234"), at the earlier cycle's base and today alike (the file is unchanged since `4bfc33cd`). The
  error comes from the task's *Context*; the register repeats it. Fix: „w sprawdzeniu
  `assert.equal(seen.length, 1)`, linia 1234 (przypadek zaczyna się w linii 1221)”.
- **M-2. `tests/flaky-tests.md:28-29` — „Żadne obciążenie nie wywołało porażki.” contradicts entry d.**
  The sentence stands in the common section, above all four entries. Entry d says that test failed
  under the combined load of executor 18's runs, and in the same round 14 cases failed (executor 18,
  "Checks"). The sentence is from the *Context*, where it was about the three investigated tests.
  Fix: „…nie wywołało porażki badanego testu”.
- **M-3. `tests/flaky-tests.md:33` — „po 7678 ms przy terminie 5000 ms” reads as the time of the
  request.** Executor 18 gives 7678 ms as the time of the whole case, and infers one request of at
  least 5 s. Someone comparing the next failure with this one could compare a request's time with a
  case's time. Fix: add „(czas całego przypadku)”.
- **M-4. `tests/flaky-tests.md:11-14` — the register repeats a guideline rule and adds an instruction
  the *Context* does not hold.** „Ponowne uruchomienie służy diagnozie, nigdy zielonej bramce.” is a
  second copy of the rule *Flaky tests* (`guidelines/testing.md:311-312`). D-73 keeps testing rules
  in `guidelines/testing.md`, and a copy drifts from its original. „i dopiero potem uruchamiaj go
  ponownie” is not in the *Context* (it gives only „zachowaj cały zapis padniętego przebiegu”), and
  its „go” could refer to the run or to the test. Fix: keep the *Context*'s sentence and its reason;
  drop the copy of the rule, or point to the chapter instead, which line 6 already does.
- **M-5. `tests/flaky-tests.md:38-39` — leftover from the author's process.** „Pięć warunków według
  raportu wykonawcy kroku 18, który przeczytano:” — „który przeczytano” tells the reader nothing and
  reads as left over from the author's work. Fix: „Pięć warunków według raportu wykonawcy kroku 18:”.
- **M-6. `guidelines/testing.md:306` — D-432 attached to the template's own rule.** *Decision* now
  reads `D-73 · D-432`. The testing template gives the *Flaky tests* rule its adopting decision
  alone, and puts a product's own rule under "further rules of the product"
  (`.the-way/product-guidelines/testing/template.md:222-227`). D-73's complies case brings the
  wording of the guidelines to the template when the pin moves, keeping only D-73's departures. A
  product sentence inside the template's rule is neither, and could be dropped in that rewrite. The
  placement is the task's (point 5), so this is a defect the task mandates. The cost today is
  nothing; it is a risk at a later pin move. Fix, if wanted: a rule of its own, e.g.
  `### Register of flaky tests`, with *Decision* D-432.
