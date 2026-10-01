# Pinned the-way process

This repository uses the-way at commit `3b2a0cb5c88bcf86a8fec1b7b1fdc6acaa29951b` through the `.the-way` Git submodule. Initialize it after a fresh clone with `git submodule update --init -- .the-way`. Check that `git -C .the-way rev-parse HEAD` matches the gitlink commit before using it.

For foundation entries, use the project skills `/the-way-record-decision`, `/the-way-record-invariant`, `/the-way-record-glossary-term`, `/the-way-update-part-map`, `/the-way-record-environment-fact`. They read the pinned submodule. Personal skills with similar unprefixed names may use another version of the process. If the submodule cannot be initialized, stop rather than using a different version.
