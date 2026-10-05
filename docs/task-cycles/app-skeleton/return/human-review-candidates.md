# Human review candidates — NOT ADOPTED ENTRIES

These are verbatim H1 and H2 candidate sentences from the two panel settlements. They are outside the six proposed invariant entries and outside the foundation patch. Neither adds a method, critical flow, severity, approval or invariant verdict.

## H1 — successful page delivery

After a successful build, a running server returns the built browser HTML with status 200 for GET / and its compiled entry script with status 200 and a JavaScript content type for GET /main.js.

Polish translation: Po pomyślnym zbudowaniu aplikacji działający serwer zwraca zbudowany HTML przeglądarki ze statusem 200 dla GET / oraz skompilowany skrypt wejściowy ze statusem 200 i typem treści JavaScript dla GET /main.js.

Cost: leaving it out retains ordinary HTTP tests but leaves this positive delivery behavior without an invariant. Adoption adds one invariant and its checking debt; adopt only if this delivery is intended to bind later changes. Whether the cross-part path warrants a critical flow is a separate human choice.

## H2 — occupied listening address

When the configured listening address is already in use, the server process exits nonzero and does not report that it is ready.

Polish translation: Gdy skonfigurowany adres nasłuchiwania jest już zajęty, proces serwera kończy się kodem różnym od zera i nie informuje, że jest gotowy.

Cost: leaving it out retains the ordinary startup regression test. Adoption adds one invariant and checking debt. Keep the scope to an occupied address; evidence does not support broadening to every startup fault.

Later record documents require ownership reassessment for the actual tracked files at adoption. Their presence in the working directory supplies no tracked documentation population at de3ceb36b51636464c8e5fd80980e8c9d18754ed.
