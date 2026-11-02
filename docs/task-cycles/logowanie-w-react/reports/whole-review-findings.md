# Findings of the review of the whole change, 4634e6b, word for word

Copied from `reports/whole-review.md`, section *Important (blocking)*. No other finding is yours to fix.

**I1. The framework guard no longer fails on another library that comes in under React or on top of it (To do 13).**

- **Place:** `tests/invariants/test_browser_view_framework.py:40-48` (`UI_FRAMEWORKS`), `:181-190` (`test_no_ui_framework_in_runtime_dependencies`), `:192-201` (`test_browser_source_imports_no_ui_framework`).
- **Slice:** Slice 2, commit 35371e0. Slice 7 did not touch this reach. This is Minor 1 of `reports/slice-2-review.md`, graded higher here.
- **What is wrong:** To do 13 says the test „dalej oblewa, gdy taka biblioteka wejdzie do kodu albo zależności uruchomieniowych”. Taking `react` and `react-dom` off the list dropped more than React. On the base every library built on React failed through its `react` dependency, and the name `react` itself was refused whatever it resolved to. At the head:
  - the guard reads only the names of the keys, so `"react": "npm:preact@10.0.0"`, with a lock entry `node_modules/react` of `"name": "preact"`, passes. That is Preact, on the guard's own list and among the options D-03 *Rejected* names, and aliasing is the usual way a React project takes Preact in;
  - a component library on React passes: `@mui/material` in `dependencies`, in a non-dev lock entry and imported by `src/browser/zz-temp.tsx`. The list's comment still says „UI frameworks and component libraries other than React” and holds no component library. The docstring's general „a UI framework absent from the list” was true on the base too, but there this class failed anyway.
- **Why it matters:** the next tasks move the program editor and the other screens to React, so a React library is now the likely way in, and the invariant `browser-view-framework` reads Method `test`. The change opened the hole by removing the name, with nothing in its place.
- **Evidence:** in the separate worktree, `python -B -m unittest test_browser_view_framework.NoUiFramework.test_no_ui_framework_in_runtime_dependencies test_browser_view_framework.NoUiFramework.test_browser_source_imports_no_ui_framework` from `tests/invariants`: exit 0 for each of the two crafted trees (`guard-mui`, `guard-alias`; manifest and lockfile restored after each). On the base `declared & set(UI_FRAMEWORKS)` holds `react` for both.
- **What would close it:** read what a runtime entry really is (the alias's value in `package.json`, `name` of a lock entry), and either name the React component libraries the guard refuses or say in the docstring and the comment that they are outside it, as a decision for the human. A component library is a choice `reserved_choices.md` keeps on a guidelines skill's route, so the second half may be wording, not code. The alias half is code.

**I2. The token guard still skips the rest of a line after a self-closing JSX tag (To do 14).**

- **Place:** `tests/invariants/test_browser_view_token_values.py:304` (`REGEX_AFTER`), `:351-354` (`literal_texts`).
- **Slice:** Slice 8, commit 8d65336, which closed the gap of Q16 for `</` only. The reader reached `.tsx` in Slice 7, commit 50461c1.
- **What is wrong:** `}` stands in `REGEX_AFTER`, so the `/` of `/>` after an attribute in braces starts a „regex” that swallows the rest of the line, the same fault Q16 closed after `</`. `<X y={1} />` is the commonest form of JSX and Prettier keeps short ternaries and arrays on one line. Also, `//` in JSX text, such as an address, reads as a comment to the end of the line.
- **Why it matters:** To do 14 requires the guard to read `.tsx`, and Q16 settled that a known hole in the guard every later screen rests on is not left. A hard-coded colour on such a line passes the invariant `browser-view-token-values`, whose Method is `test`. The controls `a.tsx` hold no case of it.
- **Evidence:** `typescript_findings` called directly on crafted text, in the reviewed tree's test module, nothing changed:
  - `{a ? <X y={1} /> : <X style={{ color: "red" }} />}` gives `[]`;
  - `const b = [<X y={1} />, <X style={{ color: "#fff" }} />];` gives `[]`;
  - `const a = <input value={x} />; const c = "#fff";` gives `[]`;
  - `const a = <p>https://x</p>; const c = "#fff";` gives `[]`;
  - with a string attribute before the `/>`, `{a ? <X y="1" /> : <X style={{ color: "red" }} />}` is flagged, so it is the `}` that does it.
