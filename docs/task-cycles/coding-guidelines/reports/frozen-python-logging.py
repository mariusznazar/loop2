from pathlib import Path

path = Path("scripts/quality_support.py")
source = path.read_bytes().decode("utf-8")
newline = "\r\n" if "\r\n" in source else "\n"
source = source.replace("import json" + newline, "import json" + newline + "import logging" + newline, 1)
source = source.replace(newline + newline + "class QualityError", newline + newline + "LOGGER = logging.getLogger(__name__)" + newline + newline + newline + "class QualityError", 1)
anchor = "        except (Exception, KeyboardInterrupt) as problem:" + newline
assert source.count(anchor) == 1
source = source.replace(anchor, anchor + '            LOGGER.exception("Quality check could not complete")' + newline)
path.write_bytes(source.encode("utf-8"))

path = Path("tests/quality/test_eslint_checks.py")
source = path.read_bytes().decode("utf-8")
newline = "\r\n" if "\r\n" in source else "\n"
old = "self.assertEqual(json.loads(captured.getvalue()), recorded)"
assert source.count(old) == 2
lines = source.splitlines(keepends=True)
for index, line in enumerate(lines):
    if old not in line:
        continue
    indent = line[:line.index("self.")]
    replacement = [
        'diagnostics = captured.getvalue().splitlines()',
        'self.assertIn("Traceback (most recent call last):", diagnostics[:-1])',
        'self.assertIn("Quality check could not complete", diagnostics[:-1])',
        'self.assertIn(recorded["description"], diagnostics[:-1])',
        'self.assertEqual(json.loads(diagnostics[-1]), recorded)',
    ]
    lines[index] = "".join(indent + text + newline for text in replacement)
path.write_bytes("".join(lines).encode("utf-8"))

path = Path("tests/quality/test_quality_support.py")
source = path.read_bytes().decode("utf-8")
newline = "\r\n" if "\r\n" in source else "\n"
source = source.replace('                def operation():' + newline + '                    raise RuntimeError(detail)',
                        '                def operation(detail=detail):' + newline + '                    raise RuntimeError(detail)')
source = source.replace('                def operation():' + newline + '                    raise problem',
                        '                def operation(problem=problem):' + newline + '                    raise problem')
path.write_bytes(source.encode("utf-8"))
