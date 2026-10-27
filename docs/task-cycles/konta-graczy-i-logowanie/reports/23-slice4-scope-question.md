# Slice 4: missing production fixture

The full Linux gate at efa67b9954d5bb6a064b65fdb3537706463430f3 passed all 374 Node tests, then failed test_container_serves_each_icon_with_the_file_bytes in tests/invariants/test_loop2_container_icons.py. The fixture still runs docker run -d --name name tag without any account settings or resources. Production now correctly refuses startup, and its subsequent socket probe reports that the container is not running. The existing other production image fixtures use start_production_container with real synthetic secret and database volumes.

Question to the orchestrator: authorize adding tests/invariants/test_loop2_container_icons.py to this slice (11 changed paths), replacing that startup with the existing start_production_container helper and updating its fixture description, or split this narrow compatibility correction into another change?

Recommendation: authorize the narrow addition. It exercises the existing icon byte assertions under the actual required production startup; it does not alter their expected values or widen the fixture's host sharing. Leaving the fixture unchanged blocks every full gate after safe production validation. Relaxing production validation would violate the accepted task and is rejected.

Evidence: reports/23-slice4-green.log; fixture lines 143–145; helper tests/invariants/account_container_support.py selected by dispatch. The same run also found three unnecessary TypeScript assertions in transport.ts; they are fixed within scope in 402bdda5983af0e1ea6698d7c38c8e17870432d3.

No extra path was edited while awaiting this decision.
