# Environment facts

## node-24-support-schedule

The Node.js Release Working Group schedules Node.js 24.x end of life for 2028-04-30.

- **Source:** https://raw.githubusercontent.com/nodejs/release/72fdab20216c5f04e0a0fe72a225c2504e9f2b42/README.md § Release schedule, 24.x row, End-of-life — "2028-04-30" · § Release schedule — "Dates are subject to change."; read 2026-10-04

## openssh-authorized-keys-options

In OpenSSH portable 8.9p1, the option `command=` of an authorized_keys file makes sshd execute its command whenever the key is used for authentication, for shell, command or subsystem execution, ignoring the command the user supplies and making the command the client supplied available in the `SSH_ORIGINAL_COMMAND` environment variable, and the option `restrict` disables port, agent and X11 forwarding, PTY allocation and execution of `~/.ssh/rc`.

- **Source:** https://raw.githubusercontent.com/openssh/openssh-portable/166456cedad3962b83b848b1e9caf80794831f0f/sshd.8 § AUTHORIZED_KEYS FILE FORMAT, the command option — "Specifies that the command is executed whenever this key is used for authentication." · "The command supplied by the user (if any) is ignored." · "The command originally supplied by the client is available in the SSH_ORIGINAL_COMMAND environment variable." · "Note that this option applies to shell, command or subsystem execution." · § AUTHORIZED_KEYS FILE FORMAT, the restrict option — "Enable all restrictions, i.e. disable port, agent and X11 forwarding, as well as disabling PTY allocation and execution of ~/.ssh/rc."; read 2026-10-13

## loop2-host-forced-command-entry

The test server's authorized_keys contains exactly one entry beginning with `restrict,command="/usr/local/bin/loop2-deploy"`.

- **Source:** reading: `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys` on the test server's host, grep (GNU grep) 3.7, as `grep --version | head -1` prints it on the same host — "1"; run 2026-11-14

## loop2-host-installed-command

The installed `/usr/local/bin/loop2-deploy` is owned by root:root with mode 0755.

- **Source:** reading: `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` on the test server's host, stat (GNU coreutils) 8.32, as `stat --version | head -1` prints it on the same host — "755 root:root"; run 2026-11-14

## loop2-host-ssh-host-key-options

Root's SSH configuration and the system-wide one on the test server's host, with the files their `Include` lines name, contain no line that sets `KnownHostsCommand` or `VerifyHostKeyDNS`.

- **Source:** reading: `bash -c '
shopt -s nullglob
home=/root
n=0
scan() {
  local file=$1 base=$2 depth=$3 word path f
  [ -r "$file" ] || return 0
  if [ "$depth" -gt 16 ]; then n=$((n + 1)); return 0; fi
  n=$((n + $(grep -v -E "^[[:space:]]*#" "$file" | grep -c -i -E "^[[:space:]]*(\"|(KnownHostsCommand|VerifyHostKeyDNS)([[:space:]=]|$))")))
  while IFS= read -r word; do
    [ -n "$word" ] || continue
    if ! [[ $word =~ ^[A-Za-z0-9_./*?~+-]+$ ]]; then n=$((n + 1)); continue; fi
    case $word in
      /*) path=$word ;;
      \~/*) path=$home/${word#\~/} ;;
      \~*) n=$((n + 1)); continue ;;
      *) path=$base/$word ;;
    esac
    for f in $path; do
      [ -f "$f" ] && scan "$f" "$base" $((depth + 1))
    done
  done < <(grep -v -E "^[[:space:]]*#" "$file" | sed -n -E "s/^[[:space:]]*include[[:space:]=]+(.*)$/\1/Ip" | tr -s " \t=" "\n")
}
scan /root/.ssh/config /root/.ssh 1
scan /etc/ssh/ssh_config /etc/ssh 1
echo "$n"
'` and, in the same call, `bash --version | head -1` and `grep --version | head -1` on the test server's host, bash 5.1.16(1)-release and grep (GNU grep) 3.7 — "0" · "GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)" · "grep (GNU grep) 3.7"; run 2026-11-14

## mikrus-host-docker-workloads

The old loop game and foundryvtt run as Docker containers on the test server's host.

- **Source:** reading: `docker ps` on the test server's host, Docker version 28.1.1, build 4eba377, as `docker --version` prints it on the same host — the container id, image, command, created and status columns of the rows of these two containers, the ports and names columns left out because the ports column holds numbers taken from the server's id: "6e63d970d315   loop:latest                "docker-entrypoint.s…"   2 months ago    Up 2 months (healthy)" · "bbe6f6752113   felddy/foundryvtt:12.331   "./entrypoint.sh res…"   18 months ago   Up 5 months (healthy)"; run 2026-11-14

## mikrus-host-swap

The test server's host reports zero total swap.

- **Source:** reading: `free` on the test server's host, free from procps-ng 3.3.17, as `free --version` prints it on the same host — "total        used        free      shared  buff/cache   available" · "Swap:              0           0           0"; run 2026-11-14

## game-icons-licence

The game-icons/icons repository provides the icons of its contributors Delapouite, Lorc, Felbrigg
and Skoll under Creative Commons 3.0 BY.

- **Source:** https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/license.txt § first line — "Icons provided under the Creative Commons 3.0 BY or CC0 if mentioned below." · § list of contributors — "Lorc, http://lorcblog.blogspot.com" · § list of contributors — "Delapouite, http://delapouite.com" · § list of contributors — "Felbrigg, http://blackdogofdoom.blogspot.co.uk" · § list of contributors — "Skoll"; read 2026-11-05

## cc-by-3-adaptation-credit

The Creative Commons Attribution 3.0 Unported licence requires whoever distributes an adaptation of
a work under it, unless a licensor has given notice to remove that credit from the adaptation, to
provide, reasonably to the medium, the name of the work's original author if supplied, the title
of the work if supplied, to the extent reasonably practicable the URI the licensor specifies for the
work where that URI refers to the work's copyright notice or licensing information, and a credit
identifying the use of the work in the adaptation.

- **Source:** https://creativecommons.org/licenses/by/3.0/legalcode § 4(b) — "If You Distribute, or Publicly Perform the Work or any Adaptations or Collections, You must, unless a request has been made pursuant to Section 4(a)," · § 4(b) — "provide, reasonable to the medium or means You are utilizing:" · § 4(b) — "(i) the name of the Original Author (or pseudonym, if applicable) if supplied" · § 4(b) — "(ii) the title of the Work if supplied" · § 4(b) — "(iii) to the extent reasonably practicable, the URI, if any, that Licensor specifies to be associated with the Work, unless such URI does not refer to the copyright notice or licensing information for the Work" · § 4(b) — "(iv) consistent with Section 3(b), in the case of an Adaptation, a credit identifying the use of the Work in the Adaptation" · § 4(a) — "If You create an Adaptation, upon notice from any Licensor You must, to the extent practicable, remove from the Adaptation any credit as required by Section 4(b), as requested."; read 2026-10-13

## cc-by-3-licence-copy

The Creative Commons Attribution 3.0 Unported licence requires whoever distributes a work under it
to include a copy of the licence, or its URI, with every copy of the work they distribute.

- **Source:** https://creativecommons.org/licenses/by/3.0/legalcode § 4(a) — "You must include a copy of, or the Uniform Resource Identifier (URI) for, this License with every copy of the Work You Distribute or Publicly Perform."; read 2026-10-13

## game-icons-wood-stick-title

The page of Delapouite's icon `wood-stick` on game-icons.net names the icon "Wood stick icon".

- **Source:** https://game-icons.net/1x1/delapouite/wood-stick.html (archived: https://web.archive.org/web/20260113203755/https://game-icons.net/1x1/delapouite/wood-stick.html, 2026-01-13) § heading — "Wood stick icon"; read 2026-10-13

## game-icons-berry-bush-title

The page of Delapouite's icon `berry-bush` on game-icons.net names the icon "Berry bush icon".

- **Source:** https://game-icons.net/1x1/delapouite/berry-bush.html (archived: https://web.archive.org/web/20251006204230/https://game-icons.net/1x1/delapouite/berry-bush.html, 2025-10-06) § heading — "Berry bush icon"; read 2026-10-13

## game-icons-fern-title

The page of Delapouite's icon `fern` on game-icons.net names the icon "Fern icon".

- **Source:** https://game-icons.net/1x1/delapouite/fern.html (archived: https://web.archive.org/web/20260821015039/https://game-icons.net/1x1/delapouite/fern.html, 2026-08-21) § heading — "Fern icon"; read 2026-10-13

## game-icons-flax-title

The page of Delapouite's icon `flax` on game-icons.net names the icon "Flax icon".

- **Source:** https://game-icons.net/1x1/delapouite/flax.html (archived: https://web.archive.org/web/20250617202006/https://game-icons.net/1x1/delapouite/flax.html, 2025-06-17) § heading — "Flax icon"; read 2026-10-13

## game-icons-campfire-title

The page of Lorc's icon `campfire` on game-icons.net names the icon "Campfire icon".

- **Source:** https://game-icons.net/1x1/lorc/campfire.html (archived: https://web.archive.org/web/20260621235751/https://game-icons.net/1x1/lorc/campfire.html, 2026-06-21) § heading — "Campfire icon"; read 2026-10-24

## game-icons-binoculars-title

The page of Delapouite's icon `binoculars` on game-icons.net names the icon "Binoculars icon".

- **Source:** https://game-icons.net/1x1/delapouite/binoculars.html (archived: https://web.archive.org/web/20260801161155/https://game-icons.net/1x1/delapouite/binoculars.html, 2026-08-01) § heading — "Binoculars icon"; read 2026-11-05

## game-icons-hiking-title

The page of Delapouite's icon `hiking` on game-icons.net names the icon "Hiking icon".

- **Source:** https://game-icons.net/1x1/delapouite/hiking.html (archived: https://web.archive.org/web/20260715194452/https://game-icons.net/1x1/delapouite/hiking.html, 2026-07-15) § heading — "Hiking icon"; read 2026-11-05

## game-icons-direction-sign-title

The page of Delapouite's icon `direction-sign` on game-icons.net names the icon "Direction sign icon".

- **Source:** https://game-icons.net/1x1/delapouite/direction-sign.html (archived: https://web.archive.org/web/20250822190721/https://game-icons.net/1x1/delapouite/direction-sign.html, 2025-08-22) § heading — "Direction sign icon"; read 2026-11-05

## game-icons-grab-title

The page of Lorc's icon `grab` on game-icons.net names the icon "Grab icon".

- **Source:** https://game-icons.net/1x1/lorc/grab.html (archived: https://web.archive.org/web/20260705130601/https://game-icons.net/1x1/lorc/grab.html, 2026-07-05) § heading — "Grab icon"; read 2026-11-05

## game-icons-claw-hammer-title

The page of Lorc's icon `claw-hammer` on game-icons.net names the icon "Claw hammer icon".

- **Source:** https://game-icons.net/1x1/lorc/claw-hammer.html (archived: https://web.archive.org/web/20251002131642/https://game-icons.net/1x1/lorc/claw-hammer.html, 2025-10-02) § heading — "Claw hammer icon"; read 2026-11-05

## game-icons-match-tip-title

The page of Lorc's icon `match-tip` on game-icons.net names the icon "Match tip icon".

- **Source:** https://game-icons.net/1x1/lorc/match-tip.html (archived: https://web.archive.org/web/20251212064815/https://game-icons.net/1x1/lorc/match-tip.html, 2025-12-12) § heading — "Match tip icon"; read 2026-11-05

## game-icons-logging-title

The page of Skoll's icon `logging` on game-icons.net names the icon "Logging icon".

- **Source:** https://game-icons.net/1x1/skoll/logging.html (archived: https://web.archive.org/web/20250418031239/https://game-icons.net/1x1/skoll/logging.html, 2025-04-18) § heading — "Logging icon"; read 2026-11-05

## game-icons-meal-title

The page of Delapouite's icon `meal` on game-icons.net names the icon "Meal icon".

- **Source:** https://game-icons.net/1x1/delapouite/meal.html (archived: https://web.archive.org/web/20250808200257/https://game-icons.net/1x1/delapouite/meal.html, 2025-08-08) § heading — "Meal icon"; read 2026-11-05

## game-icons-deadly-strike-title

The page of Lorc's icon `deadly-strike` on game-icons.net names the icon "Deadly strike icon".

- **Source:** https://game-icons.net/1x1/lorc/deadly-strike.html (archived: https://web.archive.org/web/20260519184532/https://game-icons.net/1x1/lorc/deadly-strike.html, 2026-05-19) § heading — "Deadly strike icon"; read 2026-11-05

## game-icons-boot-kick-title

The page of Lorc's icon `boot-kick` on game-icons.net names the icon "Boot kick icon".

- **Source:** https://game-icons.net/1x1/lorc/boot-kick.html (archived: https://web.archive.org/web/20260512011143/https://game-icons.net/1x1/lorc/boot-kick.html, 2026-05-12) § heading — "Boot kick icon"; read 2026-11-05

## game-icons-dodge-title

The page of Felbrigg's icon `dodge` on game-icons.net names the icon "Dodge icon".

- **Source:** https://game-icons.net/1x1/felbrigg/dodge.html (archived: https://web.archive.org/web/20260121105032/https://game-icons.net/1x1/felbrigg/dodge.html, 2026-01-21) § heading — "Dodge icon"; read 2026-11-05

## game-icons-wood-pile-title

The page of Delapouite's icon `wood-pile` on game-icons.net names the icon "Wood Pile icon".

- **Source:** https://game-icons.net/1x1/delapouite/wood-pile.html (archived: https://web.archive.org/web/20260417231650/https://game-icons.net/1x1/delapouite/wood-pile.html, 2026-04-17) § heading — "Wood Pile icon"; read 2026-11-11

## eslint-recommended-rules

The `recommended` set in @eslint/js 10.0.1 contains the following rules, each at `error` with no configured options: `constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-args`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-octal`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-assignment`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`.

- **Source:** https://unpkg.com/@eslint/js@10.0.1/src/configs/eslint-recommended.js § module.exports, rules — “rules: Object.freeze({ "constructor-super": "error", "for-direction": "error", "getter-return": "error", "no-async-promise-executor": "error", "no-case-declarations": "error", "no-class-assign": "error", "no-compare-neg-zero": "error", "no-cond-assign": "error", "no-const-assign": "error", "no-constant-binary-expression": "error", "no-constant-condition": "error", "no-control-regex": "error", "no-debugger": "error", "no-delete-var": "error", "no-dupe-args": "error", "no-dupe-class-members": "error", "no-dupe-else-if": "error", "no-dupe-keys": "error", "no-duplicate-case": "error", "no-empty": "error", "no-empty-character-class": "error", "no-empty-pattern": "error", "no-empty-static-block": "error", "no-ex-assign": "error", "no-extra-boolean-cast": "error", "no-fallthrough": "error", "no-func-assign": "error", "no-global-assign": "error", "no-import-assign": "error", "no-invalid-regexp": "error", "no-irregular-whitespace": "error", "no-loss-of-precision": "error", "no-misleading-character-class": "error", "no-new-native-nonconstructor": "error", "no-nonoctal-decimal-escape": "error", "no-obj-calls": "error", "no-octal": "error", "no-prototype-builtins": "error", "no-redeclare": "error", "no-regex-spaces": "error", "no-self-assign": "error", "no-setter-return": "error", "no-shadow-restricted-names": "error", "no-sparse-arrays": "error", "no-this-before-super": "error", "no-unassigned-vars": "error", "no-undef": "error", "no-unexpected-multiline": "error", "no-unreachable": "error", "no-unsafe-finally": "error", "no-unsafe-negation": "error", "no-unsafe-optional-chaining": "error", "no-unused-labels": "error", "no-unused-private-class-members": "error", "no-unused-vars": "error", "no-useless-assignment": "error", "no-useless-backreference": "error", "no-useless-catch": "error", "no-useless-escape": "error", "no-with": "error", "preserve-caught-error": "error", "require-yield": "error", "use-isnan": "error", "valid-typeof": "error" })”; read 2026-10-20

## typescript-eslint-typechecked-rules

The flat `recommendedTypeChecked` set in typescript-eslint 8.71.2 composes `base`, the TypeScript-file `eslintRecommended` compatibility rules and `recommended-type-checked`, enabling `no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/await-thenable`, `@typescript-eslint/ban-ts-comment`, `@typescript-eslint/no-array-constructor`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `@typescript-eslint/no-unused-expressions`, `@typescript-eslint/no-unused-vars`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unbound-method` at `error` with no configured options and disabling `constructor-super`, `getter-return`, `no-class-assign`, `no-const-assign`, `no-dupe-args`, `no-dupe-class-members`, `no-dupe-keys`, `no-func-assign`, `no-import-assign`, `no-new-native-nonconstructor`, `no-new-symbol`, `no-obj-calls`, `no-redeclare`, `no-setter-return`, `no-this-before-super`, `no-undef`, `no-unreachable`, `no-unsafe-negation`, `no-with`, `no-array-constructor`, `no-implied-eval`, `no-unused-expressions`, `no-unused-vars`, `no-throw-literal`, `prefer-promise-reject-errors`, `require-await`.

