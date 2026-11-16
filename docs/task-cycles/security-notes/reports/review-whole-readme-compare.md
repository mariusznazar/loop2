## code spans
only before: {}
only after: {'security-notes.md': 1}

## links
only before: {}
only after: {'security-notes.md': 1}

## quoted strings
only before: {}
only after: {'Epic: MVP2 — screens, presentation and tutorial': 1, 'Create account': 1, 'Siedziba': 3, 'Headquarters': 3, 'Graphics credits': 2, 'Account': 1, 'Log out': 1, 'Maps': 1, 'Forest edge': 1, 'Enter': 1, 'Przejście': 1, 'Passage': 1, 'Chronicle': 1, 'Terrain': 1}

## headings
equal: False
before: ['# Loop', '## Opis produktu i epik MVP2', '## Pierwsze uruchomienie', '## Narzędzia kontroli kodu', '## Ikony', '## Strona wszystkich stanów', '## Praca lokalna i sprawdzenie']
after: ['# Loop', '## Product description and the MVP2 epic', '## First run', '## Code check tools', '## Icons', '## The page of all states', '## Local work and checking']

## numbers outside code
only before: {}
only after: {}

## fenced blocks
equal: True
before: ['```powershell\npython -m venv .runs/quality-venv\n.runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt\n.runs/quality-venv/Scripts/ruff.exe --version\n.runs/quality-venv/Scripts/shellcheck.exe --version\n```', '```sh\npython3 -m venv .runs/quality-venv\n.runs/quality-venv/bin/python -m pip install --require-hashes -r requirements-quality.txt\n.runs/quality-venv/bin/ruff --version\n.runs/quality-venv/bin/shellcheck --version\n```']
after: ['```powershell\npython -m venv .runs/quality-venv\n.runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt\n.runs/quality-venv/Scripts/ruff.exe --version\n.runs/quality-venv/Scripts/shellcheck.exe --version\n```', '```sh\npython3 -m venv .runs/quality-venv\n.runs/quality-venv/bin/python -m pip install --require-hashes -r requirements-quality.txt\n.runs/quality-venv/bin/ruff --version\n.runs/quality-venv/bin/shellcheck --version\n```']

