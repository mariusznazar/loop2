import subprocess, sys, shutil, re
root = "the task's worktree"
orig = root + "/.runs/executor-4/orig/"
def run(name, file, old, new):
    path = f"{root}/src/server/{file}"
    text = open(orig + file, encoding="utf-8", newline="").read()
    assert text.count(old) == 1, (name, text.count(old))
    mutated = text.replace(old, new)
    if 'remembered' in new:
        mutated = mutated.replace('function ownerOnly', 'const remembered = new Map<string, string>();' + chr(10) + 'function ownerOnly', 1)
    open(path, "w", encoding="utf-8", newline="").write(mutated)
    try:
        r = subprocess.run("npm test -- tests/owner-routes.test.mjs", shell=True, cwd=root, capture_output=True, text=True, encoding="utf-8", errors="replace")
        out = r.stdout + r.stderr
        failed = [l[2:90] for l in out.splitlines() if l.startswith("✖") and "(" in l][:0]
        names = sorted(set(l[2:75] for l in out.splitlines() if l.startswith("✖ ") and not l.startswith("✖ failing")))
        print(name, "exit", r.returncode, "failing:", len(names))
        for n in names: print("   ", n)
    finally:
        shutil.copy(orig + file, path)
only = sys.argv[1:]
muts = {
 "M1 no role check": ("owner-routes.ts", 'if (account.role !== "owner") {', 'if (false) {'),
 "M2 role remembered by the process": ("owner-routes.ts", 'if (account.role !== "owner") {', 'const kept = remembered.get(account.id) ?? account.role; remembered.set(account.id, kept); if (kept !== "owner") {'),
 "M12 no normalization": ("owner-routes.ts", 'return input ? normalizeEmail(input.email) : undefined;', 'return input ? input.email : undefined;'),
 "M13 grant refuses owner target": ("owner-routes.ts", '(address) => database.setPreviousSavePrivilege(address, true)', '(address) => database.listAccounts().find((a) => a.email === address)?.role === "owner" ? { outcome: "owner" } : database.setPreviousSavePrivilege(address, true)'),
 "M14 unknown answered 200": ("owner-routes.ts", 'if (result.outcome === "unknown") {', 'if (result.outcome === "unknown" && false) {'),
 "M3 body before role": ("owner-routes.ts", 'router.post(path, ownerOnly(runtime), (request, response) => {', 'router.post(path, (request, response, next) => {\n    if (targetAddress(request.body) === undefined) {\n      invalidRequest(response);\n      return;\n    }\n    next();\n  }, ownerOnly(runtime), (request, response) => {'),
 "M4 grant route no role check": ("owner-routes.ts", 'router.post(path, ownerOnly(runtime), (request, response) => {', 'router.post(path, path === paths.grantPreviousSave ? (_q, _r, next) => next() : ownerOnly(runtime), (request, response) => {'),
 "M5 plain block": ("owner-routes.ts", '(address) => database.blockForPanel(address)', '(address) => database.blockAccount(address)'),
 "M6 limit 64k": ("owner-routes.ts", 'mutationGuards(runtime.configuration.publicOrigin, accountBodyLimit)', 'mutationGuards(runtime.configuration.publicOrigin, 64 * 1024)'),
 "M7 event on no change": ("owner-routes.ts", '{ blocked: "account-blocked" }', '{ blocked: "account-blocked", "already-blocked": "account-blocked" }'),
 "M8 role field for players": ("account-routes.ts", '...(account.role === "owner" ? { role: account.role } : {}),', '...{ role: account.role },'),
 "M9 no prelude": ("owner-routes.ts", 'router.all(Object.values(paths), accountPrelude(runtime));', ''),
 "M10 list unsorted/extra field": ("owner-routes.ts", 'response.json({ accounts: runtime.database.listAccounts() });', 'response.json({ accounts: runtime.database.listAccounts().reverse() });'),
 "M11 session role by operator email": ("owner-routes.ts", 'const result = run(address);', 'const result = run(address);\n    if (result.outcome === "blocked") writeEvent("account-owner-granted", { accountId: result.accountId });'),
}
for k, v in muts.items():
    if k.startswith("M2"):
        v = (v[0], v[1], v[2])
    if not only or any(k.startswith(o + " ") for o in only):
        run(k, *v)
