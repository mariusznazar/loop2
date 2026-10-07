# Settlement of the second independent assessment

Assessed range: `44294da228ab8c27dfd1683f931f59f8d7f8d29d..b92a87e733a7669c9a8a7b1ded5a3f648f5beb64`.
Source: `reports/independent-assessment-final.md`. The assessment was made without the task, spec, plan, cycle history, or author reasoning.

## 1. Public files mounted at another prefix — accepted

The demonstrated `/leak` mount serves `package.json` from outside `dist/public` while the cited check passes. That contradicts the exact binding sentence of `public-file-boundary/1`. Keep the sentence, and change the independently authored check to observe every `express.static` root installed when the built app is created, regardless of URL prefix. Preserve the real HTTP probes for public bytes, foreign working directory, and traversal. Require a deliberate `/leak` break to fail. A finite set of HTTP URLs alone cannot prove the universal directory boundary.

This observation extends C17: the `/source` probe catches one prefix, not arbitrary prefixes. The check still covers the present Express serving mechanism, not every possible future file-serving implementation; review must reassess it if the server architecture changes.

## 2. Compiler-layout check asserts unrecorded details — accepted

The critic demonstrated both valid inherited configuration and a shared `rootDir` being rejected. The sentence requires distinct configurations and output directories, not direct JSON keys or distinct source roots. Delete `test_application_build_layout.py`, remove its part-map file assignment, and cite `application-build-layout/1` in the existing `test_application_build_output.py` methods that compile probe sources into literal, separate output directories and show independent compiler environments. The existing check was written independently of the foundation sentence and application code in the earlier app-skeleton cycle. A reviewer must deliberately merge the outputs/configurations and confirm red. This supersedes C16: a direct configuration assertion would cost more maintenance and currently asserts more than the human approved; compiling distinct probes under distinct configurations is the useful evidence already present.

## Other findings and source limits

The critic found no concern in the package-layout and occupied-address checks, decision versions, recovered rows, npm prerequisite, shared support, or part-map ownership apart from the deleted-file row. Its limited input prevented source-citation validation; earlier task reviews and direct source checks covered those references. There is no source contradiction to resolve.

After the corrections: focused and full checks, deliberate breaks, current whole-branch review, independent assessment, return audit, and all affected format guards must be repeated. Approval placeholders are resolved only after the draft request exists.
