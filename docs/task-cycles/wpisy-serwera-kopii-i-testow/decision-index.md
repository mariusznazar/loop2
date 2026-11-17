# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 65. Listed by heading alone: 32.

## Listed in full

### D-31 — Which Bash rules block a change?

Every standalone Bash script in the code parts, extensionless scripts included, passes local pinned ShellCheck 0.11.0 run on it by name with `--norc --shell=bash --extended-analysis=true` at its default `style` severity: its default nonoptional Bash checks and every diagnostic severity, with no example-only rules. Embedded commands in YAML or test literals are outside this standalone-script scope, and review keeps a new script from going unnamed and a `# shellcheck` directive that disables a check or changes the set out of the scripts. Changing that set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-351 — How does loop2 keep the imports of its parts within the dependencies its part map allows?

One invariant keeps every import of loop2's code within its part map, and its test counts as a test every file git tracks under `tests/`, helpers and stand-ins included, so that only a file outside `tests/` is kept from importing the part of test helpers. The test reads the imports of TypeScript, JavaScript and Python files, and no process that one file starts from another and no HTML or CSS: in TypeScript and JavaScript `import` and `export … from` statements and `import()` with a string literal, in Python `import` and `from … import` statements and a directory added to `sys.path`. A relative import that the test cannot match to a file git tracks fails it, with the file and the line, an import of a built file under `dist/` is matched to its source under `src/`, and a package or a module from outside the repository is the file of no part.

- **Scope:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow · test-helpers

### D-362 — How does loop2 point to places outside the repository that its readers cannot reach?

loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes, the list of its tasks and the rules of a task's line, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects`, `tasks` and `task-rules`, and no file git tracks holds an absolute path on that disk. No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, product-foundation, test-helpers

### D-73 — Which testing discipline does loop2 adopt?

Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-74 — When are tests on generated inputs considered?

Tests on generated inputs are considered only when the task author names a game rule and a concrete risk from combinations of inputs that a few readable examples do not adequately protect. That task chooses the tool and settles its maintenance cost.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-75 — When are complete player journeys tested in a real browser?

Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-76 — When do fonts and the preview server gain refusal tests?

Permanent refusal tests for font files and the local interface preview server are deferred until the first task changing the respective boundary, which introduces its refusal test and changes its invariant to method test. Only a change of a boundary's principle — another kind of file, another way in, another recipient — changes that boundary, and a change of how the kitchen-sink page is built does not change the boundary of the preview server. Until then, review checks font provenance and that the preview server serves only its own directory and only on the developer's machine.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-77 — How are tests selected and limited as a whole?

`npm test` without arguments runs the full gate; `npm test -- <test file>` accepts exactly one test file and runs only it, building the game first for Node but not for Python, without other tests, the foundation check or the check of the instruction files. A focused run with no executed test or a file that is not a test fails, and only the full gate suffices before a request. There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-78 — How is one test case shaped?

A new or changed test case has a name describing its behaviour and condition, and readable preparation, action and assertion phases protecting one behaviour; it may use a table of explicitly named variants of that behaviour. It neither reproduces the product algorithm nor chooses its expectation from the obtained result.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-79 — How is the npm registry response contract checked?

The npm registry has no separate contract test: the real dependency audit in the gate checks its response format under D-33. Tests of the audit use controlled responses to force errors, and an unreadable real response fails the audit.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-81 — At which levels do loop2 tests stand?

Loop2 tests stand at three levels: unit test and integration test as defined in its glossary, and smoke test in its ordinary meaning. A smoke test starts the built application through its entry point or a container and checks readiness or a simple response, without proving a complete game journey; a level follows the resources exercised, not the test directory.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-82 — Which product documents supply test expectations?

The expectation of a test comes from the loop2 foundation — its decisions, invariants and glossary — from a relation the code under test does not compute, or from a crash counted as a failure; a human's judgement is a source once a decision of the foundation holds it. What a test needs of the requirement it checks stands in the foundation, so no comment is required to name the source of a value, a test comment names as the source of an expectation no document outside the foundation — a task document and a copy of one kept in the record of a task cycle included — and a comment that carries nothing the code needs is not written.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-83 — Where are tests written and how do they enter the gate?

Tests keep Node and Python, their existing directories, and the names `*.test.mjs` and `test_*.py`. Every `*.test.mjs` file under `tests/` is selected by `npm test`, and a new `test_*.py` file is counted as covered by the gate only after its execution there is verified.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-84 — Which real mechanisms do new or changed tests exercise?

A new or changed simulation test supplies explicit state, elapsed time and seed and uses the real game random generator without waiting for game minutes on the computer. A test of file or HTTP failure uses real temporary files or a real local server, waits for a readiness event or condition with a time limit and error handling, and cleans up its files, servers and processes even after failure; polling a condition is allowed, and controlled responses test reactions to forced failures without proving the replaced operation. The HTTP helper in `tests/http.test.mjs` takes these waiting and cleanup rules when that helper changes.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-85 — Which cases are the exemplars of the test levels?

