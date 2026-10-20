from pathlib import Path
import re
import textwrap

for filename, names in (("scripts/check_eslint.py", ("JS_RULES", "TS_ADDITIONS", "TS_DISABLED")),
                        ("scripts/check_ruff.py", ("BLOCKING",))):
    path = Path(filename)
    source = path.read_bytes().decode("utf-8")
    newline = "\r\n" if "\r\n" in source else "\n"
    for name in names:
        pattern = re.compile(r'(?m)^' + name + r' = """(.*?)"""\.split\(\)', re.S)
        match = pattern.search(source)
        assert match is not None, name
        items = match[1].split()
        body = ", ".join('"' + item + '"' for item in items) + ","
        wrapped = textwrap.wrap(body, width=94, initial_indent="    ", subsequent_indent="    ",
                                break_long_words=False, break_on_hyphens=False)
        replacement = name + " = [" + newline + newline.join(wrapped) + newline + "]"
        source = source[:match.start()] + replacement + source[match.end():]
    path.write_bytes(source.encode("utf-8"))

path = Path("scripts/check_shellcheck.py")
source = path.read_bytes().decode("utf-8")
old = ('        if "bash" in interpreters or "bash.exe" in interpreters:\n'
       '            return True\n'
       '        # A declared different interpreter is not a standalone Bash script.\n'
       '        return False')
new = ('        # A declared interpreter determines the language before the suffix.\n'
       '        return "bash" in interpreters or "bash.exe" in interpreters')
newline = "\r\n" if "\r\n" in source else "\n"
assert old.replace("\n", newline) in source
source = source.replace(old.replace("\n", newline), new.replace("\n", newline), 1)
path.write_bytes(source.encode("utf-8"))

path = Path("tests/quality/test_format_check.py")
source = path.read_bytes().decode("utf-8")
old = "            def malformed(command, **options):"
new = "            def malformed(command, *, output=output, **options):"
assert source.count(old) == 1
path.write_bytes(source.replace(old, new).encode("utf-8"))
