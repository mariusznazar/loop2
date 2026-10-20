from pathlib import Path

path = Path('tests/invariants/loop2_invariant_support.py')
data = path.read_bytes()
newline = b'\r\n' if b'\r\n' in data else b'\n'
text = data.decode().replace('\r\n', '\n')
text = text.replace('from contextlib import ExitStack', 'from contextlib import ExitStack, contextmanager')
marker = '\n\nclass Server:\n'
assert marker in text
text = text.replace(marker, '''

@contextmanager
def _server_logs(stdout_path, stderr_path):
    with open(stdout_path, "wb") as stdout, open(stderr_path, "wb") as stderr:
        yield stdout, stderr


class Server:
''', 1)
old = '''            self._stdout = self._logs.enter_context(open(self.stdout_path, "wb"))
            self._stderr = self._logs.enter_context(open(self.stderr_path, "wb"))'''
assert old in text
text = text.replace(old, '''            self._stdout, self._stderr = self._logs.enter_context(
                _server_logs(self.stdout_path, self.stderr_path))''', 1)
path.write_bytes(text.replace('\n', newline.decode()).encode())