The unit exemplar is the case "the count of a hand-made backpack is the pieces of all items together" in `tests/sim/traits.test.mjs`, for explicit data and independent arithmetic, not time or a whole game. The integration exemplar is "raw and encoded traversal cannot expose files outside dist/public" in `tests/http.test.mjs`, for real requests and visible refusal, not the whole file or its timeout and cleanup helpers. The smoke exemplar is `test_occupied_address_exits_without_reporting_ready` in `tests/invariants/test_account_server_occupied_address.py`, for normal-start controls around forced refusal, not full HTTP, container or gameplay evidence.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-87 — When are whole-screen pixel comparisons used?

Whole screens are not preserved by pixel-by-pixel image comparison, while agreed appearance rules keep their checks and a changed appearance is inspected in a browser. Image comparison is reconsidered on a concrete visual defect or an agreed requirement for an exact layout; this exclusion does not cover the safety of external icons or fonts.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-88 — How are real browser events, focus and SVG checked?

Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests on a hand-made document model or on a ready-made document imitation prove only the logic they run, never real events, focus or rendering. Automation is reconsidered on a defect that such a test missed or together with the player-journey automation of D-75, and this exclusion never covers a trust boundary.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-89 — Who revisits a deliberate testing exclusion?

For a change touching a category deliberately left without tests, its author and reviewer check the category's condition of return, including complete player journeys, whole-screen comparisons and real browser events, focus and SVG.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-49 — Which port does a loop2 test give the server it starts?

Every start of the loop2 server process by a loop2 test on the machine that runs the tests gives the server, in `LOOP2_LISTEN_PORT`, a port the system names free at that start, never a fixed port. The one exception is a single test of the default address, which starts the server with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set. A test giving `LOOP2_LISTEN_PORT` a value the server is to reject before it listens, and a server started inside a container a test runs, fall outside this rule.

- **Scope:** account-server, build-tools, deployment

### D-08 — Where does the game run?

The game and its account and save server run in a dedicated loop2 container on Mikrus, at a public address different from `kantarion.bieda.it`. The existing loop container remains untouched.

- **Scope:** deployment

### D-09 — How does a change reach the server?

A push to the deploy branch starts an automation that tells the server to build the game and its account server from that commit; the server pulls the code from GitHub itself, and the automation's key can only start a rebuild of a commit that belongs to that branch.

- **Scope:** deployment

### D-10 — How do players reach loop2 on the server?

Players reach loop2 at `https://loop2.mariusznazar.com/` through an encrypted remotely managed Cloudflare Tunnel, whose `cloudflared` connector is a second service of the loop2 Compose project with its own memory limit and forwards internally to `http://app:3000`. The application publishes no host port, and the tunnel's published hostname replaces loop2's proxied AAAA record, Origin Rule and Configuration Rule. Deployment pins the official connector image by version and digest, uses HTTP/2 over IPv4, and waits for both application health and an active connector connection before reporting success.

- **Scope:** deployment

### D-11 — Which branch deploys loop2 to the test server?

The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the test server without anyone starting it by hand, deployed itself or within a later commit of `main` that contains it.

- **Scope:** deployment

### D-12 — What access to the server does an agent have?

An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.

- **Scope:** agent-workflow, deployment

### D-13 — Where do the server's access values and secrets live?

Automation secrets and server access values — its name, SSH port, SSH user and IPv6 address — stay outside the repository in the repository's GitHub secrets and the operator's private note, and the login on Mikrus Strych stays outside it in that note and in root's SSH configuration on the server; runtime credentials live outside the checkout in `/etc/loop2/cloudflared-token` for the tunnel, `/etc/loop2/session-secrets` for session signing, `/etc/loop2/smtp-password` for the mail service and `/etc/loop2/backup-encryption-key`, owned by root with group root and mode 0400, for encrypting database backups, and the key that reaches Mikrus Strych lives in `/backup_key`, each backed up in that private note, while no container receives the encryption key or the key to Strych. Compose grants the tunnel file only to `cloudflared` as the read-only secret `/run/secrets/cloudflare_tunnel_token`, preserving the host directory's deployment-account ownership, group 65532 and mode 0750 and the tunnel file's same owner/group and mode 0640, grants the root-owned session file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_session_secrets`, and grants the root-owned SMTP password file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_smtp_password`, while the sender address and the mail service's host, port and login stand as plain values in `compose.yaml`. Repository files and requests name credentials by secret name or private note rather than value, may name non-secret paths and ports, and human rotation replaces the file and private copy before recreating its consumer, the encryption key having no consumer to recreate and its old value staying in the private note until every backup made with it has been replaced; session rotation prepends the new signing secret while retaining old verification secrets until at least 30 days after the last deployment able to sign with each old secret, with a restored old signing configuration restarting that interval.

