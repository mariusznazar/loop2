"""Dispatch independent mechanical styleguide Methods; unavailable checks never pass."""

import argparse
import importlib
from pathlib import Path
import sys

from quality_support import QualityError, run_check

# invariant: design-token-use/1
# invariant: keyboard-focus-style/1
# invariant: design-contrast/1
# invariant: shared-control-states/1
# invariant: design-role-preservation/1
# invariant: design-token-sources/1
# invariant: styleguide-production-exclusion/1
# invariant: local-font-delivery/1
METHODS = {
    "tokens": ("styleguide_source", "design-token-use/1"),
    "focus": ("styleguide_source", "keyboard-focus-style/1"),
    "contrast": ("styleguide_values", "design-contrast/1"),
    "states": ("styleguide_runtime", "shared-control-states/1"),
    "roles": ("styleguide_values", "design-role-preservation/1"),
    "sources": ("styleguide_values", "design-token-sources/1"),
    "production": ("styleguide_runtime", "styleguide-production-exclusion/1"),
    "fonts": ("styleguide_runtime", "local-font-delivery/1"),
}


def _dispatch(root, selector, fork_point, historical_input):
    if selector != "roles" and (fork_point is not None or historical_input is not None):
        raise QualityError("historical inputs apply only to roles")
    module_name, _invariant = METHODS[selector]
    try:
        module = importlib.import_module(module_name)
    except ImportError as problem:
        raise QualityError(f"styleguide Method module is unavailable: {module_name}") from problem
    operation = getattr(module, "check", None)
    if not callable(operation):
        raise QualityError(f"styleguide Method interface is unavailable: {module_name}.check")
    if selector == "roles":
        return operation(root, selector, fork_point=fork_point, historical_input=historical_input)
    return operation(root, selector)


def main(argv=None, *, root=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", required=True, choices=METHODS)
    history = parser.add_mutually_exclusive_group()
    history.add_argument("--fork-point")
    history.add_argument("--historical-input", type=Path)
    parser.add_argument("--record", type=Path)
    args = parser.parse_args(argv)
    root = Path(__file__).resolve().parents[1] if root is None else Path(root).resolve()
    return run_check(f"scripts/check_styleguide.py:{args.check}", METHODS[args.check][1],
                     lambda: _dispatch(root, args.check, args.fork_point, args.historical_input),
                     record=args.record)


if __name__ == "__main__":
    sys.exit(main())
