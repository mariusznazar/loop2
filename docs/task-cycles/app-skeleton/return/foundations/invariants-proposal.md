# Invariants

## application-build-layout/1

The application has one npm package and lockfile, with distinct TypeScript configurations and output directories for browser and server code.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** TODO — How are the browser and server built together?, proposed in foundations/decisions.md; the human has not chosen the decision prefix.
- **Part:** browser-page · server-http · build-tools
- **Correction:** none

## application-build-output/1

Building the application compiles both the browser and server TypeScript configurations and copies the browser HTML into the public output directory.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** TODO — How are the browser and server built together?, proposed in foundations/decisions.md; the human has not chosen the decision prefix.
- **Part:** browser-page · server-http · build-tools
- **Correction:** none

## application-type-check/1

The application type-check command checks both the browser and server TypeScript configurations without emitting files and exits nonzero when either check fails.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** TODO — How are the browser and server built together?, proposed in foundations/decisions.md; the human has not chosen the decision prefix.
- **Part:** browser-page · server-http · build-tools
- **Correction:** none

## unmatched-api-response/1

A request to `/api` or a path beginning with `/api/` for which no API handler exists receives status 404 and an `application/json` response content type, including when the request accepts HTML.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** none
- **Part:** server-http · build-tools
- **Correction:** none

## public-file-boundary/1

The server resolves static-file requests only against the built public directory located relative to its own module, independently of the process working directory.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** none
- **Part:** server-http · build-tools
- **Correction:** none

## missing-page-response/1

A request outside the API paths that matches no public file receives status 404 rather than the home page.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** none
- **Part:** server-http · browser-page · build-tools
- **Correction:** none

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|

## Quarantined invariants

| Identifier | Version | Until |
|---|---|---|

## Recovered invariants

| Identifier | Version | Searched | Found |
|---|---|---|---|
