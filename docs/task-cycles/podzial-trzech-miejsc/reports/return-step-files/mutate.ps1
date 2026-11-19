param([string]$Root)
# Copies the built browser code and the guard test into this directory, applies one mutation at a
# time to the copied state module, and runs the copied test, to see which claim of the clause
# `tests:` of D-323 the guard case holds.
$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8 = New-Object System.Text.UTF8Encoding($false)
Remove-Item -Recurse -Force (Join-Path $here "dist"), (Join-Path $here "tests") -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force (Join-Path $here "dist"), (Join-Path $here "tests/view"), (Join-Path $here "tests/sim") | Out-Null
Copy-Item -Recurse (Join-Path $Root "dist/browser") (Join-Path $here "dist/browser")
Copy-Item (Join-Path $Root "tests/view/run-screen-state.test.mjs") (Join-Path $here "tests/view/")
Copy-Item (Join-Path $Root "tests/sim/understanding-fixture.mjs") (Join-Path $here "tests/sim/")
$module = Join-Path $here "dist/browser/view/run-screen-state.js"
$original = [System.IO.File]::ReadAllText($module, $utf8)
$mutations = [ordered]@{
  "none" = @("", "");
  "entered stops at halt" = @("                if (onScreen)`n                    return;`n                onScreen = true;", "                if (onScreen)`n                    return;`n                onScreen = true;`n                if (game.halted())`n                    return;");
  "openWindow stops at halt" = @("                if (run === null || !mapRunEnded(run))`n                    return false;`n                const closed", "                if (game.halted() || run === null || !mapRunEnded(run))`n                    return false;`n                const closed");
  "effectEnded stops at halt" = @("                if (!effectPending)`n                    return;", "                if (game.halted() || !effectPending)`n                    return;");
  "closeWindow closes after halt" = @("                if (game.halted())`n                    return;`n                windowOpen = false;", "                windowOpen = false;");
  "question closes after halt" = @("if (game.halted() || question === null)", "if (question === null)");
  "question asked after halt" = @("if (run === null || game.halted() || question !== null)", "if (run === null || question !== null)");
}
$original = $original -replace "`r`n", "`n"
foreach ($name in $mutations.Keys) {
  $pair = $mutations[$name]
  if ($pair[0] -ne "" -and -not $original.Contains($pair[0])) { Write-Output "$name : pattern not found"; continue }
  $text = if ($pair[0] -eq "") { $original } else { $original.Replace($pair[0], $pair[1]) }
  [System.IO.File]::WriteAllText($module, $text, $utf8)
  $out = & node --test --test-name-pattern "after halt" (Join-Path $here "tests/view/run-screen-state.test.mjs") 2>&1
  $code = $LASTEXITCODE
  $why = ($out | Select-String -Pattern "AssertionError|^\s+'[^']+'$|message:" | Select-Object -First 2 | ForEach-Object { $_.Line.Trim() }) -join " | "
  Write-Output "$name : exit $code $why"
}
