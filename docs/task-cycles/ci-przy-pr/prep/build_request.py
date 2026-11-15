import re, sys
base = 'prep/request_template.md'
t = open(base, encoding='utf-8', newline='').read().replace('\r\n', '\n')

def rep(old, new):
    global t
    assert old in t, old[:60]
    t = t.replace(old, new, 1)

rep("among those it did not open whole were the decisions on the order of the gate's stages being unaffected, on starting Docker Desktop and on the other workflows.",
    "among those it did not open whole were the decisions on running the test directories at the same time, on starting Docker Desktop, on the code checks and on the other workflows.")
rep("wśród nieotwartych w całości były decyzje o niezmienności kolejności etapów bramki, o uruchamianiu Docker Desktop i o pozostałych workflow.",
    "wśród nieotwartych w całości były decyzje o równoległym uruchamianiu katalogów testów, o uruchamianiu Docker Desktop, o kontrolach kodu i o pozostałych workflow.")
rep("I recommend letting them through, except the second remark if the run of this request shows the Docker tests ran, since then the first remark is shown true.",
    "I recommend letting them through; if the run of this request shows that the Docker tests ran instead of being skipped, the first remark is shown true and only wording is left.")
rep("Rekomenduję przepuścić, z wyjątkiem drugiej uwagi, jeśli przebieg tej prośby pokaże, że testy z Dockerem biegły, bo wtedy pierwsza uwaga okaże się prawdziwa.",
    "Rekomenduję przepuścić; jeśli przebieg tej prośby pokaże, że testy z Dockerem biegły zamiast być pominięte, pierwsza uwaga okaże się prawdziwa i zostanie samo brzmienie.")

fix = open('reports/review-fix-report.md', encoding='utf-8').read()
m = re.search(r'\*\*n2 .*?(?=\n\n## )', fix, re.S)
n2 = m.group(0)
ret = open('reports/review-return-report.md', encoding='utf-8').read()
parts = {}
for k in ('r1', 'r2', 'r3'):
    mm = re.search(r'\*\*' + k + r' .*?(?=\n\n\*\*r\d |\n\n## )', ret, re.S)
    parts[k] = mm.group(0)
def para(s):
    # keep the reviewer's words; indent continuation paragraphs under the list item
    return s.replace('\n\n', '\n\n   ')
minor = ('Five Minor findings of the review of the whole change (m1 to m5) were fixed, and finding n1 of the review of the fix was closed by the return step; what follows is what no fix made, in the reviewers\' words, kept whole.\n\n'
 '1. From the review of the fix, finding 2 of it, `foundations/decisions.md` (D-413) and `.github/workflows/tests.yml:7-9`: ' + para(n2.replace('**n2 — ', '**n2 — ', 1)) + '\n\n'
 '2. From the review of the return step, finding r1: ' + para(parts['r1']) + '\n\n'
 '3. From the review of the return step, finding r2: ' + para(parts['r2']) + '\n\n'
 '4. From the review of the return step, finding r3: ' + para(parts['r3']))
rep('__MINOR__', minor)
mode = sys.argv[1] if len(sys.argv) > 1 else 'draft'

if mode != 'draft':
    rep("GitHub's machine with Linux is where the cycle expects them to run instead of being skipped; the run of this request shows whether they did.",
        "On GitHub's Linux machine they ran in both runs of this request: the production images were built and no test was skipped for lack of a daemon.")
    rep("Cykl oczekuje, że na maszynie GitHuba z Linuksem biegną, zamiast być pominięte; pokaże to przebieg tej prośby.",
        "Na maszynie GitHuba z Linuksem biegły w obu przebiegach tej prośby: zbudowano obrazy produkcyjne i żaden test nie został pominięty z braku demona.")
    rep("the run of this request shows whether the daemon answers.",
        "the runs of this request show that the daemon did answer (the container tests ran and none was skipped), so that claim holds for this repository.")
    rep("czy demon odpowiada, pokaże przebieg tej prośby.",
        "przebiegi tej prośby pokazują, że demon odpowiadał (testy z kontenerami biegły i żaden nie został pominięty), więc to twierdzenie jest prawdziwe dla tego repozytorium.")
    rep("I recommend letting them through; if the run of this request shows that the Docker tests ran instead of being skipped, the first remark is shown true and only wording is left.",
        "I recommend letting them through: the first remark is shown true by the runs of this request, and what is left is wording.")
    rep("Rekomenduję przepuścić; jeśli przebieg tej prośby pokaże, że testy z Dockerem biegły zamiast być pominięte, pierwsza uwaga okaże się prawdziwa i zostanie samo brzmienie.",
        "Rekomenduję przepuścić: pierwsza uwaga okazała się prawdziwa dzięki przebiegom tej prośby, a zostało samo brzmienie.")
    rep("After the first green run of the check on this request (its link stands under *Checks*), create",
        "The check has already run green on this request (its link stands under *Checks*), so you can create")
    rep("Po pierwszym zielonym przebiegu sprawdzenia na tej prośbie (link stoi w sekcji *Checks*) załóż",
        "Sprawdzenie już zazieleniło się na tej prośbie (link stoi w sekcji *Checks*), więc możesz teraz założyć")
    rep("**State: blocked** — waits for your action outside the repository: after the new check turns green on this request, you set the rule that makes it required before a merge.",
        "**State: blocked** — waits for your action outside the repository: the new check is green on this request, and you set the rule that makes it required before a merge.")
    rep("**Stan: zablokowane** — czeka na Twoją czynność poza repozytorium: gdy nowe sprawdzenie zazielenieje na tej prośbie, ustawiasz regułę, która czyni je wymaganym przed scaleniem.",
        "**Stan: zablokowane** — czeka na Twoją czynność poza repozytorium: nowe sprawdzenie jest zielone na tej prośbie, a Ty ustawiasz regułę, która czyni je wymaganym przed scaleniem.")
if mode == 'draft':
    rep('__REQUEST_CHECKS__', '*to be filled with the last runs of the form check, the check of private paths and the remarks check when the record is committed.*')
    rep('__RECORD_LINK__', '*to be filled with the link by the SHA of the commit that adds the record.*')
else:
    import json
    d = json.load(open('prep/final_fill.json', encoding='utf-8'))
    rep('__REQUEST_CHECKS__', d['checks'])
    rep('__RECORD_LINK__', d['record'])
    rep('1. **CI on this request:** *to be filled when the run on the last head ends.*', '1. **CI on this request:** ' + d['ci'])
open('request.md', 'w', encoding='utf-8', newline='').write(t)
print('ok', len(t))
