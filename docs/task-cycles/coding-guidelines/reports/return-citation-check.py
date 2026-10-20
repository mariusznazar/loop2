"""Read-only completeness check for formal citations at standing check operations."""
import json
from pathlib import Path
import re
import sys

expected = {
    'scripts/check_eslint.py': ['eslint-source-rules/1', 'eslint-configuration-rules/1'],
    'scripts/check_ruff.py': ['ruff-source-rules/1'],
    'scripts/check_shellcheck.py': ['shellcheck-source-rules/1'],
    'scripts/check_format.py': ['prettier-source-format/1'],
    'scripts/check_dependencies.py': ['introduced-npm-vulnerabilities/1'],
}
missing = []
for filename, identifiers in expected.items():
    text = Path(filename).read_text(encoding='utf-8')
    for identifier in identifiers:
        present = bool(re.search(r'^\s*# invariant: ' + re.escape(identifier) + r'\s*$', text, re.M))
        print(json.dumps({'file': filename, 'invariant': identifier, 'formal_comment': present,
                          'runtime_identifier_present': identifier.split('/')[0] in text}))
        if not present:
            missing.append([filename, identifier])
positive = Path('.the-way/product-guidelines/form_check.py').read_text(encoding='utf-8')
for identifier in ['guidelines-form/1', 'guidelines-reference-current/1']:
    present = bool(re.search(r'^\s*# invariant: ' + re.escape(identifier) + r'\s*$', positive, re.M))
    print(json.dumps({'positive_control': identifier, 'formal_comment': present}))
    if not present:
        raise RuntimeError('positive control failed')
print(json.dumps({'missing_citations': len(missing), 'method_files': len(expected)}))
sys.exit(int(bool(missing)))
