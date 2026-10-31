"""Invariant account-save-sqlite-upgrade: a deployed Node.js release has passed a check of the
account and save server's database read, write and backup operations on that release.

The check itself, `src/server/account-database-check.ts`, is run on the real Node.js by
`tests/account-database-check.test.mjs`. This test reads the route that puts it in front of every
image: the last stage of `Dockerfile`, the stage that is the serving image, runs the check as a
`RUN` of its own after `dist` is copied into it and after `USER node`, so that the check runs on
the Node.js release the image will serve on, as the user the server runs as, and an image whose
check failed does not exist.

Covers: in the last stage of `Dockerfile`, a `RUN` whose command is exactly
`node dist/server/account-database-check.js`, in shell or exec form, not joined to other commands
by `;`, `||`, `|` or `&` that would let the step succeed after a failed check, and standing after
the `COPY --from` that takes `dist/` and after the last `USER` instruction.

Does NOT cover: that a real release breaks one of the operations (the check's own test spoils the
backup of the release it runs on with a stand-in, and so shows only the check's reaction); that the deployment really replaces its containers
only after the build (account-server-typecheck reads that route); a base image that is
unpinned by decision, so the release the server builds on is the one its host pulls.
"""

import re
import unittest

import loop2_invariant_support as support

DOCKERFILE = "Dockerfile"
CHECK_COMMAND = ["node", "dist/server/account-database-check.js"]
BUILT_OUTPUT = "dist"
# Shell operators after which a RUN goes on although a command before them failed.
UNSAFE_OPERATORS = re.compile(r";|\|\||(?<![&|])\|(?!\|)|(?<![&>])&(?![&>])")


def check_positions(instructions):
    """The indexes of the RUN instructions that run the check as a command of their own, and the
    RUN instructions that name it in a form this test does not accept."""
    accepted, refused = [], []
    for index, (keyword, arguments, heredoc) in enumerate(instructions):
        if keyword != "RUN":
            continue
        command = support.exec_form(arguments)
        if command is not None:
            if command == CHECK_COMMAND:
                accepted.append(index)
            elif "account-database-check" in " ".join(command):
                refused.append(index)
            continue
        text = support.run_command(arguments) + ("\n" + heredoc if heredoc else "")
        if "account-database-check" not in text:
            continue
        if heredoc is None and not UNSAFE_OPERATORS.search(text) \
                and text.split() == CHECK_COMMAND:
            accepted.append(index)
        else:
            refused.append(index)
    return accepted, refused


def problems(dockerfile_text):
    """What keeps the last stage of a Dockerfile from running the check at the right place."""
    instructions = support.dockerfile_stages(dockerfile_text)[-1].instructions
    accepted, refused = check_positions(instructions)
    found = [f"RUN {instructions[i][1]}: a form whose failure need not stop the build"
             for i in refused]
    if not accepted:
        found.append("the last stage runs no `node dist/server/account-database-check.js` step")
        return found
    stages = support.dockerfile_stages(dockerfile_text)
    runtime = stages[-1]
    copies = [i for i, (keyword, arguments, _h) in enumerate(instructions)
              if keyword in ("COPY", "ADD") and _takes_dist(stages, runtime, arguments)]
    users = [i for i, (keyword, _a, _h) in enumerate(instructions) if keyword == "USER"]
    if not copies:
        found.append("the last stage takes no `dist/` from an earlier stage")
    elif min(accepted) < max(copies):
        found.append("the check stands before the last copy of `dist/` into the last stage")
    if not users:
        found.append("the last stage sets no USER, so the check runs as root")
    elif min(accepted) < max(users):
        found.append("the check stands before the last USER instruction")
    return found


def _takes_dist(stages, runtime, arguments):
    origin = re.search(r"--from=(\S+)", arguments)
    words = [w for w in arguments.split() if not w.startswith("--")]
    pattern = re.compile(r"^(?:\./)?(?:.*/)?" + BUILT_OUTPUT + r"(?:/.*)?$")
    return bool(origin) and any(pattern.match(w.strip("\"'[],")) for w in words[:-1]) \
        and support._stage_reference(stages, origin.group(1), runtime.index) is not None


GOOD = """FROM node:24-slim AS build
RUN npm run build
FROM node:24-slim
COPY --from=build --chown=node:node /app/dist ./dist
USER node
RUN node dist/server/account-database-check.js
CMD ["node", "dist/server/main.js"]
"""


class ReleaseCheckedInTheImageBuild(unittest.TestCase):

    def test_dockerfile_runs_the_check_in_the_last_stage_after_dist_and_user(self):
        # invariant: account-save-sqlite-upgrade
        self.assertEqual(problems(support.read_required(DOCKERFILE)), [])

    def test_reader_accepts_the_step_in_either_form_and_refuses_misplaced_ones(self):
        # A check of the reader; it cites no invariant.
        self.assertEqual(problems(GOOD), [])
        exec_form = GOOD.replace("RUN node dist/server/account-database-check.js",
                                 'RUN ["node", "dist/server/account-database-check.js"]')
        self.assertEqual(problems(exec_form), [])
        cases = {
            "no step": GOOD.replace("RUN node dist/server/account-database-check.js\n", ""),
            "ignored failure": GOOD.replace("check.js", "check.js || true"),
            "piped": GOOD.replace("check.js", "check.js | cat"),
            "in the build stage": GOOD.replace(
                "RUN npm run build", "RUN npm run build\nRUN node dist/server/account-database-check.js"
            ).replace("USER node\nRUN node dist/server/account-database-check.js", "USER node"),
            "before dist": GOOD.replace(
                "COPY --from=build --chown=node:node /app/dist ./dist\nUSER node\n"
                "RUN node dist/server/account-database-check.js\n",
                "RUN node dist/server/account-database-check.js\n"
                "COPY --from=build --chown=node:node /app/dist ./dist\nUSER node\n"),
            "before USER": GOOD.replace(
                "USER node\nRUN node dist/server/account-database-check.js\n",
                "RUN node dist/server/account-database-check.js\nUSER node\n"),
        }
        for name, text in cases.items():
            with self.subTest(case=name):
                self.assertNotEqual(problems(text), [])


if __name__ == "__main__":
    unittest.main()
