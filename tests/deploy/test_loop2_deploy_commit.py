"""The deployment script from the lock to the checkout (spec § 5, steps 2–6).

- the lock: `flock` on the lock file, waiting the script's 15 minutes; a held lock or a lock file
  it cannot open ends the run with exit 4;
- the start line of the log names the commit the running loop2 container was built from, or
  `none`;
- the fetch from the clone's `origin`: the forced path fetches `main` only, the human path every
  branch head with pruning; a failed fetch ends the run with exit 6;
- the accepted commit: forced path, an ancestor of (or equal to) the freshly fetched
  `origin/main`; human path, of any `refs/remotes/origin/*` head; else exit 3;
- the checkout: detached at the commit, with nothing left that git does not hold.

The stubs give no answers here, so the resource gate after the checkout cannot read Docker's root
directory: a run that gets through the checkout ends with EXIT_AFTER_CHECKOUT, never 0.
"""

import os
import unittest

import deploy_script_support as support

EXIT_AFTER_CHECKOUT = 5
LOCK_WAIT_SECONDS = "900"
RUNNING_LABEL = "fedcba9876543210fedcba9876543210fedcba98"


class DeployScriptTestCase(unittest.TestCase):

    def setUp(self):
        self.fixture = support.DeployFixture()
        self.addCleanup(self.fixture.remove)

    def forced(self, sha):
        return self.fixture.run(ssh_original_command=sha)

    def human(self, sha):
        return self.fixture.run(arguments=[sha])

    def assert_checked_out(self, result, sha):
        self.assertEqual(result.code, EXIT_AFTER_CHECKOUT, result)
        checkout = self.fixture.checkout
        self.assertEqual(self.fixture.git("-C", checkout, "rev-parse", "HEAD"), sha)
        branch = self.fixture.git("-C", checkout, "rev-parse", "--abbrev-ref", "HEAD")
        self.assertEqual(branch, "HEAD", "the checkout is not detached")
        self.assertEqual(self.fixture.git("-C", checkout, "status", "--porcelain", "--ignored",
                                          "--untracked-files=all"), "")

    def assert_refused(self, result, code):
        self.assertEqual(result.code, code, result)
        self.assertEqual(result.calls["docker"], [["inspect", "--format",
                                                   '{{ index .Config.Labels '
                                                   '"org.opencontainers.image.revision" }}',
                                                   "loop2"]], result)
        self.assertEqual(result.calls["curl"] + result.calls["df"], [], result)


class Lock(DeployScriptTestCase):

    def test_lock_taken_with_the_scripts_wait_before_git_or_docker(self):
        result = self.forced(self.fixture.first)
        self.assertEqual(result.calls["flock"], [["--exclusive", "--wait", LOCK_WAIT_SECONDS,
                                                  "9"]], result)
        self.assert_checked_out(result, self.fixture.first)

    def test_held_lock_exits_4(self):
        self.fixture.answer("flock", exit_code=1)
        result = self.forced(self.fixture.first)
        self.assertEqual(result.code, 4, result)
        self.assertEqual(result.calls["flock"], [["--exclusive", "--wait", LOCK_WAIT_SECONDS,
                                                  "9"]], result)
        self.assertEqual(result.calls["docker"], [], result)
        self.assertEqual(result.git_trace, "", result.git_trace)
        self.assertIn("lock", self.fixture.log_text().splitlines()[-1])

    def test_lock_file_that_cannot_be_opened_exits_4(self):
        missing = os.path.join(self.fixture.root, "no-such-directory", "loop2-deploy.lock")
        self.fixture.write_copy(LOCK_FILE=support.shell_path(missing))
        result = self.forced(self.fixture.first)
        self.assertEqual(result.code, 4, result)
        self.assertEqual(result.stub_calls(), {}, result)
        self.assertEqual(result.git_trace, "", result.git_trace)
        self.assertIn("cannot open the lock file", result.stdout)


class StartLine(DeployScriptTestCase):

    def start_line(self):
        return [line for line in self.fixture.log_text().splitlines() if "start:" in line][-1]

    def test_start_logs_the_running_containers_revision(self):
        self.fixture.answer("docker", stdout=RUNNING_LABEL + "\n", match="inspect *")
        result = self.forced(self.fixture.first)
        self.assert_checked_out(result, self.fixture.first)
        line = self.start_line()
        self.assertIn(f"commit {self.fixture.first}", line)
        self.assertIn("forced command", line)
        self.assertIn(f"running commit: {RUNNING_LABEL}", line)
        self.assertIn(line, result.stdout)

    def test_start_logs_none_without_a_running_container(self):
        self.fixture.answer("docker", exit_code=1, match="inspect *")
        result = self.human(self.fixture.first)
        self.assert_checked_out(result, self.fixture.first)
        self.assertIn("running commit: none", self.start_line())
        self.assertIn("human", self.start_line())

    def test_start_logs_none_for_a_label_that_is_no_commit_name(self):
        self.fixture.answer("docker", stdout="unknown\n", match="inspect *")
        self.forced(self.fixture.first)
        self.assertIn("running commit: none", self.start_line())


