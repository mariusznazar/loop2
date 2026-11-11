# Findings for the fix — whole-change review `FAIL 76120d8a312a726e97a5aa07ef7e06e52751a567`

Cut word for word from `review-whole-report.md` (blocking finding, then the Minor findings within the task, WAY-161). The out-of-scope finding is not part of the fix.

### Important (blocking, within the task)

**I1. The counting command of item 14 shows 0 for two forms of configuration that ssh honours, while
the instruction and the environment fact say a 0 cannot hide a set option.**

- Places: `.claude/skills/loop2-deploy/references/backup_and_restore.md:210` (the keyword `grep`
  requires the option's name as the first characters after spaces), `:213-217` (a word `~user/...`
  passes the allowed-characters test and falls into `*) path=$base/$word`, a path that does not
  exist, so it is skipped with no count), `:222` (the `Include` `sed` has the same shape as the
  keyword grep); the claims at `:235-237` "so the number is never 0 for a configuration the command
  could not read to the end"; `foundations/environment_facts.md`, entry
  `loop2-host-ssh-host-key-options-unset`, *Source*: "so that a count of 0 means every file was
  followed and none sets either option". Same text in `.agents/`.
- What is wrong: (1) a double-quoted keyword, `"KnownHostsCommand" /bin/true`, is read by ssh as
  the option (its keyword parser strips the quotes), and the command counts 0; (2) an
  `Include ~root/other` in root's configuration is followed by ssh (an Include path in a user
  configuration is expanded with `~` and `~user`), and the command treats it as a relative path
  under `/root/.ssh`, finds nothing and counts 0 for an `other` that sets the option.
- Why it matters: task item 14 requires that the count "obejmuje pliki dołączane dyrektywą
  `Include` ... bo inaczej może pokazać 0 przy ustawionej opcji", and D-361 makes this count the one
  way an agent confirms the condition D-238 rests on. A false 0 says the host-key check rests on
  the one compared line when it does not. Both forms are unlikely on the real server (a human wrote
  root's file with one Strych entry), so the reading `0` in the fact is very probably true; what is
  false is the guarantee the text gives for the command.
- Evidence: fake trees run through the instruction's block word for word with only its three fixed
  paths moved (`the cycle's scratch folder, rv/cases.sh`,
  `run.sh`): case `quoted` gives `0`, case `tuser` gives `0`. Local OpenSSH_10.3p1,
  `ssh -G -F q.conf example.invalid` prints `knownhostscommand /bin/true` for the quoted keyword;
  `ssh -G -F u.conf example.invalid` prints `verifyhostkeydns true` through
  `Include ~Mariusz/<path>/inc.conf`; control `plainq.conf` prints the same option for the plain
  form. The server's OpenSSH version was not read (D-12 bars me from it); quote-stripping of the
  keyword and `~user` in Include are older than the 8.x line, so the same holds there by reading,
  not by a run.
- A way to fix (the orchestrator's choice): in the `case`, add `\~*) n=$((n + 1)); continue ;;`
  after the `\~/*)` branch, so any other `~` form counts as one; and count as one every non-comment
  line whose first non-space character is `"` (or allow an optional `"` around the keyword in both
  the keyword grep and the `Include` sed). Then the fact's *Source* must quote the new command, and
  the reading has to be taken again through the `mikrus` MCP server by the orchestrator, since a
  fact's reading quotes the command that was run. Narrowing the claims instead would leave item 14
  unmet for a `~user/` Include.

### Minor (within the task; the orchestrator fixes them before the request, WAY-161)

- **M1.** `.claude/skills/loop2-deploy/SKILL.md:93-94` and the same lines in `.agents/`: the line
  `count, no running of the backup script or of the backup` stands at column 0 inside the list item;
  the change broke the wrap and indentation of that bullet, the kind of lost wrap item 9 repairs
  elsewhere. It still renders as a continuation in Markdown; rewrap the bullet with its two-space
  indent.
- **M2.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:416-417` (step 2):
  `-o accounts.sqlite`, `<file>` and `head -c 15 accounts.sqlite` are relative to a working directory
  no step sets, while step 5 (`:439`) installs `/root/loop2-restore/accounts.sqlite` and step 7
  removes only `/root/loop2-restore`. A human standing in `/root` who gives the backup's full path
  writes the plain database (addresses and password hashes) to `/root/accounts.sqlite`, mode 0644
  under root's usual umask, which step 7 never removes; step 5 then fails. This is the task's need
  ("zostawić plik z adresami i skrótami haseł ... albo utknąć na poleceniu"), and the change edited
  steps 1, 2 and 5. Add `cd /root/loop2-restore` at the end of step 1, or write the paths of step 2
  in full.
- **M3.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:495-497` ("With no server",
  step 3): "Do not make a new key here, neither with "Creating the file" nor with "Rotating" ...:
  ... a new key signs every player out." For "Rotating" the reason is false: it prepends a new key and
  keeps the old ones, and `setup_and_secrets.md:178` says "players stay signed in" (D-13: "session
  rotation prepends the new signing secret while retaining old verification secrets"). The wording
  comes from task item 13 ("nowe z sekcji rotacji, które wylogowałyby wszystkich graczy"), which the
  author flagged. Keep the ban, give each its own reason: "Creating the file" makes a file with one
  new key, which signs every player out; "Rotating" needs the file in place first.
- **M4.** `foundations/environment_facts.md`, `loop2-host-ssh-host-key-options-unset`, *Source*: the
  template's reading form is `` reading: `<command>` on <host>, <tool and its version> — "<output>"; run <date> ``
  (`.the-way/elements/environment-facts/template.md:36`, `:109-114`). The entry puts, between the
  host and the tool, a clause explaining what the command counts and what a 0 means — the author's
  paraphrase, not the reading, and carrying the false guarantee of I1 — and names only grep's
  version although bash, sed and tr run too. Drop the clause (the instruction holds that
  explanation) and name the tools the command runs, or bash and grep at least.
- **M5.** Same entry, its identifier `...-options-unset` names the fact's value; the template says
  "The identifier names what the fact is about, never its value"
  (`.the-way/elements/environment-facts/template.md:23`), and were an option set the identifier would
  read false. A name such as `loop2-host-ssh-host-key-options` fits; the rename reaches D-238's
  *Based on* in the same change.
