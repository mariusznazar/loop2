import subprocess
SRC = "dist/browser/view/judging-cache.js"
DST = ".runs/review-7/dist/browser/view/judging-cache.js"
orig = open(SRC, encoding="utf-8", newline="").read()
muts = {
 "M1 blow not compared": ("        record.health === creature.health &&\n        record.strikeDamage === creature.strikeDamage);", "        record.health === creature.health);"),
 "M2 health not compared": ("record.health === creature.health &&", "true &&"),
 "M3 refused-save keeps this game": ("(!key.startsWith(gameOwn) || opening.afterRefusedSave))\n            removeFrom", "(!key.startsWith(gameOwn)))\n            removeFrom"),
 "M4 record tidy removes other account": ("if (key.startsWith(accountPrefix) &&\n            (!key.startsWith(gameOwn)", "if (true &&\n            (!key.startsWith(gameOwn)"),
 "M5 memory ignored": ("[stored, recordMemory.get(key)]", "[stored]"),
 "M6 storage ignored": ("[stored, recordMemory.get(key)]", "[null, recordMemory.get(key)]"),
 "M7 equal offer writes": ("current >= damage", "current > damage"),
 "M8 lower offer replaces": ("if (current !== null && current >= damage)\n                return;", ""),
 "M9 damage>health accepted": ("        damage > health)\n        return null;", "        false)\n        return null;"),
 "M10 extra fields allowed": ("Object.getOwnPropertyNames(value).length === fields.length", "true"),
 "M11 version prefix 2": ('"loop2-judging-record-1|"', '"loop2-judging-record-2|"'),
 "M12 offer no validation": ("!isCreatureNumbers(creature) ||", ""),
}
for name,(a,b) in muts.items():
    if a not in orig:
        print(name, "PATTERN NOT FOUND"); continue
    open(DST,"w",encoding="utf-8",newline="").write(orig.replace(a,b,1))
    r = subprocess.run(["node","--test",".runs/review-7/tests/view/judging-cache-record.test.mjs"],capture_output=True,text=True,encoding="utf-8")
    fails=[l for l in r.stdout.splitlines() if l.startswith("ℹ fail")]
    print(name, "exit", r.returncode, "|", (fails[0] if fails else "").encode("ascii","replace").decode(), flush=True)
open(DST,"w",encoding="utf-8",newline="").write(orig)
