# Docker documentation excerpts for item 28 (fetched by the orchestrator, 2026-11-09, verbatim)

Fetched without login, generic client name. Sources are tagged releases of the public repositories; the Docker Engine version installed on the test server is NOT recorded anywhere in the product, so the skill text must not claim more than these versions document.

## `docker volume prune` — https://raw.githubusercontent.com/docker/cli/v27.3.1/docs/reference/commandline/volume_prune.md (docker/cli tag v27.3.1) lines 1-40
```
# volume prune

<!---MARKER_GEN_START-->
Remove unused local volumes

### Options

| Name                          | Type     | Default | Description                                        |
|:------------------------------|:---------|:--------|:---------------------------------------------------|
| [`-a`](#all), [`--all`](#all) | `bool`   |         | Remove all unused volumes, not just anonymous ones |
| [`--filter`](#filter)         | `filter` |         | Provide filter values (e.g. `label=<label>`)       |
| `-f`, `--force`               | `bool`   |         | Do not prompt for confirmation                     |


<!---MARKER_GEN_END-->

## Description

Remove all unused local volumes. Unused local volumes are those which are not
referenced by any containers. By default, it only removes anonymous volumes.

## Examples

```console
$ docker volume prune

WARNING! This will remove anonymous local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
07c7bdf3e34ab76d921894c2b834f073721fccfbbcba792aa7648e3a7a664c2e
my-named-vol

Total reclaimed space: 36 B
```

### <a name="all"></a> Filtering (--all, -a)

Use the `--all` flag to prune both unused anonymous and named volumes.

### <a name="filter"></a> Filtering (--filter)
```

## `docker system prune` — https://raw.githubusercontent.com/docker/cli/v27.3.1/docs/reference/commandline/system_prune.md (docker/cli tag v27.3.1) lines 1-65
```
# system prune

<!---MARKER_GEN_START-->
Remove unused data

### Options

| Name                  | Type     | Default | Description                                        |
|:----------------------|:---------|:--------|:---------------------------------------------------|
| `-a`, `--all`         | `bool`   |         | Remove all unused images not just dangling ones    |
| [`--filter`](#filter) | `filter` |         | Provide filter values (e.g. `label=<key>=<value>`) |
| `-f`, `--force`       | `bool`   |         | Do not prompt for confirmation                     |
| `--volumes`           | `bool`   |         | Prune anonymous volumes                            |


<!---MARKER_GEN_END-->

## Description

Remove all unused containers, networks, images (both dangling and unused),
and optionally, volumes.

## Examples

```console
$ docker system prune

WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - unused build cache
Are you sure you want to continue? [y/N] y

Deleted Containers:
f44f9b81948b3919590d5f79a680d8378f1139b41952e219830a33027c80c867
792776e68ac9d75bce4092bc1b5cc17b779bc926ab04f4185aec9bf1c0d4641f

Deleted Networks:
network1
network2

Deleted Images:
untagged: hello-world@sha256:f3b3b28a45160805bb16542c9531888519430e9e6d6ffc09d72261b0d26ff74f
deleted: sha256:1815c82652c03bfd8644afda26fb184f2ed891d921b20a0703b46768f9755c57
deleted: sha256:45761469c965421a92a69cc50e92c01e0cfa94fe026cdd1233445ea00e96289a

Total reclaimed space: 1.84kB
```

By default, volumes aren't removed to prevent important data from being
deleted if there is currently no container using the volume. Use the `--volumes`
flag when running the command to prune anonymous volumes as well:

```console
$ docker system prune -a --volumes

WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all anonymous volumes not used by at least one container
        - all images without at least one container associated to them
        - all build cache
Are you sure you want to continue? [y/N] y

```

## `docker compose down` — https://raw.githubusercontent.com/docker/compose/v2.29.7/docs/reference/compose_down.md (docker/compose tag v2.29.7) lines 1-30
```
# docker compose down

<!---MARKER_GEN_START-->
Stops containers and removes containers, networks, volumes, and images created by `up`.

By default, the only things removed are:

- Containers for services defined in the Compose file.
- Networks defined in the networks section of the Compose file.
- The default network, if one is used.

Networks and volumes defined as external are never removed.

Anonymous volumes are not removed by default. However, as they don’t have a stable name, they are not automatically
mounted by a subsequent `up`. For data that needs to persist between updates, use explicit paths as bind mounts or
named volumes.

### Options

| Name               | Type     | Default | Description                                                                                                             |
|:-------------------|:---------|:--------|:------------------------------------------------------------------------------------------------------------------------|
| `--dry-run`        | `bool`   |         | Execute command in dry run mode                                                                                         |
| `--remove-orphans` | `bool`   |         | Remove containers for services not defined in the Compose file                                                          |
| `--rmi`            | `string` |         | Remove images used by services. "local" remove only images that don't have a custom tag ("local"\|"all")                |
| `-t`, `--timeout`  | `int`    | `0`     | Specify a shutdown timeout in seconds                                                                                   |
| `-v`, `--volumes`  | `bool`   |         | Remove named volumes declared in the "volumes" section of the Compose file and anonymous volumes attached to containers |


<!---MARKER_GEN_END-->

```
