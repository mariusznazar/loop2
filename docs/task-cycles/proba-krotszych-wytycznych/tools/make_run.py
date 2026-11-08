"""make_run.py <task> <arm old|new> <n> <commit> -> creates a plain copy of the repo for one run."""
import os, subprocess, sys, tarfile, shutil
task, arm, n, commit = sys.argv[1:5]
ROOT = "[a sibling worktree] proba-runs"
dest = "%s/%s-%s-%s" % (ROOT, task, arm, n)
if os.path.exists(dest):
    sys.exit("exists: " + dest)
os.makedirs(dest)
p = subprocess.Popen(["git", "-C", "the main checkout", "archive", "--format=tar", commit], stdout=subprocess.PIPE)
with tarfile.open(fileobj=p.stdout, mode="r|") as t:
    t.extractall(dest)
if p.wait() != 0:
    sys.exit("archive failed")
link = dest + "/node_modules"
r = subprocess.run(["cmd", "/c", "mklink", "/J", link.replace("/", chr(92)), "C:" + chr(92) + "Storage" + chr(92) + "repos" + chr(92) + "loop2" + chr(92) + "node_modules"], capture_output=True)
if r.returncode != 0:
    sys.exit("mklink failed")
print(dest)
