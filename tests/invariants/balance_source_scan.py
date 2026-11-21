"""Shared reading of the code of the balance instrument for the checks of its invariants: which
files of the working tree are that code and their text cut into code, comments, strings, template
text and regular expressions, enough for a scan of names.

The code of the balance instrument is the files of code git tracks or would track under
`balance/`, the overlay files and the player descriptions, which are JSON, left out. The cut is
the one lexer of the forms TypeScript and JavaScript share that `source_lexer.py` holds, written
for the scan of names only; `code_only` and `string_values` are its views of the text, taken from
there.

Nothing here computes a value a check expects; the checks write their expected values out as
literals (WAY-228).
"""

import os

import loop2_invariant_support as support
import source_lexer

INSTRUMENT_DIRECTORY = "balance/"
COMMAND_LINE_FILE = "balance/cli.mjs"
CODE_EXTENSIONS = (".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs")

code_only = source_lexer.code_only
string_values = source_lexer.string_values


def instrument_files(paths):
    """The files of code of the balance instrument among the relative paths given, with '/'."""
    return [
        path
        for path in paths
        if path.startswith(INSTRUMENT_DIRECTORY) and path.endswith(CODE_EXTENSIONS)
    ]


def instrument_sources():
    """(relative path, text) of every file of code of the balance instrument in the working tree."""
    return [
        (relative, support.read_text(os.path.join(support.ROOT, relative)))
        for relative in instrument_files(support.listed_files())
    ]
