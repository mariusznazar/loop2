# Report — spec revision, task `zapis-stanu-na-serwerze`

Status: done
Spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md` (revised in place)
Findings answered: `reports/02-spec-review-report.md`, § Findings, items 1–3. All three hold; each is
fixed, none answered against.

## Finding 1 — `keepalive` turned a too-large save into a network failure

The review is right: the server's limit and the Fetch Standard's keepalive quota are both 65 536
bytes, and the quota refuses "greater than 64 kibibytes" with a network error before sending, so the
413 path was unreachable from a browser and the saver would read the error as "failed" (way B of
question 18).

Changed:
- Decision 3, "Fit with `keepalive`": the client measures the UTF-8 byte length of the save body.
  Up to 65 536 bytes it sends it with `keepalive`; above that it sends nothing and returns the same
  too-large outcome as the server's 413. The server's 413 stays for other clients and for the
  stored-text check. The limit copied to the client is named as D-117's weak point, pinned by a test
  on each side.
- Decision 6, the request bullet and the "too large" outcome: the outcome covers the local refusal;
  the next moment or a check that finds a changed state tries again, the hiding check included;
  logout goes on.
- Decision 6, new tests bullet: too-large for a body over 65 536 bytes with no request reaching the
  local server, a body of exactly 65 536 bytes sent; the saver given too-large shows its sentence,
  does not retry and lets logout reach `POST /api/logout`.

Of the two ways the review offered, I chose "not sent, too-large locally" over "sent without
`keepalive`". With the second, the hiding check on an oversized state would send an ordinary request
that a closing page cancels, and it would add a second sending mode for one outcome that the local
measure already decides.

## Finding 2 — a game built from a load had no "last saved" state

The review is right: "changed since the last request was sent" left a freshly built saver, with no
request sent yet, to the maker's guess, and the hiding moment had no condition. Either gap lets the
tab that lost a conflict save by itself (the harm of way B of question 16).

Changed, decision 6:
- The saver takes the state it starts from as a baseline, already saved at the revision it got: the
  state a load returned (conflict path and kept document included) or the new game. Comparison is by
  object identity, which holds because `passRealTime` returns the very state it was given while
  paused or without a map run, and `store.apply` keeps only a changed result
  (`src/browser/sim/game.ts`, `src/browser/view/game-view.ts`).
- Two kinds of trigger. Moments always send: player acts, the end of a map run, and the page's two
  explicit saves of decisions 7 and 8. Checks — the 30-second interval and `visibilitychange` to
  `hidden` — send only when the current state is not the baseline.
- A test: a saver built on a loaded state with no act of the player sends nothing at the interval or
  at hiding, and sends at the player's first act.
- "Outdated" stops moments and checks alike.

## Finding 3 — D-109 left unchanged

The review is right: D-109 closes the list of what a session authorizes and of the routes that
answer JSON 401, and `account-session-authorization`, which derives from it, would have named routes
D-109 does not.

Changed:
- *Constraints*: D-109's two lists change in this change.
- *Foundation entries*: D-109 is listed as changed (account-server, browser-view). The session also
  authorizes reading and replacing its own account's saved game state. Both save routes return JSON
  401 without a valid session. No field of a save request names an account. The invariant keeps
  deriving from D-109, and `player-save-isolation` derives from D-109 and from "Who can create and use
  a player account?".

## The four checks again

1. No placeholder or empty section.
2. No contradiction left: the too-large outcome is now reachable from a browser and matches answer 18,
   To do 7 and 10 and row 2. Decision 6's baseline agrees with the explicit saves of decisions 7 and
   8 and with answer 16. D-109 agrees with the invariant's list.
3. Scope unchanged: one change.
4. Settled readings: "changed" means "not the baseline object"; a body is too large when its UTF-8
   bytes exceed 65 536, so exactly 65 536 is sent.

## Reaches beyond the dispatch

None. I reread only the review report and the spec.

**Searches not found or unclear:** none
