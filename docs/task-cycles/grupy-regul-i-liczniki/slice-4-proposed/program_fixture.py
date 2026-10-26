"""Construct program inputs without validating rules or computing expected results."""


def program_from_rules(rules):
    return {"rules": rules}


def program_rules(program):
    """Expose fixture rules for input edits without predicting product behavior."""
    return program["rules"]
