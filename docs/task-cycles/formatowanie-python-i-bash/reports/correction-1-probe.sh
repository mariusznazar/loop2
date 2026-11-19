#!/usr/bin/env bash
if [[ -n $a &&
  -n $b ]]; then echo one; fi
if [[ -n $a
  && -n $b ]]; then echo two; fi
first arg \
  && second arg
