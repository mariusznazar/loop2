# 20-seed measurement

Command: `node .runs/task-cycles/walka-w-glebi-lasu/reports/measurement.mjs`

The actual fixed program (group conditions and rule order included):

```json
{
  "groups": [
    {
      "id": 1,
      "name": "Combat",
      "condition": {
        "kind": "always"
      },
      "rules": [
        {
          "condition": {
            "kind": "always"
          },
          "action": {
            "kind": "strikeWithStick"
          },
          "id": 18
        },
        {
          "condition": {
            "kind": "always"
          },
          "action": {
            "kind": "kick"
          },
          "id": 19
        }
      ]
    },
    {
      "id": 2,
      "name": "Existing",
      "condition": {
        "kind": "always"
      },
      "rules": [
        {
          "condition": {
            "kind": "satietyBelow",
            "value": 35
          },
          "action": {
            "kind": "eat"
          },
          "id": 1
        },
        {
          "condition": {
            "kind": "temperatureBelow",
            "value": 36
          },
          "action": {
            "kind": "lightCampfire"
          },
          "id": 2
        },
        {
          "condition": {
            "kind": "temperatureBelow",
            "value": 36.5
          },
          "action": {
            "kind": "feedCampfire"
          },
          "id": 3
        },
        {
          "condition": {
            "kind": "temperatureBelow",
            "value": 35.2
          },
          "action": {
            "kind": "walkToCampfire"
          },
          "id": 4
        },
        {
          "condition": {
            "kind": "campfireLeftBelow",
            "value": 1
          },
          "action": {
            "kind": "craftCampfire"
          },
          "id": 5
        },
        {
          "condition": {
            "kind": "itemBelow",
            "item": "berry",
            "value": 1
          },
          "action": {
            "kind": "gather",
            "resource": "berry"
          },
          "id": 6
        },
        {
          "condition": {
            "kind": "itemBelow",
            "item": "berry",
            "value": 1
          },
          "action": {
            "kind": "walkTo",
            "resource": "berry"
          },
          "id": 7
        },
        {
          "condition": {
            "kind": "hereBelow",
            "resource": "berry",
            "value": 1
          },
          "action": {
            "kind": "explore"
          },
          "id": 8
        },
        {
          "condition": {
            "kind": "itemBelow",
            "item": "berry",
            "value": 1
          },
          "action": {
            "kind": "wander"
          },
          "id": 9
        },
        {
          "condition": {
            "kind": "itemBelow",
            "item": "stick",
            "value": 8
          },
          "action": {
            "kind": "gather",
            "resource": "stick"
          },
          "id": 10
        },
        {
          "condition": {
            "kind": "itemBelow",
            "item": "stick",
            "value": 8
          },
          "action": {
            "kind": "walkTo",
            "resource": "stick"
          },
          "id": 11
        },
        {
          "condition": {
            "kind": "temperatureBelow",
            "value": 36
          },
          "action": {
            "kind": "lightItem"
          },
          "id": 12
        },
        {
          "condition": {
            "kind": "always"
          },
          "action": {
            "kind": "explore"
          },
          "id": 13
        },
        {
          "condition": {
            "kind": "awayFromCampfire"
          },
          "action": {
            "kind": "walkToCampfire"
          },
          "id": 14
        },
        {
          "condition": {
            "kind": "always"
          },
          "action": {
            "kind": "gather",
            "resource": "stick"
          },
          "id": 15
        },
        {
          "condition": {
            "kind": "always"
          },
          "action": {
            "kind": "gather",
            "resource": "berry"
          },
          "id": 16
        },
        {
          "condition": {
            "kind": "always"
          },
          "action": {
            "kind": "wander"
          },
          "id": 17
        }
      ]
    }
  ],
  "nextGroupId": 3,
  "nextRuleId": 20
}
```
Preparation: actual `newMapRun` seeds 1-20, minute 0, standard body, empty backpack, full knowledge available after Las and first wolf, forest solved to open forestDeep. No tuning; cap 5000.

Completed: 0/20

| Seed | Result | Minute | Streak | Defeated attacks | Discoveries / resumptions |
|---:|---|---:|---:|---:|---:|
| 1 | died | 247 | 0 | 1 | 0 / 0 |
| 2 | died | 258 | 5 | 0 | 0 / 0 |
| 3 | died | 256 | 0 | 0 | 0 / 0 |
| 4 | died | 202 | 0 | 1 | 0 / 0 |
| 5 | died | 253 | 5 | 0 | 0 / 0 |
| 6 | died | 306 | 0 | 0 | 0 / 0 |
| 7 | died | 276 | 5 | 0 | 0 / 0 |
| 8 | died | 223 | 5 | 0 | 0 / 0 |
| 9 | died | 256 | 0 | 1 | 0 / 0 |
| 10 | died | 252 | 0 | 1 | 0 / 0 |
| 11 | died | 202 | 0 | 1 | 0 / 0 |
| 12 | died | 243 | 5 | 0 | 0 / 0 |
| 13 | died | 272 | 0 | 0 | 0 / 0 |
| 14 | died | 247 | 0 | 1 | 0 / 0 |
| 15 | died | 229 | 5 | 0 | 0 / 0 |
| 16 | died | 247 | 0 | 1 | 0 / 0 |
| 17 | died | 722 | 42 | 2 | 0 / 0 |
| 18 | died | 253 | 5 | 0 | 0 / 0 |
| 19 | died | 202 | 0 | 1 | 0 / 0 |
| 20 | died | 249 | 5 | 0 | 0 / 0 |
