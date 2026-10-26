"""The source side of loop2-application-port: no published port or network bypass.

The real host's routing is outside this check; acceptance also requests the
application's old IPv6 host port from outside the host while the public site works.
The reader refuses network configuration it cannot establish as a private Compose
network, including an external/default-network override and a service namespace.
"""

import unittest

import loop2_invariant_support as support


def exposure_problems(text):
    top, services = support.compose_outline(text)
    problems = []
    for key in ("networks", "include", "extends"):
        if key in top:
            problems.append(f"top-level {key} can bypass the private project network")
    for name, keys in services.items():
        for key in ("ports", "network_mode", "networks", "extends", "links", "external_links"):
            if key in keys:
                problems.append(f"{name}: {key} can expose the application")
    return problems


class ApplicationPort(unittest.TestCase):

    def test_compose_exposes_no_application_port_outside_its_private_network(self):
        # invariant: loop2-application-port
        self.assertEqual(exposure_problems(support.read_required("compose.yaml")), [])

    def test_reader_refuses_published_ports_and_network_bypasses(self):
        private = "name: loop2\nservices:\n  app:\n    build: .\n"
        self.assertEqual(exposure_problems(private), [])
        cases = {
            "published IPv6 port": private + '    ports:\n      - "[::]:18080:3000"\n',
            "host network": private + "    network_mode: host\n",
            "other container network": private + "    network_mode: container:other\n",
            "external default network": private + "networks:\n  default:\n    external: true\n",
            "explicit service network": private + "    networks:\n      - shared\n",
            "included exposure": private + "include:\n  - another.yaml\n",
        }
        for name, text in cases.items():
            with self.subTest(case=name):
                self.assertTrue(exposure_problems(text))


if __name__ == "__main__":
    unittest.main()
