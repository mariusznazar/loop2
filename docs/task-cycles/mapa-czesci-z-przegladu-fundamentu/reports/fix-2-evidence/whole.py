"""Run every case of the test file against one variant. Usage: whole.py <test file> <variant>."""
import importlib.util, sys, unittest
spec = importlib.util.spec_from_file_location("deploy_case", sys.argv[1])
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.WORKFLOW = sys.argv[2]
suite = unittest.defaultTestLoader.loadTestsFromTestCase(module.DeployWorkflow)
result = unittest.TextTestRunner(verbosity=0).run(suite)
print("failed:", [t.id().split(".")[-1] for t, _ in result.failures + result.errors])
sys.exit(0 if result.wasSuccessful() else 1)
