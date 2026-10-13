# Environment facts

## node-24-support-schedule/1

The Node.js Release Working Group schedules Node.js 24.x end of life for 2028-04-30.

- **Holds for:** Node.js 24.x release schedule at nodejs/release commit 72fdab20216c5f04e0a0fe72a225c2504e9f2b42
- **Source:** https://raw.githubusercontent.com/nodejs/release/72fdab20216c5f04e0a0fe72a225c2504e9f2b42/README.md § Release schedule, 24.x row, End-of-life — "2028-04-30" · § Release schedule — "Dates are subject to change."; read 2026-10-04
- **Method:** TODO

## cloudflare-origin-rules/1

On Cloudflare's Free plan, Origin Rules are available with up to 10 rules, and an Origin Rule can override the resolved destination port of incoming requests.

- **Holds for:** Cloudflare Origin Rules, which developers.cloudflare.com publishes without versions
- **Source:** https://developers.cloudflare.com/rules/origin-rules/ (archived: https://web.archive.org/web/20261012104103/https://developers.cloudflare.com/rules/origin-rules/, 2026-10-12) § Overview — "Destination port: Overrides the resolved destination port of incoming requests." · § Availability, Free column, Availability — "Yes" · § Availability, Free column, Number of rules — "10" · § Availability, Free column, Override destination port — "Yes"; read 2026-10-13
- **Method:** TODO

## openssh-authorized-keys-options/1

In an authorized_keys file, the option `command=` makes sshd execute its command whenever the key is used for authentication, for shell, command or subsystem execution, ignoring the command the user supplies and making the command the client supplied available in the `SSH_ORIGINAL_COMMAND` environment variable, and the option `restrict` disables port, agent and X11 forwarding, PTY allocation and execution of `~/.ssh/rc`.

- **Holds for:** OpenSSH portable 8.9p1, the release the host runs as Ubuntu's openssh-server 1:8.9p1-3ubuntu0.11 (OpenSSH_8.9p1 Ubuntu-3ubuntu0.11), observed through the `mikrus` MCP server with `ssh -V` and dpkg on 2026-10-13
- **Source:** https://raw.githubusercontent.com/openssh/openssh-portable/166456cedad3962b83b848b1e9caf80794831f0f/sshd.8 § AUTHORIZED_KEYS FILE FORMAT, the command option — "Specifies that the command is executed whenever this key is used for authentication." · "The command supplied by the user (if any) is ignored." · "The command originally supplied by the client is available in the SSH_ORIGINAL_COMMAND environment variable." · "Note that this option applies to shell, command or subsystem execution." · § AUTHORIZED_KEYS FILE FORMAT, the restrict option — "Enable all restrictions, i.e. disable port, agent and X11 forwarding, as well as disabling PTY allocation and execution of ~/.ssh/rc."; read 2026-10-13
- **Method:** TODO

## cloudflare-configuration-rules/1

On Cloudflare's Free plan, Configuration Rules are available with up to 10 rules, each applying to the requests its expression matches by properties such as the hostname, and a Configuration Rule's SSL setting configures the SSL/TLS encryption mode for the requests it matches.

- **Holds for:** Cloudflare Configuration Rules, which developers.cloudflare.com publishes without versions
- **Source:** https://developers.cloudflare.com/rules/configuration-rules/ (archived: https://web.archive.org/web/20261005235800/https://developers.cloudflare.com/rules/configuration-rules/, 2026-10-05) § Overview — "Each configuration rule includes an expression that defines which requests the rule applies to, based on properties like URL path, hostname, or request header." · § Availability, Free column, Availability — "Yes" · § Availability, Free column, Number of rules — "10"; read 2026-10-13 · https://developers.cloudflare.com/rules/configuration-rules/settings/ (archived: https://web.archive.org/web/20261005235058/https://developers.cloudflare.com/rules/configuration-rules/settings/, 2026-10-05) § SSL — "Use this setting to configure the SSL/TLS encryption mode for matching requests:"; read 2026-10-13
- **Method:** TODO

