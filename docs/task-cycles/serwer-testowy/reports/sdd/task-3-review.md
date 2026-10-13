# Slice 3 review — deployment script: input, lock, fetch, accepted commit, checkout

Base 54dc9f7, head 5ecea7e. Read: the contract, the brief, spec § 5 (lines 127-250) and its
*Human actions* (404-430), the implementer's report, the full diff. Script cited from
`deploy/loop2-deploy` at head (the diff is the whole file).

### Spec Compliance

- ✅ Spec compliant for steps 1-6 and the test seam.
  - `.gitattributes` holds `deploy/** text eol=lf`; `git ls-files --eol` shows `i/lf w/lf attr/text eol=lf` for the script and LF for the other four files.
  - Constants block `deploy/loop2-deploy:25-45` holds every value the brief lists. `PATH` comes first (line 26), before any command runs.
  - Input on two paths (`:86-107`), exit 2 before the lock, git or Docker. Lock with its own unopenable-file message (`:111-119`). Start line with the revision label or `none` (`:123-132`, `:201`).
  - Fetch: forced path `+refs/heads/main:refs/remotes/origin/main` only, human path every head with `--prune`, else 6 (`:136-151`). Accepted commit: forced path against the just-fetched `refs/remotes/origin/main`, human path against each `refs/remotes/origin/*` head except `HEAD`, else 3 (`:155-178`). `checkout --force --detach` and `clean -ffdx`, else 6 (`:182-193`).
  - No `eval`, and no value spliced into shell text.
  - The seam covers all of the brief's points: only the block is replaced, the copy is byte-identical outside it (`deploy_script_support.py:253-272`), LF stubs come first on `PATH`, a guard checks before every run (`:350-362`), Git's own bash is used, and a missing tool gives `SkipTest` (`:87,96,105`).
  - Every input and commit check the brief names has its test.