- **Scope:** deployment, agent-workflow

### D-14 — What kind of container does loop2 run in?

loop2's containers, the application's and the connector's, are Docker containers.

- **Scope:** deployment

### D-15 — How is loop2 recovered when a deployment goes wrong?

A deployment that stops before it starts the new containers leaves the running loop2 containers in service. A rollback is a deployment of an earlier commit — a revert merged to `main`, or a human's run of the installed deploy script with that commit, which may name a commit of any branch of the GitHub repository while the automation's key deploys only commits of `main`. No earlier image is kept, so a rollback restores the earlier commit's code, never the data of that time.

- **Scope:** deployment, agent-workflow

### D-16 — What does the automation's key run on the server?

The automation's key runs only a root-owned installed copy of the deploy script, kept outside the server's checkout, so no pushed commit changes what the key runs. Each deployment compares that copy with the script's source at the deployed commit and only warns when they differ, and reinstalling the copy is a human's change.

- **Scope:** deployment

### D-17 — How does loop2 share the Mikrus host with other workloads?

A deployment of loop2 changes nothing on the host but loop2's own checkout, application and connector images and containers, its named database volume `loop2_accounts`, log and lock, and the build cache and base images its builds add to the shared Docker store, which it never prunes; it removes or replaces nothing of another workload. It builds only while the host's available memory and free disk stay at or above thresholds the repository sets, and each loop2 container runs under its own memory limit. The tunnel token, session signing and SMTP password files are provisioned by the human outside the checkout and mounted read-only only to their respective consumers under D-13, while the application alone mounts `loop2_accounts` at `/app/data` for `/app/data/accounts.sqlite`, with its initial directory owned by uid/gid 1000 and the database preserved across application-container replacement and code rollback.

- **Scope:** deployment

### D-252 — How does loop2 write its failures to its logs, and what does it log?

Loop2 adopts all six rules on failures and logs of the coding template of its pinned the-way and departs from none of them. A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text, a line in the browser's console is plain text, and what a command prints to whoever ran it — the readiness line of the server, the sentence of `account-database-check` in the log of an image build, the report of `measure-passwords` for the script that ran it — is no log line, and where the command works on no value of a player's, as `account-database-check` does on a temporary database and `measure-passwords` on made-up passwords, its failure keeps the error's text there and gets no failure line in the log form of this decision, with `failure`, `kind`, `code` and `place`; the sentence by which `account-block`, `account-previous-save`, `account-role` or `account-backup` answers the operator is the matter of D-354. The product logs changes of a player's account and of access to it and operations that change what runs on the server or its backup, and no progress of a game and no housekeeping, and an agent adds alone an item that fits this principle, an identifier of a thing included, while anything that points to a person takes the human's consent. A change of the role of an account and each operation of the owner panel are such changes: each leaves one line with the number of the account changed, written after a change only, and no address and no number of the account of the owner who acted.

- **Scope:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow

### D-253 — Which processes of loop2 have a last-resort handler of their own?

