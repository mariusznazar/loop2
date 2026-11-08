import json, subprocess, io, sys
R = "[a sibling worktree] proba-krotszych-wytycznych/docs/task-cycles/proba-krotszych-wytycznych/reports/"
runs = "[a sibling worktree] proba-runs/"
W3 = "[a sibling worktree] proba-trial-zadania"
rows = []
for arm in ("old", "new", "none"):
    for t in ("T1", "T2", "T3"):
        for n in range(1, 6):
            name = "%s-%s-%d" % (t, arm, n)
            p = subprocess.run(["node", "trial-tasks/run-test.mjs", t, runs + name], cwd=W3, capture_output=True, text=True, encoding="utf-8", errors="replace")
            res = None
            if p.stdout.strip():
                res = json.loads(p.stdout.strip().splitlines()[-1])
            rows.append({"run": name, "exit": p.returncode, "result": res, "stderr_tail": p.stderr.strip().splitlines()[-3:] if p.returncode else []})
io.open(R + "results-tests.jsonl", "w", encoding="utf-8").write("\n".join(json.dumps(r) for r in rows))
for r in rows:
    res = r["result"]
    print(r["run"], r["exit"], res and res["pass"], res and {k: v for k, v in res["behaviours"].items() if not v})
