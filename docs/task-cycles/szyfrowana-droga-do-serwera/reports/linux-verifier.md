# Exact-commit Linux verification environment

Local task-owned environment only. It does not change product tests or the target server. All repository tests are invoked by npm test. The daemon has no host-published API port; the runner shares only its namespace. Logs show the exact checked-out product/process commits and tool versions.

Daemon command used:

```sh
docker run -d --privileged --name loop2-task22-dind -e DOCKER_TLS_CERTDIR= docker:dind dockerd --host=unix:///var/run/docker.sock --host=tcp://127.0.0.1:2375 --tls=false
```

## Dockerfile

```dockerfile
FROM python:3.14-slim-bookworm AS python
FROM docker:cli AS docker
FROM node:24-bookworm-slim
COPY --from=python /usr/local/ /usr/local/
COPY --from=docker /usr/local/bin/docker /usr/local/bin/docker
RUN apt-get update && apt-get install -y --no-install-recommends git lsof procps curl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /workspace
COPY --from=docker /usr/local/libexec/docker/cli-plugins/ /usr/local/libexec/docker/cli-plugins/
```

## verify.sh

```bash
#!/usr/bin/env bash
set -euo pipefail
git clone --branch task/szyfrowana-droga-do-serwera /inputs/product.bundle /workspace
cd /workspace
git checkout --detach "$1"
git update-ref refs/remotes/origin/main "$2"
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main
git init .the-way
git -C .the-way fetch /inputs/process.bundle HEAD
git -C .the-way checkout --detach FETCH_HEAD
git ls-files --stage -- .the-way
git -C .the-way rev-parse HEAD
node --version
python --version
docker version --format '{{.Server.Version}}'
npm ci
python -m venv .runs/quality-venv
.runs/quality-venv/bin/python -m pip install --require-hashes -r requirements-quality.txt
npm test
```

## listener-control.py

```python
import subprocess

server = subprocess.Popen(
    ["node", "-e", "const net=require('node:net');const s=net.createServer();s.listen(0,'127.0.0.1',()=>console.log(s.address().port));"],
    stdout=subprocess.PIPE,
    text=True,
)
try:
    port = server.stdout.readline().strip()
    result = subprocess.run(
        ["lsof", "-nP", "-iTCP", "-sTCP:LISTEN", "-F", "pn"],
        capture_output=True,
        text=True,
        timeout=10,
        check=True,
    )
    assert f"p{server.pid}\n" in result.stdout
    assert f"n127.0.0.1:{port}\n" in result.stdout
    print("LISTENER_CONTROL_PASS")
finally:
    server.terminate()
    server.wait(timeout=10)
```

