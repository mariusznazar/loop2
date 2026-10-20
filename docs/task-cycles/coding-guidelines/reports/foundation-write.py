"""Write the accepted coding foundation; preserve existing newline bytes."""
import importlib.util
import json
from pathlib import Path
import re

ROOT = Path.cwd()
REPORTS = Path(__file__).parent
spec = importlib.util.spec_from_file_location('foundation_fingerprint', ROOT / '.the-way/relation-model/fingerprint.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
fingerprint = module.fingerprint

def read(path):
    with Path(path).open(encoding='utf-8', newline='') as stream:
        return stream.read()

def write(path, text):
    with Path(path).open('w', encoding='utf-8', newline='') as stream:
        stream.write(text)

def source(name):
    return read(REPORTS / ('foundation-source-' + name)).replace('\r\n', '\n')

def collapse(text):
    return ' '.join(text.split())

def block(text, begin, end):
    return text.split(begin, 1)[1].split(end, 1)[0]

def citation(url, place, passage):
    assert collapse(passage) in collapse(next(item for item in source_texts.values() if item[0] == url)[1])
    return f'{url} § {place} — "{collapse(passage)}"; read 2026-10-20'

evidence = json.loads(read(REPORTS/'foundation-source-evidence.json'))
source_texts = {item['name']: (item['url'], source(item['name'])) for item in evidence}
def cite(name, place, passage):
    url, text = source_texts[name]
    assert collapse(passage) in collapse(text)
    return f'{url} § {place} — "{collapse(passage)}"; read 2026-10-20'

js = source('eslint-recommended.js')
js_rules = dict(re.findall(r'"([\w-]+)": "(error)"', js))
assert len(js_rules) == 64
ts_recommended = source('ts-recommended.ts')
ts_raw = source('ts-eslint-raw.ts')
ts_delta = dict(re.findall(r"'([^']+)': '(error|off)'", ts_raw))
ts_delta.update(dict(re.findall(r"'([^']+)': '(error|off)'", ts_recommended)))
ts_combined = dict(js_rules)
ts_combined.update(ts_delta)
assert sum(v == 'error' for v in ts_combined.values()) == 92
ruff_body = 'pub const DEFAULT_SELECTORS: &[RuleSelector] = &[' + block(source('ruff-settings.rs'), 'pub const DEFAULT_SELECTORS: &[RuleSelector] = &[', '\n];') + '\n];'
ruff_codes = re.findall(r'// ([A-Z]+\d+)', ruff_body)
assert len(ruff_codes) == len(set(ruff_codes)) == 407
excluded = ['PLW1510','I001','ISC004','UP031','RUF059','PIE808','RUF007','RUF012','PLR0402','FURB167','RUF100','SIM117','FURB192','SIM102']
assert set(excluded) <= set(ruff_codes)

facts = []
def fact(identifier, sentence, holds, citations, meaning):
    facts.append({'id': identifier, 'sentence': sentence, 'holds': holds, 'source': ' · '.join(citations), 'meaning': meaning, 'fingerprint': fingerprint(sentence+'\n'+holds)})

fact('eslint-recommended-rules',
     'The `recommended` set in @eslint/js 10.0.1 contains the following rules, each at `error` with no configured options: '+', '.join('`'+name+'`' for name in js_rules)+'.',
     '@eslint/js 10.0.1',
     [cite('eslint-recommended.js','module.exports, rules', 'rules: Object.freeze({'+block(js,'rules: Object.freeze({','\n    }),')+'\n    })')],
     'Wydanie @eslint/js 10.0.1 określa pełną listę 64 reguł recommended i ich poziom error.')

ts_on = [key for key, value in ts_delta.items() if value == 'error']
ts_off = [key for key, value in ts_delta.items() if value == 'off']
ts_citations = [
    cite('ts-recommended.ts','default export, complete composition and rules',ts_recommended[ts_recommended.index('export default ('):]),
    cite('ts-eslint-raw.ts','config, complete compatibility rules', 'rules: {'+block(ts_raw,'rules: {','\n  },')+'\n  }'),
    cite('ts-eslint-recommended.ts','default export, flat compatibility selection',source('ts-eslint-recommended.ts')[source('ts-eslint-recommended.ts').index('export default ('):]),
    cite('ts-base.ts','default export, parser and plugin', source('ts-base.ts')[source('ts-base.ts').index('export default ('):]),
]
fact('typescript-eslint-typechecked-rules',
     'The flat `recommendedTypeChecked` set in typescript-eslint 8.71.2 composes `base`, the TypeScript-file `eslintRecommended` compatibility rules and `recommended-type-checked`, enabling '+', '.join('`'+name+'`' for name in ts_on)+' at `error` with no configured options and disabling '+', '.join('`'+name+'`' for name in ts_off)+'.',
     'typescript-eslint 8.71.2, flat recommended-type-checked and its base and eslint-recommended configurations',
     ts_citations,
     'Zestaw typescript-eslint 8.71.2 utrwala wszystkie dodatkowe reguły oraz odziedziczone wyłączenia reguł podstawowych.')

fact('ruff-default-rules',
     'Ruff 0.17.1 selects the following 407 rules by default without preview: '+', '.join('`'+code+'`' for code in ruff_codes)+'.',
     'Ruff 0.17.1, default selectors with PreviewOptions::default()',
     [cite('ruff-settings.rs','DEFAULT_SELECTORS, complete list', ruff_body), cite('ruff-settings.rs','LinterSettings::new, rules selection','rules: DEFAULT_SELECTORS\n                .iter()\n                .flat_map(|selector| selector.rules(&PreviewOptions::default()))\n                .collect(),')],
     'Ruff 0.17.1 zawiera dokładnie wymienione 407 reguł domyślnych bez preview, stanowiących podstawę przyjętego podzbioru.')

shell_citations = []
for name, start, end, place in [
    ('shellcheck-checker.hs','        let parseMessages = prComments result','\n    sortMessages =','checkScript, parse and analysis message composition and inclusion'),
    ('shellcheck-analyzer.hs','checkers spec params =','\noptionalChecks =','checkers, complete default checker modules'),
    ('shellcheck-analytics.hs','treeChecks = [','\n\nchecker spec','treeChecks, complete list'),
    ('shellcheck-analytics.hs','nodeChecks = [','\n\noptionalChecks =','nodeChecks, complete list'),
    ('shellcheck-analytics.hs','mkChecker spec params checks =','\n\n\ncheckList','mkChecker, default and optional selection'),
    ('shellcheck-commands.hs','commandChecks = [','\n\n\noptionalChecks =','commandChecks, complete list and declaration expansions'),
    ('shellcheck-controlflow.hs','controlFlowChecks = [','\nrunNodeChecks ::','controlFlowChecks, node and effect list composition'),
    ('shellcheck-custom.hs','checker params =','\n\nprop_CustomTestsWork','checker, empty site-specific checks'),
    ('shellcheck-shellsupport.hs','checks = [','\n\ntestChecker','checks, complete shell-conditioned list'),
    ('shellcheck-interface.hs','emptyCheckSpec = CheckSpec {','\n\nnewParseSpec','emptyCheckSpec, default options'),
]:
    text = source(name)
    passage = start + block(text,start,end)
    shell_citations.append(cite(name,place,passage))
fact('shellcheck-default-bash-checks',
     'ShellCheck 0.11.0 checks Bash with its parser diagnostics and the default `Analytics` tree and node checks, `Commands` command checks and declaration expansions, `ControlFlow` checks, empty `Custom` checker and Bash-applicable `ShellSupport` checks as composed by `Analyzer.checkers`, with no optional checks enabled and all error, warning, info and style diagnostics included.',
     'ShellCheck 0.11.0, Bash mode, default nonoptional checks and all severities',
     shell_citations,
     'ShellCheck 0.11.0 określa kompletny skład kontroli domyślnych przez parser i wskazane listy analizatorów, z odrębnym doborem kontroli opcjonalnych.')

fact_by_id = {entry['id']: entry for entry in facts}
decisions = []
def decision(number, question, sentence, scope, based, relations, verification, rationale, rejected, meaning):
    decisions.append({'id':f'D-{number:02d}', 'question':question,'sentence':sentence,'scope':scope,'based':based,'relations':relations,'verification':verification,'rationale':rationale,'rejected':rejected,'meaning':meaning,'fingerprint':fingerprint(sentence)})

all_code = 'browser-view · simulation · account-server · build-tools · deployment · agent-workflow'
js_parts = 'browser-view · simulation · account-server · build-tools'
decision(28,'Which coding-guideline discipline does loop2 adopt?',
    'Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for tests, building, deployment, entry points and HTML; session, saved-game and mail exemplars are selected with their first implementations, and any deferred existing kind is compared before its exemplar is selected. The introduction of the adopted linters uses full compliance before merge instead of the transitional per-file no-regression invariant, and a repair exceeding the accepted scope returns to a decision rather than leaving a violation or weakening the rule set. The general coding guidelines cover all code and give `tests/sim/time.test.mjs` as a test example without creating a formal test kind.',
    all_code,'none','none',
    'level 2 — an agent compares the change with the decision:\n  - complies: general and four kind guidelines follow the pinned templates, retain the stated deferrals and test example, and introduce linters with no blocking violations\n  - violates: an additional mandatory test exemplar, automatic Python formatting or a transition-debt check introduced without a new decision',
    'The accepted scope gives current code common checks and a small set of useful exemplars before further product work; broader exemplar maintenance and additional formatters add work without an established benefit.',
    'A complete exemplar audit and automatic formatting for every language — more maintenance and unmeasured reformatting work; transitional lint debt — an extra mechanism where the introduction removes all blocking violations.',
    'Loop2 przyjmuje szablony wytycznych, uzgodnione odłożenia i pełną zgodność przy wprowadzeniu linterów zamiast przejściowej kontroli długu.')

decision(29,'Which rules check TypeScript and JavaScript?',
    'All application, script and test TypeScript and JavaScript files in browser-view, simulation, account-server and build-tools, including new paths, use local pinned ESLint 10.12.0 with @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` with its inherited compatibility overrides: the full adopted sets of 64 JavaScript and 92 active TypeScript rules block, with no additional stylistic sets or example-only rules. The configuration uses globals 17.13.0 and TypeScript API 6.0.2 for the parser while application compilation stays on TypeScript 7, within the one shared npm package and lockfile; dependencies, generated files, the submodule and temporary work results are outside the source scope. The actual configured rule names, levels and options and complete file scope remain the adopted ones, inline directives cannot suppress a blocking rule or change the set, and changing the set takes a human-accepted change of this decision.',
    js_parts,
    'eslint-recommended-rules@'+fact_by_id['eslint-recommended-rules']['fingerprint']+' · typescript-eslint-typechecked-rules@'+fact_by_id['typescript-eslint-typechecked-rules']['fingerprint'],
    'derives from D-06@094e6fa7',
    'level 1 — invariants: eslint-source-rules · eslint-configuration-rules',
    'The selected recommendations find defects in typed and untyped code with one tool; a separate supported parser API preserves the chosen application compiler at the cost of an extra development dependency.',
    'A compiler downgrade — gives up the existing compiler choice; an unsupported parser API — risks unreliable type-aware reports; extra style sets — add obligations beyond the accepted set.',
    'TS/JS kontroluje pełny przyjęty zestaw ESLint z zachowaniem TS7, pomocniczym API TS6 i ochroną konfiguracji oraz zakresu przed wyłączeniem.')
decision(30,'Which Python rules block a change?',
    'Every Python file in browser-view, simulation, account-server, build-tools, deployment and agent-workflow, including new paths, uses local pinned Ruff 0.17.1 with the complete default nonpreview set minus `'+ '`, `'.join(excluded)+'`: the remaining 393 rules block and these fourteen rules remain examples. The check passes the explicit blocking list directly with isolation from external configuration, dependencies, generated files, the submodule and temporary work results are outside its source scope, and inline directives cannot suppress a blocking rule or alter the adopted set. Changing that set takes a human-accepted change of this decision.',
    all_code,'ruff-default-rules@'+fact_by_id['ruff-default-rules']['fingerprint'],'none',
    'level 1 — invariants: ruff-source-rules',
    'The selected subset retains useful defect reports while leaving reports that offer no worthwhile code change as examples; direct isolated selection keeps configuration from quietly changing that boundary.',
    'The entire default set as blocking — forces unhelpful rewrites; no Python linter — leaves useful defect reports unchecked.',
    'Python sprawdza 393 reguł Ruff; wskazane 14 pozostaje przykładami, a wyciszenie reguły blokującej jest naruszeniem.')
decision(31,'Which Bash rules block a change?',
    'Every standalone Bash script in the code parts, including new paths and extensionless scripts, uses local pinned ShellCheck 0.11.0 with its default nonoptional Bash checks and every diagnostic severity, with no example-only rules. Embedded commands in YAML or test literals are outside this standalone-script scope, while external rc files, environment options and source directives cannot suppress a blocking check or change the adopted set. Changing that set takes a human-accepted change of this decision.',
    all_code,'shellcheck-default-bash-checks@'+fact_by_id['shellcheck-default-bash-checks']['fingerprint'],'none',
    'level 1 — invariants: shellcheck-source-rules',
    'The default checks cover shell defects without adding optional stylistic obligations; keeping source and environment controls from weakening them makes a successful result meaningful.',
    'No Bash linter — leaves shell defects unchecked; enabling optional checks — adds obligations outside the accepted set.',
    'Samodzielne skrypty Bash podlegają pełnym domyślnym kontrolom ShellCheck na każdym poziomie komunikatów, bez wyciszeń i zewnętrznych nadpisań.')
decision(32,'How is web code formatted?',
    'All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server and build-tools and browser HTML and CSS use local pinned Prettier 3.9.10 with its default nonexperimental configuration: two spaces, semicolons, preferred double quotes, target width 80 and LF on every platform. New paths have the same scope, Markdown, icons, generated files, dependencies, the submodule and temporary work results are excluded, and existing covered code has no formatting exception. The editor and check share one explicit configuration, and narrow repository attributes preserve LF for that scope on Windows.',
    js_parts+' · deployment','none','none',
    'level 1 — invariants: prettier-source-format',
    'One formatter and shared settings remove repeated layout choices and platform-dependent line endings; the initial whole-scope reformatting is accepted to avoid lasting exceptions.',
    'Per-file historic exceptions — preserve recurring format differences; Python and Bash formatting now — adds tools and unmeasured rewrites beyond the accepted scope.',
    'Prettier formatuje cały przyjęty zakres webowy ustawieniami domyślnymi i LF także na Windows, bez wyjątków dla starego kodu.')
decision(33,'Which introduced dependency vulnerabilities block a change?',
    'The dependency audit uses local pinned npm 11.13.0 and the npm/GitHub Advisory Database through the public npm registry to block each actual npm package-name/version pair introduced against {fork-point} with a matching known vulnerability at low, moderate, high or critical severity when the check runs; info does not block and unchanged pairs do not block unrelated work. The comparison covers every npm manifest and lockfile in build-tools, new paths included, and direct, transitive, production, development, optional and peer dependencies, matching concrete advisories and their ranges to the introduced versions rather than using a package-wide highest severity; an unavailable, incomplete or unsupported result gives no successful verdict, while a complete valid comparison proving no introduced pair can pass without a network request. The request sends package names and versions without application code, runtime and container-image, operating-system and non-npm dependencies are outside this audit, and the low threshold has no automatic revision or scheduled threshold review.',
    'build-tools','none','none',
    'level 1 — invariants: introduced-npm-vulnerabilities',
    'A low threshold starts conservatively while comparison of introduced versions keeps old vulnerabilities from blocking unrelated work; newly published advisories can change the result for the same introduced version, and matching advisory ranges adds parsing work.',
    'Moderate, high or critical thresholds — accept known lower-severity vulnerabilities in introduced versions; auditing unchanged versions as blockers — stops unrelated work; trusting only audit exit status or a package-wide severity — can attribute a vulnerability to the wrong installed version.',
    'Audyt npm blokuje nowe względem początku zmiany pary nazwa–wersja z podatnością od low, a niepewny wynik nie oznacza przejścia.')
decision(34,'Which file is the exemplar for content data?',
    'The exemplar for kind `content-data` is `src/browser/sim/data/resources.ts`, and its kind guidelines are read before adding or changing a file of that kind. The typed catalogue and identifiers derived from keys remain examples alongside the existing simulation-isolation rule, without requiring that catalogue shape in every data file.',
    'simulation','none','derives from D-18@9cf9e4c8 · derives from D-04@3b3dcdc2',
    'level 2 — an agent compares the change with the decision:\n  - complies: content-data guidelines designate the selected exemplar, retain simulation-isolation and show the catalogue as an example\n  - violates: a different exemplar or a new mandatory catalogue shape for every data file',
    'A current typed content catalogue gives later authors a concrete model without creating a new architectural constraint for every kind of game data.',
    'Making the catalogue shape mandatory — constrains data whose useful structure differs; no exemplar — leaves each new catalogue to invent its own model.',
    'Wzorcem content-data jest resources.ts; kształt katalogu jest przykładem, a wiążące pozostają obecne zasady izolacji symulacji.')
decision(35,'Which file is the exemplar for simulation modules?',
    'The exemplar for kind `simulation-module` is `src/browser/sim/game.ts`, and its kind guidelines are read before adding or changing a file of that kind. Explicit inputs and a result consisting of state and events illustrate the existing simulation-isolation and simulation-inputs rules, without requiring every helper to return `GameResult`.',
    'simulation','none','derives from D-04@3b3dcdc2',
    'level 2 — an agent compares the change with the decision:\n  - complies: simulation-module guidelines designate the selected exemplar and keep different suitable helper return types\n  - violates: a different exemplar or a new obligation that every helper returns GameResult',
    'The game operation illustrates explicit state transitions while allowing smaller helpers to expose only the result they compute.',
    'One result type for every helper — adds wrappers without a demonstrated need; no exemplar — leaves the operation model implicit.',
    'Wzorcem simulation-module jest game.ts, bez obowiązku GameResult dla każdego pomocnika i z zachowaniem obecnych zasad wejść oraz izolacji.')
decision(36,'Which file is the exemplar for browser modules?',
    'The exemplar for kind `browser-module` is `src/browser/view/status-row.ts`, and its kind guidelines are read before adding or changing a file of that kind. Creating controls once, updating while preserving focus and passing user actions to the application remain examples alongside browser-view-framework and content-identifiers, without requiring `update()` in every module or forbidding the rebuilding of static elements.',
    'browser-view','none','derives from D-03@fb5aa3b0 · derives from D-18@9cf9e4c8',
    'level 2 — an agent compares the change with the decision:\n  - complies: browser-module guidelines designate the selected exemplar and show focus-preserving control updates as examples\n  - violates: a different exemplar or a mandatory update method in every browser module',
    'An existing small control shows stable editing behavior without forcing every view helper to own a control lifecycle.',
    'Mandatory update methods and a ban on static rebuilding — impose structure where no editable control needs it; no exemplar — leaves focus-preserving updates implicit.',
    'Wzorcem browser-module jest status-row.ts; organizacja kontrolek i aktualizacji pozostaje przykładem obok obecnych reguł DOM i danych gry.')
decision(37,'Which file is the exemplar for the HTTP application?',
    'The exemplar for kind `http-application` is `src/server/app.ts`, and its kind guidelines are read before adding or changing a file of that kind. Separating application creation from opening the listening port remains an example alongside account-server-express-http and loop2-api-error-route, with no additional structural check of the application factory.',
    'account-server','none','derives from D-02@06e6d3d8 · derives from D-05@db83484a',
    'level 2 — an agent compares the change with the decision:\n  - complies: http-application guidelines designate the selected exemplar and show separate application creation as an example\n  - violates: a different exemplar or a new mandatory factory-structure invariant',
    'Separating creation from listening gives a concrete model that is easy to test, without settling the architecture of future account and saved-game features.',
    'A new factory-structure check — enforces an example as architecture; no exemplar — leaves the existing testable assembly model implicit.',
    'Wzorcem http-application jest app.ts, a oddzielenie tworzenia aplikacji od portu jest przykładem bez nowej blokady struktury fabryki.')

decision_by_id = {entry['id']:entry for entry in decisions}
invariants = []
def invariant(identifier, sentence, method, rests, derives, parts, meaning):
    invariants.append({'id':identifier,'sentence':sentence,'method':method,'rests':rests,'derives':derives,'parts':parts,'meaning':meaning,'fingerprint':fingerprint(sentence)})
def decision_link(identifier):
    return identifier+'@'+decision_by_id[identifier]['fingerprint']
def fact_link(identifier):
    return identifier+'@'+fact_by_id[identifier]['fingerprint']

invariant('eslint-source-rules',
    'No TypeScript or JavaScript file in the scope adopted by D-29 violates a blocking ESLint 10.12.0 rule or uses an inline directive to suppress one or change the adopted rule set.',
    'python -B scripts/check_eslint.py --record .runs/eslint.jsonl',
    fact_link('eslint-recommended-rules')+' · '+fact_link('typescript-eslint-typechecked-rules'), decision_link('D-29'),js_parts,
    'Żaden objęty plik TS/JS nie narusza blokującej reguły ESLint ani nie wyłącza jej dyrektywą w źródle.')
invariant('ruff-source-rules',
    'No Python file in the scope adopted by D-30 violates a blocking Ruff 0.17.1 rule or uses an inline directive to suppress one or change the adopted rule set.',
    'python -B scripts/check_ruff.py --record .runs/ruff.jsonl',fact_link('ruff-default-rules'),decision_link('D-30'),all_code,
    'Żaden objęty plik Python nie narusza blokującej reguły Ruff ani nie wycisza jej w źródle.')
invariant('shellcheck-source-rules',
    'No standalone Bash script in the scope adopted by D-31 violates a blocking ShellCheck 0.11.0 check or uses a source directive to suppress one or change the adopted set.',
    'python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl',fact_link('shellcheck-default-bash-checks'),decision_link('D-31'),all_code,
    'Żaden objęty skrypt Bash nie narusza domyślnych kontroli ShellCheck ani nie zmienia ich dyrektywą w źródle.')
invariant('eslint-configuration-rules',
    'The effective ESLint 10.12.0 configuration preserves exactly the rule names, levels, options and complete TypeScript and JavaScript file scope adopted by D-29.',
    'python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl',fact_link('eslint-recommended-rules')+' · '+fact_link('typescript-eslint-typechecked-rules'),decision_link('D-29'),js_parts,
    'Faktyczna konfiguracja ESLint zachowuje dokładny przyjęty zestaw reguł, ustawień i pełny zakres plików.')
invariant('prettier-source-format',
    'Every file in the scope adopted by D-32 has the formatting produced by the adopted Prettier 3.9.10 configuration and LF line endings on every platform.',
    'python -B scripts/check_format.py --record .runs/format.jsonl','none',decision_link('D-32'),js_parts+' · deployment',
    'Każdy plik w przyjętym zakresie ma format Prettier i zakończenia LF niezależnie od platformy.')
invariant('introduced-npm-vulnerabilities',
    'The change against {fork-point} introduces no actual npm package-name/version pair in the scope adopted by D-33 with a matching known vulnerability of low, moderate, high or critical severity in the npm/GitHub Advisory Database read when the check runs, and an unavailable, incomplete or unsupported result gives no successful verdict.',
    'python -B scripts/check_dependencies.py --fork-point {fork-point} --record .runs/dependency-audit.jsonl','none',decision_link('D-33'),'build-tools',
    'Zmiana nie dodaje objętej wersji zależności npm ze znaną podatnością od low, a brak wiarygodnych danych nie daje przejścia.')
general_template = read('.the-way/product-guidelines/template.md')
for identifier, parts, meaning in [
    ('guidelines-form','every','Pliki wytycznych zachowują dokładną formę szablonów przypiętego the-way, także tabele i przypadki zasad.'),
    ('guidelines-reference-current','agent-workflow · product-foundation','Odwołania wytycznych wskazują aktualny fundament danego commita i stanu po scaleniu.'),
]:
    entry = block(general_template,'## '+identifier+'/1\n\n','\n```')
    sentence = entry.split('\n\n',1)[0]
    method = re.search(r'\*\*Method:\*\* `([^`]+)`',entry).group(1)
    invariant(identifier,sentence,method,'none','none',parts,meaning)

facts_text = ''.join(f"## {entry['id']}/1\n\n{entry['sentence']}\n\n- **Holds for:** {entry['holds']}\n- **Source:** {entry['source']}\n- **Method:** TODO\n\n" for entry in facts)
decisions_text = ''.join(f"### {entry['id']}/1 — {entry['question']}\n\n{entry['sentence']}\n\n- **Change:** new decision\n- **Scope:** {entry['scope']}\n- **Based on:** {entry['based']}\n- **Relations:** {entry['relations']}\n- **Verification:** {entry['verification']}\n- **Review when:** none\n- **Origin:** none\n- **Approved by:** Mariusz, merge of <request link>\n\n*Rationale:* {entry['rationale']}\n*Rejected:* {entry['rejected']}\n\n" for entry in decisions)
invariants_text = ''.join(f"## {entry['id']}/1\n\n{entry['sentence']}\n\n- **Method:** `{entry['method']}`\n- **Rests on:** {entry['rests']}\n- **Derives from:** {entry['derives']}\n- **Part:** {entry['parts']}\n- **Correction:** none\n\n" for entry in invariants)

for name, text, marker in [
    ('environment_facts.md', facts_text, '## Withdrawn identifiers'),
    ('decisions.md', decisions_text, None),
    ('invariants.md', invariants_text, '## Withdrawn identifiers'),
]:
    path = ROOT/'foundations'/name
    existing = read(path)
    newline = '\r\n' if '\r\n' in existing else '\n'
    new = text.replace('\n',newline)
    if marker:
        assert marker in existing
        write(path,existing.replace(marker,new+marker,1))
    else:
        write(path,existing.rstrip('\r\n')+newline+newline+new.rstrip('\r\n')+newline)

path = ROOT/'foundations/part_map.md'
text = read(path)
newline = '\r\n' if '\r\n' in text else '\n'
text = text.replace('The part installs dependencies, checks types and builds and launches the application.',
                    'The part installs dependencies, checks code quality and types, audits introduced dependency versions and builds and launches the application.')
text = text.replace('  scripts/build.mjs'+newline,'  scripts/**'+newline+'  tests/quality/**'+newline+'  eslint.config.mjs'+newline+'  prettier.config.mjs'+newline+'  requirements-quality.in'+newline+'  requirements-quality.txt'+newline)
text = text.replace('- **Trust boundary:** package-lock.json'+newline,'- **Trust boundary:** package-lock.json'+newline+'  scripts/check_dependencies.py'+newline)
text = text.replace('  tests/agent_workflow/**'+newline,'  tests/agent_workflow/**'+newline+'  guidelines/**'+newline)
text = text.replace('| npm registry | them → us | untrusted | no |','| npm registry | both | untrusted | no |')
text = text.replace('| npm registry | both | untrusted | no |','| npm registry | both | untrusted | no |'+newline+'| Python Package Index | them → us | untrusted | no |')
write(path,text)
write(REPORTS/'foundation-entries.json',json.dumps({'facts':facts,'decisions':decisions,'invariants':invariants,'ruff_excluded':excluded,'eslint_js_rules':js_rules,'eslint_ts_effective':ts_combined},ensure_ascii=False,indent=2))
print('4 facts, 10 decisions, 8 invariants and part map written')
