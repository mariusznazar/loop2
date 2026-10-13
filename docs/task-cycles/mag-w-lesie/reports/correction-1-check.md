# Correction 1 — check for loop2-container-icons/1

## Commit

`a44c9c3` on `task/mag-w-lesie` — `test(invariants): check that the loop2 container serves each icon with the file's bytes`.
One new file: `tests/invariants/test_loop2_container_icons.py`. No other file changed. Not pushed.

## Readings (as written in the check's docstring)

- **The loop2 container built from the repository:** the image `docker build` builds from the
  working tree's `Dockerfile` with the working tree as context (only read), with
  `--build-arg LOOP2_COMMIT=invariant-check` as the existing container check passes, run detached
  with `docker run` (no `--init`; the sentence does not ask for one). Image and container removal
  are registered with `addCleanup` before `docker build` and `docker run` respectively.
- **Each SVG file in `assets/icons/`:** files standing directly in `assets/icons/` of the working
  tree (`os.listdir`, files only, no subdirectories) whose name ends in `.svg` in any letter case.
  An empty set fails the check (asserted before the daemon is asked). The set is read from the
  directory, not from git's list, so an untracked or git-ignored SVG there is counted too — the
  build context is the working tree, governed by `.dockerignore`, not `.gitignore`.
- **Serves at `/icons/<file name>`:** from inside the container, using the container's own Node.js
  via `docker exec`, a GET of `/icons/` + the name percent-encoded as one path segment, on the
  container's listening port. The port is read from `/proc/net/tcp` and `tcp6` (state 0A), not
  assumed to be 3000; the check waits up to 60 s for a listener and fails if there is none or more
  than one port (then "the listening port" is not one port).
- **Same bytes:** status 200 and the body (carried back base64) equal byte for byte to the file
  read from the working tree. Expected bytes never come from the image, build output or server.
- **Skip:** where no Docker daemon answers, the test skips with the reason "no Docker daemon
  answers; whether the loop2 container serves the icons of assets/icons/
  (loop2-container-icons/1) stays unchecked".
- Expected literals written out: directory `assets/icons`, suffix `.svg`, prefix `/icons/`,
  status 200. Icon names are not written out as literals: the sentence quantifies over the
  directory's contents, and the files are data the product holds, not values its code computes.

## Gate output

- Alone: `python -B -m unittest test_loop2_container_icons -v` — 1 test, OK (12.7 s).
- Method from the worktree root:
  `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` —
  exit 0, `Ran 128 tests in 196.130s`, `OK`, no skips, no port 3000 error. Record: 125 lines, all
  `pass`; line for this check:
  `{"check": "tests/invariants/test_loop2_container_icons.py::ContainerServesIcons.test_container_serves_each_icon_with_the_file_bytes", "verdict": "pass", "invariant": "loop2-container-icons/1"}`.
- No `loop2-invariant-check` container or image left after either run.

## Questions

1. Should the check also require exactly one listening port, or would the orchestrator rather
   pin the port to 3000 (the Dockerfile's `EXPOSE`)? I chose to discover it, and to fail on
   more than one port as ambiguous.
2. Untracked SVG files in `assets/icons/` are counted (directory listing, not git's list). If
   the sentence means only files the repository holds, the reading should switch to git's list.
3. The run has 128 tests and 125 record lines; I did not investigate the 3-line difference
   (presumably tests that cite no invariant) since it is outside this check.
