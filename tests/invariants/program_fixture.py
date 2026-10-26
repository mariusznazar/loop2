"""Construct program inputs without validating rules or computing expected results."""


def program_from_rules(rules):
    identified = (
        [{**rule, "id": index + 1} if isinstance(rule, dict) else rule
         for index, rule in enumerate(rules)]
        if isinstance(rules, list) else rules
    )
    return {
        "groups": [{"id": 1, "name": "Program", "condition": {"kind": "always"},
                    "rules": identified}],
        "nextGroupId": 2,
        "nextRuleId": len(rules) + 1 if isinstance(rules, list) else 1,
    }


def program_rules(program):
    """Expose fixture rules for input edits without predicting product behavior."""
    return program["groups"][0]["rules"]
