# Report — fix of the review of the return step, task kopia-bazy

**Status:** `done`. Both blocking findings are fixed, neither contested.

Worktree `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`, head `ca9e7df02661a4d78c4a7bb5f959cedc1fc44219`, range `687495a..ca9e7df`. Not pushed.

## Commits and files

| Commit | What |
|---|---|
| `6139ffe` | I1: D-217 *Rationale* |
| `ca9e7df` | I2: D-224, `openssh-extra-host-key-sources`, the comment at `deploy/loop2-backup:228-231` |

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 21 | 15 |
| `foundations/environment_facts.md` | 6 | 0 |
| `deploy/loop2-backup` | 4 | 2 |

## Findings

### I1 — fixed

D-217's *Rationale*, `foundations/decisions.md`, now reads, in the reviewer's words as the handoff binds: "Opening the database prunes expired sessions and links, as the server does every minute, and a run holds the plain database for its seconds in the container's writable layer, so the command is a change D-12 keeps from an agent, and the rule on who runs it also keeps that output out of an agent's session."

**Check:** a search of `foundations`, `guidelines`, `deploy`, `src`, `.claude`, `.agents` and `tests` for "changes nothing a player" and "changes nothing on the server" now finds no such claim about the command; `foundation_check.py` exit 0. The sentence agrees with `src/server/database.ts:176-177`, `src/server/account-backup.ts:61-62` and D-12. D-217's binding sentences and *Verification* did not change in this fix.

### I2 — fixed, by wording

D-224, `foundations/decisions.md:4226-4259`:

- **Binding.** "alone" and the unconditional "so a host … fails the send" are gone. The first sentence says the options the script gives on the command line "win over any SSH configuration for those options". A new second sentence: "Root's SSH configuration and the system-wide one set neither `KnownHostsCommand` nor `VerifyHostKeyDNS`, which the script does not give, so a host whose key that file does not hold fails the send." It stands in a binding sentence, not only in prose, because the template says what a decision forces on later work never stands in prose. The entry now has three binding sentences, the template's limit.
- ***Rationale*.** "nothing in root's configuration loosens the host-key check" is replaced: no configuration changes what the script gives, the two options it does not give would widen what it trusts, and the human's installation writes only the login and the path of the key into root's configuration.
- ***Verification*.** One *complies* and one *violates* example added.
- ***Based on*.** Gains `openssh-extra-host-key-sources`, `foundations/environment_facts.md:400-404`. The handoff names D-224 only. The new sentence rests on what those two options do, and the template has *Based on* name such a source, so the fact had to stand.
- **The comment,** `deploy/loop2-backup:228-231`, now says the same. The diff is those comment lines only: no behaviour changes, nothing else in the file.

**Check:** the passage script: 3 of 3 passages of the new fact stand word for word in `ssh_config.5` at `166456ce`. A search for "loosen" and "nothing in root" finds no use left. `git diff` of the script shows comment lines alone. The three commands under *Checks* pass.

The reviewer's own `ssh -G` evidence stands on 10.3p1. I did not repeat it: no wording of mine rests on it, and 8.9p1 is not here.

## The dated reading: left to the request

The handoff offers a dated reading "where the template allows it". I left it to the request, for two reasons:

- A reading fact has to quote the command and its output word for word, and I hold counts only.
- *Rationale* may not tell how a decision was reached, and H2 changes root's file anyway, so a fact on it would go stale at once.

Text for the request, as the orchestrator gave it: read on 2026-10-31 through the `mikrus` server, counts only: root's SSH configuration and `/etc/ssh/ssh_config` hold neither `KnownHostsCommand` nor `VerifyHostKeyDNS`, `/etc/ssh/ssh_config.d/` holds no file, and the client is OpenSSH 8.9p1. I did not repeat this reading.

## Meaning of each changed entry

These replace the sentences for D-217 and D-224 in `reports/return-report.md`.

