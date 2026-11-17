"""Run one case of a copy of test_deploy_workflow.py against one variant of deploy.yml.
Usage: python -B runner.py <test file> <variant file> <case>. Exit 0 = the case passed, 1 = failed."""

import importlib.util
import sys
import unittest

test_file, variant, case = sys.argv[1:4]
spec = importlib.util.spec_from_file_location("deploy_case", test_file)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.WORKFLOW = variant
result = unittest.TestResult()
module.DeployWorkflow(case).run(result)
for _, text in result.failures + result.errors:
    print(text.strip().splitlines()[-1][:160].encode("ascii", "replace").decode())
sys.exit(0 if result.wasSuccessful() else 1)
