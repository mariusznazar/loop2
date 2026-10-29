PASS 7247c09

# Review of the return step — task `potwierdzenie-adresu`

Range `28f0686..7247c09`, one commit `7247c09` (`foundations/decisions.md`,
`foundations/environment_facts.md`, `foundations/part_map.md`). `git rev-parse HEAD` =
`7247c090bbe9ba5c44657e962b2ce7c0dc0940bf`, the head given. Pin: `git -C .the-way rev-parse HEAD`
and the gitlink both `3aee7d958835cc19b95519f4d21b37538b78e3e1`. Worktree clean before and after;
nothing in it, its index or branch changed (the only file written is this report under the ignored
`.runs/`).

Counts: blocking 0 · Minor 2 · out of scope 0.

## Findings

### Critical

None.

### Important

None.

### Minor

**M1 — D-111 still omits the non-empty password file the code requires.**
`foundations/decisions.md:1914` ("the password file a regular file of at most 1 KiB of UTF-8 with no
control character"), against `src/server/configuration.ts:116`
(`if (length === 0 || length > passwordFileLimit) throw new Error();`) and spec Decision 7
("password file: a regular file of at most 1 KiB, strict UTF-8, non-empty, …"). The return step set
out to make D-111's sentence state the checks the code makes (host, login) but left this clause, so
an empty file satisfies the decision's wording while the code refuses it. Effect: a later change that
drops the emptiness check would still read as complying with D-111; nothing breaks today, since the
code is stricter than the decision. The author saw it (report, "Judged and left as they are", S4 M1)
and judged D-111 "does not ask for a nonempty file"; that is true, and is the gap. Fix would be one
word ("a non-empty regular file …"). Within the task (K6, D-111), graded Minor.

**M2 — "a mail service" in D-144's new rationale sentence reads as the SMTP service.**
`foundations/decisions.md:2593`: "A navigation from a mail service on another site brings no session
cookie, but the page's own requests do …". Everywhere else in the foundation "the mail service"
means Outsider's SMTP service the server submits to (D-13 at `:254`, D-111 at `:1914`/`:1922-1923`,
D-143 at `:2568`/`:2575`/`:2579`). Here it means the player's webmail page the link is clicked in.
The sentence is correct as meant (a cross-site navigation carries no `SameSite=Strict` cookie; the
page's own same-site `fetch` does — `samesite-strict-cookie`, and `src/browser/view/app.ts:161-168`
confirms first, then checks the session), but a reader holding the other meaning gets nonsense.
Rationale only, not the binding sentence; "a webmail page on another site" would remove it. Graded
Minor.

## What was checked and holds

- **Part map, `account-server`** (`foundations/part_map.md:60`): the added "sends account email
  through the mail service" matches `src/server/account-mail.ts` (Nodemailer submission, the
  mailer built in `configuration.ts:7-8,26`). *Files*, *Depends on* (Nodemailer is an outside
  package, not a part) and *Trust boundary* `src/server/**` unchanged and still true.
- **D-111** (`foundations/decisions.md:1914`): the new host clause ("at most 253 characters of labels
  of ASCII letters, digits and hyphens joined by dots") and login clause ("text of at most 254
  characters without whitespace or control character") match `configuration.ts:45-46,137,144`; the
  old wording ("a DNS host name", "printable text") was false for the code — the scratch run below
  shows `-outsider.mikr.us` and a 64-character label accepted and a login with U+200B (Cf) accepted.
  Non-empty host and login follow from `configuration.ts:155` (`trim()` check). Aligning the
  decision rather than tightening the code is a choice the author lists with its cost (report,
  "Choices"); the spec's Decision 7 already defined the host the code's way. D-111's invariants
  `account-startup-configuration` (`invariants.md:748-756`) and `account-server-default-address`
  (`:510-514`) say nothing these clauses contradict.
- **D-144** (`:2583`): the third outcome — "when the request gets neither answer, the account
  client's sentence of its failure in `warning` with the token kept in the page's address for a
  reload" — matches `src/browser/view/email-confirmation.ts:38-60` (non-definitive → `failure.message`,
  `warning`) and `:85-88` (fragment cleared only when definitive); placement unchanged and matching
  `app.ts:80-109,161-168`. The *Verification* "complies" line ("removes the fragment once the
  server's answer is definitive") still holds. Invariant `email-confirmation-link`
  (`invariants.md:870-876`) is about the server and is untouched by the change.
- **D-145** (`:2598`): "the account client's sentence of its failure when the request for a message
  fails for another reason than an address already confirmed, the last three in `warning`, each
  beside „Wyślij ponownie”" matches `src/browser/view/email-status.ts:95-106` (already-confirmed
  hides the row, consistent with "both are gone once the address is confirmed"; any other failure
  shows `failure.message` as `warning`, the button stays). Sent stays `text-secondary`
  (`:31-35`), so "the last three" counts right.