| Identifier | Range | Meaning |
|---|---|---|
| D-217 | `foundations/decisions.md:3978-4035` | Znaczenie wiążące bez zmian; poprawione uzasadnienie: 58 MiB to sam krok kopii, całe polecenie zajmuje około 73 MiB, a ponieważ otwarcie bazy usuwa wygasłe wiersze i przebieg trzyma jawną bazę w warstwie kontenera, polecenie jest zmianą na serwerze, której D-12 zabrania agentowi, a reguła o tym, kto je uruchamia, dodatkowo trzyma jego wynik z dala od sesji agenta. |
| D-224 | `foundations/decisions.md:4226-4259` | Skrypt kopii wysyła plik na Strych przez `rsync` po `ssh`, a podane przez niego opcje wygrywają z każdą konfiguracją SSH, ale tylko dla tych opcji, więc sprawdzanie klucza hosta wymaga też, by konfiguracja roota i systemowa nie ustawiały `KnownHostsCommand` ani `VerifyHostKeyDNS`; plik `/etc/loop2/strych-known-hosts` wypełnia człowiek linią o porównanym odcisku, a zmieniony klucz oznacza nieudaną wysyłkę do czasu ponownego porównania. |
| `openssh-extra-host-key-sources` | `foundations/environment_facts.md:400-404` | W OpenSSH 8.9p1 `KnownHostsCommand` dokłada klucze hostów spoza plików `known_hosts`, a `VerifyHostKeyDNS yes` ufa kluczom pasującym do bezpiecznego odcisku z DNS, przy czym domyślnie ta opcja jest wyłączona. |

For the record's *Return step*: environment facts gain `openssh-extra-host-key-sources`; decisions, invariants, glossary, part map, projected entries and settlement rows stay as `return-report.md` gives them.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`, also at `ca9e7df` after the commit |
| `.runs/quality-venv/Scripts/shellcheck.exe --norc --shell=bash --extended-analysis=true deploy/loop2-backup` | 0 | no report, ShellCheck 0.11.0, the arguments of `test_shellcheck_source_rules` |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 26 tests, OK |
| The passage script on the new fact | 0 | 3 of 3 |
| The own-work script on the added lines of `eb4ece0..ca9e7df` | 0 | no server name, host, address, port or fingerprint; D-224 holds three binding sentences, no banned word, no bare "check", no noun `copy` |

Not run: the full `npm test`, the orchestrator's gate. `ssh -G` on 8.9p1: not installed here. H5, H2, H3 and anything on the server or Strych: not allowed here. The whole quality test file was not run; its ShellCheck command was, on the one file changed.

## Own-work check

- **Requirement most likely missed:** a sentence again saying more than its source, the fault both findings share and my first check could not see. **Check:** I read each new clause of D-224 against the raw option text, not only its quotation: what `KnownHostsCommand` adds, what `VerifyHostKeyDNS` trusts and its default, and the list of options in `ssh_config.5` for any other that widens the check. **Result:** the sentence now states the two as a condition, not as a guarantee. The list gave one more, named under *Searches*.
- The same reading of my draft corrected "the key" in root's configuration to "the path of the key": D-13 keeps the key in `/backup_key`.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The condition stands in a binding sentence | Only in *Rationale* — prose may not carry what binds later work | One binding sentence more; the entry is at the limit of three |
| A new fact, not a longer `openssh-strict-host-key-checking` | The same entry — other options, another reason to change | One more entry |
| *violates* names an installation procedure | A bare state of the host — an agent compares a change, and a change can only be a procedure or a skill step | None |
| The Minor findings M1 to M6 left alone | Folding them in — the handoff and the method say they are not mine | They stay for the request |

## Reaches beyond the dispatch

- `tests/quality/test_quality_invariants.py:11`, `:25-27`, `:57-60`: for the gate's ShellCheck command and where its tool lives.
- `.claude/skills/loop2-deploy/references/backup_and_restore.md:115-116`: to confirm the step writes only the login and `IdentityFile`.
- `ssh_config.5` at `166456ce`, the copy already read on 2026-10-31.

## Searches not found or unclear

- **`NoHostAuthenticationForLocalhost`.** The option list holds this third setting that turns off host authentication, for loopback addresses only. It does not reach a connection to Strych unless the entry's `Hostname` pointed at a loopback address, which no procedure writes. The handoff binds two options, so D-224 names two; I name it here so the orchestrator can decide whether the request should.
- **Whether root's file stays free of both options after H2.** Nothing checks it: the skill's step writes neither, and no test can read the host. It rests on the human following that step.
- **The skill does not warn against the two options.** `backup_and_restore.md:115-116` only lists what to write. Left as it is: the handoff names no change there.
- **`docker exec`'s exit status** and the other items of `return-report.md`: unchanged.