Each process that touches the data of accounts — the server, `account-block`, `account-previous-save`, `account-role` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled, because the runtime's default print could quote values. The page in the browser has one too: it cancels the event of an error that no code handled, so that the browser prints nothing itself, and writes in the console, as plain text, one line of the kind, the code and the place of the handler, never the error's message or stack, the same line once until the page is reloaded. A script run by hand or by the test gate that touches none of those data meets the rule on the last resort through the default print of Node.js or Python, which writes what nothing handled, and `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have a last-resort handling of their own, which the sentences of this decision above ask no more of, though the last two touch those data and write no kind or code.

- **Scope:** browser-view · account-server · build-tools · deployment

### D-347 — How does an agent learn what went wrong in the game running in the browser?

An agent learns what went wrong in the game running in the browser from what a player reads, the screen and the chronicle, and from the browser's console, through the browser it operates, with no outside service. An exception in the game shows on the screen as a sentence that something broke and goes to the console.

- **Scope:** browser-view, agent-workflow

### D-353 — Which refusals of the account server are an expected course and leave no failure line?

A browser that breaks off sending the body of a request is an expected refusal, like a body that is too large or broken, and the session write that the library makes as a response ends, refused because the account was blocked while the request was in progress, as while a registration waits on its message, is the intended effect of the block; neither leaves a failure line. A session write that fails for any other reason stays a failure.

- **Scope:** account-server

### D-354 — Is the sentence by which a service command answers the operator a log line?

The sentence by which a service command of the account server, `account-block`, `account-previous-save`, `account-role` or `account-backup`, answers the operator is no log line: the log line of such a command is its JSON line of D-252 alone, and the sentence stays beside it. A failure of the command written as that line and followed by that sentence is one failure recorded once.

- **Scope:** account-server

### D-355 — Where does the log of the running game on the server lie, how long does it live and how does an agent read it?

Just before a deployment replaces the containers of the game, it appends the whole log of the application and of the tunnel connector to `/var/log/loop2-app.log` on the test server, and when that append fails it says so in the deploy log and goes on; both services run under the `local` log driver of Docker with its default rotation, which bounds the log of a running container at about 100 MB. `logrotate` rotates the file weekly, or sooner when it grows large, and keeps four rotated generations, so a line of the game's log lives in its container until the next deployment and in the file for about four weeks, and a human's run of `account-block` or of `account-previous-save` appends to the same file the JSON lines of the command, those only. An agent reads the log of a running container with `docker compose logs --tail`, and the file and its generations with a bounded `tail`, `grep` or `zgrep`, each through the `mikrus` MCP server, while a human creates the file with the owner of the deployment account, installs the rotation configuration and reinstalls the deploy script.

- **Scope:** deployment, agent-workflow, account-server

### D-356 — How does the operator learn that the running game failed?

A watcher script on the server, outside the game container, run by cron every few minutes, reads the state and the health of the game's containers, a restart of either of them, the new lines of failures in the game container's log and, in the log of the nightly backup, the lack of a successful send that D-233 gives, passes over the window of a deployment and limits how many messages it sends, and calls `pusher` with a fixed subject and text that say only which kind of trouble it found, with no player's data and no tool's output, because the message may travel unencrypted. A GitHub Actions workflow whose schedule asks for a run every five minutes, and which GitHub starts at gaps of hours — from about 3.5 to about 8.5 hours between neighbouring runs in the reading of 2026-11-14, the cause not established — opens the game's public address and fails unless the address answers with status 200, so that GitHub notifies the operator of the failed run, a notice that with the server or the tunnel down may come only after hours, while the page in the browser, besides its line in the console, sends the kind, the code and the place of an error that no code handled to a route of the game's server, which limits the reports it accepts, writes each as a failure line that the watcher counts and reports, and at the first refusal of an hour writes one failure line of its own, `LIMITED`, as the notice that reports were dropped. A human installs the watcher and its schedule and sets the notifications of GitHub, and nothing is sent when the server and GitHub are both down, when the watcher's schedule does not start, when `flock` does not work on the server, where the watcher ends with success and a line in its own log and sends nothing, or when GitHub disables the scheduled workflow after 60 days without activity in the repository, which is public.

- **Scope:** deployment, agent-workflow, account-server, browser-view

### D-228 — Which failure does the database backup survive?

A completed, consistent backup of the account and save database is stored outside the game server host, so the accounts and saved game states can be restored to the latest retained backup after that host is lost. Mikrus Strych is the destination when it passes a capacity and restore check with the planned retained backups; otherwise another device outside the game server host is used.

- **Scope:** account-server, deployment, agent-workflow

### D-230 — How often is a database backup made, and how many stay?

One backup of the account and save database is made each night, seven stay at the destination, and the latest is at most a day old. The seven are the weekday files `loop2-accounts-<1..7>.sqlite.age`, one for each day of the week by the UTC date of the run, so a night's backup replaces the one made seven days earlier. Only the schedule a human installed or a human's hand run replaces a backup, no command deletes one, and nothing reads the destination's list of files.

- **Scope:** deployment, agent-workflow

### D-231 — Where does the database backup run?

At 03:17 by the server's clock each night, a schedule on the game server's host starts the backup script, installed by hand outside the game container and outside the checkout, which runs a short command in the running `loop2` container, takes the finished backup from that command's standard output through `docker exec` and sends the file itself, so there is no third Compose service and no timer in the game server, and the key to Mikrus Strych never enters the game container. That command opens only an existing database file, needs its one fixed word `--to-standard-output`, without which it refuses before it opens the database and prints nothing to standard output, and is run only by a human or the installed backup script. The script holds the deployment's lock, `/run/loop2-deploy.lock`, with the deployment's wait of 900 seconds, while the command and the encryption run and releases it before sending, and each deployment compares the installed script and the installed schedule with their sources at the deployed commit and only warns when they differ, installing or reinstalling them being a human's change.

- **Scope:** account-server, deployment, agent-workflow

### D-232 — How is the database backup encrypted?

A backup of the account and save database is encrypted on the game server's host before it leaves it, by `age` in the backup script's pipe, with the identity file `/etc/loop2/backup-encryption-key` of D-13 used as a symmetric key. The plain database exists on the host only in that pipe, and the backup is not compressed.

- **Scope:** deployment, agent-workflow

### D-233 — How does the operator learn that a database backup failed?

At any failed end of a night's backup the backup script, outside the game container, calls `pusher` once, and the operator receives a message whose fixed subject and text say only that the backup failed, with no player's data, no tool's output and no step's name, because the message may travel unencrypted. The failure watcher of D-356 reads `/var/log/loop2-backup.log` and, when the log holds no successful send of a backup from the last 26 hours, calls `pusher` with a message of its own kind, under the same limits on its content, at most once a day, so a schedule that did not start does not stay silent; a host that is down sends no message, and delivery depends on push.mikr.us. `/var/log/loop2-backup.log` holds each attempt's start and end, the weekday file and size of each encrypted backup and the stage and exit code of a failure, with no player's data and no access value, so the error text of `ssh` and `rsync` reaches no file.

- **Scope:** deployment, agent-workflow

### D-234 — What does a checked restore of the database mean?

A checked restore is a trial on the operator's computer, which the operator repeats every month and after each change of the database's schema version: a backup fetched from its destination and decrypted, the same commit run on it, a login with a test account, the saved game state seen back, and the backup removed from the computer. It does not cover building a new server, and restoring over the server's database stays a human's documented procedure, whose paths that nobody has run, `umask 077` among them, stay untried.

- **Scope:** deployment, build-tools, agent-workflow

### D-235 — How is the code that talks to Mikrus Strych and `pusher` tested?

Mikrus Strych and the `pusher` service have no contract test, and no test reaches them: the backup script's reactions are tested with stand-ins for its tools, which prove reactions and not delivery. The agreement with them is checked by a human when the way of talking to them changes.

- **Scope:** deployment, build-tools

### D-236 — How is the consistent database backup made?

The backup command of D-231 makes a database backup through `backup()` of `node:sqlite`, on the connection it opens, whole in one step, by a `rate` that is a positive whole number above any page count the database can reach.

- **Scope:** account-server

### D-238 — How does the backup script reach Mikrus Strych?

The backup script sends the encrypted backup by `rsync` over `ssh` into the home directory on Mikrus Strych, giving on the command line batch mode, strict host-key checking and `/etc/loop2/strych-known-hosts` as its one known-hosts file, and those options win over any SSH configuration for those options. Root's SSH configuration and the system-wide one set neither `KnownHostsCommand` nor `VerifyHostKeyDNS`, which the script does not give, so a host whose key that file does not hold fails the send. A human fills that file with the host-key line whose fingerprint a human has compared, the file holds no secret, and after a changed host key the send fails until a human repeats that comparison.

- **Scope:** deployment, agent-workflow

### D-360 — What does a restore of the database from a backup do about the passwords and sessions it brings back?

A restore of the account and save database from a backup signs nobody out: the passwords and sessions the backup holds come back as they were. Whoever reset a password since the backup resets it again, and the restore procedure ends by saying so.

- **Scope:** deployment, agent-workflow

### D-86 — Which files may a visitor obtain from the public server?

Every visitor may retrieve the built game's files from its public directory and no file outside it. A request outside that directory, with a raw or encoded path, receives 400, 403 or 404 with neither that file's content nor the game's page.

- **Scope:** account-server

### D-101 — How long do independent browser sessions last?

Each browser holds its own random, opaque session identifier in a loop2 host-scoped, Secure and HttpOnly cookie, and a player may remain signed in through several browsers at once. A session expires 30 days after its last request and every request with a valid session, static-file requests included, renews the server expiry and cookie. Expired, removed or invalid sessions authorize nothing, and a delayed renewal cannot restore a destroyed session or shorten a later expiry.

- **Scope:** account-server, browser-view

### D-102 — How are account attempts limited?

Five failed logins for one normalized email address within a rolling 15-minute window lock that address for 15 minutes from the fifth failure; success clears pre-lock email history but not IP failures, a locked address remains locked even for correct credentials, and a successful password reset clears that address's failures and lock and leaves the client address's failures as they are. One client IP admits at most 20 failed logins per rolling 15 minutes and five successfully created accounts per rolling hour, with in-flight reservations counted before asynchronous password work so concurrency cannot overshoot those limits. A limited player sees „Za dużo prób. Spróbuj ponownie za kilka minut.”; invalid or duplicate registrations do not consume successful-account slots, and a capacity refusal is not a credential failure.

- **Scope:** account-server, browser-view

### D-103 — Where are attempt counters kept and how is password work bounded?

Attempt histories live in bounded process memory, with at most 10,000 live email keys and 10,000 live IP keys, fixed-size digests for email keys and threshold-bounded histories; restart or deployment clears them. Expired entries release capacity, live restrictions are not evicted to admit another key, and full capacity refuses work. One bounded gate without a waiting queue covers password hashing and verification, including dummy verification for an unknown account, with a concurrency cap selected by measurement within the container memory budget and slots released only when the actual operation completes.

- **Scope:** account-server, deployment

### D-104 — Which request origin and body may change account state?

The session cookie uses SameSite=Strict, and every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with at most 64 KiB for the save route `PUT /api/saved-game` and at most 16 KiB for every other route, the reset route `POST /api/saved-game-reset` included, optional charset allowed and compressed inflation rejected, while the server stores at most 64 KiB of each player's saved game state and at most 64 KiB of the previous save of D-399, so up to two documents per player. Missing, null, duplicate, malformed or foreign Origin and wrong media type are refused before mutation or password work, and Host or forwarded host headers never choose the expected origin. Input is an object of expected fields with explicit type checks rather than coercion, and no cross-origin allowance or form-body alternative bypasses these guards.

- **Scope:** account-server, browser-view

### D-106 — How are player passwords hashed and checked?

The account server hashes and verifies player passwords with the `argon2` package using Argon2id. Its cost parameters are set explicitly after measuring hash and verify operations under concurrent login attempts in the intended Mikrus container image.

- **Scope:** account-server, build-tools, deployment

### D-107 — Which library maintains player sessions?

The account server uses `express-session` to issue and maintain player sessions, with a project-owned session Store backed by the chosen `node:sqlite` database. The deployed server does not use the package's default `MemoryStore`.

- **Scope:** account-server, build-tools, deployment

### D-108 — What public address do the game and account server share?

The built game and the account and save server use one public HTTPS origin at loop2's address. The browser sends account and save requests to relative `/api/` paths at that origin.

- **Scope:** browser-view, account-server, deployment

### D-109 — What identity authorizes an account request?

A visitor may create an account or attempt credential login subject to the transport, origin, input and admission guards, and may ask for a password-reset link subject to the transport, origin and input guards; an emailed confirmation link alone, under the transport, origin and input guards, authorizes confirming the address of its own account; a password-reset link alone, under the same guards and with or without a session, authorizes setting a new password of its own account and nothing else; and a valid server-side session alone authorizes reading its own account, reading and replacing its own account's saved game state, reading its own account's previous save and starting its own account's game from zero, each of those two for an account that holds the previous-save privilege (D-400), asking for a confirmation message to its own account's address or destroying that browser's session. `GET /api/account`, `GET /api/saved-game`, `PUT /api/saved-game`, `GET /api/previous-saved-game`, `POST /api/saved-game-reset`, `POST /api/email-confirmation-message` and `POST /api/logout` without a valid session return JSON 401, while an account identifier or email address supplied in a request grants no authority, the address in a request for a password-reset link naming only the account to whose own confirmed address a link may go, and no field of a request for the saved game state, for the previous save or for the reset names an account. Credential success regenerates and persists the session before success is returned, logout awaits destruction, and account responses are not cacheable and expose no password hash, session identifier, link token, secret, database error or stack.

A valid server-side session of an account with the owner role (D-410) alone also authorizes reading the list of accounts, `GET /api/owner/accounts`, and blocking, unblocking, granting the previous-save privilege to and revoking it from another account, `POST /api/owner/block`, `POST /api/owner/unblock`, `POST /api/owner/grant-previous-save` and `POST /api/owner/revoke-previous-save`, the role being read from the database at each request and never from the session, and the address in the body of those four routes naming the target and granting no authority. Each of those five routes returns JSON 401 with the code `unauthenticated` without a valid session and JSON 403 with the code `owner-forbidden` to a valid session of an account without the owner role, checked after the session and before any field of the body is read, with no field of the body read and nothing changed. Each of the five routes answers JSON 503 where accounts are not configured and otherwise first meets the transport check of D-110, and the four `POST` routes then meet the origin and body guards of D-104, so a request that fails one of them is refused as that decision gives, whatever its session.

- **Scope:** account-server, browser-view

### D-110 — Which proxy information identifies an account request?

In the private Cloudflare Tunnel topology of D-10, account requests require exactly one X-Forwarded-Proto value of https and one syntactically valid CF-Connecting-IP, normalized for equivalent IP representations and used directly for admission limits; Express trusts only the immediate hop for protocol. Duplicate, list or malformed values are refused, and X-Forwarded-For, X-Real-IP, Forwarded and forwarded host values never select account authority, limiter identity or expected origin. Explicit local loopback-proxy mode trusts only a loopback peer, requires forwarded https and uses the actual peer as identity, while direct mode trusts no forwarding and anonymous static and health requests require no proxy metadata.

- **Scope:** account-server, deployment

### D-111 — When is account configuration sufficient to start the server?

Production requires valid `LOOP2_DATABASE_PATH`, `LOOP2_SESSION_SECRET_FILE`, `LOOP2_PUBLIC_ORIGIN`, `LOOP2_PROXY_MODE`, `LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`, `LOOP2_SMTP_USER` and `LOOP2_SMTP_PASSWORD_FILE`, and every partial or invalid explicit configuration refuses before listening; wholly unconfigured non-production may serve public files with JSON 503 from known account routes, without anonymous gameplay or generated-secret, in-memory-database or MemoryStore fallback. The configured origin is HTTPS without credentials, non-root path, query or fragment; the signing file is at most 16 KiB of UTF-8 JSON containing a nonempty array of distinct base64url strings, each encoding exactly 32 random bytes with the newest first; the sender is one address of printable ASCII with exactly one `@` and no whitespace or address delimiter, the SMTP host at most 253 characters of labels of ASCII letters, digits and hyphens joined by dots, the port a decimal integer from 1 to 65535, the login text of at most 254 characters without whitespace or control character, and the password file a regular file of at most 1 KiB of UTF-8 that decodes to a password with no control character that is nonempty once every U+FEFF is taken out, so an empty file, a file of byte-order marks and nothing else and a trailing newline are refused while a byte-order mark followed by other characters is accepted with the mark dropped by the decoder, read once; unreadable or invalid settings report their setting or path rather than contents, and startup does not contact the mail service. After configuration and required resources validate, a start with neither listen variable set retains `127.0.0.1:3000` and the existing occupied-address error, and startup failure or shutdown disposes opened resources.

- **Scope:** account-server, deployment, build-tools

### D-112 — How does the account database open and preserve its schema?

The account server opens one application-owned SQLite connection before readiness, and the operator's blocking command of D-137, its command for the previous-save privilege of D-400, its command for the role of an account of D-410 and the backup command of D-231 each open one short-lived connection beside it under the same rules; opening reads the schema version and, in the same transaction, applies in order every migration step after it up to the current version 6 — one step per version, a step never edited once deployed, a later version adding one step at the end — so it initializes a new database, moves an existing older known version forward keeping every account, session, emailed link and saved game state and their values, and refuses an unknown newer schema without changing it. Accounts have an opaque random primary identifier, uniquely normalized email, encoded password hash, creation time, blocked state, the time their email address was confirmed, unset until it is, the previous-save privilege, off until the operator grants it, and the role, `player` or `owner`, which the step to version 6 adds to the accounts of the database with the value `player` for every account it holds and which a new account has as `player` (D-410); sessions have their identifier, account foreign key, serialized library data and absolute expiry with account and expiry indexes; emailed links have the SHA-256 digest of their token as key, an account foreign key that removes them with their account, a purpose of email confirmation or password reset, creation and expiry times and a mark that they no longer work, with account and creation-time indexes; saved game states have their account's identifier as key and as a foreign key that removes them with their account, the version of their shape, their revision and the game's text of at most 65 536 bytes, and the previous saves of D-399 are kept in a table of the same fields, one row for each account; foreign keys, parameterized statements, WAL, full synchronization and a bounded busy timeout apply, and no transaction spans asynchronous hashing, mail sending or an HTTP response. Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer, together with emailed links both expired and older than one hour, pruned in bounded batches, while touch updates existing unexpired rows only, preserves the later expiry and never recreates a removed session; blocking an account sets its state, deletes its sessions and marks all its emailed links as no longer working in one transaction, a session write for a blocked account stores nothing, and recording an emailed link reads its account's blocked state in the transaction that writes it, writes nothing for a blocked account, and in the same transaction marks every earlier link of the same account and purpose as no longer working; setting a password by a password-reset link is one transaction that reads whether the link still works, its account's blocked state included, and either changes nothing or replaces the account's password hash, deletes its sessions and marks all its password-reset links as no longer working, and a session write that names a password hash stores nothing once the account holds another; writing a saved game state reads its account's blocked state, its stored version and its stored revision in the transaction that writes it and writes nothing when the account is blocked or D-209 or D-210 refuses the save, and, when the save passes and the stored saved game state is of a lower version, moves the stored one into the previous save in that same transaction, replacing the one it held (D-210); the reset of the game reads the account's blocked state, its privilege and its saved game state in the transaction that moves the saved game state into the previous save and removes it from its table, and changes nothing when the account is blocked, lacks the privilege or holds no saved game state (D-402); granting and revoking the privilege is one write by the account's address, which reports whether the account was changed, already was so or does not exist (D-400); giving and taking the role is one write by the account's address, which reports the same three outcomes and ends no session and stops no link (D-410); the block of the owner panel reads the account's role in the transaction that marks the account, and changes nothing for an account with the owner role (D-137); and blocking keeps the account's saved game state and its previous save.

- **Scope:** account-server, deployment

### D-137 — How is a player account blocked and unblocked?

The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction; unblocking clears the account's blocked mark and restores no session and no link. The `loop2-deploy` skill describes the command, and only a human runs it on the server.

An account with the owner role (D-410) also blocks and unblocks a player account, named by its email address in the body of `POST /api/owner/block` or `POST /api/owner/unblock` of the owner panel, which the server answers only to a valid session of such an account, with the same effects in the same one transaction and the answers `blocked`, `already-blocked`, `unblocked` or `not-blocked`, JSON 404 with the code `unknown-account` where no account has that address, and which changes nothing when it refuses. The panel never blocks an account that has the owner role, the caller's own included: the transaction of the block reads the role and the server answers JSON 409 with the code `owner-not-blockable`, also where a second connection gave the role just before the block, and the command stays beside the panel as the emergency way, for a panel that does not work and for an account with the owner role that is to be blocked. The address in the body of the four routes of the panel is normalized as at login, and an address written as no address is the address of no account.

- **Scope:** account-server, deployment, agent-workflow

### D-138 — How is a player's login kept between requests?

The browser holds an opaque, random session identifier in a host-scoped, Secure and HttpOnly cookie. The account server keeps the session record in SQLite, checks it on authenticated requests and can invalidate it on logout, on account blocking or at a password reset, which deletes every session of the account in the same operation as the change of password and signs nobody in, so the player signs in with the new password on the form.

- **Scope:** account-server, browser-view

### D-139 — What does the login of a blocked account tell the player?

A login of a blocked account with the correct password is refused with „To konto jest zablokowane.”, status 403 and the code `account-blocked`, and no session, while a wrong password of a blocked account gets the login message of D-100. That refusal is neither a failed nor a successful login for the attempt limits of D-102: it adds no failure and clears none, and an address locked by failures refuses it as it refuses every login.

- **Scope:** account-server, browser-view

### D-160 — What does an emailed link of a blocked account do?

An emailed link of a blocked account, of an email confirmation or of a password-reset message, changes nothing and leaves the account as it is, and a player who opens such a confirmation link, or sends the form of such a password-reset link, sees „Odnośnik jest nieważny albo wygasł.” in `warning` above the account forms or above the game, as D-156 and D-225 give. A link that a block stopped stays stopped after the account is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij ponownie”.

- **Scope:** account-server, browser-view

### D-202 — Who can create and use a player account?

Anyone can create a player account and start playing without approval. A signed-in player can read and change only their own saved game state. The operator can block an account from signing in and using the game.

A new account has the role `player` (D-410), and no registration and no request gives an account the owner role; an account with the owner role can also block an account from signing in and using the game, from the owner panel (D-137).

- **Scope:** account-server, browser-view

### D-410 — What is the role of an account, who gives it and where does the server read it?

Every account has a role, `player` or `owner`, stored with the account in the account database; a new account has the role `player`, and an account of either role signs in on the same card, plays and keeps its own saved game state. The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12). The server reads the role of an account from the database at each request that depends on it and never from the session, so a role given or taken holds from the next request, and no registration, no request and no field of a request gives an account a role.

The answers that carry the account — `GET /api/account`, the login and the registration — hold `"role":"owner"` for an account with the owner role and no field `role` for an account with the role `player`.

- **Scope:** account-server, browser-view, deployment, agent-workflow

### D-154 — How does the account server send email through Outsider?

The account server composes and sends email confirmation and password-reset messages through Mikrus Outsider SMTP with Nodemailer 10. The SMTP connection must upgrade to TLS; sending fails when STARTTLS cannot be established.

- **Scope:** account-server, build-tools

## Listed by heading alone

- D-05 — What serves the built game and account requests in the container?
- D-229 — How does the account and save server access SQLite?
- D-237 — How is a Node.js release checked before it is deployed?
- D-28 — Which coding-guideline discipline does loop2 adopt?
- D-29 — Which rules check TypeScript and JavaScript?
- D-30 — Which Python rules block a change?
- D-32 — How is web code formatted?
- D-213 — Which file is the exemplar for saved-game code?
- D-412 — What looks for secrets in loop2's repository?
- D-255 — Where does the data an agent checks the game on come from?
- D-256 — Does the local start keep an account between its starts?
- D-257 — Where does account mail go at the local start?
- D-258 — What does the game present to a browser at the local start?
- D-268 — What keeps a test on a document imitation from taking the machine's memory?
- D-390 — Who starts Docker Desktop when a test of the gate needs a Docker daemon that does not answer?
- D-391 — What becomes of the Docker Desktop that the gate started, once the run is over?
- D-392 — Does the gate start Docker Desktop only where the free memory of the computer allows?
- D-413 — How does CI check a pull request into `main`?
- D-414 — What does a Claude Code session of loop2 show at its start where `.the-way` is not at the commit the repository pins?
- D-417 — How does an agent operate the game as a player does?
- D-418 — Where do the screenshots that a task cycle of loop2 shows the human lie, and how does the description of its request embed them?
- D-419 — Who puts a screenshot into the repository for screenshots?
- D-420 — From which session may an agent use Playwright MCP?
- D-153 — Which service delivers account emails?
- D-158 — From whom does the email confirmation message come, and what does it say?
- D-227 — Which messages does a password reset send, and what do they say?
- D-205 — Where are player accounts and saved game states stored?
- D-400 — What is the previous-save privilege and who gives it?
- D-38 — Which styleguide discipline does loop2 adopt for the browser view?
- D-46 — Which fonts does the browser view use, and where do they come from?
- D-271 — Where do the scene's pictures come from?
- D-396 — In which browsers and from which window size does the game have to work?
