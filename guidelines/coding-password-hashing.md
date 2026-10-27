# Coding guidelines — password-hashing

- **Discipline:** coding
- **Applies to:** account-server

## When to read

Przed dodaniem lub zmianą pliku wykonującego haszowanie albo sprawdzanie haseł.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/server/passwords.ts` | exemplar | D-113 |

## Rules

### One gate for native password work

- **Decision:** D-103 · D-113
- **Invariant:** password-operation-gate
- **Good:** Hashing and verification use the same bounded admission gate.
- **Bad:** Hashing and verification use separate gates or wait in an unbounded queue.

All native password hashing and verification pass through the same capacity gate. A full gate refuses immediately, and each operation releases its slot only after the native work finishes.

## Examples

### Explicit Argon2id candidate

`src/server/passwords.ts` names the Argon2id parameters and uses the package's generated salt. The profile is provisional until measured in the intended container image.

## Where in code

- `src/server/`
