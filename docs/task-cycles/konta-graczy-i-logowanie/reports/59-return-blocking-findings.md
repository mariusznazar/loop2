# Blocking findings of the return-step review (reports/58-return-review.md), in the reviewer's words

Reviewed head: 4e915e8dcac1e9cb5fcbbaabcbb4754b374e6f07. Verdict: FAIL, 1 Important, 1 Minor, 0 out of scope. Only the Important finding below is to be fixed; the Minor finding 2 is not fixed in this round (it goes to the request). The reviewer's section on the proposed human question (reports/58-return-review.md, "The proposed human question") is for the orchestrator, not a finding to fix.

#### 1. D-104, D-105, D-106 and D-111 keep a *Review when* field that WAY-24 forbids; the return step edited D-111 to fit the template, left this field, and proposes a human question that omits D-111 (new thread)

**Anchor:** `foundations/decisions.md:1802` (D-104), `:1816` (D-105), `:1830` (D-106), `:1885` (D-111, the entry this commit edits at `:1886`); rule `.the-way/elements/decisions/template.md:22-38` (the entry's fields), `:65` ("A field stays in the template only while someone or something reads it"); WAY-24 in `.the-way/foundations/decisions.md`.

**To paste:** D-104, D-105, D-106 and D-111 still carry *Review when*, which the decision template does not hold. WAY-24 forbids it: "A decision names no date or condition for its review". The four fields should go in this step. D-111 is missing from the question proposed for the human, although this same commit edited D-111's *Origin* to fit the template.

**Why I report it:**

- *What the field does.* A *Review when* condition such as "The password library or measured container profile changes" (`:1885`) asks for a review that nobody is sent to make. WAY-24's rationale names exactly that harm, and its *violates* example is an entry that carries such a field. The foundation check cannot see it: `foundation_check.py` gives `0 errors` on this head, so only a review catches the field.
- *Where the fields come from.* The base `7012abc` has no *Review when* in `foundations/decisions.md` (`git show 7012abc:foundations/decisions.md | grep -c "Review when"` → 0). This task added six: D-12 `:243`, D-16 `:319`, D-104 `:1802`, D-105 `:1816`, D-106 `:1830` and D-111 `:1885`.
- *What the step did.* It corrected D-111's *Origin* by the template's "Origin" section (report entry 8), but left D-111's *Review when* in place. Its question ("Returned to the orchestrator" 1) names D-12, D-16 and D-104 to D-106 only. If the human answers "drop the fields", D-111 keeps its field with no decision behind it.
- *Why D-104 to D-106 are not a question.* The return step's case for asking is that the definition's projected entries carry *Review when* (definition lines 363, 429 and 747 carry them with "check by" dates). The product already settled how such fields are written. D-01 was projected from the same definition with "**Review when:** Node.js 24 has six months of official support left · check by: 2027-10-30" (definition `:548`), and it entered the foundation without the field.
  - WAY-126 brings in the gate-approved wording "with no record of approval copied from the gate". The cycle has already dropped the "check by" half of these fields, so it does not treat them as approved wording either.
  - So the writer has a recommendation: drop the fields. A question with a ready recommendation is one WAY-114 names as a violation ("an agent asks the human to confirm a choice it already recommends"). Step 13 allows only the questions the foundation step allows, and this is none of them.
- *What the fix costs.* Removing the field lines from D-104, D-105, D-106 and D-111 changes no binding sentence and no meaning, and takes about four lines. For D-12 and D-16, see "The proposed human question" below.
- *Grade.* Important, not Minor. Left as it is, the request would ask the human a question the method does not allow, over an incomplete list of entries, and the foundation would gain a field that its template and WAY-24 reject. This lies within the task: the return step answers for the entries the change writes, and D-111 is one it corrects in this range.

