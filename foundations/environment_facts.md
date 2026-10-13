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

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
