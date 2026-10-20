from pathlib import Path

path = Path('tests/invariants/loop2_invariant_support.py')
data = path.read_bytes()
newline = b'\r\n' if b'\r\n' in data else b'\n'
text = data.decode().replace('\r\n', '\n')
text = text.replace('import atexit\n', 'import atexit\nfrom contextlib import ExitStack\n')
text = text.replace('import sys\n', '')
old = '''                            capture_output=True, timeout=60)
    children = {}'''
new = '''                            capture_output=True, timeout=60)
    if result.returncode != 0:
        raise AssertionError("Get-CimInstance failed: "
                             + result.stderr.decode("utf-8", "replace"))
    children = {}'''
assert old in text
text = text.replace(old, new, 1)
start = text.index('    if os.name == "nt":', text.index('def kill_tree('))
end = text.index('\n\ndef popen(', start)
text = text[:start] + '''    try:
        if os.name == "nt":
            since = getattr(process, "loop2_started", time.time())
            try:
                descendants = _windows_descendants(process.pid, since)
            finally:
                if process.poll() is None:
                    subprocess.run(["taskkill", "/PID", str(process.pid), "/T", "/F"],
                                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=60)
            for pid in descendants:
                subprocess.run(["taskkill", "/PID", str(pid), "/T", "/F"],
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=60)
        else:
            try:
                os.killpg(process.pid, signal.SIGKILL)  # the whole session, alive parent or not
            except (ProcessLookupError, PermissionError):
                pass
    finally:
        if process.poll() is None:
            try:
                process.wait(timeout=30)
            except subprocess.TimeoutExpired:
                process.kill()

''' + text[end:]
old = '''        self._stdout = open(self.stdout_path, "wb")
        self._stderr = open(self.stderr_path, "wb")
        self.process = popen([npm(), "start"], copy.path, env=env,
                             stdout=self._stdout, stderr=self._stderr)
        try:
            deadline'''
new = '''        self._logs = ExitStack()
        self.process = None
        try:
            self._stdout = self._logs.enter_context(open(self.stdout_path, "wb"))
            self._stderr = self._logs.enter_context(open(self.stderr_path, "wb"))
            self.process = popen([npm(), "start"], copy.path, env=env,
                                 stdout=self._stdout, stderr=self._stderr)
            deadline'''
assert old in text
text = text.replace(old, new, 1)
old = '''            kill_tree(self.process)
        finally:
            self._stdout.close()
            self._stderr.close()
            shutil.rmtree(self.log_dir, ignore_errors=True)'''
new = '''            if self.process is not None:
                kill_tree(self.process)
        finally:
            self._logs.close()
            shutil.rmtree(self.log_dir, ignore_errors=True)'''
assert old in text
text = text.replace(old, new, 1)
path.write_bytes(text.replace('\n', newline.decode()).encode())
path = Path('tests/deploy/test_loop2_deploy_build.py')
data = path.read_bytes()
assert b'import os' in data
path.write_bytes(data.replace(b'import os\r\n', b'').replace(b'import os\n', b''))