- Extra, harmless: `OLD_GAME_CONTAINER`, `IMAGE_TITLE_LABEL` and `IMAGE_REVISION_LABEL` in the block (Slice 4 needs them), and exit 1 "checked out, not deployed" (`:210`). Exit 1 keeps a partial run from reporting success.
- Global constraints:
  - The diff holds no server name, port, user or IPv6.
  - It adds no `down` and no prune (the only `--prune` is git's, `:143`).
  - All five files are LF.
- ⚠️ Cannot verify from the diff:
  - Real `flock` serialization and the script under Linux bash, sshd and git 2.34.1 (the server's version; the spec gives it on line 37). Nothing here uses git newer than 2.34.
  - The invariant breaks for `loop2-container-isolation/1` and `account-server-typecheck/1` (their script parts) are **owed at Slice 4's review**. Their checks cannot pass until Slice 4 adds the Docker stages. The implementer reports `test_script_runs_docker_compose` and `test_deploy_script_builds_before_starting_without_building` failing for that reason. I did not re-run them.
  - The server's sshd environment settings (see Minor 3).

### Trust boundary (WAY-48): crafted input, case by case

Each case lists where the code handles it and the test that pins it. Both paths run every value in the table at `test_loop2_deploy_input.py:16-34`, through `:56` (forced) and `:61` (human). Each refusal asserts exit 2, no stub call, an empty `GIT_TRACE`, an unchanged HEAD and a last log line naming `input` (`:48-54`).

| Case | Code | Test |
|---|---|---|
| non-hex | regex `:48`, `:103` | `input.py:17` |
| 39 / 41 characters | anchored `{40}` | `:18-19` |
| uppercase | `[0-9a-f]` under `LC_ALL=C` (`:47`, set before any regex) | `:20` |
| leading / trailing whitespace, trailing or embedded newline | bash ERE `$` matches only at the end of the string | `:21-24` |
| `--help`, `-c` (option-like) | regex | `:25-26` |
| `;`, `$(...)`, backticks, `\|`, `&&` | regex; the value is only ever a quoted git argument | `:27-31` |
| two words in one SSH command | regex | `:32` |
| empty `SSH_ORIGINAL_COMMAND` | `[[ -v ]]` puts it on the forced path, then the regex refuses it | `:33` |
| two arguments | `:98` | `:66` |
| both inputs | `:89` | `:69` |
| no input (client sends no command) | `:95` | `:72` |
| value echoed in a refusal | `:104-105` | `:77` |
| commit on no branch, absent from or present in the clone | `:156`, `:160`, `:177` | `commit.py:167` |
| object that is not a commit (tree) | `:156` | `commit.py:182` |
| commit only on another branch, forced path, absent or already fetched by a human run | `:160` | `commit.py:186`, `:191` |

Named risks:
- **Forced path reaching the human path.** Not possible. sshd's forced command never carries an argument. A client that sends no command lands in `:95` (no input, exit 2). An empty command is set, so it takes the forced path and is refused.
- **Changing a constant.** Not possible. The constants are `readonly` literals, and no environment variable or argument is read in their place. `COMMIT_NAME_PATTERN` and `LC_ALL` stand outside the block, so the seam cannot weaken them either.
- **Test seam reachable from the forced command.** Not possible. The seam exists only in `tests/deploy/`, and the installed script has no override path.
- **Branch other than `main` on the forced path.** Not possible. The forced path fetches with refspec `:140` and runs its ancestry test only against `refs/remotes/origin/main` (`:160`), right after a fetch whose failure is fatal. The `+` lets a force-push that rewinds `main` on GitHub take effect.
- **A 40-hex value that git reads as something other than the named commit.** I probed this on a scratch repository.
  - `cat-file`, `merge-base` and `rev-parse` always read a 40-hex value as an object ID.
  - `git checkout --detach <40hex>` instead **prefers a local branch `refs/heads/<40hex>`** when one exists: HEAD went to that branch's commit, not the named one. A remote-tracking ref `refs/remotes/origin/<40hex>`, which the human-path fetch could create from a GitHub branch with such a name, does **not** take over: HEAD stayed at the named commit.
  - The script never creates local branches, so no SSH client and no GitHub branch can reach this. Minor 1 gives the hardening.
  - An annotated tag's ID passes too. Minor 2.
- **`GIT_*` and other environment passed through sshd.** The script trusts the environment sshd gives it. Bash reads `BASH_ENV`, `SHELLOPTS` and exported functions (`BASH_FUNC_*`) before line 1, so a script-level scrub cannot defend against them. Git honours `GIT_DIR`, `GIT_SSH_COMMAND` and similar variables.
  - Under Ubuntu's default `AcceptEnv LANG LC_*` with `PermitUserEnvironment no`, only locale variables arrive, and `LC_ALL=C` at `:47` neutralizes them.
  - Neither the spec nor its human actions has anyone check this. Minor 3.
- **Output revealing a server-access value.**
  - git's messages go to the log file only (`:148`, `:185`, `:189`). Other git and docker stderr goes to `/dev/null`.
  - The printed paths are the constant log, lock and checkout paths.
  - `flock`'s own stderr is not redirected (`:116`), but util-linux `flock` prints nothing host-identifying.
  - Nothing prints the home path, hostname or user.

### Deliberate breaks (my own, scratch copies, never committed)

Scratch copy: `git archive 5ecea7e deploy tests/deploy`, in `<scratchpad>/t3review/`, one directory per break. Command run in each: `python -B -m unittest discover -s tests/deploy -t tests/deploy -p "test_*.py"`.

| Break (WAY-48 risk) | Result |
|---|---|
| baseline, unchanged | `Ran 26 tests ... OK` |
| B1: fetch failure also prints git's message to stderr (output leak) | FAILED: `test_failing_fetch_exits_6_without_printing_gits_message` (forced and human) |
| B2: input refusal names the rejected value (untrusted value in the Actions log) | FAILED: `test_refusal_does_not_print_the_input` |
| B3: the regex check moved from `read_input` into `accept_commit`, after the lock and fetch (validation after git) | FAILED (failures=35): every malformed value on both paths, plus the extra-input cases |
| B4: forced path skips the fetch when the commit is already in the clone (ancestry checked against a stale `origin/main`) | FAILED (failures=1): only the seam's positive control `test_a_valid_value_passes_input_and_git_is_traced` |

The implementer's own mutations covered three more breaks: forced path fetching every head, forced path accepting any branch, and the regex without `$`.

### Strengths

- Input handling is minimal and correct.
  - `[[ -v ]]` tells set-but-empty apart from unset.
  - The regex, a constant outside the seam, runs under `LC_ALL=C` and checks the whole value.
  - The value is never printed on refusal: it is cleared at `:104`.
- Sending git's messages to the log file alone is a sound call, backed by a test (`commit.py:141`). A fetch error can contain the run account's home path.
- The test instruments are proven rather than assumed:
  - a byte-exact launcher, with a positive control that tells an empty `SSH_ORIGINAL_COMMAND` from an unset one (`input.py:96`);
  - `GIT_TRACE` with a positive control (`:113`), so "git did not run" is evidence;
  - a PATH guard before every run;
  - git's global configuration isolated.
- Both states of the forced-path "other branch" refusal are tested. The state "already fetched by a human run" is the one that matters.

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

1. **Spec-mandated: lock file `/run/loop2-deploy.lock`, `deploy/loop2-deploy:31`, with a non-root run account.**
   - `/run` is a root-owned tmpfs, emptied at every boot. If the run account is not root, `:113` fails and every run exits 4.
   - The spec says the account needs "write access to … the lock" (§ 5, line 138), but human actions 3-4 (lines 411-418) never create the file. A one-time `chown` would not survive a reboot.
   - The slice copied the spec's value verbatim, so this is a spec defect, not a code defect. The implementer raised it (report, Concern 1).
   - The orchestrator decides. Either add a `tmpfiles.d` entry (`f /run/loop2-deploy.lock 0660 <account> <group>`) to human action 3 and the skill, or change the constant: `/run/lock/` is 1777 on Ubuntu, at the cost of letting any local account pre-create the file. Either way, record the account (root or not) as the fact this rests on.
   - The log file `/var/log/loop2-deploy.log` likewise needs creating with the account's ownership. If it is missing, the run only prints a warning (`:59-63`).

#### Minor (Nice to Have)

1. **`deploy/loop2-deploy:184`: checkout by a bare 40-hex name.** `git checkout --force --detach "$REQUESTED"` resolves a local branch named by that 40-hex value before the object (probe above). Nothing the client or GitHub controls creates such a branch, but `merge-base` at `:160` and `checkout` at `:184` can then disagree on what the name means. Fix: check out `"$REQUESTED^{commit}"`; the probe confirmed it detaches at the named commit even with such a branch present.
2. **`deploy/loop2-deploy:156`: an annotated tag ID passes as a "commit".** `cat-file -e X^{commit}`, `merge-base` and `checkout` all follow a tag to its commit. A tag object in the clone (the human's initial `git clone` fetches tags; this repository has annotated `archive/*` tags) whose target lies on `main` is therefore accepted. The log, and Slice 4's revision label, would then carry the tag's ID instead of the commit's. Fix: `[[ $(git -C "$CHECKOUT_DIR" rev-parse --verify --quiet "$REQUESTED^{commit}") == "$REQUESTED" ]]` in place of `cat-file -e`, plus a test where a tag ID is refused with 3.
3. **Environment trust is unstated.**
   - The forced path is safe only while sshd passes no environment beyond `LANG`/`LC_*` (`AcceptEnv`) and `PermitUserEnvironment` stays `no`. `BASH_ENV`, `SHELLOPTS` and `BASH_FUNC_*` would run code before line 1, and `GIT_*` would redirect git.
   - The script cannot defend against this itself.
   - Route it to Slice 5 (skill) and human action 4: check `sshd -T | grep -Ei 'acceptenv|permituserenvironment'` when adding the key.
4. **`deploy/loop2-deploy:126`: `docker inspect` without `--type container`.** With no `loop2` container, Docker falls back to an image or network named `loop2`, and the start line would show that object's label. Add `--type container`.
5. **`deploy/loop2-deploy:23`: the comment says "Every constant stands in this block".** `LC_ALL` and `COMMIT_NAME_PATTERN` stand outside it, and deliberately so: the seam cannot reach them. Say that in the comment, so a later editor does not move the pattern into the block.
6. **No test pins the rewind case.** In that case GitHub's `main` is force-pushed back after the clone fetched commit X, so X is on no branch, yet the clone's `origin/main` still holds it. A forced run of X must then exit 3. Break B4 was caught only by the seam's positive control, not by an acceptance test. Add that test to `test_loop2_deploy_commit.py`.

### Assessment

**Task quality:** Approved. The one Important item is spec-mandated and needs an orchestrator decision on the lock path or the human actions, not a change the slice's code can make on its own.

**Reasoning:** The trust boundary holds:
- every crafted input is refused before git, Docker or the lock, and a test pins each case;
- the forced path cannot reach other branches or the human path;
- nothing printed reveals a server-access value;
- four deliberate breaks of the WAY-48 risks were each caught by the slice's tests.

The remaining hardening (peeled checkout, tag IDs, sshd environment) is defense in depth.
