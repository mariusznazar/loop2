import hashlib
from pathlib import Path
expected = {'package.json':'1853e14c659d6ec59f97a2759881fc2eaa5db89714141b94002809becda84625','package-lock.json':'997d60665cee25c8094d6d8719fb2c5d82e9e578857bc3ec71da11582fb2b2c0'}
for name, value in expected.items():
    current = hashlib.sha256(Path(name).read_bytes()).hexdigest()
    print(name, current, 'UNCHANGED' if current == value else 'MISMATCH')
    assert current == value