- **Source:** https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/flat/recommended-type-checked.ts § default export, complete composition and rules — “export default ( plugin: FlatConfig.Plugin, parser: FlatConfig.Parser, ): FlatConfig.ConfigArray => [ baseConfig(plugin, parser), eslintRecommendedConfig(plugin, parser), { name: 'typescript-eslint/recommended-type-checked', rules: { '@typescript-eslint/await-thenable': 'error', '@typescript-eslint/ban-ts-comment': 'error', 'no-array-constructor': 'off', '@typescript-eslint/no-array-constructor': 'error', '@typescript-eslint/no-array-delete': 'error', '@typescript-eslint/no-base-to-string': 'error', '@typescript-eslint/no-duplicate-enum-values': 'error', '@typescript-eslint/no-duplicate-type-constituents': 'error', '@typescript-eslint/no-empty-object-type': 'error', '@typescript-eslint/no-explicit-any': 'error', '@typescript-eslint/no-extra-non-null-assertion': 'error', '@typescript-eslint/no-floating-promises': 'error', '@typescript-eslint/no-for-in-array': 'error', 'no-implied-eval': 'off', '@typescript-eslint/no-implied-eval': 'error', '@typescript-eslint/no-misused-new': 'error', '@typescript-eslint/no-misused-promises': 'error', '@typescript-eslint/no-namespace': 'error', '@typescript-eslint/no-non-null-asserted-optional-chain': 'error', '@typescript-eslint/no-redundant-type-constituents': 'error', '@typescript-eslint/no-require-imports': 'error', '@typescript-eslint/no-this-alias': 'error', '@typescript-eslint/no-unnecessary-type-assertion': 'error', '@typescript-eslint/no-unnecessary-type-constraint': 'error', '@typescript-eslint/no-unsafe-argument': 'error', '@typescript-eslint/no-unsafe-assignment': 'error', '@typescript-eslint/no-unsafe-call': 'error', '@typescript-eslint/no-unsafe-declaration-merging': 'error', '@typescript-eslint/no-unsafe-enum-comparison': 'error', '@typescript-eslint/no-unsafe-function-type': 'error', '@typescript-eslint/no-unsafe-member-access': 'error', '@typescript-eslint/no-unsafe-return': 'error', '@typescript-eslint/no-unsafe-unary-minus': 'error', 'no-unused-expressions': 'off', '@typescript-eslint/no-unused-expressions': 'error', 'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': 'error', '@typescript-eslint/no-wrapper-object-types': 'error', 'no-throw-literal': 'off', '@typescript-eslint/only-throw-error': 'error', '@typescript-eslint/prefer-as-const': 'error', '@typescript-eslint/prefer-namespace-keyword': 'error', 'prefer-promise-reject-errors': 'off', '@typescript-eslint/prefer-promise-reject-errors': 'error', 'require-await': 'off', '@typescript-eslint/require-await': 'error', '@typescript-eslint/restrict-plus-operands': 'error', '@typescript-eslint/restrict-template-expressions': 'error', '@typescript-eslint/triple-slash-reference': 'error', '@typescript-eslint/unbound-method': 'error', }, }, ];”; read 2026-10-20 · https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts § config, complete compatibility rules — “rules: { 'constructor-super': 'off', // ts(2335) & ts(2377) 'getter-return': 'off', // ts(2378) 'no-class-assign': 'off', // ts(2629) 'no-const-assign': 'off', // ts(2588) 'no-dupe-args': 'off', // ts(2300) 'no-dupe-class-members': 'off', // ts(2393) & ts(2300) 'no-dupe-keys': 'off', // ts(1117) 'no-func-assign': 'off', // ts(2630) 'no-import-assign': 'off', // ts(2632) & ts(2540) 'no-new-native-nonconstructor': 'off', // ts(7009) // "no-new-symbol" was deprecated in ESLint 9.0.0 and will be removed in // ESLint v11.0.0. See: // https://eslint.org/docs/latest/rules/no-new-symbol // We need to keep the rule disabled until TSESLint drops support for // ESlint 8. See: // https://github.com/typescript-eslint/typescript-eslint/pull/8895 'no-new-symbol': 'off', // ts(7009) 'no-obj-calls': 'off', // ts(2349) 'no-redeclare': 'off', // ts(2451) 'no-setter-return': 'off', // ts(2408) 'no-this-before-super': 'off', // ts(2376) & ts(17009) 'no-undef': 'off', // ts(2304) & ts(2552) 'no-unreachable': 'off', // ts(7027) 'no-unsafe-negation': 'off', // ts(2365) & ts(2322) & ts(2358) 'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more 'no-with': 'off', // ts(1101) & ts(2410) 'prefer-const': 'error', // ts provides better types with const 'prefer-rest-params': 'error', // ts provides better types with rest args over arguments 'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply }”; read 2026-10-20 · https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/flat/eslint-recommended.ts § default export, flat compatibility selection — “export default ( _plugin: FlatConfig.Plugin, _parser: FlatConfig.Parser, ): FlatConfig.Config => ({ ...config('minimatch'), name: 'typescript-eslint/eslint-recommended', });”; read 2026-10-20 · https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/v8.71.2/packages/eslint-plugin/src/configs/flat/base.ts § default export, parser and plugin — “export default ( plugin: FlatConfig.Plugin, parser: FlatConfig.Parser, ): FlatConfig.Config => ({ name: 'typescript-eslint/base', languageOptions: { parser, sourceType: 'module', }, plugins: { '@typescript-eslint': plugin, }, });”; read 2026-10-20

## ruff-default-rules

Ruff 0.17.1 selects the following 407 rules by default without preview: `ASYNC100`, `ASYNC105`, `ASYNC115`, `ASYNC116`, `ASYNC210`, `ASYNC220`, `ASYNC221`, `ASYNC222`, `ASYNC230`, `ASYNC251`, `B002`, `B003`, `B004`, `B005`, `B006`, `B008`, `B009`, `B010`, `B012`, `B013`, `B014`, `B015`, `B016`, `B017`, `B018`, `B019`, `B020`, `B021`, `B022`, `B023`, `B025`, `B026`, `B029`, `B030`, `B031`, `B032`, `B033`, `B035`, `B039`, `BLE001`, `C400`, `C401`, `C402`, `C403`, `C404`, `C405`, `C406`, `C408`, `C409`, `C410`, `C411`, `C413`, `C414`, `C415`, `C417`, `C418`, `C419`, `D419`, `DTZ002`, `DTZ003`, `DTZ004`, `E722`, `E902`, `EXE001`, `EXE002`, `EXE004`, `EXE005`, `F401`, `F402`, `F404`, `F406`, `F407`, `F501`, `F502`, `F503`, `F504`, `F505`, `F506`, `F507`, `F508`, `F509`, `F521`, `F522`, `F523`, `F524`, `F525`, `F541`, `F601`, `F602`, `F621`, `F622`, `F631`, `F632`, `F633`, `F634`, `F701`, `F702`, `F704`, `F706`, `F707`, `F811`, `F821`, `F822`, `F823`, `F841`, `F842`, `F901`, `FA100`, `FA102`, `FLY002`, `FURB105`, `FURB122`, `FURB129`, `FURB132`, `FURB136`, `FURB157`, `FURB161`, `FURB162`, `FURB163`, `FURB166`, `FURB167`, `FURB168`, `FURB169`, `FURB177`, `FURB181`, `FURB188`, `FURB192`, `G010`, `G101`, `G201`, `G202`, `I001`, `INT001`, `INT002`, `INT003`, `ISC004`, `LOG001`, `LOG002`, `LOG009`, `LOG014`, `LOG015`, `N999`, `PERF101`, `PERF102`, `PERF402`, `PGH005`, `PIE790`, `PIE794`, `PIE796`, `PIE800`, `PIE804`, `PIE807`, `PIE808`, `PIE810`, `PLC0105`, `PLC0131`, `PLC0132`, `PLC0205`, `PLC0206`, `PLC0208`, `PLC0414`, `PLC3002`, `PLE0100`, `PLE0101`, `PLE0115`, `PLE0116`, `PLE0117`, `PLE0118`, `PLE0303`, `PLE0304`, `PLE0305`, `PLE0307`, `PLE0308`, `PLE0309`, `PLE0604`, `PLE0605`, `PLE0643`, `PLE0704`, `PLE1132`, `PLE1142`, `PLE1205`, `PLE1206`, `PLE1300`, `PLE1307`, `PLE1310`, `PLE1507`, `PLE1519`, `PLE1520`, `PLE1700`, `PLE2502`, `PLE2510`, `PLE2512`, `PLE2513`, `PLE2514`, `PLE2515`, `PLR0124`, `PLR0133`, `PLR0206`, `PLR0402`, `PLR1704`, `PLR1708`, `PLR1711`, `PLR1716`, `PLR1722`, `PLR1730`, `PLR1733`, `PLR1736`, `PLR2044`, `PLW0120`, `PLW0127`, `PLW0128`, `PLW0129`, `PLW0131`, `PLW0133`, `PLW0177`, `PLW0211`, `PLW0245`, `PLW0406`, `PLW0602`, `PLW0604`, `PLW0642`, `PLW0711`, `PLW1501`, `PLW1507`, `PLW1508`, `PLW1509`, `PLW1510`, `PLW2101`, `PT010`, `PT014`, `PT020`, `PT025`, `PT026`, `PT031`, `PTH124`, `PTH210`, `PYI001`, `PYI002`, `PYI003`, `PYI004`, `PYI005`, `PYI006`, `PYI007`, `PYI008`, `PYI009`, `PYI010`, `PYI012`, `PYI013`, `PYI015`, `PYI016`, `PYI017`, `PYI018`, `PYI019`, `PYI020`, `PYI025`, `PYI026`, `PYI029`, `PYI030`, `PYI032`, `PYI033`, `PYI034`, `PYI035`, `PYI036`, `PYI041`, `PYI042`, `PYI043`, `PYI044`, `PYI045`, `PYI046`, `PYI047`, `PYI048`, `PYI049`, `PYI050`, `PYI052`, `PYI055`, `PYI057`, `PYI058`, `PYI059`, `PYI061`, `PYI062`, `PYI063`, `PYI064`, `PYI066`, `RET501`, `RUF007`, `RUF008`, `RUF009`, `RUF010`, `RUF012`, `RUF013`, `RUF015`, `RUF016`, `RUF017`, `RUF018`, `RUF019`, `RUF020`, `RUF022`, `RUF023`, `RUF024`, `RUF026`, `RUF028`, `RUF030`, `RUF032`, `RUF033`, `RUF034`, `RUF040`, `RUF041`, `RUF046`, `RUF048`, `RUF049`, `RUF051`, `RUF053`, `RUF057`, `RUF058`, `RUF059`, `RUF063`, `RUF068`, `RUF100`, `RUF101`, `RUF200`, `S102`, `S110`, `S112`, `SIM101`, `SIM102`, `SIM103`, `SIM107`, `SIM113`, `SIM114`, `SIM115`, `SIM117`, `SIM118`, `SIM201`, `SIM202`, `SIM208`, `SIM210`, `SIM211`, `SIM220`, `SIM221`, `SIM222`, `SIM223`, `SIM401`, `SIM905`, `SIM911`, `T100`, `TC004`, `TC005`, `TC007`, `TC010`, `TRY002`, `TRY004`, `TRY201`, `TRY203`, `TRY401`, `UP001`, `UP003`, `UP004`, `UP005`, `UP006`, `UP007`, `UP008`, `UP009`, `UP010`, `UP011`, `UP012`, `UP014`, `UP017`, `UP018`, `UP019`, `UP020`, `UP021`, `UP022`, `UP023`, `UP024`, `UP025`, `UP026`, `UP028`, `UP029`, `UP030`, `UP031`, `UP032`, `UP033`, `UP034`, `UP035`, `UP036`, `UP037`, `UP039`, `UP040`, `UP041`, `UP043`, `UP044`, `UP045`, `UP046`, `UP047`, `UP049`, `UP050`, `W605`, `YTT101`, `YTT102`, `YTT103`, `YTT201`, `YTT202`, `YTT203`, `YTT204`, `YTT301`, `YTT302`, `YTT303`.

- **Source:** https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/settings/mod.rs § DEFAULT_SELECTORS, complete list — “pub const DEFAULT_SELECTORS: &[RuleSelector] = &[ RuleSelector::rule(Rule::CancelScopeNoCheckpoint), // ASYNC100 RuleSelector::rule(Rule::TrioSyncCall), // ASYNC105 RuleSelector::rule(Rule::AsyncZeroSleep), // ASYNC115 RuleSelector::rule(Rule::LongSleepNotForever), // ASYNC116 RuleSelector::rule(Rule::BlockingHttpCallInAsyncFunction), // ASYNC210 RuleSelector::rule(Rule::CreateSubprocessInAsyncFunction), // ASYNC220 RuleSelector::rule(Rule::RunProcessInAsyncFunction), // ASYNC221 RuleSelector::rule(Rule::WaitForProcessInAsyncFunction), // ASYNC222 RuleSelector::rule(Rule::BlockingOpenCallInAsyncFunction), // ASYNC230 RuleSelector::rule(Rule::BlockingSleepInAsyncFunction), // ASYNC251 RuleSelector::rule(Rule::UnaryPrefixIncrementDecrement), // B002 RuleSelector::rule(Rule::AssignmentToOsEnviron), // B003 RuleSelector::rule(Rule::UnreliableCallableCheck), // B004 RuleSelector::rule(Rule::StripWithMultiCharacters), // B005 RuleSelector::rule(Rule::MutableArgumentDefault), // B006 RuleSelector::rule(Rule::FunctionCallInDefaultArgument), // B008 RuleSelector::rule(Rule::GetAttrWithConstant), // B009 RuleSelector::rule(Rule::SetAttrWithConstant), // B010 RuleSelector::rule(Rule::JumpStatementInFinally), // B012 RuleSelector::rule(Rule::RedundantTupleInExceptionHandler), // B013 RuleSelector::rule(Rule::DuplicateHandlerException), // B014 RuleSelector::rule(Rule::UselessComparison), // B015 RuleSelector::rule(Rule::RaiseLiteral), // B016 RuleSelector::rule(Rule::AssertRaisesException), // B017 RuleSelector::rule(Rule::UselessExpression), // B018 RuleSelector::rule(Rule::CachedInstanceMethod), // B019 RuleSelector::rule(Rule::LoopVariableOverridesIterator), // B020 RuleSelector::rule(Rule::FStringDocstring), // B021 RuleSelector::rule(Rule::UselessContextlibSuppress), // B022 RuleSelector::rule(Rule::FunctionUsesLoopVariable), // B023 RuleSelector::rule(Rule::DuplicateTryBlockException), // B025 RuleSelector::rule(Rule::StarArgUnpackingAfterKeywordArg), // B026 RuleSelector::rule(Rule::ExceptWithEmptyTuple), // B029 RuleSelector::rule(Rule::ExceptWithNonExceptionClasses), // B030 RuleSelector::rule(Rule::ReuseOfGroupbyGenerator), // B031 RuleSelector::rule(Rule::UnintentionalTypeAnnotation), // B032 RuleSelector::rule(Rule::DuplicateValue), // B033 RuleSelector::rule(Rule::StaticKeyDictComprehension), // B035 RuleSelector::rule(Rule::MutableContextvarDefault), // B039 RuleSelector::rule(Rule::BlindExcept), // BLE001 RuleSelector::rule(Rule::UnnecessaryGeneratorList), // C400 RuleSelector::rule(Rule::UnnecessaryGeneratorSet), // C401 RuleSelector::rule(Rule::UnnecessaryGeneratorDict), // C402 RuleSelector::rule(Rule::UnnecessaryListComprehensionSet), // C403 RuleSelector::rule(Rule::UnnecessaryListComprehensionDict), // C404 RuleSelector::rule(Rule::UnnecessaryLiteralSet), // C405 RuleSelector::rule(Rule::UnnecessaryLiteralDict), // C406 RuleSelector::rule(Rule::UnnecessaryCollectionCall), // C408 RuleSelector::rule(Rule::UnnecessaryLiteralWithinTupleCall), // C409 RuleSelector::rule(Rule::UnnecessaryLiteralWithinListCall), // C410 RuleSelector::rule(Rule::UnnecessaryListCall), // C411 RuleSelector::rule(Rule::UnnecessaryCallAroundSorted), // C413 RuleSelector::rule(Rule::UnnecessaryDoubleCastOrProcess), // C414 RuleSelector::rule(Rule::UnnecessarySubscriptReversal), // C415 RuleSelector::rule(Rule::UnnecessaryMap), // C417 RuleSelector::rule(Rule::UnnecessaryLiteralWithinDictCall), // C418 RuleSelector::rule(Rule::UnnecessaryComprehensionInCall), // C419 RuleSelector::rule(Rule::EmptyDocstring), // D419 RuleSelector::rule(Rule::CallDatetimeToday), // DTZ002 RuleSelector::rule(Rule::CallDatetimeUtcnow), // DTZ003 RuleSelector::rule(Rule::CallDatetimeUtcfromtimestamp), // DTZ004 RuleSelector::rule(Rule::BareExcept), // E722 RuleSelector::rule(Rule::IOError), // E902 RuleSelector::rule(Rule::ShebangNotExecutable), // EXE001 RuleSelector::rule(Rule::ShebangMissingExecutableFile), // EXE002 RuleSelector::rule(Rule::ShebangLeadingWhitespace), // EXE004 RuleSelector::rule(Rule::ShebangNotFirstLine), // EXE005 RuleSelector::rule(Rule::UnusedImport), // F401 RuleSelector::rule(Rule::ImportShadowedByLoopVar), // F402 RuleSelector::rule(Rule::LateFutureImport), // F404 RuleSelector::rule(Rule::UndefinedLocalWithNestedImportStarUsage), // F406 RuleSelector::rule(Rule::FutureFeatureNotDefined), // F407 RuleSelector::rule(Rule::PercentFormatInvalidFormat), // F501 RuleSelector::rule(Rule::PercentFormatExpectedMapping), // F502 RuleSelector::rule(Rule::PercentFormatExpectedSequence), // F503 RuleSelector::rule(Rule::PercentFormatExtraNamedArguments), // F504 RuleSelector::rule(Rule::PercentFormatMissingArgument), // F505 RuleSelector::rule(Rule::PercentFormatMixedPositionalAndNamed), // F506 RuleSelector::rule(Rule::PercentFormatPositionalCountMismatch), // F507 RuleSelector::rule(Rule::PercentFormatStarRequiresSequence), // F508 RuleSelector::rule(Rule::PercentFormatUnsupportedFormatCharacter), // F509 RuleSelector::rule(Rule::StringDotFormatInvalidFormat), // F521 RuleSelector::rule(Rule::StringDotFormatExtraNamedArguments), // F522 RuleSelector::rule(Rule::StringDotFormatExtraPositionalArguments), // F523 RuleSelector::rule(Rule::StringDotFormatMissingArguments), // F524 RuleSelector::rule(Rule::StringDotFormatMixingAutomatic), // F525 RuleSelector::rule(Rule::FStringMissingPlaceholders), // F541 RuleSelector::rule(Rule::MultiValueRepeatedKeyLiteral), // F601 RuleSelector::rule(Rule::MultiValueRepeatedKeyVariable), // F602 RuleSelector::rule(Rule::ExpressionsInStarAssignment), // F621 RuleSelector::rule(Rule::MultipleStarredExpressions), // F622 RuleSelector::rule(Rule::AssertTuple), // F631 RuleSelector::rule(Rule::IsLiteral), // F632 RuleSelector::rule(Rule::InvalidPrintSyntax), // F633 RuleSelector::rule(Rule::IfTuple), // F634 RuleSelector::rule(Rule::BreakOutsideLoop), // F701 RuleSelector::rule(Rule::ContinueOutsideLoop), // F702 RuleSelector::rule(Rule::YieldOutsideFunction), // F704 RuleSelector::rule(Rule::ReturnOutsideFunction), // F706 RuleSelector::rule(Rule::DefaultExceptNotLast), // F707 RuleSelector::rule(Rule::RedefinedWhileUnused), // F811 RuleSelector::rule(Rule::UndefinedName), // F821 RuleSelector::rule(Rule::UndefinedExport), // F822 RuleSelector::rule(Rule::UndefinedLocal), // F823 RuleSelector::rule(Rule::UnusedVariable), // F841 RuleSelector::rule(Rule::UnusedAnnotation), // F842 RuleSelector::rule(Rule::RaiseNotImplemented), // F901 RuleSelector::rule(Rule::FutureRewritableTypeAnnotation), // FA100 RuleSelector::rule(Rule::FutureRequiredTypeAnnotation), // FA102 RuleSelector::rule(Rule::StaticJoinToFString), // FLY002 RuleSelector::rule(Rule::PrintEmptyString), // FURB105 RuleSelector::rule(Rule::ForLoopWrites), // FURB122 RuleSelector::rule(Rule::ReadlinesInFor), // FURB129 RuleSelector::rule(Rule::CheckAndRemoveFromSet), // FURB132 RuleSelector::rule(Rule::IfExprMinMax), // FURB136 RuleSelector::rule(Rule::VerboseDecimalConstructor), // FURB157 RuleSelector::rule(Rule::BitCount), // FURB161 RuleSelector::rule(Rule::FromisoformatReplaceZ), // FURB162 RuleSelector::rule(Rule::RedundantLogBase), // FURB163 RuleSelector::rule(Rule::IntOnSlicedStr), // FURB166 RuleSelector::rule(Rule::RegexFlagAlias), // FURB167 RuleSelector::rule(Rule::IsinstanceTypeNone), // FURB168 RuleSelector::rule(Rule::TypeNoneComparison), // FURB169 RuleSelector::rule(Rule::ImplicitCwd), // FURB177 RuleSelector::rule(Rule::HashlibDigestHex), // FURB181 RuleSelector::rule(Rule::SliceToRemovePrefixOrSuffix), // FURB188 RuleSelector::rule(Rule::SortedMinMax), // FURB192 RuleSelector::rule(Rule::LoggingWarn), // G010 RuleSelector::rule(Rule::LoggingExtraAttrClash), // G101 RuleSelector::rule(Rule::LoggingExcInfo), // G201 RuleSelector::rule(Rule::LoggingRedundantExcInfo), // G202 RuleSelector::rule(Rule::UnsortedImports), // I001 RuleSelector::rule(Rule::FStringInGetTextFuncCall), // INT001 RuleSelector::rule(Rule::FormatInGetTextFuncCall), // INT002 RuleSelector::rule(Rule::PrintfInGetTextFuncCall), // INT003 RuleSelector::rule(Rule::ImplicitStringConcatenationInCollectionLiteral), // ISC004 RuleSelector::rule(Rule::DirectLoggerInstantiation), // LOG001 RuleSelector::rule(Rule::InvalidGetLoggerArgument), // LOG002 RuleSelector::rule(Rule::UndocumentedWarn), // LOG009 RuleSelector::rule(Rule::ExcInfoOutsideExceptHandler), // LOG014 RuleSelector::rule(Rule::RootLoggerCall), // LOG015 RuleSelector::rule(Rule::InvalidModuleName), // N999 RuleSelector::rule(Rule::UnnecessaryListCast), // PERF101 RuleSelector::rule(Rule::IncorrectDictIterator), // PERF102 RuleSelector::rule(Rule::ManualListCopy), // PERF402 RuleSelector::rule(Rule::InvalidMockAccess), // PGH005 RuleSelector::rule(Rule::UnnecessaryPlaceholder), // PIE790 RuleSelector::rule(Rule::DuplicateClassFieldDefinition), // PIE794 RuleSelector::rule(Rule::NonUniqueEnums), // PIE796 RuleSelector::rule(Rule::UnnecessarySpread), // PIE800 RuleSelector::rule(Rule::UnnecessaryDictKwargs), // PIE804 RuleSelector::rule(Rule::ReimplementedContainerBuiltin), // PIE807 RuleSelector::rule(Rule::UnnecessaryRangeStart), // PIE808 RuleSelector::rule(Rule::MultipleStartsEndsWith), // PIE810 RuleSelector::rule(Rule::TypeNameIncorrectVariance), // PLC0105 RuleSelector::rule(Rule::TypeBivariance), // PLC0131 RuleSelector::rule(Rule::TypeParamNameMismatch), // PLC0132 RuleSelector::rule(Rule::SingleStringSlots), // PLC0205 RuleSelector::rule(Rule::DictIndexMissingItems), // PLC0206 RuleSelector::rule(Rule::IterationOverSet), // PLC0208 RuleSelector::rule(Rule::UselessImportAlias), // PLC0414 RuleSelector::rule(Rule::UnnecessaryDirectLambdaCall), // PLC3002 RuleSelector::rule(Rule::YieldInInit), // PLE0100 RuleSelector::rule(Rule::ReturnInInit), // PLE0101 RuleSelector::rule(Rule::NonlocalAndGlobal), // PLE0115 RuleSelector::rule(Rule::ContinueInFinally), // PLE0116 RuleSelector::rule(Rule::NonlocalWithoutBinding), // PLE0117 RuleSelector::rule(Rule::LoadBeforeGlobalDeclaration), // PLE0118 RuleSelector::rule(Rule::InvalidLengthReturnType), // PLE0303 RuleSelector::rule(Rule::InvalidBoolReturnType), // PLE0304 RuleSelector::rule(Rule::InvalidIndexReturnType), // PLE0305 RuleSelector::rule(Rule::InvalidStrReturnType), // PLE0307 RuleSelector::rule(Rule::InvalidBytesReturnType), // PLE0308 RuleSelector::rule(Rule::InvalidHashReturnType), // PLE0309 RuleSelector::rule(Rule::InvalidAllObject), // PLE0604 RuleSelector::rule(Rule::InvalidAllFormat), // PLE0605 RuleSelector::rule(Rule::PotentialIndexError), // PLE0643 RuleSelector::rule(Rule::MisplacedBareRaise), // PLE0704 RuleSelector::rule(Rule::RepeatedKeywordArgument), // PLE1132 RuleSelector::rule(Rule::AwaitOutsideAsync), // PLE1142 RuleSelector::rule(Rule::LoggingTooManyArgs), // PLE1205 RuleSelector::rule(Rule::LoggingTooFewArgs), // PLE1206 RuleSelector::rule(Rule::BadStringFormatCharacter), // PLE1300 RuleSelector::rule(Rule::BadStringFormatType), // PLE1307 RuleSelector::rule(Rule::BadStrStripCall), // PLE1310 RuleSelector::rule(Rule::InvalidEnvvarValue), // PLE1507 RuleSelector::rule(Rule::SingledispatchMethod), // PLE1519 RuleSelector::rule(Rule::SingledispatchmethodFunction), // PLE1520 RuleSelector::rule(Rule::YieldFromInAsyncFunction), // PLE1700 RuleSelector::rule(Rule::BidirectionalUnicode), // PLE2502 RuleSelector::rule(Rule::InvalidCharacterBackspace), // PLE2510 RuleSelector::rule(Rule::InvalidCharacterSub), // PLE2512 RuleSelector::rule(Rule::InvalidCharacterEsc), // PLE2513 RuleSelector::rule(Rule::InvalidCharacterNul), // PLE2514 RuleSelector::rule(Rule::InvalidCharacterZeroWidthSpace), // PLE2515 RuleSelector::rule(Rule::ComparisonWithItself), // PLR0124 RuleSelector::rule(Rule::ComparisonOfConstant), // PLR0133 RuleSelector::rule(Rule::PropertyWithParameters), // PLR0206 RuleSelector::rule(Rule::ManualFromImport), // PLR0402 RuleSelector::rule(Rule::RedefinedArgumentFromLocal), // PLR1704 RuleSelector::rule(Rule::StopIterationReturn), // PLR1708 RuleSelector::rule(Rule::UselessReturn), // PLR1711 RuleSelector::rule(Rule::BooleanChainedComparison), // PLR1716 RuleSelector::rule(Rule::SysExitAlias), // PLR1722 RuleSelector::rule(Rule::IfStmtMinMax), // PLR1730 RuleSelector::rule(Rule::UnnecessaryDictIndexLookup), // PLR1733 RuleSelector::rule(Rule::UnnecessaryListIndexLookup), // PLR1736 RuleSelector::rule(Rule::EmptyComment), // PLR2044 RuleSelector::rule(Rule::UselessElseOnLoop), // PLW0120 RuleSelector::rule(Rule::SelfAssigningVariable), // PLW0127 RuleSelector::rule(Rule::RedeclaredAssignedName), // PLW0128 RuleSelector::rule(Rule::AssertOnStringLiteral), // PLW0129 RuleSelector::rule(Rule::NamedExprWithoutContext), // PLW0131 RuleSelector::rule(Rule::UselessExceptionStatement), // PLW0133 RuleSelector::rule(Rule::NanComparison), // PLW0177 RuleSelector::rule(Rule::BadStaticmethodArgument), // PLW0211 RuleSelector::rule(Rule::SuperWithoutBrackets), // PLW0245 RuleSelector::rule(Rule::ImportSelf), // PLW0406 RuleSelector::rule(Rule::GlobalVariableNotAssigned), // PLW0602 RuleSelector::rule(Rule::GlobalAtModuleLevel), // PLW0604 RuleSelector::rule(Rule::SelfOrClsAssignment), // PLW0642 RuleSelector::rule(Rule::BinaryOpException), // PLW0711 RuleSelector::rule(Rule::BadOpenMode), // PLW1501 RuleSelector::rule(Rule::ShallowCopyEnviron), // PLW1507 RuleSelector::rule(Rule::InvalidEnvvarDefault), // PLW1508 RuleSelector::rule(Rule::SubprocessPopenPreexecFn), // PLW1509 RuleSelector::rule(Rule::SubprocessRunWithoutCheck), // PLW1510 RuleSelector::rule(Rule::UselessWithLock), // PLW2101 RuleSelector::rule(Rule::PytestRaisesWithoutException), // PT010 RuleSelector::rule(Rule::PytestDuplicateParametrizeTestCases), // PT014 RuleSelector::rule(Rule::PytestDeprecatedYieldFixture), // PT020 RuleSelector::rule(Rule::PytestErroneousUseFixturesOnFixture), // PT025 RuleSelector::rule(Rule::PytestUseFixturesWithoutParameters), // PT026 RuleSelector::rule(Rule::PytestWarnsWithMultipleStatements), // PT031 RuleSelector::rule(Rule::PyPath), // PTH124 RuleSelector::rule(Rule::InvalidPathlibWithSuffix), // PTH210 RuleSelector::rule(Rule::UnprefixedTypeParam), // PYI001 RuleSelector::rule(Rule::ComplexIfStatementInStub), // PYI002 RuleSelector::rule(Rule::UnrecognizedVersionInfoCheck), // PYI003 RuleSelector::rule(Rule::PatchVersionComparison), // PYI004 RuleSelector::rule(Rule::WrongTupleLengthVersionComparison), // PYI005 RuleSelector::rule(Rule::BadVersionInfoComparison), // PYI006 RuleSelector::rule(Rule::UnrecognizedPlatformCheck), // PYI007 RuleSelector::rule(Rule::UnrecognizedPlatformName), // PYI008 RuleSelector::rule(Rule::PassStatementStubBody), // PYI009 RuleSelector::rule(Rule::NonEmptyStubBody), // PYI010 RuleSelector::rule(Rule::PassInClassBody), // PYI012 RuleSelector::rule(Rule::EllipsisInNonEmptyClassBody), // PYI013 RuleSelector::rule(Rule::AssignmentDefaultInStub), // PYI015 RuleSelector::rule(Rule::DuplicateUnionMember), // PYI016 RuleSelector::rule(Rule::ComplexAssignmentInStub), // PYI017 RuleSelector::rule(Rule::UnusedPrivateTypeVar), // PYI018 RuleSelector::rule(Rule::CustomTypeVarForSelf), // PYI019 RuleSelector::rule(Rule::QuotedAnnotationInStub), // PYI020 RuleSelector::rule(Rule::UnaliasedCollectionsAbcSetImport), // PYI025 RuleSelector::rule(Rule::TypeAliasWithoutAnnotation), // PYI026 RuleSelector::rule(Rule::StrOrReprDefinedInStub), // PYI029 RuleSelector::rule(Rule::UnnecessaryLiteralUnion), // PYI030 RuleSelector::rule(Rule::AnyEqNeAnnotation), // PYI032 RuleSelector::rule(Rule::LegacyTypeComment), // PYI033 RuleSelector::rule(Rule::NonSelfReturnType), // PYI034 RuleSelector::rule(Rule::UnassignedSpecialVariableInStub), // PYI035 RuleSelector::rule(Rule::BadExitAnnotation), // PYI036 RuleSelector::rule(Rule::RedundantNumericUnion), // PYI041 RuleSelector::rule(Rule::SnakeCaseTypeAlias), // PYI042 RuleSelector::rule(Rule::TSuffixedTypeAlias), // PYI043 RuleSelector::rule(Rule::FutureAnnotationsInStub), // PYI044 RuleSelector::rule(Rule::IterMethodReturnIterable), // PYI045 RuleSelector::rule(Rule::UnusedPrivateProtocol), // PYI046 RuleSelector::rule(Rule::UnusedPrivateTypeAlias), // PYI047 RuleSelector::rule(Rule::StubBodyMultipleStatements), // PYI048 RuleSelector::rule(Rule::UnusedPrivateTypedDict), // PYI049 RuleSelector::rule(Rule::NoReturnArgumentAnnotationInStub), // PYI050 RuleSelector::rule(Rule::UnannotatedAssignmentInStub), // PYI052 RuleSelector::rule(Rule::UnnecessaryTypeUnion), // PYI055 RuleSelector::rule(Rule::ByteStringUsage), // PYI057 RuleSelector::rule(Rule::GeneratorReturnFromIterMethod), // PYI058 RuleSelector::rule(Rule::GenericNotLastBaseClass), // PYI059 RuleSelector::rule(Rule::RedundantNoneLiteral), // PYI061 RuleSelector::rule(Rule::DuplicateLiteralMember), // PYI062 RuleSelector::rule(Rule::Pep484StylePositionalOnlyParameter), // PYI063 RuleSelector::rule(Rule::RedundantFinalLiteral), // PYI064 RuleSelector::rule(Rule::BadVersionInfoOrder), // PYI066 RuleSelector::rule(Rule::UnnecessaryReturnNone), // RET501 RuleSelector::rule(Rule::ZipInsteadOfPairwise), // RUF007 RuleSelector::rule(Rule::MutableDataclassDefault), // RUF008 RuleSelector::rule(Rule::FunctionCallInDataclassDefaultArgument), // RUF009 RuleSelector::rule(Rule::ExplicitFStringTypeConversion), // RUF010 RuleSelector::rule(Rule::MutableClassDefault), // RUF012 RuleSelector::rule(Rule::ImplicitOptional), // RUF013 RuleSelector::rule(Rule::UnnecessaryIterableAllocationForFirstElement), // RUF015 RuleSelector::rule(Rule::InvalidIndexType), // RUF016 RuleSelector::rule(Rule::QuadraticListSummation), // RUF017 RuleSelector::rule(Rule::AssignmentInAssert), // RUF018 RuleSelector::rule(Rule::UnnecessaryKeyCheck), // RUF019 RuleSelector::rule(Rule::NeverUnion), // RUF020 RuleSelector::rule(Rule::UnsortedDunderAll), // RUF022 RuleSelector::rule(Rule::UnsortedDunderSlots), // RUF023 RuleSelector::rule(Rule::MutableFromkeysValue), // RUF024 RuleSelector::rule(Rule::DefaultFactoryKwarg), // RUF026 RuleSelector::rule(Rule::InvalidFormatterSuppressionComment), // RUF028 RuleSelector::rule(Rule::AssertWithPrintMessage), // RUF030 RuleSelector::rule(Rule::DecimalFromFloatLiteral), // RUF032 RuleSelector::rule(Rule::PostInitDefault), // RUF033 RuleSelector::rule(Rule::UselessIfElse), // RUF034 RuleSelector::rule(Rule::InvalidAssertMessageLiteralArgument), // RUF040 RuleSelector::rule(Rule::UnnecessaryNestedLiteral), // RUF041 RuleSelector::rule(Rule::UnnecessaryCastToInt), // RUF046 RuleSelector::rule(Rule::MapIntVersionParsing), // RUF048 RuleSelector::rule(Rule::DataclassEnum), // RUF049 RuleSelector::rule(Rule::IfKeyInDictDel), // RUF051 RuleSelector::rule(Rule::ClassWithMixedTypeVars), // RUF053 RuleSelector::rule(Rule::UnnecessaryRound), // RUF057 RuleSelector::rule(Rule::StarmapZip), // RUF058 RuleSelector::rule(Rule::UnusedUnpackedVariable), // RUF059 RuleSelector::rule(Rule::AccessAnnotationsFromClassDict), // RUF063 RuleSelector::rule(Rule::DuplicateEntryInDunderAll), // RUF068 RuleSelector::rule(Rule::UnusedNOQA), // RUF100 RuleSelector::rule(Rule::RedirectedNOQA), // RUF101 RuleSelector::rule(Rule::InvalidPyprojectToml), // RUF200 RuleSelector::rule(Rule::ExecBuiltin), // S102 RuleSelector::rule(Rule::TryExceptPass), // S110 RuleSelector::rule(Rule::TryExceptContinue), // S112 RuleSelector::rule(Rule::DuplicateIsinstanceCall), // SIM101 RuleSelector::rule(Rule::CollapsibleIf), // SIM102 RuleSelector::rule(Rule::NeedlessBool), // SIM103 RuleSelector::rule(Rule::ReturnInTryExceptFinally), // SIM107 RuleSelector::rule(Rule::EnumerateForLoop), // SIM113 RuleSelector::rule(Rule::IfWithSameArms), // SIM114 RuleSelector::rule(Rule::OpenFileWithContextHandler), // SIM115 RuleSelector::rule(Rule::MultipleWithStatements), // SIM117 RuleSelector::rule(Rule::InDictKeys), // SIM118 RuleSelector::rule(Rule::NegateEqualOp), // SIM201 RuleSelector::rule(Rule::NegateNotEqualOp), // SIM202 RuleSelector::rule(Rule::DoubleNegation), // SIM208 RuleSelector::rule(Rule::IfExprWithTrueFalse), // SIM210 RuleSelector::rule(Rule::IfExprWithFalseTrue), // SIM211 RuleSelector::rule(Rule::ExprAndNotExpr), // SIM220 RuleSelector::rule(Rule::ExprOrNotExpr), // SIM221 RuleSelector::rule(Rule::ExprOrTrue), // SIM222 RuleSelector::rule(Rule::ExprAndFalse), // SIM223 RuleSelector::rule(Rule::IfElseBlockInsteadOfDictGet), // SIM401 RuleSelector::rule(Rule::SplitStaticString), // SIM905 RuleSelector::rule(Rule::ZipDictKeysAndValues), // SIM911 RuleSelector::rule(Rule::Debugger), // T100 RuleSelector::rule(Rule::RuntimeImportInTypeCheckingBlock), // TC004 RuleSelector::rule(Rule::EmptyTypeCheckingBlock), // TC005 RuleSelector::rule(Rule::UnquotedTypeAlias), // TC007 RuleSelector::rule(Rule::RuntimeStringUnion), // TC010 RuleSelector::rule(Rule::RaiseVanillaClass), // TRY002 RuleSelector::rule(Rule::TypeCheckWithoutTypeError), // TRY004 RuleSelector::rule(Rule::VerboseRaise), // TRY201 RuleSelector::rule(Rule::UselessTryExcept), // TRY203 RuleSelector::rule(Rule::VerboseLogMessage), // TRY401 RuleSelector::rule(Rule::UselessMetaclassType), // UP001 RuleSelector::rule(Rule::TypeOfPrimitive), // UP003 RuleSelector::rule(Rule::UselessObjectInheritance), // UP004 RuleSelector::rule(Rule::DeprecatedUnittestAlias), // UP005 RuleSelector::rule(Rule::NonPEP585Annotation), // UP006 RuleSelector::rule(Rule::NonPEP604AnnotationUnion), // UP007 RuleSelector::rule(Rule::SuperCallWithParameters), // UP008 RuleSelector::rule(Rule::UTF8EncodingDeclaration), // UP009 RuleSelector::rule(Rule::UnnecessaryFutureImport), // UP010 RuleSelector::rule(Rule::LRUCacheWithoutParameters), // UP011 RuleSelector::rule(Rule::UnnecessaryEncodeUTF8), // UP012 RuleSelector::rule(Rule::ConvertNamedTupleFunctionalToClass), // UP014 RuleSelector::rule(Rule::DatetimeTimezoneUTC), // UP017 RuleSelector::rule(Rule::NativeLiterals), // UP018 RuleSelector::rule(Rule::TypingTextStrAlias), // UP019 RuleSelector::rule(Rule::OpenAlias), // UP020 RuleSelector::rule(Rule::ReplaceUniversalNewlines), // UP021 RuleSelector::rule(Rule::ReplaceStdoutStderr), // UP022 RuleSelector::rule(Rule::DeprecatedCElementTree), // UP023 RuleSelector::rule(Rule::OSErrorAlias), // UP024 RuleSelector::rule(Rule::UnicodeKindPrefix), // UP025 RuleSelector::rule(Rule::DeprecatedMockImport), // UP026 RuleSelector::rule(Rule::YieldInForLoop), // UP028 RuleSelector::rule(Rule::UnnecessaryBuiltinImport), // UP029 RuleSelector::rule(Rule::FormatLiterals), // UP030 RuleSelector::rule(Rule::PrintfStringFormatting), // UP031 RuleSelector::rule(Rule::FString), // UP032 RuleSelector::rule(Rule::LRUCacheWithMaxsizeNone), // UP033 RuleSelector::rule(Rule::ExtraneousParentheses), // UP034 RuleSelector::rule(Rule::DeprecatedImport), // UP035 RuleSelector::rule(Rule::OutdatedVersionBlock), // UP036 RuleSelector::rule(Rule::QuotedAnnotation), // UP037 RuleSelector::rule(Rule::UnnecessaryClassParentheses), // UP039 RuleSelector::rule(Rule::NonPEP695TypeAlias), // UP040 RuleSelector::rule(Rule::TimeoutErrorAlias), // UP041 RuleSelector::rule(Rule::UnnecessaryDefaultTypeArgs), // UP043 RuleSelector::rule(Rule::NonPEP646Unpack), // UP044 RuleSelector::rule(Rule::NonPEP604AnnotationOptional), // UP045 RuleSelector::rule(Rule::NonPEP695GenericClass), // UP046 RuleSelector::rule(Rule::NonPEP695GenericFunction), // UP047 RuleSelector::rule(Rule::PrivateTypeParameter), // UP049 RuleSelector::rule(Rule::UselessClassMetaclassType), // UP050 RuleSelector::rule(Rule::InvalidEscapeSequence), // W605 RuleSelector::rule(Rule::SysVersionSlice3), // YTT101 RuleSelector::rule(Rule::SysVersion2), // YTT102 RuleSelector::rule(Rule::SysVersionCmpStr3), // YTT103 RuleSelector::rule(Rule::SysVersionInfo0Eq3), // YTT201 RuleSelector::rule(Rule::SixPY3), // YTT202 RuleSelector::rule(Rule::SysVersionInfo1CmpInt), // YTT203 RuleSelector::rule(Rule::SysVersionInfoMinorCmpInt), // YTT204 RuleSelector::rule(Rule::SysVersion0), // YTT301 RuleSelector::rule(Rule::SysVersionCmpStr10), // YTT302 RuleSelector::rule(Rule::SysVersionSlice1), // YTT303 ];”; read 2026-10-20 · https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/settings/mod.rs § LinterSettings::new, rules selection — “rules: DEFAULT_SELECTORS .iter() .flat_map(|selector| selector.rules(&PreviewOptions::default())) .collect(),”; read 2026-10-20

## shellcheck-default-bash-checks

ShellCheck 0.11.0 checks Bash with its parser diagnostics and the default `Analytics` tree and node checks, `Commands` command checks and declaration expansions, `ControlFlow` checks, empty `Custom` checker and Bash-applicable `ShellSupport` checks as composed by `Analyzer.checkers`, with no optional checks enabled and all error, warning, info and style diagnostics included.

- **Source:** https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checker.hs § checkScript, parse and analysis message composition and inclusion — “let parseMessages = prComments result let tokenPositions = prTokenPositions result let analysisSpec root = as { asScript = root, asShellType = csShellTypeOverride spec, asFallbackShell = shellFromFilename $ csFilename spec, asCheckSourced = csCheckSourced spec, asExecutionMode = Executed, asTokenPositions = tokenPositions, asExtendedAnalysis = csExtendedAnalysis spec, asOptionalChecks = getEnableDirectives root ++ csOptionalChecks spec } where as = newAnalysisSpec root let analysisMessages = maybe [] (arComments . analyzeScript . analysisSpec) $ prRoot result let translator = tokenToPosition tokenPositions return . nub . sortMessages . filter shouldInclude $ (parseMessages ++ map translator analysisMessages) shouldInclude pc = severity <= csMinSeverity spec && case csIncludedWarnings spec of Nothing -> code `notElem` csExcludedWarnings spec Just includedWarnings -> code `elem` includedWarnings where code = cCode (pcComment pc) severity = cSeverity (pcComment pc)”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Analyzer.hs § checkers, complete default checker modules — “checkers spec params = mconcat $ map ($ params) [ ShellCheck.Analytics.checker spec, ShellCheck.Checks.Commands.checker spec, ShellCheck.Checks.ControlFlow.checker spec, ShellCheck.Checks.Custom.checker, ShellCheck.Checks.ShellSupport.checker ]”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Analytics.hs § treeChecks, complete list — “treeChecks = [ nodeChecksToTreeCheck nodeChecks ,subshellAssignmentCheck ,checkQuotesInLiterals ,checkShebangParameters ,checkFunctionsUsedExternally ,checkUnusedAssignments ,checkUnpassedInFunctions ,checkArrayWithoutIndex ,checkShebang ,checkUnassignedReferences ,checkUncheckedCdPushdPopd ,checkArrayAssignmentIndices ,checkUseBeforeDefinition ,checkAliasUsedInSameParsingUnit ,checkArrayValueUsedAsIndex ]”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Analytics.hs § nodeChecks, complete list — “nodeChecks = [ checkPipePitfalls ,checkForInQuoted ,checkForInLs ,checkShorthandIf ,checkDollarStar ,checkUnquotedDollarAt ,checkStderrRedirect ,checkUnquotedN ,checkNumberComparisons ,checkSingleBracketOperators ,checkDoubleBracketOperators ,checkLiteralBreakingTest ,checkConstantNullary ,checkDivBeforeMult ,checkArithmeticDeref ,checkArithmeticBadOctal ,checkComparisonAgainstGlob ,checkCaseAgainstGlob ,checkCommarrays ,checkOrNeq ,checkAndEq ,checkEchoWc ,checkConstantIfs ,checkPipedAssignment ,checkAssignAteCommand ,checkUuoeVar ,checkQuotedCondRegex ,checkForInCat ,checkFindExec ,checkValidCondOps ,checkGlobbedRegex ,checkTestRedirects ,checkBadParameterSubstitution ,checkPS1Assignments ,checkBackticks ,checkInexplicablyUnquoted ,checkTildeInQuotes ,checkLonelyDotDash ,checkSpuriousExec ,checkSpuriousExpansion ,checkDollarBrackets ,checkSshHereDoc ,checkGlobsAsOptions ,checkWhileReadPitfalls ,checkArithmeticOpCommand ,checkCharRangeGlob ,checkUnquotedExpansions ,checkSingleQuotedVariables ,checkRedirectToSame ,checkPrefixAssignmentReference ,checkLoopKeywordScope ,checkCdAndBack ,checkWrongArithmeticAssignment ,checkConditionalAndOrs ,checkFunctionDeclarations ,checkStderrPipe ,checkOverridingPath ,checkArrayAsString ,checkUnsupported ,checkMultipleAppends ,checkSuspiciousIFS ,checkShouldUseGrepQ ,checkTestArgumentSplitting ,checkConcatenatedDollarAt ,checkTildeInPath ,checkReadWithoutR ,checkLoopVariableReassignment ,checkTrailingBracket ,checkReturnAgainstZero ,checkRedirectedNowhere ,checkUnmatchableCases ,checkSubshellAsTest ,checkSplittingInArrays ,checkRedirectionToNumber ,checkGlobAsCommand ,checkFlagAsCommand ,checkEmptyCondition ,checkPipeToNowhere ,checkForLoopGlobVariables ,checkSubshelledTests ,checkRedirectionToCommand ,checkDollarQuoteParen ,checkUselessBang ,checkTranslatedStringVariable ,checkModifiedArithmeticInRedirection ,checkBlatantRecursion ,checkBadTestAndOr ,checkAssignToSelf ,checkEqualsInCommand ,checkSecondArgIsComparison ,checkComparisonWithLeadingX ,checkCommandWithTrailingSymbol ,checkUnquotedParameterExpansionPattern ,checkBatsTestDoesNotUseNegation ,checkCommandIsUnreachable ,checkSpacefulnessCfg ,checkOverwrittenExitCode ,checkUnnecessaryArithmeticExpansionIndex ,checkUnnecessaryParens ,checkPlusEqualsNumber ,checkExpansionWithRedirection ,checkUnaryTestA ]”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Analytics.hs § mkChecker, default and optional selection — “mkChecker spec params checks = Checker { perScript = \(Root root) -> do tell $ concatMap (\f -> f params root) all, perToken = const $ return () } where all = checks ++ optionals optionalKeys = asOptionalChecks spec optionals = if "all" `elem` optionalKeys then map snd optionalTreeChecks else mapMaybe (\c -> Map.lookup c optionalCheckMap) optionalKeys”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/Commands.hs § commandChecks, complete list and declaration expansions — “commandChecks = [ checkTr ,checkFindNameGlob ,checkExpr ,checkGrepRe ,checkTrapQuotes ,checkReturn ,checkExit ,checkFindExecWithSingleArgument ,checkUnusedEchoEscapes ,checkInjectableFindSh ,checkFindActionPrecedence ,checkMkdirDashPM ,checkNonportableSignals ,checkInteractiveSu ,checkSshCommandString ,checkPrintfVar ,checkUuoeCmd ,checkSetAssignment ,checkExportedExpansions ,checkAliasesUsesArgs ,checkAliasesExpandEarly ,checkUnsetGlobs ,checkFindWithoutPath ,checkTimeParameters ,checkTimedCommand ,checkLocalScope ,checkDeprecatedTempfile ,checkDeprecatedEgrep ,checkDeprecatedFgrep ,checkWhileGetoptsCase ,checkCatastrophicRm ,checkLetUsage ,checkMvArguments, checkCpArguments, checkLnArguments ,checkFindRedirections ,checkReadExpansions ,checkSudoRedirect ,checkSudoArgs ,checkSourceArgs ,checkChmodDashr ,checkXargsDashi ,checkUnquotedEchoSpaces ,checkEvalArray ] ++ map checkArgComparison ("alias" : declaringCommands) ++ map checkMaskedReturns declaringCommands ++ map checkMultipleDeclaring declaringCommands ++ map checkBackreferencingDeclaration declaringCommands”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/ControlFlow.hs § controlFlowChecks, node and effect list composition — “controlFlowChecks = [ runNodeChecks controlFlowNodeChecks ] controlFlowNodeChecks :: [ControlFlowNodeCheck] controlFlowNodeChecks = [ runEffectChecks controlFlowEffectChecks ] controlFlowEffectChecks :: [ControlFlowEffectCheck] controlFlowEffectChecks = [ ]”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/Custom.hs § checker, empty site-specific checks — “checker params = Checker { perScript = const $ return (), perToken = const $ return () }”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Checks/ShellSupport.hs § checks, complete shell-conditioned list — “checks = [ checkForDecimals ,checkBashisms ,checkEchoSed ,checkBraceExpansionVars ,checkMultiDimensionalArrays ,checkPS1Assignments ,checkMultipleBangs ,checkBangAfterPipe ,checkNegatedUnaryOps ]”; read 2026-10-20 · https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Interface.hs § emptyCheckSpec, default options — “emptyCheckSpec = CheckSpec { csFilename = "", csScript = "", csCheckSourced = False, csIgnoreRC = False, csExcludedWarnings = [], csIncludedWarnings = Nothing, csShellTypeOverride = Nothing, csMinSeverity = StyleC, csExtendedAnalysis = Nothing, csOptionalChecks = [] }”; read 2026-10-20

## wcag-text-contrast

WCAG 2.2 success criterion 1.4.3 Contrast (Minimum), of level AA, requires the visual presentation of text and images of text to have a contrast ratio of at least 4.5:1, except large-scale text and images of it, which take at least 3:1, and text or images of text that are part of an inactive user interface component, pure decoration, not visible to anyone, part of a picture that contains significant other visual content, or part of a logo or brand name, which have no contrast requirement.

- **Source:** https://www.w3.org/TR/2024/REC-WCAG22-20241212/ § 1.4.3 Contrast (Minimum) — "(Level AA)" · "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:" · § 1.4.3 Contrast (Minimum), Large Text — "Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;" · § 1.4.3 Contrast (Minimum), Incidental — "Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement." · § 1.4.3 Contrast (Minimum), Logotypes — "Text that is part of a logo or brand name has no contrast requirement."; read 2026-10-23

## wcag-non-text-contrast

WCAG 2.2 success criterion 1.4.11 Non-text Contrast, of level AA, requires the visual information needed to identify user interface components and their states, except for inactive components and components whose appearance the user agent determines and the author does not modify, and the parts of graphics needed to understand the content, except where a particular presentation of graphics is essential to the information conveyed, to have a contrast ratio of at least 3:1 against adjacent colours.

- **Source:** https://www.w3.org/TR/2024/REC-WCAG22-20241212/ § 1.4.11 Non-text Contrast — "(Level AA)" · "The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):" · § 1.4.11 Non-text Contrast, User Interface Components — "Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;" · § 1.4.11 Non-text Contrast, Graphical Objects — "Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed."; read 2026-10-23

## wcag-focus-visible

WCAG 2.2 success criterion 2.4.7 Focus Visible, of level AA, requires any keyboard operable user interface to have a mode of operation in which the keyboard focus indicator is visible.

- **Source:** https://www.w3.org/TR/2024/REC-WCAG22-20241212/ § 2.4.7 Focus Visible — "(Level AA)" · "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible."; read 2026-10-23

## wcag-three-flashes

WCAG 2.2 success criterion 2.3.1 Three Flashes or Below Threshold, of level A, requires web pages to contain nothing that flashes more than three times in any one second period, unless the flash is below the general flash and red flash thresholds.

- **Source:** https://www.w3.org/TR/2024/REC-WCAG22-20241212/ § 2.3.1 Three Flashes or Below Threshold — "(Level A)" · "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds."; read 2026-11-12

## wcag-contrast-ratio

WCAG 2.2 defines the contrast ratio of two colours as (L1 + 0.05) / (L2 + 0.05), L1 and L2 being the relative luminances of the lighter and of the darker colour, and the relative luminance of an sRGB colour as 0.2126 R + 0.7152 G + 0.0722 B, where each of R, G and B is, for the quotient q of its 8-bit component by 255, q / 12.92 where q is at most 0.04045 and ((q + 0.055) / 1.055) raised to the power 2.4 otherwise.

- **Source:** https://www.w3.org/TR/2024/REC-WCAG22-20241212/ § Glossary, contrast ratio — "(L1 + 0.05) / (L2 + 0.05), where" · "L1 is the relative luminance of the lighter of the colors, and" · "L2 is the relative luminance of the darker of the colors." · § Glossary, relative luminance, Note 1 — "For the sRGB colorspace, the relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:" · "if RsRGB <= 0.04045 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4" · "if GsRGB <= 0.04045 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4" · "if BsRGB <= 0.04045 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4" · "RsRGB = R8bit/255" · "GsRGB = G8bit/255" · "BsRGB = B8bit/255" · "The "^" character is the exponentiation operator. (Formula taken from [SRGB].)"; read 2026-10-23

## geist-licence

The vercel/geist-font repository licenses its font software, Geist Sans and Geist Mono among it, under the SIL Open Font License, Version 1.1.

- **Source:** https://raw.githubusercontent.com/vercel/geist-font/1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4/readme.md § second heading — "Geist Sans, Geist Mono & Geist Pixel" · § License — "This Font Software is licensed under the SIL Open Font License, Version 1.1."; read 2026-10-23

## css-colour-values

CSS Color Module Level 4 represents a colour in CSS by the `<color>` type — a hexadecimal colour, a colour function, a named colour, `transparent`, `currentColor` or a system colour — its named colours of section 6.1 and its system colours of section 6.2 being keywords matched without regard to ASCII case, and user agents also support the deprecated system colours of its Appendix A.

- **Source:** https://www.w3.org/TR/2026/CRD-css-color-4-20261022/ § 4.1 The <color> syntax — "Colors in CSS are represented by the <color> type:" · "<color> = <color-base> | currentColor | <system-color> <color-base> = <hex-color> | <color-function> | <named-color> | transparent <color-function> = <rgb()> | <rgba()> | <hsl()> | <hsla()> | <hwb()> | <lab()> | <lch()> | <oklab()> | <oklch()> | <color()>" · § 6.1 Named Colors — "CSS defines a large set of named colors, so that common colors can be written and read more easily. A <named-color> is written as an <ident>, accepted anywhere a <color> is. As usual for CSS-defined <ident>s, all of these keywords are ASCII case-insensitive." · § 6.2 System Colors — "The <system-color> keywords are defined as follows:" · "Note: As with all other keywords, these names are ASCII case-insensitive. They are shown here with mixed capitalization for legibility." · § Appendix A: Deprecated CSS System Colors — "Earlier versions of CSS defined several additional system colors." · "User agents must support these keywords, and to mitigate fingerprinting must map them to the (undeprecated) system colors as listed below. Authors must not use these keywords."; read 2026-10-23

## css-font-family-names

CSS Fonts Module Level 4 gives the property `font-family` a list of font family names and generic family names, the generic family keywords being `serif`, `sans-serif`, `system-ui`, `cursive`, `fantasy`, `math`, `monospace`, `ui-serif`, `ui-sans-serif`, `ui-monospace` and `ui-rounded` and the functions `generic(fangsong)`, `generic(kai)`, `generic(khmer-mul)` and `generic(nastaliq)`, and it requires a font family name that is the same as such a keyword or as a CSS-wide keyword to be quoted, user agents not taking those keywords as a font family name.

- **Source:** https://www.w3.org/TR/2026/WD-css-fonts-4-20261022/ § 2.1 Font family: the font-family property — "This property specifies a prioritized list of font family names or generic family names." · § 2.1.1 Syntax of <font-family-name> — "Font family names that happen to be the same as a font-family keyword value (e.g. CSS-wide keywords such as inherit, or <generic-font-family> keywords such as serif) must be quoted to prevent confusion with the keywords of the same names. UAs must not consider these keywords as matching the <font-family-name> type." · § 2.1.2 Syntax of <generic-font-family> — "<generic-font-family> = <generic-font-script-specific>| <generic-font-complete> | <generic-font-incomplete> <generic-font-script-specific> = generic(fangsong) | generic(kai) | generic(khmer-mul) | generic(nastaliq) <generic-font-complete> = serif | sans-serif | system-ui | cursive | fantasy | math | monospace <generic-font-incomplete> = ui-serif | ui-sans-serif | ui-monospace | ui-rounded"; read 2026-10-23

## css-wide-keywords

CSS Cascading and Inheritance Level 5 defines five CSS-wide property values, the keywords `initial`, `inherit`, `unset`, `revert` and `revert-layer`, which all CSS properties can accept.

- **Source:** https://www.w3.org/TR/2022/CR-css-cascade-5-20220113/ § 7.3 Explicit Defaulting — "Several CSS-wide property values are defined below; declaring a property to have these values explicitly specifies a particular defaulting behavior. As specified in CSS Values and Units [css-values-3], all CSS properties can accept these values." · § 7.3.1 — "Resetting a Property: the initial keyword" · § 7.3.2 — "Explicit Inheritance: the inherit keyword" · § 7.3.3 — "Erasing All Declarations: the unset keyword" · § 7.3.4 — "Rolling Back Cascade Origins: the revert keyword" · § 7.3.5 — "Rolling Back Cascade Layers: the revert-layer keyword"; read 2026-10-23

## node-listen-port-zero

A Node.js `net` server told to listen on port 0 gets from the operating system an arbitrary unused port.

- **Source:** https://nodejs.org/download/release/v24.17.0/docs/api/net.html § Class: net.Server, server.listen([port[, host[, backlog]]][, callback]) — "If port is omitted or is 0, the operating system will assign an arbitrary unused port, which can be retrieved by using server.address().port after the 'listening' event has been emitted."; read 2026-10-23

## cloudflare-tunnel-transport

Cloudflare Tunnel connects an origin to Cloudflare through an outbound encrypted connection without an inbound public port.

- **Source:** https://raw.githubusercontent.com/cloudflare/cloudflare-docs/1603d9d13a2889c5792a287f2452440594fac225/src/content/docs/tunnel/index.mdx § Overview — "Cloudflare Tunnel connects your infrastructure to Cloudflare through an outbound-only, post-quantum encrypted connection." · § Overview — "No open inbound ports."; read 2026-10-26

## cloudflare-tunnel-token-file

Cloudflared can run a remotely managed tunnel using a token file from version 2025.4.0 onward.

- **Source:** https://raw.githubusercontent.com/cloudflare/cloudflare-docs/1603d9d13a2889c5792a287f2452440594fac225/src/content/partials/cloudflare-one/tunnel/run-parameters.mdx § token-file — "For remotely-managed tunnels only. Requires 2025.4.0 or later." · § token-file, Syntax — "cloudflared tunnel run --token-file <PATH>"; read 2026-10-26

## cloudflared-image-identity

The official cloudflared 2026.10.4 image runs as user and group 65532 and starts cloudflared with automatic updating disabled.

- **Source:** https://raw.githubusercontent.com/cloudflare/cloudflared/dc3b264da64a801bc3a8d5301a6db21401910ad5/Dockerfile § final stage — "USER 65532:65532" · § final stage — "ENTRYPOINT [\"cloudflared\", \"--no-autoupdate\"]"; read 2026-10-26

## cloudflared-connection-readiness

Cloudflared 2026.10.4's readiness endpoint returns HTTP 200 only when at least one edge connection is active, and its ready command fails for any other status.

- **Source:** https://raw.githubusercontent.com/cloudflare/cloudflared/dc3b264da64a801bc3a8d5301a6db21401910ad5/metrics/readiness.go § makeResponse — "readyConnections = rs.tracker.CountActiveConns()" · § makeResponse — "if readyConnections > 0"; read 2026-10-26 · https://raw.githubusercontent.com/cloudflare/cloudflared/dc3b264da64a801bc3a8d5301a6db21401910ad5/cmd/cloudflared/tunnel/subcommands.go § readyCommand — "if res.StatusCode != 200"; read 2026-10-26

## compose-file-secret-permissions

Compose mounts a service's short-syntax secret read-only under `/run/secrets/`, and file-backed secrets retain host permissions because Compose does not implement their uid, gid and mode remapping.

- **Source:** https://raw.githubusercontent.com/compose-spec/compose-spec/3a4a6995e4a971f6173dff9130cb3e38e6738651/container_spec.md § secrets, Short syntax — "mounts it as read-only to /run/secrets/<secret_name>" · § secrets, Long syntax, Note — "The uid, gid, and mode attributes are not implemented in Docker Compose"; read 2026-10-26

## mikrus-tunnel-outbound-tcp

The test server host establishes an IPv4 TCP connection to `region1.v2.argotunnel.com` on port 7844; this observation establishes neither UDP nor container connectivity.

- **Source:** reading: `timeout 8 curl -4 -v --connect-timeout 5 -o /dev/null telnet://region1.v2.argotunnel.com:7844` on the test server's host, curl, whose version no reading the skill allows prints — "*   Trying 198.41.192.167:7844..." · "* Connected to region1.v2.argotunnel.com (198.41.192.167) port 7844 (#0)"; run 2026-11-14

## stryker-simulation-execution

StrykerJS 10.0.0 supports `node:test` through its TAP runner and runs `buildCommand` once during sandbox initialization on instrumented files whose type checking it disables with `// @ts-nocheck`.

- **Source:** https://raw.githubusercontent.com/stryker-mutator/stryker-js/cb3bd8fe25d5215422c9b632357062d3a43fcf92/docs/tap-runner.md § introduction — "A plugin to use test files producing TAP-output in StrykerJS." · § introduction, tip — "the build-in node test runner"; read 2026-10-26 · https://raw.githubusercontent.com/stryker-mutator/stryker-js/cb3bd8fe25d5215422c9b632357062d3a43fcf92/docs/configuration.md § disableTypeChecks — "Stryker disables type checking by inserting // @ts-nocheck atop those files"; read 2026-10-26 · https://raw.githubusercontent.com/stryker-mutator/stryker-js/cb3bd8fe25d5215422c9b632357062d3a43fcf92/packages/core/src/sandbox/sandbox.ts § init — "await this.fillSandbox(); await this.runBuildCommand(); await this.symlinkNodeModulesIfNeeded();"; read 2026-10-26

## typescript-nocheck-support

TypeScript 7.0.2 accepts TypeScript files marked `// @ts-nocheck` and emits JavaScript despite type errors in their source.

- **Source:** https://raw.githubusercontent.com/microsoft/typescript-go/2bd066d87f5bafd315be9f40889d0a60b9e58e0b/testdata/baselines/reference/submodule/conformance/tsNoCheckForTypescript.js § file.ts — "// @ts-nocheck" · § file.ts — "export const a = 1 + {};" · § file.js — "export const a = 1 + {};"; read 2026-10-26

## argon2-password-api

Argon2 0.45.1 generates a salt when none is supplied, returns an encoded hash by default with the selected parameters, and verifies an encoded hash using its stored parameters.

- **Source:** https://raw.githubusercontent.com/ranisalt/node-argon2/786de7152f95881b0683aea1d2ca60ed0d6d9e2f/argon2.cjs § hash — "const salt = _salt ?? (await generateSalt(16));" · § hash — "return serialize({" · § verify — "const { id, ...rest } = deserialize(digest);"; read 2026-10-26

## argon2-native-platform

Argon2 0.45.1 documents Node.js 22 or newer as its supported runtime and publishes prebuilt binaries tested on Ubuntu 22.04 x86-64, without certifying this product's target image.

- **Source:** https://raw.githubusercontent.com/ranisalt/node-argon2/786de7152f95881b0683aea1d2ca60ed0d6d9e2f/README.md § Before installing — "node-argon2 works only and is tested against Node >=22.0.0." · § Prebuilt binaries — "Ubuntu 22.04 (x86-64; ARM64 from v0.28.2; ARMv7 from v0.43.0)"; read 2026-10-26

## password-hash-work-factor

OWASP recommends Argon2id for password storage and experimentation on the application's actual servers to select a work factor.

- **Source:** https://raw.githubusercontent.com/OWASP/CheatSheetSeries/3c07d4aa45a33ffc6a68408621064942358dee61/cheatsheets/Password_Storage_Cheat_Sheet.md § Recommendations — "Use Argon2id" · § Using Work Factors — "Determining the optimal work factor will require experimentation on the specific server(s) used by the application."; read 2026-10-26

## express-session-store-contract

Express-session 1.19.0 keeps session data server-side, requires Store get, set and destroy callbacks, uses set to upsert a session, and recommends touch for idle expiry with an error callback, while its default MemoryStore is not intended for production.

- **Source:** https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/README.md § API — "Session data is stored server-side." · "not designed for a production environment." · § store.set — "upsert a session" · § store.touch — "callback(error)"; read 2026-10-27

## session-secret-rotation

Express-session 1.19.0 signs the session cookie with the first configured secret and verifies incoming signatures against each configured secret, allowing old keys to remain verification keys.

- **Source:** https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/index.js § session cookie response — "setcookie(res, name, req.sessionID, secrets[0], req.session.cookie.data)" · § unsigncookie — "for (var i = 0; i < secrets.length; i++) {" · "var result = signature.unsign(val, secrets[i]);"; read 2026-10-26

## node-sqlite-database

Node.js 24.21.0 exposes SQLite through the built-in node:sqlite module with synchronous DatabaseSync operations, a busy timeout, parameterizable prepared statements, explicit connection closing and an asynchronous `backup()` function that transmits a positive number of pages in each batch, 100 by default, that calls an optional `progress` callback after each backup step with the remaining and the total pages, and that restarts on mutations from other connections.

- **Source:** https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/sqlite.md § Class: DatabaseSync — "All APIs exposed by this class execute synchronously." · § new DatabaseSync, timeout — "The busy timeout in milliseconds." · § Class: StatementSync — "Prepared statements are parameterizable" · § database.close — "Closes the database connection." · § sqlite.backup(sourceDb, path[, options]) — "A promise that fulfills with the total number of backed-up pages upon completion, or rejects if an error occurs." · "Positive number of pages to be transmitted in each batch of the backup. Default: 100." · "An optional callback function that will be called after each backup step." · "with remainingPages and totalPages properties, describing the current progress of the backup operation." · "This method makes a database backup." · "However, mutations from other connections will cause the backup process to restart."; read 2026-10-31

## fetch-same-origin-credentials

Fetch includes eligible credentials by default for requests to the same origin, whereas cross-origin credential use needs additional browser and server configuration.

- **Source:** https://raw.githubusercontent.com/mdn/content/fe1d7fb9b67ce826c4a748ce00e7b35ac4a54c7f/files/en-us/web/api/fetch_api/using_fetch/index.md § Including credentials — "By default, credentials are only included in same-origin requests."; read 2026-10-26

## express-session-cookie-lifecycle

Express-session 1.19.0 renews a session by assigning its cookie's originalMaxAge to maxAge, computes expiry from the current time, and serializes the cookie through the cookie package.

- **Source:** https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/session/session.js § resetMaxAge — "this.cookie.maxAge = this.cookie.originalMaxAge;"; read 2026-10-27 · https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/session/cookie.js § maxAge setter — "new Date(Date.now() + ms)" · § serialize — "return cookie.serialize(name, val, this.data);"; read 2026-10-27

## cookie-serialization-validation

Cookie 0.7.2 rejects a nonempty domain or path outside its serializer's accepted syntax and rejects an invalid Date supplied as expiry.

- **Source:** https://raw.githubusercontent.com/jshttp/cookie/d19eaa1a2bb9ca43ac0951edd852ba4e88e410e0/index.js § serialize, domain — "if (!domainValueRegExp.test(opt.domain))" · § serialize, path — "if (!pathValueRegExp.test(opt.path))" · § serialize, expires — "if (!isDate(expires) || isNaN(expires.valueOf()))"; read 2026-10-27

## express-forwarded-protocol

Express 5.2.1 uses forwarded protocol only when its trust function accepts the immediate socket peer, and takes the first value from a comma-separated protocol header.

- **Source:** https://raw.githubusercontent.com/expressjs/express/dbac741a49a5a64336b70c06e85c2e2706e36336/lib/request.js § protocol getter — "if (!trust(this.socket.remoteAddress, 0)) { return proto; }" · "? header.substring(0, index).trim()"; read 2026-10-27

## session-proxy-security

Express-session 1.19.0 uses Express's secure-request assessment when its proxy option is unspecified, while an explicit true option reads forwarded protocol directly.

- **Source:** https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/index.js § issecure — "if (trustProxy !== true) { return req.secure === true }"; read 2026-10-27

## cloudflare-client-address

Cloudflare's CF-Connecting-IP carries the client address on ordinary edge-to-origin traffic, while Workers can affect that value and the Remove visitor IP headers transform can remove it.

- **Source:** https://raw.githubusercontent.com/cloudflare/cloudflare-docs/1603d9d13a2889c5792a287f2452440594fac225/src/content/docs/fundamentals/reference/http-headers.mdx § CF-Connecting-IP — "provides the client IP address" · "Remove visitor IP headers" · § CF-Connecting-IP in Worker subrequests — "can be altered"; read 2026-10-27

## cloudflare-forwarded-protocol

Cloudflare sets X-Forwarded-Proto to the client's protocol and overwrites a different value supplied by the client.

- **Source:** https://raw.githubusercontent.com/cloudflare/cloudflare-docs/1603d9d13a2889c5792a287f2452440594fac225/src/content/docs/fundamentals/reference/http-headers.mdx § X-Forwarded-Proto — "If the client set a different value, it will be overwritten."; read 2026-10-27

## cgroup-memory-accounting

Linux 5.15's memory controller counts the times a cgroup's memory usage was about to go over its limit — in cgroup v2 as `max` in `memory.events`, a count that includes the cgroup's descendants, and in cgroup v1 in `memory.failcnt` — and counts the cgroup's processes killed by any OOM killer as `oom_kill`, in v2's `memory.events` and in v1's `memory.oom_control`.

- **Source:** https://raw.githubusercontent.com/torvalds/linux/v5.15/Documentation/admin-guide/cgroup-v2.rst § Memory Interface Files, memory.events — "Note that all fields in this file are hierarchical" · § Memory Interface Files, memory.events, max — "The number of times the cgroup's memory usage was about to go over the max boundary." · § Memory Interface Files, memory.events, oom_kill — "The number of processes belonging to this cgroup killed by any kind of OOM killer."; read 2026-10-27 · https://raw.githubusercontent.com/torvalds/linux/v5.15/Documentation/admin-guide/cgroup-v1/memory.rst § 5.4 failcnt — "shows the number of times that a usage counter hit its limit" · § 10. OOM Control — "The number of processes belonging to this cgroup killed by any kind of OOM killer."; read 2026-10-27

## docker-volume-lifecycle

Docker keeps a volume's contents outside the lifecycle of the containers that use it, so a removed container leaves the data of its volume, and a volume no running container uses is not removed automatically.

- **Source:** https://raw.githubusercontent.com/docker/docs/62f6d26c183faf98fc8567f0b675f660f4e91ae6/content/manuals/engine/storage/volumes.md § A volume's lifecycle — "A volume's contents exist outside the lifecycle of a given container. When a container is destroyed, the writable layer is destroyed with it. Using a volume ensures that the data is persisted even if the container using it is removed." · "When no running container is using a volume, the volume is still available to Docker and isn't removed automatically."; read 2026-10-27

## fetch-origin-header

The Fetch Standard's HTTP-network-or-cache fetch gives a request whose method is neither `GET` nor `HEAD` an `Origin` header holding its serialized origin whenever its mode is `cors`, the mode a `Request` made from a URL string takes when none is given.

- **Source:** https://raw.githubusercontent.com/whatwg/fetch/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/fetch.bs § HTTP-network-or-cache fetch — "Append a request `Origin` header for httpRequest." · § `Origin` header, append a request `Origin` header — "Otherwise, if request's method is neither `GET` nor `HEAD`, then:" · "If request's mode is not "cors", then switch on request's referrer policy:" · "Append (`Origin`, serializedOrigin) to request's header list." · § Request class, new Request(input, init) — "Set fallbackMode to "cors"."; read 2026-10-27

## sqlite-wal-concurrency

In SQLite's write-ahead log mode, readers and a writer of one database run at the same time, and only one writer at a time writes to it.

- **Source:** https://www.sqlite.org/wal.html (archived: https://web.archive.org/web/20261027035005/https://www.sqlite.org/wal.html, 2026-10-27) § 2.2. Concurrency — "Because writers do nothing that would interfere with the actions of readers, writers and readers can run at the same time. However, since there is only one WAL file, there can only be one writer at a time."; read 2026-10-28

## mikrus-outsider-mail

Mikrus Outsider documents mailboxes for a user-owned domain configured with an MX record and `outsider.mikr.us` as the SMTP server.

- **Source:** https://wiki.mikr.us/outsider/ (archived: https://web.archive.org/web/20260921154835/https://wiki.mikr.us/outsider/, 2026-09-21) § Outsider — "Możesz założyć tam dowolną liczbę skrzynek pocztowych, a nawet dodać własną domenę do DNSa i nią zarządzać." · § Jak hostować pocztę na Outsiderze? — "Musisz posiadać własną domenę (nasza darmowa nie zadziała), a następnie w ustawieniach DNS u swojego dostawcy domen dodaj do domeny serwer MX o wartości (priorytet dowolny, może być np. 5):" · § Jak hostować pocztę na Outsiderze? — "Jako serwery IMAP, POP3, SMTP itp. podajesz po prostu outsider.mikr.us lub swoją darmową domenę *.mikr.dev."; read 2026-10-29

## nodemailer-require-tls

Nodemailer 10.2.1's SMTP connection with `requireTLS` set overrides `ignoreTLS` and `opportunisticTLS`, sends STARTTLS after EHLO whether or not the server announces it, and fails with an error instead of going on in plain text when EHLO fails, when the server refuses STARTTLS or when the TLS upgrade fails.

- **Source:** https://registry.npmjs.org/nodemailer/-/nodemailer-10.2.1.tgz § package/dist/cjs/smtp-connection/index.js, SMTPConnection options — "**requireTLS** - forces the client to use STARTTLS, takes precedence over ignoreTLS and opportunisticTLS" · § SMTPConnection constructor — "if (this.options.requireTLS && (this.options.ignoreTLS || this.options.opportunisticTLS)) {" · § _actionEHLO — "this._onError(new Error('EHLO failed but HELO does not support required STARTTLS. response=' + str), 'ECONNECTION', str, 'EHLO');" · "if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {" · § _actionSTARTTLS — "this._onError(new Error('Error upgrading connection with STARTTLS'), 'ETLS', str, 'STARTTLS');" · "this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'STARTTLS');"; read 2026-10-29

## uri-fragment-in-requests

RFC 9110 excludes a URI reference's fragment from the target URI an HTTP request is sent for and from the Referer field a user agent generates, while the fragment stays visible to the user agent and to scripts running as a result of the response.

- **Source:** https://www.rfc-editor.org/rfc/rfc9110.txt § 7.1. Determining the Target Resource — "The target URI excludes the reference's fragment component, if any, since fragment identifiers are reserved for client-side processing ([URI], Section 3.5)." · § 10.1.3. Referer — "A user agent MUST NOT include the fragment and userinfo components of the URI reference [URI], if any, when generating the Referer field value." · § 17.11. Disclosure of Fragment after Redirects — "Although fragment identifiers used within URI references are not sent in requests, implementers ought to be aware that they will be visible to the user agent and any extensions or scripts running as a result of the response."; read 2026-10-29

## samesite-strict-cookie

A browser sends a `SameSite=Strict` cookie only with requests originating from the site that set it, the setting suited to cookies of functionality that is always behind an initial navigation, such as authentication.

- **Source:** https://raw.githubusercontent.com/mdn/content/13ef67a4ffbdb929415dfa1b3d65ab1aa9ebe5da/files/en-us/web/http/guides/cookies/index.md § Controlling third-party cookies with SameSite — "Strict causes the browser to only send the cookie in response to requests originating from the cookie's origin site. This should be used when you have cookies relating to functionality that will always be behind an initial navigation, such as authentication or storing shopping cart information."; read 2026-10-29

## fetch-keepalive-body-quota

The Fetch Standard's HTTP-network-or-cache fetch returns a network error for a `keepalive` request with a body when the length of that body, added to the body lengths of the `keepalive` requests of the same fetch group still in flight, is greater than 64 kibibytes.

- **Source:** https://raw.githubusercontent.com/whatwg/fetch/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/fetch.bs § HTTP-network-or-cache fetch — "If contentLength is non-null and httpRequest's keepalive is true, then:" · "Let inflightRecords be the set of fetch records in group whose request's keepalive is true and done flag is unset." · "If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error."; read 2026-10-30

## visibilitychange-hidden-last-event

A document's `visibilitychange` event fires with the visibility state `hidden` when the user navigates to a new page, switches tabs, closes the tab, minimizes or closes the browser or, on mobile, switches to another app, and that transition is the last event the page reliably observes.

- **Source:** https://raw.githubusercontent.com/mdn/content/9a0e5c1cfa8d5079e22c410de757707706f1cc75/files/en-us/web/api/document/visibilitychange_event/index.md § Usage notes — "This event fires with a visibilityState of hidden when a user navigates to a new page, switches tabs, closes the tab, minimizes or closes the browser, or, on mobile, switches from the browser to a different app. Transitioning to hidden is the last event that's reliably observable by the page, so developers should treat it as the likely end of the user's session (for example, for sending analytics data)."; read 2026-10-30

## express-session-end-of-request

Express-session 1.19.0 with `resave` false, at the end of a request, calls the Store's `touch` for a session it loaded from the request's cookie and whose data, the cookie apart, did not change, and does not call the Store's `set` for that session.

- **Source:** https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/index.js § inflate — "if (!resaveSession) {" · "savedHash = originalHash" · § isSaved — "return originalId === sess.id && savedHash === hash(sess);" · § shouldSave — ": !isSaved(req.session)" · § shouldTouch — "return cookieId === req.sessionID && !shouldSave(req);" · § res.end — "store.touch(req.sessionID, req.session, function ontouch(err) {" · § hash — "if (this === sess && key === 'cookie') {"; read 2026-10-30

## express-session-regenerated-session-saved-again

Express-session 1.19.0 saves a session made by `regenerate` again at the end of the request, even when the route has already saved it, and each save hands the Store's `set` the same session object.

- **Source:** https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/session/store.js § Store.prototype.regenerate — "self.generate(req);"; read 2026-10-30 · https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/index.js § store.generate — "req.session = new Session(req);" · § generate — "store.generate(req);" · "wrapmethods(req.session);" · § wrapmethods, save — "savedHash = hash(this);" · § isSaved — "return originalId === sess.id && savedHash === hash(sess);" · § isModified — "return originalId !== sess.id || originalHash !== hash(sess);" · § shouldSave — "return !saveUninitializedSession && !savedHash && cookieId !== req.sessionID" · § res.end — "req.session.save(function onsave(err) {"; read 2026-10-30 · https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/session/session.js § save — "this.req.sessionStore.set(this.id, this, fn || function(){});"; read 2026-10-30

## sqlite-online-backup

A completed SQLite Online Backup is a consistent snapshot of its source database, each step copies up to the number of pages it is asked for, and a change to the source through another connection restarts the backup at its next step, so that a backup restarted often enough may never complete.

- **Source:** https://www.sqlite.org/backup.html (archived: https://web.archive.org/web/20261022232221/https://www.sqlite.org/backup.html, 2026-10-22) § 3.1. File and Database Connection Locking — "Whether or not the backup process is restarted as a result of writes to the source database mid-backup, the user can be sure that when the backup operation is completed the backup database contains a consistent and up-to-date snapshot of the original." · "If the backup process is restarted frequently enough it may never run to completion and the backupDb() function may never return."; read 2026-10-31 · https://www.sqlite.org/c3ref/backup_finish.html (archived: https://web.archive.org/web/20261019222442/https://www.sqlite.org/c3ref/backup_finish.html, 2026-10-19) § sqlite3_backup_step() — "Function sqlite3_backup_step(B,N) will copy up to N pages between the source and destination databases specified by sqlite3_backup object B." · "If the source database is modified by an external process or via a database connection other than the one being used by the backup operation, then the backup will be automatically restarted by the next call to sqlite3_backup_step()."; read 2026-10-31

## mikrus-pusher-mail

Mikrus documents `pusher` as a tool that sends mail to its own user, reads standard input and takes the mail's subject as its first parameter, names no recipient address and no limit, and its script calls `curl` on `push.mikr.us/$1` without `https`, so a message may travel unencrypted.

- **Source:** https://wiki.mikr.us/pusher/ (archived: https://web.archive.org/web/20260519191805/https://wiki.mikr.us/pusher/, 2026-05-19) § Pusher — "Pusher jest prostym narzędziem pozwalającym Ci wysyłać maile do samego siebie, bez konieczności instalowania serwera mailowego." · "Pusher czyta ze standardowego wejścia. Jeśli chcesz zmienić temat maila wysyłanego przez pushera, podaj go jako pierwszy parametr (podkreślenia będą traktowane jak spacje)."; read 2026-10-31 · https://mikr.us/tools/pusher (archived: https://web.archive.org/web/20260417121329/https://mikr.us/tools/pusher, 2026-04-17) § the script — "curl -s --data-urlencode data@- push.mikr.us/$1"; read 2026-10-31

## age-file-encryption

age 1.0.0 lets an identity file passed with `-i` serve as a symmetric key when `-e` is given explicitly, exits 0 if and only if encryption or decryption succeeded for the full length of the input, writes files that are not malleable and releases no unauthenticated output.

- **Source:** https://raw.githubusercontent.com/FiloSottile/age/552aa0a07de0b42c16126d3107bd8895184a69e7/doc/age.1.ronn § DESCRIPTION — "age encrypted files are binary and not malleable, with around 200 bytes of overhead per recipient, plus 16 bytes every 64KiB of plaintext." · § Decryption options, -i, --identity — "If -e/--encrypt is explicitly specified (to avoid confusion), -i/--identity may also be used to encrypt to the RECIPIENTS corresponding to the IDENTITIES listed at <PATH>. This allows using an identity file as a symmetric key, if desired." · § EXIT STATUS — "age will exit 0 if and only if encryption or decryption are succesful for the full length of the input." · "If an error occurs during decryption, partial output might still be generated, but only if it was possible to securely authenticate it. No unauthenticathed output is ever released."; read 2026-10-31

## cron-d-file-rules

A file in `/etc/cron.d` for cron 3.0pl1-137ubuntu3 of Ubuntu 22.04 must be owned by root, must not be group- or other-writable, must give the user each task runs as, and must have a name made solely of letters, digits, underscores and hyphens, which cannot contain any dots.

- **Source:** https://git.launchpad.net/ubuntu/+source/cron/plain/cron.8?h=applied/3.0pl1-137ubuntu3 § NOTES — "/etc/crontab and the files in /etc/cron.d must be owned by root, and must not be group- or other-writable." · § DEBIAN SPECIFIC — "This directory can contain any file defining tasks following the format used in /etc/crontab, i.e. unlike the user cron spool, these files must provide the username to run the task as in the task definition." · "Files in this directory have to be owned by root, do not need to be executable (they are configuration files, just like /etc/crontab) and must conform to the same naming convention as used by run-parts(8) : they must consist solely of upper- and lower-case letters, digits, underscores, and hyphens. This means that they cannot contain any dots."; read 2026-10-31

## docker-build-cache-invalidation

Docker's builder checks the base image and then each instruction against the cached layers, invalidates the cache where no cached layer matches, checks `COPY` by file metadata and `RUN` by its command string, uses no cache for any instruction after an invalidation, and treats a build argument as a cause of cache invalidation.

- **Source:** https://raw.githubusercontent.com/docker/docs/62f6d26c183faf98fc8567f0b675f660f4e91ae6/content/manuals/build/cache/invalidation.md § General rules — "The builder begins by checking if the base image is already cached. Each subsequent instruction is compared against the cached layers. If no cached layer matches the instruction exactly, the cache is invalidated." · "For the ADD and COPY instructions, and for RUN instructions with bind mounts (RUN --mount=type=bind), the builder calculates a cache checksum from file metadata to determine whether cache is valid." · "In that case just the command string itself is used to find a match." · "Once the cache is invalidated, all subsequent Dockerfile commands generate new images and the cache isn't used." · § Build secrets — "Build arguments do result in cache invalidation."; read 2026-11-10

## openssh-strict-host-key-checking

In OpenSSH portable 8.9p1, `ssh` with `StrictHostKeyChecking` set to `yes` never adds host keys to the known-hosts file, refuses hosts whose host key has changed and leaves every new host to be added by hand, with `accept-new` adds new host keys by itself, with `no` also lets connections to changed host keys proceed, and with `BatchMode` set to `yes` asks for no host key confirmation.

- **Source:** https://raw.githubusercontent.com/openssh/openssh-portable/166456cedad3962b83b848b1e9caf80794831f0f/ssh_config.5 § StrictHostKeyChecking — "If this flag is set to yes, ssh(1) will never automatically add host keys to the ~/.ssh/known_hosts file, and refuses to connect to hosts whose host key has changed." · "This option forces the user to manually add all new hosts." · "If this flag is set to accept-new then ssh will automatically add new host keys to the user's known_hosts file, but will not permit connections to hosts with changed host keys." · "If this flag is set to no or off, ssh will automatically add new host keys to the user known hosts files and allow connections to hosts with changed hostkeys to proceed, subject to some restrictions." · § BatchMode — "If set to yes, user interaction such as password prompts and host key confirmation requests will be disabled."; read 2026-10-31

## openssh-option-order

In OpenSSH portable 8.9p1, `ssh` uses the first value it obtains for each parameter and obtains command-line options before the user's configuration file and the system-wide configuration file.

- **Source:** https://raw.githubusercontent.com/openssh/openssh-portable/166456cedad3962b83b848b1e9caf80794831f0f/ssh_config.5 § DESCRIPTION — "ssh(1) obtains configuration data from the following sources in the following order:" · "command-line options" · "For each parameter, the first obtained value will be used."; read 2026-10-31

## openssh-extra-host-key-sources

In OpenSSH portable 8.9p1, `ssh` with `KnownHostsCommand` set obtains host keys from that command in addition to the known-hosts files, and with `VerifyHostKeyDNS` set to `yes`, its default being `no`, implicitly trusts keys that match a secure fingerprint from DNS.

- **Source:** https://raw.githubusercontent.com/openssh/openssh-portable/166456cedad3962b83b848b1e9caf80794831f0f/ssh_config.5 § KnownHostsCommand — "Specifies a command to use to obtain a list of host keys, in addition to those listed in UserKnownHostsFile and GlobalKnownHostsFile." · § VerifyHostKeyDNS — "If this option is set to yes, the client will implicitly trust keys that match a secure fingerprint from DNS." · "The default is no."; read 2026-10-31

## node-uncaught-default-print

Node.js 24.21.0, with no handler for an uncaught exception, prints its stack trace to standard error, the trace's first line holding the error's class name and message, and exits with code 1.

- **Source:** https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/process.md § Event: 'uncaughtException' — "By default, Node.js handles such exceptions by printing the stack trace to `stderr` and exiting with code 1" · https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/errors.md § error.stack — "The first line is formatted as `<error class name>: <error message>`"; read 2026-11-02

## python-uncaught-default-print

Python 3.14, for an uncaught exception other than `SystemExit`, by default prints its traceback and the exception to standard error just before the program exits.

- **Source:** https://raw.githubusercontent.com/python/cpython/v3.14.3/Doc/library/sys.rst § sys.excepthook — "This function prints out a given traceback and exception to ``sys.stderr``." · "When an exception other than :exc:`SystemExit` is raised and uncaught, the interpreter calls ``sys.excepthook``" · "in a Python program this happens just before the program exits."; read 2026-11-02

## playwright-cli-token-use

The maker of Playwright CLI says that CLI invocations are more token-efficient for coding agents than MCP.

- **Source:** https://raw.githubusercontent.com/microsoft/playwright-cli/b85c7a736bb473bf55b584e54a09ffa698d6d871/README.md § Playwright CLI vs Playwright MCP — "Modern coding agents increasingly favor CLI–based workflows exposed as SKILLs over MCP because CLI invocations are more token-efficient: they avoid loading large tool schemas and verbose accessibility trees into the model context, allowing agents to act through concise, purpose-built commands."; read 2026-11-02

## playwright-cli-config-path

Playwright CLI reads its configuration from `.playwright/cli.config.json` by default.

- **Source:** https://raw.githubusercontent.com/microsoft/playwright-cli/b85c7a736bb473bf55b584e54a09ffa698d6d871/README.md § Configuration file — "Playwright CLI will load config from `.playwright/cli.config.json` by default so that you did not need to specify it every time."; read 2026-11-02

## playwright-cli-context-options

The configuration file of Playwright CLI takes options of the browser context under `browser.contextOptions`.

- **Source:** https://raw.githubusercontent.com/microsoft/playwright-cli/b85c7a736bb473bf55b584e54a09ffa698d6d871/README.md § Configuration file, Configuration file schema — "browser?: {" · "Context options for the browser context." · "contextOptions?: playwright.BrowserContextOptions;"; read 2026-11-02

## playwright-screencast-frames

Playwright's screencast of a page delivers JPEG-encoded frames to a callback.

- **Source:** https://raw.githubusercontent.com/microsoft/playwright/cfe490d941f992655948eee8fd4fd94e1c4234bf/docs/src/api/class-screencast.md § Screencast.start — "delivers JPEG-encoded frames to the callback."; read 2026-11-02

## chrome-devtools-ignore-certificate-errors

The Chrome DevTools Protocol's command `Security.setIgnoreCertificateErrors` turns the ignoring of all certificate errors on or off.

- **Source:** https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/92be9c279a8ff3af17009705bb357241932128e4/json/browser_protocol.json § domain Security, command setIgnoreCertificateErrors — "Enable/disable whether all certificate errors should be ignored."; read 2026-11-02

## git-for-windows-openssl

Git for Windows comes with OpenSSL.

- **Source:** https://raw.githubusercontent.com/git-for-windows/build-extra/2f63027cca82e0bd0d6aa9d79d52f5a0d7dea8cc/ReleaseNotes.md § Changes since Git for Windows v2.56.0 (September 28th 2026), New Features — "Comes with OpenSSL v3.5.9."; read 2026-11-02

## node-assert-failure-inspect

Node.js 24.17.0, while it builds the error of a failing comparison of `node:assert`, writes the compared values out by `inspect` with `customInspect: false`, `depth: 1000` and `getters: true`.

- **Source:** https://raw.githubusercontent.com/nodejs/node/v24.17.0/lib/internal/assert/assertion_error.js § inspectValue — "return inspect(val, {" · "customInspect: false," · "depth: 1000," · "getters: true," · § createErrDiff — "const inspectedActual = inspectValue(actual);" · § AssertionError — "super(createErrDiff(actual, expected, operator, message, diff));"; read 2026-11-02

## react-hook-call-place

React's documentation says to call Hooks at the top level of a function component or of a custom Hook, before any early return, and not inside loops, conditions, nested functions or `try`/`catch`/`finally` blocks.

- **Source:** https://raw.githubusercontent.com/reactjs/react.dev/0821e7d9428a6c58c922765b891bbffba9ed6249/src/content/reference/rules/rules-of-hooks.md § Only call Hooks at the top level — "Don’t call Hooks inside loops, conditions, nested functions, or try/catch/finally blocks. Instead, always use Hooks at the top level of your React function, before any early returns." · "Call them at the top level in the body of a function component." · "Call them at the top level in the body of a custom Hook."; read 2026-11-02

## react-effect-dependencies

React's documentation says that every reactive value an Effect's code uses must be declared as a dependency.

- **Source:** https://raw.githubusercontent.com/reactjs/react.dev/0821e7d9428a6c58c922765b891bbffba9ed6249/src/content/reference/react/useEffect.md § Specifying reactive dependencies — "Every reactive value used by your Effect's code must be declared as a dependency."; read 2026-11-02

## react-effect-cleanup

React's documentation says that the setup function of an Effect connecting to an external system should return a cleanup function that disconnects from that system.

- **Source:** https://raw.githubusercontent.com/reactjs/react.dev/0821e7d9428a6c58c922765b891bbffba9ed6249/src/content/reference/react/useEffect.md § Connecting to an external system — "A setup function with setup code that connects to that system." · "It should return a cleanup function with cleanup code that disconnects from that system."; read 2026-11-02

## react-effect-use

React's documentation says that Effects are not needed to transform data for rendering or to handle user events, and are needed to synchronize with external systems.

- **Source:** https://raw.githubusercontent.com/reactjs/react.dev/0821e7d9428a6c58c922765b891bbffba9ed6249/src/content/learn/you-might-not-need-an-effect.md § How to remove unnecessary Effects — "You don't need Effects to transform data for rendering." · "You don't need Effects to handle user events." · "You do need Effects to synchronize with external systems."; read 2026-11-02

## react-hook-order-report

React's development build reports a change in the order of the Hooks a component calls through `console.error`.

- **Source:** https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/react-reconciler/src/ReactFiberHooks.js § warnOnHookMismatchInDev — "if (__DEV__) {" · "console.error(" · "'React has detected a change in the order of Hooks called by %s. ' +"; read 2026-11-02

## react-entry-build

The entry file of React's npm package loads its production build when `process.env.NODE_ENV` is `production`, and its development build otherwise.

- **Source:** https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/react/npm/index.js § the whole file — "if (process.env.NODE_ENV === 'production') {" · "module.exports = require('./cjs/react.production.js');" · "module.exports = require('./cjs/react.development.js');"; read 2026-11-02

## react-entry-format

The entry file of React's npm package is a CommonJS module, which exports through `module.exports` what it loads through `require`.

- **Source:** https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/react/npm/index.js § the whole file — "module.exports = require('./cjs/react.production.js');"; read 2026-11-02

## node-worker-threads

Node.js's module `node:worker_threads` gives threads that execute JavaScript in parallel.

- **Source:** https://raw.githubusercontent.com/nodejs/node/v24.17.0/doc/api/worker_threads.md § Worker threads — "The node:worker_threads module enables the use of threads that execute JavaScript in parallel."; read 2026-11-02

## node-sigkill-termination

`SIGKILL` unconditionally terminates Node.js on all platforms, and on Windows, which has no signals, `process.kill()` emulates it by terminating the target process.

- **Source:** https://raw.githubusercontent.com/nodejs/node/v24.17.0/doc/api/process.md § Signal events — "'SIGKILL' cannot have a listener installed, it will unconditionally terminate Node.js on all platforms." · "Windows does not support signals so has no equivalent to termination by signal, but Node.js offers some emulation with process.kill(), and subprocess.kill():" · "Sending SIGINT, SIGTERM, and SIGKILL will cause the unconditional termination of the target process, and afterwards, subprocess will report that the process was terminated by signal."; read 2026-11-02

## node-process-rss

`process.memoryUsage.rss()` returns the Resident Set Size in bytes, the amount of space the process occupies in the main memory device, which is a subset of its total allocated memory.

- **Source:** https://raw.githubusercontent.com/nodejs/node/v24.17.0/doc/api/process.md § process.memoryUsage.rss() — "The process.memoryUsage.rss() method returns an integer representing the Resident Set Size (RSS) in bytes." · "The Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, including all C++ and JavaScript objects and code."; read 2026-11-02

## npm-lock-peer-dependencies

npm copies the `peerDependencies` of a package's `package.json` into that package's entry of `package-lock.json`.

- **Source:** https://raw.githubusercontent.com/npm/cli/v12.2.1/workspaces/arborist/lib/shrinkwrap.js § pkgMetaKeys — "const pkgMetaKeys = [" · "'peerDependencies'," · § metaFromNode — "for (const key of pkgMetaKeys) {" · "const val = metaFieldFromPkg(node.package, key)" · "meta[key.replace(/^_/, '')] = val"; read 2026-11-02

## pixel-crawler-terms

The terms of the Pixel Crawler pack ask for no credit, allow its arts to be altered and used in commercial products, and forbid selling them as a final product.

- **Source:** https://anokolisa.itch.io/free-pixel-art-asset-pack-topdown-tileset-rpg-16x16-sprites (archived: https://web.archive.org/web/20261016154500/https://anokolisa.itch.io/free-pixel-art-asset-pack-topdown-tileset-rpg-16x16-sprites, 2026-10-16) § the link "Terms", which opens the document https://drive.google.com/file/d/17y1gjuwVirE8V79WcTL9tgTUtMu6R1je/view?usp=sharing, points 1, 2, 3 and 4 — "It is not necessary to credit the author for any use of the arts, but if it is done it is appreciated." · "The arts present can be altered in any shape, color or pattern" · "These arts cannot be sold as a final product, only the author can sell the assets" · "You can use these assets in creating commercial products, study or any other project where they are functional" · the closing line — "These terms apply to all works available for sale or distribution by anokolisa"; read 2026-11-12

## html-exception-reporting

In the HTML Standard, the steps that report an exception and that notify about rejected promises let the user agent report the exception, or the reason of the rejection, to a developer console only after the `error` or `unhandledrejection` event the user agent fired for it was not cancelled by the page.

- **Source:** https://raw.githubusercontent.com/whatwg/html/5fcc2318395821db61e353705e6368ad9a000af5/source § report an exception — "Let notHandled be true." · "If global implements EventTarget, then set notHandled to the result of firing an event named error at global, using ErrorEvent, with the cancelable attribute initialized to true, and additional attributes initialized according to errorInfo." · "If notHandled is true:" · "Otherwise, the user agent may report exception to a developer console." · § notify about rejected promises — "Let notCanceled be the result of firing an event named unhandledrejection at global, using PromiseRejectionEvent, with the cancelable attribute initialized to true, the promise attribute initialized to p, and the reason attribute initialized to p.[[PromiseResult]]." · "If notCanceled is true, then the user agent may report p.[[PromiseResult]] to a developer console."; read 2026-11-07

## react-uncaught-render-error

React 19.3.1 unmounts a root by rendering null when an error thrown in its tree is caught by no error boundary, and then hands the error to the `onUncaughtError` of that root.

- **Source:** https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/react-reconciler/src/ReactFiberThrow.js § createRootErrorUpdate — "Unmount the root by rendering null." · "update.payload = {element: null};" · https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/react-reconciler/src/ReactFiberErrorLogger.js § logUncaughtError — "const onUncaughtError = root.onUncaughtError;"; read 2026-11-07

## react-default-uncaught-report

React 19.3.1, by default, reports an error that no error boundary caught to the browser through `reportError`, which fires an `error` event at the window.

- **Source:** https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/react-reconciler/src/ReactFiberErrorLogger.js § defaultOnUncaughtError — "reportGlobalError(error);" · https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/shared/reportGlobalError.js § reportGlobalError — "In modern browsers, reportError will dispatch an error event," · "emulating an uncaught JavaScript error."; read 2026-11-07

## playwright-cli-console-messages

Playwright CLI has a command, `console`, that lists console messages.

- **Source:** https://raw.githubusercontent.com/microsoft/playwright-cli/b85c7a736bb473bf55b584e54a09ffa698d6d871/README.md § Commands, DevTools — "playwright-cli console [min-level] # list console messages"; read 2026-11-08

## docker-container-log-removal

In Moby v28.1.1, removing a container deletes the container's root directory, in which the `json-file` and `local` log drivers keep the container's log, so the log goes with the container.

- **Source:** https://raw.githubusercontent.com/moby/moby/v28.1.1/daemon/delete.go § cleanupContainer — "err := containerfs.EnsureRemoveAll(container.Root)"; read 2026-11-08 · https://raw.githubusercontent.com/moby/moby/v28.1.1/container/container.go § StartLogger — "info.LogPath, err = container.GetRootResourcePath(fmt.Sprintf(" · "logDir, err := container.GetRootResourcePath(" · "info.LogPath = filepath.Join(logDir," · § GetRootResourcePath — "return symlink.FollowSymlinkInScope(filepath.Join(container.Root, cleanPath), container.Root)"; read 2026-11-08

## github-scheduled-workflow-disabling

GitHub automatically disables the scheduled workflows of a public repository when no repository activity has occurred in it for 60 days.

- **Source:** https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows (archived: https://web.archive.org/web/20261031092549/https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows, 2026-10-31) § schedule — "In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days."; read 2026-11-08

## loop2-repository-visibility

The GitHub repository `mariusznazar/loop2` is public.

- **Source:** https://api.github.com/repos/mariusznazar/loop2 (no archived copy exists in the Internet Archive's CDX index, checked 2026-11-08) § the repository object, field `visibility` — `"visibility":"public"`; read 2026-11-14

## docker-compose-recreate-removal

In Docker Compose v2.35.1, recreating a container removes the container it replaces.

- **Source:** https://raw.githubusercontent.com/docker/compose/v2.35.1/pkg/compose/convergence.go § recreateContainer — "err = s.apiClient().ContainerRemove(ctx, replaced.ID,"; read 2026-11-09

## docker-local-log-driver-bound

By default, the `local` log driver of Docker preserves 100MB of log messages per container.

- **Source:** https://docs.docker.com/engine/logging/drivers/local/ (archived: https://web.archive.org/web/20261015110255/https://docs.docker.com/engine/logging/drivers/local/, 2026-10-15) — "By default, the local driver preserves 100MB of log messages per container and uses automatic compression to reduce the size on disk."; read 2026-11-09

## logrotate-rotation-triggers

On Ubuntu 22.04, `logrotate` can handle each log file daily, weekly, monthly or when it grows too large, and with `maxsize` it rotates a file that has grown bigger than that size even before the time interval ends.

- **Source:** https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html (archived: https://web.archive.org/web/20261009164358/https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html, 2026-10-09) § DESCRIPTION — "Each log file may be handled daily, weekly, monthly, or when it grows too large." § CONFIGURATION FILE DIRECTIVES, maxsize — "Log files are rotated when they grow bigger than size bytes even before the additionally specified time interval (daily, weekly, monthly, or yearly)."; read 2026-11-09

## logrotate-rotation-count

On Ubuntu 22.04, `logrotate` rotates a log `count` times, the number that the `rotate` directive gives, before it removes the log or mails it to the address that a `mail` directive specifies.

- **Source:** https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html (archived: https://web.archive.org/web/20261009164358/https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html, 2026-10-09) § CONFIGURATION FILE DIRECTIVES, rotate — "Log files are rotated count times before being removed or mailed to the address specified in a mail directive."; read 2026-11-09

## github-schedule-shortest-interval

The shortest interval at which GitHub runs scheduled workflows is once every 5 minutes.

- **Source:** https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows (archived: https://web.archive.org/web/20261031092549/https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows, 2026-10-31) § schedule — "The shortest interval you can run scheduled workflows is once every 5 minutes."; read 2026-11-09

## check-address-schedule-run-times

GitHub started the 17 runs of the workflow `check-address.yml` of the GitHub repository `mariusznazar/loop2` that its `schedule` event triggered, as `gh run list` lists them with a limit of 20, between 2026-11-09 19:54:50 UTC and 2026-11-14 02:14:57 UTC, and the gaps between the start times of neighbouring runs are between 3 hours 32 minutes and 8 hours 30 minutes.

- **Source:** reading: `gh run list --workflow check-address.yml --event schedule --limit 20 --json createdAt,startedAt` on the author's computer, gh version 2.88.1 (2026-03-12), as `gh --version` prints it on the same computer, the answer of GitHub for a public repository — `[{"createdAt":"2026-11-14T02:14:57Z","startedAt":"2026-11-14T02:14:57Z"},{"createdAt":"2026-11-13T22:02:16Z","startedAt":"2026-11-13T22:02:16Z"},{"createdAt":"2026-11-13T16:20:34Z","startedAt":"2026-11-13T16:20:34Z"},{"createdAt":"2026-11-13T08:10:45Z","startedAt":"2026-11-13T08:10:45Z"},{"createdAt":"2026-11-13T01:20:56Z","startedAt":"2026-11-13T01:20:56Z"},{"createdAt":"2026-11-12T20:26:48Z","startedAt":"2026-11-12T20:26:48Z"},{"createdAt":"2026-11-12T12:39:58Z","startedAt":"2026-11-12T12:39:58Z"},{"createdAt":"2026-11-12T04:09:51Z","startedAt":"2026-11-12T04:09:51Z"},{"createdAt":"2026-11-11T23:35:47Z","startedAt":"2026-11-11T23:35:47Z"},{"createdAt":"2026-11-11T17:25:19Z","startedAt":"2026-11-11T17:25:19Z"},{"createdAt":"2026-11-11T09:35:11Z","startedAt":"2026-11-11T09:35:11Z"},{"createdAt":"2026-11-11T02:17:48Z","startedAt":"2026-11-11T02:17:48Z"},{"createdAt":"2026-11-10T22:45:37Z","startedAt":"2026-11-10T22:45:37Z"},{"createdAt":"2026-11-10T17:55:20Z","startedAt":"2026-11-10T17:55:20Z"},{"createdAt":"2026-11-10T10:15:50Z","startedAt":"2026-11-10T10:15:50Z"},{"createdAt":"2026-11-10T02:28:54Z","startedAt":"2026-11-10T02:28:54Z"},{"createdAt":"2026-11-09T19:54:50Z","startedAt":"2026-11-09T19:54:50Z"}]`; run 2026-11-14

## github-actions-public-runs-free

GitHub charges nothing for the use of standard GitHub-hosted runners in public repositories.

- **Source:** https://docs.github.com/en/billing/concepts/product-billing/github-actions (archived: https://web.archive.org/web/20261108201638/https://docs.github.com/en/billing/concepts/product-billing/github-actions, 2026-11-08) § Included compute usage and storage — "The use of standard GitHub-hosted runners is free:" · "In public repositories"; read 2026-11-09

## docker-compose-down-volumes

By default `docker compose down` removes the containers of the Compose file's services and the networks it defines and no volume, and with `--volumes` it also removes the named volumes declared in the Compose file's `volumes` section and the anonymous volumes attached to containers, but never a volume defined as external.

- **Source:** https://raw.githubusercontent.com/docker/compose/9c60fe67df0763c81f2276fd4163ee5354d70b09/docs/reference/compose_down.md § Description — "By default, the only things removed are:" · "Containers for services defined in the Compose file." · "Networks defined in the networks section of the Compose file." · "Networks and volumes defined as external are never removed." · § Options, -v, --volumes — "Remove named volumes declared in the "volumes" section of the Compose file and anonymous volumes attached to containers"; read 2026-11-09

## docker-volume-prune-scope

The documentation of `docker volume prune` says that it removes the local volumes that no container references, by default only the anonymous ones and with `--all` the named ones too, while its example output of the command without that option lists a named volume among those deleted.

- **Source:** https://raw.githubusercontent.com/docker/cli/ce1223035ac3ab8922717092e63a184cf67b493d/docs/reference/commandline/volume_prune.md § Description — "Remove all unused local volumes. Unused local volumes are those which are not referenced by any containers. By default, it only removes anonymous volumes." · § Examples — "WARNING! This will remove anonymous local volumes not used by at least one container." · "Deleted Volumes: 07c7bdf3e34ab76d921894c2b834f073721fccfbbcba792aa7648e3a7a664c2e my-named-vol" · § Filtering (--all, -a) — "Use the --all flag to prune both unused anonymous and named volumes."; read 2026-11-09

## docker-system-prune-volumes

`docker system prune` removes no volume by default, its `--volumes` option prunes anonymous volumes as well, and its `--all` option removes all unused images, not just dangling ones.

- **Source:** https://raw.githubusercontent.com/docker/cli/ce1223035ac3ab8922717092e63a184cf67b493d/docs/reference/commandline/system_prune.md § Options, --volumes — "Prune anonymous volumes" · § Options, -a, --all — "Remove all unused images not just dangling ones" · § Examples — "By default, volumes aren't removed to prevent important data from being deleted if there is currently no container using the volume. Use the --volumes flag when running the command to prune anonymous volumes as well:"; read 2026-11-09

## browser-bare-import-resolution

The HTML Standard has the resolution of a module specifier give a URL or throw an exception, and throw a TypeError for a bare specifier that no import map remaps.

- **Source:** https://html.spec.whatwg.org/commit-snapshots/a0442320781555c99544448e30134662bfc39190/ § 8.1.5.1 The resolution algorithm — "The resolve a module specifier algorithm is the primary entry point for converting module specifier strings into URLs. When no import maps are involved, it is relatively straightforward, and reduces to resolving a URL-like module specifier." · "In the end, if no successful resolution is found via any of the candidate module specifier maps, resolve a module specifier will throw an exception. Thus the result is always either a URL or a thrown exception." · "Throw a TypeError indicating that specifier was a bare specifier, but was not remapped to anything by importMap."; read 2026-11-10

## playwright-mcp-persistent-profile

By default Playwright MCP keeps a persistent browser profile for the workspace root of its client, a profile that only one browser instance can use at a time, so concurrent clients sharing a workspace conflict.

- **Source:** https://raw.githubusercontent.com/microsoft/playwright-mcp/e436f64eb7e1904b6c302da0997a2243496d191e/README.md § User profile — "You can run Playwright MCP with persistent profile like a regular browser (default), in isolated contexts for testing sessions, or connect to your existing browser using the browser extension." § User profile, Persistent profile — "{workspace-hash} is derived from the MCP client's workspace root, so different projects get separate profiles automatically." · "A persistent profile can only be used by one browser instance at a time, so concurrent MCP clients sharing the same workspace will conflict. To run several clients in parallel, start each additional client with --isolated or point it at a distinct --user-data-dir."; read 2026-11-11

## playwright-cli-workspace-directory

Playwright CLI 0.1.22 takes as the workspace of a call the first directory that holds a `.playwright` directory among the directory the call is made in and the nine above it, and the root of its own package where none does.

- **Source:** https://unpkg.com/playwright-core@1.64.0-alpha-1790635538000/lib/tools/cli-client/registry.js § createClientInfo — "const workspaceDir = findWorkspaceDir(process.cwd());" · "hash.update(workspaceDir || import_package.packageRoot);" § findWorkspaceDir — "for (let i = 0; i < 10; i++) {" · "if (import_fs.default.existsSync(import_path.default.join(dir, ".playwright")))" · "return dir;" · "const parentDir = import_path.default.dirname(dir);"; read 2026-11-11 · https://unpkg.com/@playwright/cli@0.1.22/package.json § dependencies — ""playwright-core": "1.64.0-alpha-1790635538000""; read 2026-11-11

## playwright-cli-sessions-per-workspace

Playwright CLI 0.1.22 keeps the sessions of each workspace apart from those of every other workspace.

- **Source:** https://unpkg.com/playwright-core@1.64.0-alpha-1790635538000/lib/tools/cli-client/registry.js § createClientInfo — "hash.update(workspaceDir || import_package.packageRoot);" · "const workspaceDirHash = hash.digest("hex").substring(0, 16);" · "daemonProfilesDir: daemonProfilesDir(workspaceDirHash),"; read 2026-11-11 · https://unpkg.com/@playwright/cli@0.1.22/package.json § dependencies — ""playwright-core": "1.64.0-alpha-1790635538000""; read 2026-11-11

## screenshots-repository-visibility

The GitHub repository `mariusznazar/screenshots` is public.

- **Source:** https://api.github.com/repos/mariusznazar/screenshots (no archived copy exists in the Internet Archive's CDX index, checked 2026-11-11) § the repository object, field `visibility` — `"visibility":"public"`; read 2026-11-14

## smoke-fire-particle-licence

The page of the pack Smoke & Fire Animated Particle [16x16] on OpenGameArt gives KnoblePersona as its author and CC-BY 3.0 as its licence, the name of the licence linking to the Creative Commons Attribution 3.0 licence at http://creativecommons.org/licenses/by/3.0/.

- **Source:** https://opengameart.org/content/smoke-fire-animated-particle-16x16 (archived: https://web.archive.org/web/20260929142553/https://opengameart.org/content/smoke-fire-animated-particle-16x16, 2026-09-29) § author — "KnoblePersona" · § License(s) — "CC-BY 3.0", a link to http://creativecommons.org/licenses/by/3.0/; read 2026-11-14

## lpc-wolf-licence

The page of the pack [LPC] Wolf Animation on OpenGameArt gives William.Thompsonj as its author and Redshrike as a collaborator, offers the pack under the licences CC-BY 4.0, CC-BY 3.0, GPL 3.0, GPL 2.0 and OGA-BY 3.0, the name of the licence CC-BY 3.0 linking to the Creative Commons Attribution 3.0 licence at http://creativecommons.org/licenses/by/3.0/, and asks for a credit to Stephen "Redshrike" Challener as graphic artist and to William.Thompsonj as contributor, with a link back to the page or to the OpenGameArt homepage if reasonable.

- **Source:** https://opengameart.org/content/lpc-wolf-animation (archived: https://web.archive.org/web/20261030052334/https://opengameart.org/content/lpc-wolf-animation, 2026-10-30) § Author — "William.Thompsonj" · § Collaborators — "Redshrike" · § License(s) — "CC-BY 4.0" · "CC-BY 3.0", a link to http://creativecommons.org/licenses/by/3.0/ · "GPL 3.0" · "GPL 2.0" · "OGA-BY 3.0" · § Attribution Instructions — "Attribute Stephen "Redshrike" Challener as graphic artist and William.Thompsonj as contributor. If reasonable link back to this page or the OGA homepage."; read 2026-11-14

## docker-desktop-start-detach

`docker desktop start` starts Docker Desktop, and with the option `--detach` it does not synchronously wait for the requested operation to complete.

- **Source:** https://docs.docker.com/reference/cli/docker/desktop/start/ (archived: https://web.archive.org/web/20261101133739/https://docs.docker.com/reference/cli/docker/desktop/start/, 2026-11-01) § Description — "Start Docker Desktop" · § Options, `--detach` — "Do not synchronously wait for the requested operation to complete."; read 2026-11-13

## loop2-deploy-dump-to-deployed-time

In the deploy log of the test server's host, the `dump:` line and the `deployed` line of each of ten consecutive deployments, the first of which ended at 2026-11-12T18:04:30Z and the last at 2026-11-14T05:26:05Z, carry times 9 to 11 seconds apart.

- **Source:** reading: `tail -n 8000 /var/log/loop2-deploy.log` on the test server's host, tail, whose version no reading the skill allows prints — the `dump:` and `deployed` lines of its last ten deployments, in order: "2026-11-12T18:04:20Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 135361 to 144673 bytes" · "2026-11-12T18:04:30Z loop2-deploy: deployed 7ff7c729f60fafac1f9cd467dd68607a5f326451, previously eb7cf5d8b829b0c904b3ac30ebe3eb71522532eb" · "2026-11-12T21:43:45Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 144673 to 159027 bytes" · "2026-11-12T21:43:55Z loop2-deploy: deployed 2b4d760c517a8b399b2d9b80f77531455e32d11c, previously 7ff7c729f60fafac1f9cd467dd68607a5f326451" · "2026-11-13T17:49:23Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 159027 to 168339 bytes" · "2026-11-13T17:49:33Z loop2-deploy: deployed 1b0c8ad4466fdd6d067da7bbc27b10458d81012b, previously 2b4d760c517a8b399b2d9b80f77531455e32d11c" · "2026-11-13T20:24:07Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 168339 to 177644 bytes" · "2026-11-13T20:24:17Z loop2-deploy: deployed fc00c40652cd794f76f5ea18a2529e5c5c44c087, previously 1b0c8ad4466fdd6d067da7bbc27b10458d81012b" · "2026-11-13T21:39:37Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 177644 to 186952 bytes" · "2026-11-13T21:39:48Z loop2-deploy: deployed aa0ecd09a1037e3aff0ac2bcfc786f2707352929, previously fc00c40652cd794f76f5ea18a2529e5c5c44c087" · "2026-11-13T23:10:31Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 186952 to 196712 bytes" · "2026-11-13T23:10:42Z loop2-deploy: deployed 6ab6a32be884ac174b068b8a6a5dd1515073d2a9, previously aa0ecd09a1037e3aff0ac2bcfc786f2707352929" · "2026-11-14T00:29:06Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 196712 to 206133 bytes" · "2026-11-14T00:29:15Z loop2-deploy: deployed 6f237fb8ce26450706d8738d3d3a07298e8ec110, previously 6ab6a32be884ac174b068b8a6a5dd1515073d2a9" · "2026-11-14T00:33:48Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 206133 to 215440 bytes" · "2026-11-14T00:33:59Z loop2-deploy: deployed 5159e8c475a5faa77529020a51b21e271c695132, previously 6f237fb8ce26450706d8738d3d3a07298e8ec110" · "2026-11-14T03:19:50Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 215440 to 224752 bytes" · "2026-11-14T03:19:59Z loop2-deploy: deployed e54f23c0ea3bd1db13d2635333417eb50412d6a0, previously 5159e8c475a5faa77529020a51b21e271c695132" · "2026-11-14T05:25:54Z loop2-deploy: dump: the size of /var/log/loop2-app.log went from 224752 to 234060 bytes" · "2026-11-14T05:26:05Z loop2-deploy: deployed f0814d773b80228bd9b35caf42ca1dd6c5235c02, previously e54f23c0ea3bd1db13d2635333417eb50412d6a0"; run 2026-11-14

## loop2-deploy-resource-gate-lines

In the deploy log of the test server's host, the `resources:` line of each of ten consecutive deployments, the first of which ended at 2026-11-12T18:04:30Z and the last at 2026-11-14T05:26:05Z, shows MemAvailable between 3787 MiB and 3840 MiB against a minimum of 1024 MiB, and free space on the filesystem of Docker's root directory between 16047 MiB and 16113 MiB against a minimum of 4 GiB.

- **Source:** reading: `tail -n 8000 /var/log/loop2-deploy.log` on the test server's host, tail, whose version no reading the skill allows prints — the `resources:` lines of its last ten deployments, in order: "2026-11-12T17:53:30Z loop2-deploy: resources: MemAvailable 3840 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16113 MiB (minimum 4 GiB)" · "2026-11-12T21:33:05Z loop2-deploy: resources: MemAvailable 3823 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16104 MiB (minimum 4 GiB)" · "2026-11-13T17:38:28Z loop2-deploy: resources: MemAvailable 3801 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16094 MiB (minimum 4 GiB)" · "2026-11-13T20:13:24Z loop2-deploy: resources: MemAvailable 3812 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16086 MiB (minimum 4 GiB)" · "2026-11-13T21:29:20Z loop2-deploy: resources: MemAvailable 3810 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16077 MiB (minimum 4 GiB)" · "2026-11-13T22:59:25Z loop2-deploy: resources: MemAvailable 3803 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16068 MiB (minimum 4 GiB)" · "2026-11-14T00:28:57Z loop2-deploy: resources: MemAvailable 3787 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16061 MiB (minimum 4 GiB)" · "2026-11-14T00:33:40Z loop2-deploy: resources: MemAvailable 3802 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16060 MiB (minimum 4 GiB)" · "2026-11-14T03:09:00Z loop2-deploy: resources: MemAvailable 3800 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16058 MiB (minimum 4 GiB)" · "2026-11-14T05:14:47Z loop2-deploy: resources: MemAvailable 3793 MiB (minimum 1024 MiB), free space on the filesystem of Docker's root directory 16047 MiB (minimum 4 GiB)"; run 2026-11-14

## loop2-deploy-stage-exit-lines

The last 8000 lines of the deploy log of the test server's host, read on 2026-11-14 and running from the line of 2026-11-01T22:39:06Z to the `deployed` line of 2026-11-14T05:26:05Z, hold one line that gives a stage and its exit code, a fetch stage ending at exit 6, and no line ending `(exit 5)` or `(exit 7)`.

- **Source:** reading: `tail -n 8000 /var/log/loop2-deploy.log` on the test server's host, tail, whose version no reading the skill allows prints — of its 8000 lines, the one holding the text `: stage ` and the only one holding `(exit `: "2026-11-05T16:01:33Z loop2-deploy: stage fetch: git fetch from GitHub failed (git exit 128; git's message is in /var/log/loop2-deploy.log) (exit 6)"; run 2026-11-14

## loop2-containers-published-ports

On the test server's host, the two containers of the Compose project `loop2` publish no host port: `docker ps` and `docker compose -p loop2 ps` show for `loop2` only the exposed `3000/tcp`, with no `->` mapping, and for `loop2-cloudflared` an empty ports column.

- **Source:** reading: `docker ps` on the test server's host, Docker version 28.1.1, build 4eba377 — the header and the two rows of these containers, runs of spaces collapsed to one, the rows of the four other containers left out: "CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES" · "f5e9f12cbbcd loop2-app "docker-entrypoint.s…" 3 hours ago Up 3 hours (healthy) 3000/tcp loop2" · "d8830e65e49e loop2-cloudflared "cloudflared --no-au…" 3 hours ago Up 3 hours (healthy) loop2-cloudflared"; and `cd /srv/loop2 && docker compose -p loop2 ps` on the same host, Docker Compose version v2.35.1, its whole output, runs of spaces collapsed to one: "NAME IMAGE COMMAND SERVICE CREATED STATUS PORTS" · "loop2 loop2-app "docker-entrypoint.s…" app 3 hours ago Up 3 hours (healthy) 3000/tcp" · "loop2-cloudflared loop2-cloudflared "cloudflared --no-au…" cloudflared 3 hours ago Up 3 hours (healthy)"; run 2026-11-14

## loop2-containers-memory-use

On 2026-11-14, `docker stats --no-stream loop2 loop2-cloudflared` on the test server's host shows the container `loop2` using 77.07MiB of a limit of 512MiB and the container `loop2-cloudflared` using 23.2MiB of a limit of 256MiB.

- **Source:** reading: `docker stats --no-stream loop2 loop2-cloudflared` on the test server's host, Docker version 28.1.1, build 4eba377 — its whole output, runs of spaces collapsed to one: "CONTAINER ID NAME CPU % MEM USAGE / LIMIT MEM % NET I/O BLOCK I/O PIDS" · "f5e9f12cbbcd loop2 0.00% 77.07MiB / 512MiB 15.05% 2.88kB / 1.52kB 1.83GB / 65.5kB 12" · "d8830e65e49e loop2-cloudflared 12.76% 23.2MiB / 256MiB 9.06% 1.4MB / 885kB 48.3MB / 0B 6"; run 2026-11-14

## loop2-app-log-sqlite-busy-lines

On 2026-11-14, neither the game's dump file `/var/log/loop2-app.log` nor its rotated copy `/var/log/loop2-app.log.1` on the test server's host holds a line with the text `SQLITE_BUSY`.

- **Source:** reading: `grep -F -m 50 -- 'SQLITE_BUSY' /var/log/loop2-app.log` on the test server's host, grep (GNU grep) 3.7, whose version `grep --version | head -1` prints on the same host — no output · and the same with `/var/log/loop2-app.log.1` in place of the file — no output; run 2026-11-14

## mikrus-host-docker-compose-version

The test server's host runs Docker Compose version v2.35.1.

- **Source:** reading: `docker compose version | head -1` on the test server's host, Docker version 28.1.1, build 4eba377 — "Docker Compose version v2.35.1"; run 2026-11-14

## mikrus-host-logrotate-schedule

The test server's host has the systemd timer `logrotate.timer` enabled, its unit file sets `OnCalendar=daily`, and the file `/etc/cron.daily/logrotate` exists.

- **Source:** reading: `systemctl is-enabled logrotate.timer` on the test server's host, systemctl, whose version no reading the skill allows prints — "enabled" · `systemctl cat logrotate.timer` on the same host, its lines of the schedule: "# /lib/systemd/system/logrotate.timer" · "[Timer]" · "OnCalendar=daily" · "AccuracySec=1h" · "Persistent=true" · `ls /etc/cron.daily/logrotate` on the same host, ls, whose version no reading the skill allows prints — "/etc/cron.daily/logrotate"; run 2026-11-14

## loop2-app-log-file-names

The names that `ls -1 /var/log/loop2-app.log*` lists on the test server's host are `/var/log/loop2-app.log` and `/var/log/loop2-app.log.1`, and no other.

- **Source:** reading: `ls -1 /var/log/loop2-app.log*` on the test server's host, ls, whose version no reading the skill allows prints — its whole output: "/var/log/loop2-app.log" · "/var/log/loop2-app.log.1"; run 2026-11-14

## loop2-host-installed-copies-agree

On the test server's host, `cmp` prints no difference between each of the six installed files `/usr/local/bin/loop2-deploy`, `/usr/local/bin/loop2-backup`, `/etc/cron.d/loop2-backup`, `/usr/local/bin/loop2-watch`, `/etc/cron.d/loop2-watch` and `/etc/logrotate.d/loop2-app` and its source `loop2-deploy`, `loop2-backup`, `loop2-backup.cron`, `loop2-watch`, `loop2-watch.cron` and `loop2-app.logrotate` in `/srv/loop2/deploy`, and the checkout in `/srv/loop2` is at the commit f0814d77.

- **Source:** reading: `cmp /usr/local/bin/loop2-deploy /srv/loop2/deploy/loop2-deploy` on the test server's host, cmp, whose version no reading the skill allows prints — no output; and the same with `/usr/local/bin/loop2-backup` and `/srv/loop2/deploy/loop2-backup`, `/etc/cron.d/loop2-backup` and `/srv/loop2/deploy/loop2-backup.cron`, `/usr/local/bin/loop2-watch` and `/srv/loop2/deploy/loop2-watch`, `/etc/cron.d/loop2-watch` and `/srv/loop2/deploy/loop2-watch.cron`, `/etc/logrotate.d/loop2-app` and `/srv/loop2/deploy/loop2-app.logrotate`, each run alone — no output from any; and `git -C /srv/loop2 --no-optional-locks status` on the same host, git, whose version no reading the skill allows prints — "HEAD detached at f0814d77" · "nothing to commit, working tree clean"; run 2026-11-14

## loop2-backup-log-nightly-sends

On the test server's host, the backup log `/var/log/loop2-backup.log` holds for each of the 14 days from 2026-11-01 to 2026-11-14 a line `made:` naming a file `loop2-accounts-<n>.sqlite.age` of 90328 bytes and, after it, a line `end: sent` naming the same file, written at about 02:17 UTC.

- **Source:** reading: `tail -n 60 /var/log/loop2-backup.log` on the test server's host, tail, whose version no reading the skill allows prints — of its 60 lines, the `made:` and `end: sent` lines of these days: "2026-11-01T02:17:01Z loop2-backup: made: loop2-accounts-7.sqlite.age, 90328 bytes" · "2026-11-01T02:17:10Z loop2-backup: end: sent loop2-accounts-7.sqlite.age" · "2026-11-02T02:17:02Z loop2-backup: made: loop2-accounts-1.sqlite.age, 90328 bytes" · "2026-11-02T02:17:05Z loop2-backup: end: sent loop2-accounts-1.sqlite.age" · "2026-11-03T02:17:02Z loop2-backup: made: loop2-accounts-2.sqlite.age, 90328 bytes" · "2026-11-03T02:17:07Z loop2-backup: end: sent loop2-accounts-2.sqlite.age" · "2026-11-04T02:17:01Z loop2-backup: made: loop2-accounts-3.sqlite.age, 90328 bytes" · "2026-11-04T02:17:05Z loop2-backup: end: sent loop2-accounts-3.sqlite.age" · "2026-11-05T02:17:01Z loop2-backup: made: loop2-accounts-4.sqlite.age, 90328 bytes" · "2026-11-05T02:17:04Z loop2-backup: end: sent loop2-accounts-4.sqlite.age" · "2026-11-06T02:17:01Z loop2-backup: made: loop2-accounts-5.sqlite.age, 90328 bytes" · "2026-11-06T02:17:16Z loop2-backup: end: sent loop2-accounts-5.sqlite.age" · "2026-11-07T02:17:02Z loop2-backup: made: loop2-accounts-6.sqlite.age, 90328 bytes" · "2026-11-07T02:17:05Z loop2-backup: end: sent loop2-accounts-6.sqlite.age" · "2026-11-08T02:17:02Z loop2-backup: made: loop2-accounts-7.sqlite.age, 90328 bytes" · "2026-11-08T02:17:05Z loop2-backup: end: sent loop2-accounts-7.sqlite.age" · "2026-11-09T02:17:01Z loop2-backup: made: loop2-accounts-1.sqlite.age, 90328 bytes" · "2026-11-09T02:17:04Z loop2-backup: end: sent loop2-accounts-1.sqlite.age" · "2026-11-10T02:17:01Z loop2-backup: made: loop2-accounts-2.sqlite.age, 90328 bytes" · "2026-11-10T02:17:04Z loop2-backup: end: sent loop2-accounts-2.sqlite.age" · "2026-11-11T02:17:01Z loop2-backup: made: loop2-accounts-3.sqlite.age, 90328 bytes" · "2026-11-11T02:17:04Z loop2-backup: end: sent loop2-accounts-3.sqlite.age" · "2026-11-12T02:17:02Z loop2-backup: made: loop2-accounts-4.sqlite.age, 90328 bytes" · "2026-11-12T02:17:05Z loop2-backup: end: sent loop2-accounts-4.sqlite.age" · "2026-11-13T02:17:01Z loop2-backup: made: loop2-accounts-5.sqlite.age, 90328 bytes" · "2026-11-13T02:17:08Z loop2-backup: end: sent loop2-accounts-5.sqlite.age" · "2026-11-14T02:17:02Z loop2-backup: made: loop2-accounts-6.sqlite.age, 90328 bytes" · "2026-11-14T02:17:09Z loop2-backup: end: sent loop2-accounts-6.sqlite.age"; run 2026-11-14

## loop2-watch-log-flock-status

On the test server's host, the log of the failure watcher `/var/log/loop2-watch.log` holds, for the days from 2026-11-09 to 2026-11-14, lines that give `flock exit 1` for a deployment lock that is held, and its lines that name a `flock` status name no other.

- **Source:** reading: `tail -n 100 /var/log/loop2-watch.log` on the test server's host, tail, whose version no reading the skill allows prints — of its 43 lines, 40 of which are `skipped:` lines naming `flock exit 1`, three of those lines and the line of a run that went on after the lock: "2026-11-09T09:20:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read" · "2026-11-11T22:35:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read" · "2026-11-14T05:25:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read" · "2026-11-11T09:55:01Z loop2-watch: run: due=down; sent=down; pusher=down:0; containers=loop2; failure_lines=0 browser_lines=0"; run 2026-11-14

## loop2-app-log-password-reset-mail-events

On 2026-11-14, the game's dump file `/var/log/loop2-app.log` on the test server's host holds, for one account, a line of the event `link-issued` followed by a line of the event `message-sent`, both with `linkPurpose` `password-reset` and written within one second on 2026-11-13 at 23:03 UTC, holds no other line with the text `link-issued` or `message-sent`, and holds no line with the text `"failure":"mail"`.

- **Source:** reading: `grep -F -m 50 -- 'link-issued' /var/log/loop2-app.log` on the test server's host, grep (GNU grep) 3.7, whose version `grep --version | head -1` prints on the same host — its whole output, with the account identifier replaced by `<account>`: "loop2 | 2026-11-13T23:03:05.952126792Z {"event":"link-issued","accountId":"<account>","linkPurpose":"password-reset"}" · and `grep -F -m 50 -- 'message-sent' /var/log/loop2-app.log` — its whole output, with the account identifier replaced by `<account>`: "loop2 | 2026-11-13T23:03:06.406314841Z {"event":"message-sent","accountId":"<account>","linkPurpose":"password-reset"}" · and `grep -F -m 50 -- '"failure":"mail"' /var/log/loop2-app.log` — grep printed no line; run 2026-11-14

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
| cloudflare-origin-rules | withdrawn: no decision is based on it and no invariant rests on it | none |
| cloudflare-configuration-rules | withdrawn: no decision is based on it and no invariant rests on it | none |
| cloudflare-test-origin-ipv6 | withdrawn: no decision is based on it and no invariant rests on it | none |