## loop2-host-forced-command-entry/1

The test server's authorized_keys contains exactly one entry beginning with `restrict,command="/usr/local/bin/loop2-deploy"`.

- **Holds for:** the test server's authorized_keys on Ubuntu 22.04.5 LTS
- **Source:** observed: `python3 -c 'from pathlib import Path; lines=(Path.home()/".ssh/authorized_keys").read_text().splitlines(); print(sum(line.startswith("restrict,command="+chr(34)+"/usr/local/bin/loop2-deploy"+chr(34)+" ") for line in lines))'` on Python 3.10.12, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## loop2-host-installed-command/1

The installed `/usr/local/bin/loop2-deploy` is owned by root:root with mode 0755.

- **Holds for:** the installed deployment command on Ubuntu 22.04.5 LTS
- **Source:** observed: `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` on GNU coreutils 8.32, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## mikrus-host-docker-workloads/1

The old loop game and foundryvtt run as Docker containers on the test server's host.

- **Holds for:** Docker 28.1.1 build 4eba377 on Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64
- **Source:** observed: `docker ps --format '{{.Names}} {{.Status}}'` on Docker 28.1.1 build 4eba377, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## mikrus-host-swap/1

The test server's host reports zero total swap in `/proc/meminfo`.

- **Holds for:** Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64
- **Source:** observed: `cat /proc/meminfo` on GNU coreutils 8.32, Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64; run 2026-10-13
- **Method:** TODO

## cloudflare-test-origin-ipv6/1

Cloudflare establishes IPv6 TCP connections to port 18080 on the test server.

- **Holds for:** the test server's published origin port 18080 on Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64
- **Source:** observed: `python3 -c 'import ipaddress, subprocess; ranges=[ipaddress.ip_network(line) for line in subprocess.check_output(["curl", "--silent", "--show-error", "--fail", "--max-time", "20", "https://www.cloudflare.com/ips-v6"], text=True).splitlines()]; subprocess.run(["curl", "--silent", "--show-error", "--max-time", "20", "--output", "/dev/null", "--write-out", "public-api %{http_code}", "https://loop2.mariusznazar.com/api/unknown-path-probe?ipv6-evidence=3"], check=True); rows=subprocess.check_output(["ss", "-6", "-nt", "state", "established", "sport = :18080"], text=True).splitlines()[1:]; peers=[ipaddress.ip_address(row.split()[-1].rsplit(":", 1)[0].strip("[]")) for row in rows]; print("; Cloudflare IPv6 origin connections:", sum(any(peer in network for network in ranges) for peer in peers))'` on Python 3.10.12, curl 7.81.0 and ss from iproute2-5.15.0, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## game-icons-licence/1

The game-icons/icons repository provides the icons of its contributor Delapouite under Creative
Commons 3.0 BY.

- **Holds for:** game-icons/icons at commit 82d948812bfe3f269ef8f731dcdb07b08160edc4
- **Source:** https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/license.txt § first line — "Icons provided under the Creative Commons 3.0 BY or CC0 if mentioned below." · § list of contributors — "Delapouite, http://delapouite.com"; read 2026-10-13
- **Method:** TODO

## cc-by-3-adaptation-credit/1

The Creative Commons Attribution 3.0 Unported licence requires whoever distributes an adaptation of
a work under it to credit the work's original author and to identify the use of the work in the
adaptation.

- **Holds for:** Creative Commons Attribution 3.0 Unported legal code
- **Source:** https://creativecommons.org/licenses/by/3.0/legalcode § 4(b) — "If You Distribute, or Publicly Perform the Work or any Adaptations or Collections, You must" · § 4(b) — "the name of the Original Author (or pseudonym, if applicable) if supplied" · § 4(b) — "in the case of an Adaptation, a credit identifying the use of the Work in the Adaptation"; read 2026-10-13
- **Method:** TODO

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
