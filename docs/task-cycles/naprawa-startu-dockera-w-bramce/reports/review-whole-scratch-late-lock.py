"""Scratch: a process whose first ask found no daemon, but whose lock comes after another
process's whole start, starts Docker Desktop a second time."""
import os, sys
from unittest import mock
sys.path.insert(0, os.getcwd())
os.environ["LOOP2_DOCKER_RUN_STATE"] = os.path.join(os.getcwd(), ".runs", "review-whole", "state.json")
from scripts import docker_gate

asks = iter([False])
starts = []
with mock.patch.object(docker_gate, "docker_command", return_value="docker"), \
     mock.patch.object(docker_gate, "desktop_present", return_value=True), \
     mock.patch.object(docker_gate, "daemon_answers", side_effect=lambda timeout=0: next(asks, True)), \
     mock.patch.object(docker_gate, "start_desktop", side_effect=lambda timeout=0: starts.append(1)):
    print("gap:", docker_gate.daemon_gap(), "starts:", len(starts))
