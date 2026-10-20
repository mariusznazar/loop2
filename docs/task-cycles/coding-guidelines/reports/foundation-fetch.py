import concurrent.futures
import json
from pathlib import Path
import urllib.request

root = Path(__file__).parent
sources = {
    'eslint-recommended.js': 'https://unpkg.com/@eslint/js@10.0.1/src/configs/eslint-recommended.js',
    'ts-recommended.ts': 'https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/flat/recommended-type-checked.ts',
    'ts-eslint-recommended.ts': 'https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/flat/eslint-recommended.ts',
    'ts-eslint-raw.ts': 'https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts',
    'ts-base.ts': 'https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/flat/base.ts',
    'ruff-settings.rs': 'https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/settings/mod.rs',
    'ruff-codes.rs': 'https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/codes.rs',
    'shellcheck-analyzer.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Analyzer.hs',
    'shellcheck-analytics.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Analytics.hs',
    'shellcheck-checker.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checker.hs',
    'shellcheck-commands.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/Commands.hs',
    'shellcheck-controlflow.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/ControlFlow.hs',
    'shellcheck-custom.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/Custom.hs',
    'shellcheck-shellsupport.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/ShellSupport.hs',
    'shellcheck-interface.hs': 'https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Interface.hs',
}

def fetch(pair):
    name, url = pair
    with urllib.request.urlopen(url, timeout=60) as response:
        data = response.read()
        status = response.status
    (root / ('foundation-source-' + name)).write_bytes(data)
    return {'name': name, 'url': url, 'status': status, 'bytes': len(data)}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(fetch, sources.items()))
(root / 'foundation-source-evidence.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
print(json.dumps(results))