class Fetch(DeployScriptTestCase):

    def setUp(self):
        super().setUp()
        # After the clone: main moves on, a new branch appears, a branch the clone knows is gone.
        self.fixture.commit("gone", "on a branch deleted later")
        self.fixture.git("-C", self.fixture.checkout, "fetch", "--quiet", "origin")
        self.fixture.delete_branch("gone")
        self.main_tip = self.fixture.commit("main", "second on main")
        self.feature = self.fixture.commit("feature", "on feature", parent=self.fixture.first)

    def test_forced_path_fetches_main_only(self):
        result = self.forced(self.main_tip)
        self.assert_checked_out(result, self.main_tip)
        refs = self.fixture.clone_refs()
        self.assertEqual(refs.get("refs/remotes/origin/main"), self.main_tip)
        self.assertNotIn("refs/remotes/origin/feature", refs)
        self.assertIn("refs/remotes/origin/gone", refs, "the forced path pruned")
        self.assertFalse(self.fixture.clone_has_object(self.feature))

    def test_human_path_fetches_every_branch_head_and_prunes(self):
        result = self.human(self.main_tip)
        self.assert_checked_out(result, self.main_tip)
        refs = self.fixture.clone_refs()
        self.assertEqual(refs.get("refs/remotes/origin/main"), self.main_tip)
        self.assertEqual(refs.get("refs/remotes/origin/feature"), self.feature)
        self.assertNotIn("refs/remotes/origin/gone", refs)

    def test_failing_fetch_exits_6_without_printing_gits_message(self):
        missing = os.path.join(self.fixture.root, "github-unreachable")
        self.fixture.git("-C", self.fixture.checkout, "remote", "set-url", "origin", missing)
        for run in (self.forced, self.human):
            with self.subTest(path=run.__name__):
                result = run(self.main_tip)
                self.assert_refused(result, 6)
                self.assertNotIn("github-unreachable", result.output)
                self.assertIn("fetch", self.fixture.log_text().splitlines()[-1])
                self.assertEqual(self.fixture.git("-C", self.fixture.checkout, "rev-parse",
                                                  "HEAD"), self.fixture.first)


class AcceptedCommit(DeployScriptTestCase):

    def test_earlier_ancestor_of_main_accepted_on_both_paths(self):
        second = self.fixture.commit("main", "second")
        self.fixture.commit("main", "third")
        for run, sha in ((self.forced, self.fixture.first), (self.human, second)):
            with self.subTest(path=run.__name__):
                self.assert_checked_out(run(sha), sha)

    def test_tip_of_main_accepted(self):
        tip = self.fixture.commit("main", "tip")
        self.assert_checked_out(self.forced(tip), tip)

    def test_commit_on_no_branch_refused_on_both_paths(self):
        absent = self.fixture.make_commit(self.fixture.github, "on no branch, only on GitHub",
                                          parent=self.fixture.first)
        present = self.fixture.make_commit(self.fixture.checkout, "on no branch, in the clone",
                                           parent=self.fixture.first)
        self.assertTrue(self.fixture.clone_has_object(present))
        for run in (self.forced, self.human):
            for sha in (absent, present):
                with self.subTest(path=run.__name__, commit=sha):
                    result = run(sha)
                    self.assert_refused(result, 3)
                    self.assertIn("commit", self.fixture.log_text().splitlines()[-1])
                    self.assertEqual(self.fixture.git("-C", self.fixture.checkout, "rev-parse",
                                                      "HEAD"), self.fixture.first)

    def test_object_that_is_no_commit_refused(self):
        tree = self.fixture.git("-C", self.fixture.checkout, "rev-parse", "HEAD^{tree}")
        self.assert_refused(self.human(tree), 3)

    def test_commit_only_on_another_branch_refused_on_forced_path_absent_from_clone(self):
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first)
        self.assertFalse(self.fixture.clone_has_object(feature))
        self.assert_refused(self.forced(feature), 3)

    def test_commit_only_on_another_branch_refused_on_forced_path_after_human_fetch(self):
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first)
        self.assert_checked_out(self.human(feature), feature)
        self.assertTrue(self.fixture.clone_has_object(feature))
        self.assertIn("refs/remotes/origin/feature", self.fixture.clone_refs())
        result = self.forced(feature)
        self.assert_refused(result, 3)
        self.assertEqual(self.fixture.git("-C", self.fixture.checkout, "rev-parse", "HEAD"),
                         feature, "the refused run moved the checkout")

    def test_commit_only_on_another_branch_accepted_on_human_path(self):
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first)
        self.assert_checked_out(self.human(feature), feature)


class Checkout(DeployScriptTestCase):

    def test_checkout_detached_at_the_commit_and_clean(self):
        tip = self.fixture.commit("main", "tip")
        checkout = self.fixture.checkout
        with open(os.path.join(checkout, "content.txt"), "a", encoding="utf-8") as handle:
            handle.write("edited in place\n")
        for name in ("untracked.txt", "ignored.txt", os.path.join("new-dir", "file.txt")):
            os.makedirs(os.path.dirname(os.path.join(checkout, name)), exist_ok=True)
            with open(os.path.join(checkout, name), "w", encoding="utf-8") as handle:
                handle.write("left behind\n")
        self.assertNotEqual(self.fixture.git("-C", checkout, "status", "--porcelain",
                                             "--ignored"), "")
        result = self.forced(tip)
        self.assert_checked_out(result, tip)
        self.assertFalse(os.path.exists(os.path.join(checkout, "new-dir")))

    def test_run_through_checkout_never_exits_0(self):
        result = self.human(self.fixture.first)
        self.assertNotEqual(result.code, 0, result)
        self.assertIn(f"checked out {self.fixture.first}", self.fixture.log_text())


if __name__ == "__main__":
    unittest.main()