- **Meaning against K2/K3** (WAY-30, `foundation_step.md`): K2 and K3 list the sentences for the
  server's answers and are silent on a request that gets no answer. The added clause does not
  change any sentence, role or place the rows set; it describes a case they do not cover, settled
  in spec Decision 10 (reviewed) and in line with D-44's "loss of connection appear[s] as one
  sentence … in `warning`". I do not read it as "a row with another meaning" or an "exception the
  row does not allow", so no question for the human is owed; the author shows the clause in the
  request's meaning table, which puts it before the human at the merge.
- **New fact `samesite-strict-cookie`** (`environment_facts.md:340-344`): form per
  `.the-way/elements/environment-facts/template.md` (one sentence; edition address pinned to an MDN
  commit; place; passage; date read). The passage is word for word with markup dropped, as the
  template asks ("with markup dropped and whitespace collapsed") — checked against the fetched file,
  line 208 under the heading at line 202. The sentence says no more than the source and turns its
  "should be used" into "suited to", not a requirement. It is named by D-144's *Based on*, so it
  has a dependant (WAY-73), and D-144 does rest on it: the "above the headquarters for a signed-in
  one" placement needs the page's own request to carry the Strict cookie after a cross-site
  navigation.
- **Fixed Polish texts** of D-144 and D-145 (9 distinct, `<adres>` cut off) all found in `src/`.
- **Nothing else needed to follow**: D-109 (`:1884`) and D-112 derive from D-144/D-145 and say
  nothing the clauses contradict; no other entry names the new fact; no glossary term is used
  against its entry (`mail service` is not a glossary term — hence M2 is wording, not a term
  conflict).

## Declined to judge

- The code behaviour behind M1 the author also lists — a password file holding only a UTF-8 BOM
  decodes to an empty password and passes (`configuration.ts:117`, `TextDecoder` drops the BOM) —
  is a code finding of the reviewed whole change (S4 M1), not of the return step's commit.
- That the code's login check does not enforce "printable" as spec Decision 7 says (Cf characters
  pass) — a departure of code from spec, judged in the whole review at `28f0686`; the return step
  correctly made D-111 say what the code does.
- D-137 against the `loop2-deploy` skill (N1) and D-146 against `guidelines/coding-mail-sending.md`
  (N2) — review findings of the whole change that the author left as such; the return step does
  not touch those entries or files.

## Checks run

| Check | Exit | Result |
|---|---|---|
| `git diff 28f0686..7247c09`, `git log 28f0686..7247c09 --stat` | 0 | one commit, the three files named |
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | head and pin as given |
| `python -B .the-way/elements/common/foundation_check.py` (writes only a temp file outside the worktree, `foundation_check.py:531-539`) | 0 | `0 errors` |
| `git diff --check 28f0686..7247c09` | 0 | clean |
| scratch `node rx.mjs` in the session scratchpad: copies of `configuration.ts:45-46` and the length checks at `:137,:144`, 16 cases | 0 | accepted: `-outsider.mikr.us`, 64-char label, 253-char host, full-address login, non-ASCII login, U+200B login, 254-char login; refused: 254-char host, trailing dot, `_`, non-ASCII host, tab, NBSP, DEL, 255-char login — every case as the new D-111 wording says |
| `curl` of `https://raw.githubusercontent.com/mdn/content/13ef67a4…/files/en-us/web/http/guides/cookies/index.md` into the scratchpad, `grep -n` | 0 | passage at line 208 (with backticks around `Strict`), under "### Controlling third-party cookies with `SameSite`" (line 202) |
| `grep -o` of the `„…”` texts of D-144 and D-145, each `grep -rqF` in `src/` | 0 | 9 of 9 found |
| `git check-ignore -v` of this report's path | 0 | ignored by `.gitignore:1` |

Not run: focused tests (`tests/view/email-confirmation.test.mjs`, `tests/view/email-status.test.mjs`,
`tests/startup.test.mjs`) — the commit changes no code or test, the whole review ran them at
`28f0686`, and `scripts/test.py` builds into the worktree, so running them would need a separate
worktree with its own `npm ci`, a cost no claim of this commit needs. The whole gate — forbidden by
the dispatch and the cycle's own run.

## Reaches beyond the dispatch

- `foundations/invariants.md` — `email-confirmation-link`, `account-startup-configuration`,
  `account-server-default-address`, to check the invariants deriving from D-111 and D-144 still
  agree with the changed sentences.
- `foundations/decisions.md` D-109 (`:1882-1890`) — derives from D-144/D-145; checked for a clash
  with the new clauses.
- `foundations/decisions.md` D-13, D-143 and `foundations/glossary.md` (search for "mail service")
  — to see what "the mail service" means elsewhere (M2).
- `foundations/part_map.md` entries `deployment` and `browser-view` — whether the part-map change
  left a neighbouring responsibility sentence false.
- `.runs/task-cycles/potwierdzenie-adresu/spec.md` Decisions 7 and 10 — the source of the host,
  login and password-file checks and of the client-failure sentence.
- `.the-way/elements/environment-facts/template.md` — the rules the new fact must follow.
- `.the-way/elements/common/foundation_check.py:515-539` — to confirm it writes nothing into the
  worktree before running it.
- `scripts/test.py`, `package.json:15` — to see whether a focused test writes into the worktree.
