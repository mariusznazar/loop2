from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[4]
REPORTS = ROOT / ".runs/task-cycles/coding-guidelines/reports"
base = "e31f6a4051f33b832cb8603d67e815240af5464f"
head = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip()
numstat = subprocess.check_output(["git", "diff", "--numstat", base], cwd=ROOT, text=True)
map_text = (ROOT / "foundations/part_map.md").read_text(encoding="utf-8")
entry = map_text.split("## build-tools\n", 1)[1].split("\n## agent-workflow", 1)[0]
text = f"""# Final fix wave 1 of 1

Status: implementation complete; independent scoped re-review pending. No next-stage action.

## Boundary and authorship

Worktree: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines, branch task/coding-guidelines.
Fix base: {base}. Reported HEAD: {head}.
Original fork: c379207bfd8bd148d3589ea75604ba5165915d01.
Pinned process gitlink and checked-out HEAD: d829e3aa6242a9b8901274531dd82fd5c7d87628.
Authority: frozen task.md plus amendment-npm12.md, author-contract.md, final-fix-handoff.md,
final-review.md Important findings I-1/I-2 and root's explicit foundation-route dispatch.
Relevant accepted plan clauses: F6 failed observations, Slice 3 cleanup, map assignments before dependent work,
independent sentence/method/covered-code authors and final root-owned gate.

I am /root/final_fix, a fresh invariant-method correction author, distinct from the original
sentence author, original observation author (F6), support author (Slice 3), and covered server/configuration
authors. This dispatch returned to the foundation method route. Only observation mechanics, their targeted
regressions and the map are changed. No covered application/configuration mutation, invariant sentence,
policy, method CLI or version changes. Root supplies the independent final-version assessor; no subagents
were spawned. Four Minor entries remain deferred exactly as graded by final-review.md.

## Guideline and foundation selection

Read product AGENTS.md/CLAUDE.md; pinned product-guidelines/reading.md; common way_of_working.md,
part-map skill/template/examples, common rules and referenced pinned map examples; Superpowers 6.4.1
TDD, writing-good-tests and subagent implementer prompt. This uses the pinned project
**the-way-update-part-map**, not a personal skill or another checkout.

Touched parts: account-server (one-process invariant method), build-tools (shared observation support,
quality regressions and build manifest claims), product-foundation (map); deployment is context through
D-05 and the existing container promise, with no deployment-file edit. Complete product map and invariant
file, full current decision Scope inspection, selected decisions and their linked dependencies were read.
The account/build scope matches D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-07/1,
D-27/1, D-28/1, D-29/1, D-30/1, D-31/1, D-32/1, D-33/1, D-37/1; D-08/1 is linked context.
The whole selected invariant entries retain their sentences and standing methods. Product glossary and
pinned process glossary were inspected; no new term or changed binding meaning is needed.

Selected guideline: complete guidelines/coding.md. All five guideline headers and the complete kind index
were inspected. No application kind condition matches Python observation tests/helpers or map patterns,
so no kind file is selected. The general file covers these Python tests under D-30, and D-28 preserves
accepted Python/Bash formatting and other-kind deferrals. Selection remains the handoff's selection,
with no gap or expanded product kind. Actual five-file diff confirms it.

Whole-foundation collision search used process/listener/PowerShell/CIM and package.json/package-lock,
manifest/lockfile/build-tools/ownership/assignment/pattern/failure vocabulary across all five elements.
Incoming uses name the same one-process policy, package layout, build-tools and D-33 audit reach.
No binding sentence, identifier, flow, surface, boundary, glossary meaning, fact or decision changes.
The root anchoring removes duplicate pattern claims without transferring a file to another part.
Current snapshot for this search is the fix base plus these five pending/committed paths; rerunning against
merge-onto remains the root's integration responsibility. This is a targeted collision search, not a
claim that the TODO decisions-found-for-change method or the dependency-graph comparison ran.

## I-1 - Reject non-terminating PowerShell observation errors

Grade/scope: Important, in scope, preserved from final independent review.
Both Win32_Process readers previously accepted actual native CIM errors with exit 0 and partial stdout.
The new guard rejects nonempty stderr (after stripping whitespace) in addition to nonzero exit, before
parsing any table. The exact PowerShell query and existing POSIX/nonzero handling stay the same.
The query writes table data only to stdout; a diagnostic on stderr prevents trustworthy observation.
Cost: a future harmless stderr diagnostic also blocks this check, conservatively requiring investigation.
Leaving the old code accepted demonstrated incomplete process evidence. Terminating errors via PowerShell
preference was another narrow option, but rejecting the existing error stream directly covers the observed
exit-0 condition without depending on a changed PowerShell pipeline. No known frequency is inferred.

TDD red: prior reviewed method code plus newly written regressions fails one exit-zero deterministic
case in each reader and two actual native reader subcases. Healthy owned-child observation passes.
Native pre-fix probes additionally reproduce actual two-HTTP-listener false acceptance with the original
assertion, not a synthetic CompletedProcess. Their exact native argv, exits, stdout/stderr are retained.
Green: deterministic regressions and actual native error tests pass; both native readers reject exit-0
CIM errors. The healthy native test confirms an owned child retains its actual parent and appears among
actual descendants. The real two-listener assertion rejects the pair under a healthy query, and the
failed partial query is rejected before any process-table evidence can yield a pass. Only owned processes
were stopped. Existing cleanup/resource tests retain successful termination of the known main process
when child observation fails, and retain logs/age/parent filtering coverage.

Probe sources: final-fix-native-readers.py and final-fix-native-listeners.py beside this report are
adapted from the reviewer's ignored report probes, pointed at this task worktree. The listener exercise
now catches a rejection from table reading as well as the final assertion, so the corrected early
rejection is recognized without replacing or weakening the actual invariant assertion.

## I-2 - Remove overlapping ownership of dependency fixture files

Grade/scope: Important, in scope, preserved from final independent review.
Only the two root Files patterns change: package.json to /package.json and package-lock.json to
/package-lock.json. Existing tests/quality/** keeps both nested fixture files. The pinned Git matcher
therefore gives exactly one build-tools claim to each of the four real files. No files are taken from
another part, no file is left out, and neither the trust-boundary field nor any part responsibility changes.
Leaving the patterns unchanged failed the mandatory actual map guard with two duplicate claims.
Changing the pinned checker would broaden scope unnecessarily; root anchoring costs only two map lines.

The actual unmodified pinned map guard fails before the correction and exits 0 afterward. It still
reports two existing criticality warnings (build-tools and deployment depending on account-server) and
one unchecked comparison: no product command reports the inter-part dependency graph or new/stale
violations. These are not hidden or represented as full graph agreement.

Weakest-point check: narrowing a filename could silently remove nested audit scope. The probe calls
pinned guard.check_files with its actual Git attribute matching and asserts exactly [build-tools] for
root package.json, root package-lock.json and both nested dependency-audit companions. It then traces
the actual check_dependencies.main -> check -> _collect and real registry bridge, preserving the
actual audit, with only transparent logging wrappers. Current collection receives all four exact paths
and 332 distinct real package/version pairs; original-fork collection receives both root paths and
98 pairs. The actual live audit passes with the original fork and npm 12.2.1. This is real service
evidence at execution time, not a guarantee about future advisories or merely a fixture-only pass.

Complete corrected entry (meaning: root and nested manifests keep the accepted build-tools owner,
each through one Files pattern):

## build-tools
{entry}

## Changed paths and self-review

```text
{numstat}```

Five tracked files, 61 additions and 6 removals. No .the-way edits, covered server/configuration edits,
extra branch/directory copies, style cleanup, ignored-report commits, push, merge or deployment.
Self-review read the complete actual five-file diff: the behavioral delta is two pre-parse failure
conditions, map delta is two root anchors, and the rest is four added regression tests and the existing
fixture helper's explicit stderr argument/default. Existing successful fixtures now have clean stderr;
exit failures remain failures. Methods do not infer a pass from missing evidence. No unrelated process
is targeted; the native healthy regression owns and reaps its child.

Sharpness: two parts' process-observation mechanics and map routing touch evidence trust (OS command
output) and dependency-audit reach. Although no application behavior or deployment boundary changes,
a false pass is consequential, so native exit-0 partial errors, real two-server rejection, healthy child
observation and actual four-file audit collection supplement unit cases. No irreversible product effect.

## Complete check evidence

Every row links the full untruncated captured stdout/stderr and adjacent JSON with exact argv, exit and
duration. All run from the task worktree. The capture wrapper invokes each listed command without shell
conversion. Native probes additionally print the actual native argv/exit and full stdout plus stderr.
"""
for metadata in sorted(REPORTS.glob("final-fix-*.log.json")):
    data = json.loads(metadata.read_text(encoding="utf-8"))
    log = REPORTS / metadata.name.removesuffix(".json")
    text += f"\n- `{json.dumps(data['command'], ensure_ascii=True)}`; actual exit **{data['exit_code']}**; "
    text += f"[full output]({log.as_posix()}), [exact evidence]({metadata.as_posix()}).\n"
text += """

Red runs are expected demonstrations of the two findings against prior method/map code, never product
passes. The first ownership-audit evidence wrapper failed because its plain print of Git output hit
Windows ANSI encoding (UnicodeEncodeError), before audit comparison; the initial full log remains.
The wrapper was corrected to lossless ASCII JSON escaping of output, and a separate retry passed the
actual audit. No product checker was changed to accommodate that reporting failure.

Unresolved/unchecked: independent scoped final-version review and native error/break acceptance remain
root's next dispatch. Root owns the later integration/full gate and merge-onto search. Native POSIX
execution and rendered browser behavior are unchecked here; existing POSIX fixture coverage is not
claimed as native Unix. No UI change is made and there is no assigned browser route. The two existing
map warnings and missing inter-part graph command remain as reported above; four Minor review entries
stay deferred. The unchanged guideline methods/cases retain prior independent evidence except for the
specific corrected observation method and ownership scope checked here; no fresh all-13-pair claim.
"""
(REPORTS / "final-fix.md").write_text(text, encoding="utf-8", newline="\n")
print("report written")
