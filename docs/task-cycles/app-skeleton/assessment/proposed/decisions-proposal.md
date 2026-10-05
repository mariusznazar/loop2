# Decision log

### [human prefix required]-01/1 — How are the browser and server built together?

The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application compiles both configurations and copies the browser HTML into the public output; checking types checks both configurations without emitting files.

- **Change:** new decision
- **Scope:** browser-page · server-http · build-tools
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: application-build-layout · application-build-output · application-type-check.
- **Review when:** none
- **Origin:** none
- **Approved by:** on acceptance

*Rationale:* A shared installation keeps the local starting point small, while separate compiler environments keep browser and server types apart.
*Rejected:* Separate packages add installation coordination; a bundler adds a build layer without a demonstrated need in the current application.
