# Units of guidelines/coding.md

Each unit has an id, the lines it occupies in the file, the section, its kind and its full text.

S001 | lines 8-8 | section: When to read | prose
Przed każdą zmianą kodu produktu, także skryptów i testów.

S002 | lines 8-9 | section: When to read | prose
Stosuj sprawdzenia niezmienników wskazanych poniżej przez ich metody zapisane w fundamencie.

S003 | lines 10-10 | section: When to read | prose
Wytyczne przyjmują szablony przypiętego the-way zgodnie z D-28.

S004 | lines 14-14 | section: Kinds of code | table-row
| Kind | File | When to read |

S005 | lines 16-16 | section: Kinds of code | table-row
| content-data | `guidelines/coding-content-data.md` | Przed dodaniem lub zmianą pliku danych treści gry w simulation. |

S006 | lines 17-17 | section: Kinds of code | table-row
| simulation-module | `guidelines/coding-simulation-module.md` | Przed dodaniem lub zmianą modułu simulation poza danymi treści gry i plikiem zapisu gry. |

S007 | lines 18-18 | section: Kinds of code | table-row
| saved-game | `guidelines/coding-saved-game.md` | Przed dodaniem lub zmianą pliku simulation, który zamienia stan gry na dokument zapisu albo dokument pobrany z serwera lub zachowany w pamięci strony po zapisie, który nie zastał sesji, na stan gry lub odmowę. |

S008 | lines 19-19 | section: Kinds of code | table-row
| browser-module | `guidelines/coding-browser-module.md` | Przed dodaniem lub zmianą modułu browser-view w katalogu widoku. |

S009 | lines 20-20 | section: Kinds of code | table-row
| http-application | `guidelines/coding-http-application.md` | Przed dodaniem lub zmianą pliku składającego aplikację HTTP w account-server. |

S010 | lines 21-21 | section: Kinds of code | table-row
| password-hashing | `guidelines/coding-password-hashing.md` | Przed dodaniem lub zmianą pliku wykonującego haszowanie albo sprawdzanie haseł. |

S011 | lines 22-22 | section: Kinds of code | table-row
| database-access | `guidelines/coding-database-access.md` | Przed dodaniem lub zmianą pliku dostępu do bazy danych. |

S012 | lines 23-23 | section: Kinds of code | table-row
| session-store | `guidelines/coding-session-store.md` | Przed dodaniem lub zmianą magazynu sesji biblioteki. |

S013 | lines 24-24 | section: Kinds of code | table-row
| account-policy | `guidelines/coding-account-policy.md` | Przed dodaniem lub zmianą pliku sprawdzania danych logowania i rejestracji albo dopuszczania prób. |

S014 | lines 25-25 | section: Kinds of code | table-row
| browser-api-client | `guidelines/coding-browser-api-client.md` | Przed dodaniem lub zmianą pliku klienta API serwera w przeglądarce. |

S015 | lines 26-26 | section: Kinds of code | table-row
| mail-sending | `guidelines/coding-mail-sending.md` | Przed dodaniem lub zmianą pliku wysyłki poczty w account-server. |

S016 | lines 37-40 | section: Linter | prose
TS/JS aplikacji, skryptów i testów w browser-view, simulation, account-server i build-tools sprawdza lokalny ESLint 10.12.0 z konfiguracją `eslint.config.mjs`: `recommended` z @eslint/js 10.0.1, a dla TS również `recommendedTypeChecked` z typescript-eslint 8.71.2, oba bez zmian.

S017 | lines 40-41 | section: Linter | prose
Parser używa API TypeScript 6.0.2 oraz globals 17.13.0; kompilator aplikacji pozostaje TypeScript 7.

S018 | lines 41-44 | section: Linter | prose
Konfiguracja wyłącza komentarze konfiguracyjne w kodzie (`noInlineConfig`), a ESLint działa z `--max-warnings 0`, więc każdy komentarz `eslint-disable` albo `/* eslint … */` oblewa kontrolę.

S019 | lines 44-46 | section: Linter | prose
Konfiguracja nie ustawia własnych reguł, ignoruje tylko zależności, pliki wygenerowane, submoduł i wyniki tymczasowe, a jej wzorce plików obejmują każdy katalog z kodem tych części.

S020 | lines 46-47 | section: Linter | prose
Tego pilnuje przegląd każdej zmiany konfiguracji według D-29.

S021 | lines 47-49 | section: Linter | prose
Test uruchamia ESLint z własnym pustym plikiem wyciszeń (`--suppressions-location`), więc `eslint-suppressions.json` w repozytorium niczego nie wycisza.

S022 | lines 51-53 | section: Linter | prose
Python we wszystkich sześciu częściach z kodem sprawdza lokalny Ruff 0.17.1 z konfiguracją `ruff.toml`: 393 reguły z domyślnego zestawu 407 reguł bez preview blokują, a czternaście wymienionych w Examples pozostaje przykładami.

S023 | lines 53-55 | section: Linter | prose
Ruff dostaje ten plik wprost i `--ignore-noqa`, więc inna konfiguracja Ruffa w repozytorium nie zmienia zestawu, a `# noqa` ani `# ruff: noqa` niczego nie wyciszają.

S024 | lines 55-56 | section: Linter | prose
Ruff sprawdza pliki `.py` i `.pyi`; skrypt Pythona bez rozszerzenia pomija.

S025 | lines 58-61 | section: Linter | prose
Samodzielne skrypty Bash we wszystkich częściach z kodem, również bez rozszerzenia, sprawdza lokalny ShellCheck 0.11.0 z `--norc --shell=bash --extended-analysis=true`: domyślne nieopcjonalne kontrole i każdy poziom komunikatu, bez reguł przykładowych.

S026 | lines 61-62 | section: Linter | prose
Test wymienia skrypty po nazwie: nowy skrypt Bash dopisz do listy w `tests/quality/test_quality_invariants.py`.

S027 | lines 63-64 | section: Linter | prose
Dyrektywa `# shellcheck disable=…` działa, więc jej nie dodawaj; przegląd ją odrzuca.

S028 | lines 64-65 | section: Linter | prose
Polecenia wewnątrz YAML i literałów testów nie są samodzielnymi skryptami Bash.

S029 | lines 67-67 | section: Linter | prose
Naprawiaj zgłoszenie w pliku, zamiast wyciszać blokującą regułę.

S030 | lines 67-68 | section: Linter | prose
Zmiana zestawu wymaga zaakceptowanej przez człowieka zmiany odpowiedniej decyzji.

S031 | lines 68-70 | section: Linter | prose
Wersje narzędzi przypinają deklaracje wskazane w Where in code; testy uruchamiają lokalne kopie, bez pobierania narzędzia przy kontroli.

S032 | lines 113-117 | section: Formatter | prose
TS/JS aplikacji, skryptów i testów w browser-view, simulation, account-server i build-tools oraz HTML/CSS przeglądarki sprawdza `--check` lokalnego Prettiera 3.9.10 z `--no-config --no-editorconfig --ignore-path .gitignore`: domyślne ustawienia bez opcji eksperymentalnych, czyli dwie spacje, średniki, preferowane podwójne cudzysłowy, docelowa szerokość 80 i LF.

S033 | lines 117-118 | section: Formatter | prose
`.prettierignore` nie ukrywa pliku.

S034 | lines 118-119 | section: Formatter | prose
Edytor korzysta z `prettier.config.mjs`, który nie ustawia żadnej opcji, więc formatuje tak samo; nie dodawaj do niego opcji.

S035 | lines 119-120 | section: Formatter | prose
`.gitattributes` utrzymuje LF również na Windows.

S036 | lines 120-123 | section: Formatter | prose
Zakres obejmuje nowe pliki w katalogach wzorców testu, bez historycznych wyjątków i bez komentarzy `prettier-ignore`, których pilnuje przegląd; nie obejmuje Markdown, ikon, plików wygenerowanych, zależności, submodułu i wyników tymczasowych.

S037 | lines 140-141 | section: Dependency audit | prose
Gdy `package-lock.json` jest taki sam jak w `{fork-point}`, audyt przechodzi bez sieci.

S038 | lines 141-145 | section: Dependency audit | prose
W przeciwnym razie `scripts/audit_dependencies.py` uruchamia lokalny npm 12.2.1 (`npm audit --package-lock-only` przez publiczny rejestr npm) dla bieżącego pliku blokady i dla jego wersji z `{fork-point}` i oblewa na każde ostrzeżenie npm/GitHub Advisory Database od poziomu low, którego nie było na początku zmiany; info nie blokuje.

S039 | lines 145-147 | section: Dependency audit | prose
Audyt obejmuje zależności bezpośrednie, pośrednie, produkcyjne, deweloperskie, opcjonalne i peer głównego pakietu npm; drugi, zagnieżdżony pakiet npm nie jest audytowany.

S040 | lines 149-149 | section: Dependency audit | prose
Nieudane zapytanie albo nieczytelny raport nie dają pozytywnego wyniku.

S041 | lines 149-150 | section: Dependency audit | prose
Nowe ostrzeżenie może zmienić wynik dla tego samego pliku blokady.

S042 | lines 150-151 | section: Dependency audit | prose
Próg nie zmienia się automatycznie i nie ma terminu rewizji.

S043 | lines 151-152 | section: Dependency audit | prose
Zapytanie wysyła nazwy i wersje pakietów bez kodu aplikacji.

S044 | lines 152-153 | section: Dependency audit | prose
Audyt nie obejmuje runtime, obrazów kontenerów, pakietów systemowych ani zależności spoza npm.

S045 | lines 162-164 | section: Recording a failure | prose
Awaria to sytuacja, w której produkt nie zrobił tego, o co go poproszono albo co miał zrobić sam, z powodu innego niż spodziewana odmowa, także gdy zawiodła usługa zewnętrzna.

S046 | lines 164-165 | section: Recording a failure | prose
Spodziewana odmowa, taka jak błędne hasło, jest zwykłą odpowiedzią i ta reguła jej nie dotyczy.

S047 | lines 165-167 | section: Recording a failure | prose
Awarię zapisuj zawsze z przyczyną, czyli z pierwotnym błędem, a nie z samym napisem, raz, tam gdzie kod ją obsługuje.

S048 | lines 167-168 | section: Recording a failure | prose
W kodzie Node.js robi to `writeFailure` z `src/server/log-line.ts`, a porażkę bez pierwotnego błędu nazywa kodem `ReasonedFailure`.

S049 | lines 170-171 | section: Recording a failure | prose
Każdy osobno działający proces ma jedną obsługę ostatniej szansy, która zapisuje to, czego nie obsłużył żaden kod (D-253).

S050 | lines 171-173 | section: Recording a failure | prose
Procesy dotykające danych kont — serwer, `account-block` i `account-backup` — mają własną, `installLastResort`, bo domyślny wypis mógłby zacytować wartości.

S051 | lines 173-175 | section: Recording a failure | prose
W skryptach uruchamianych ręcznie albo przez bramkę testów, które tych danych nie dotykają, regułę spełnia domyślny wypis Node i Pythona, bo zapisuje to, czego nikt nie obsłużył.

S052 | lines 175-177 | section: Recording a failure | prose
`account-database-check`, `measure-passwords`, `deploy/loop2-backup` i `scripts/restore-trial.mjs` już ją mają.

S053 | lines 177-180 | section: Recording a failure | prose
Przeglądarka też ją ma: `installLastResort` z `src/browser/view/last-resort.ts` anuluje zdarzenie błędu, którego nic nie obsłużyło, i zapisuje w konsoli zwykłym tekstem jeden wiersz z rodzajem, kodem i miejscem obsługi, bez treści i stosu błędu, ten sam wiersz raz do odświeżenia strony.

S054 | lines 180-181 | section: Recording a failure | prose
Reguła obowiązuje też `deploy/loop2-deploy`, który nie zostawia wiersza końcowego, gdy zostanie zabity.

S055 | lines 190-190 | section: Hiding a failure | prose
Awarii nie zamieniaj ani w odpowiedź „wszystko w porządku”, ani w pustą listę.

S056 | lines 191-193 | section: Hiding a failure | prose
Tryb zdegradowany, w którym produkt działa dalej bez jednej funkcji, jest dopuszczalny tylko tam, gdzie ustala go zadanie, zapisując go jako decyzję produktu, i zawsze zostawia wiersz w logach.

S057 | lines 202-205 | section: Identifiers in log lines | prose
Wiersz przebiegu sprawy, czyli tego, co produkt robi dla jednej sprawy od żądania albo zadania w tle do jej końca, niesie te identyfikatory z listy `### Logging scope`, które łączą zdarzenia tej sprawy, każdy pod nazwą z listy, tą samą w każdym wierszu, tak aby wyszukiwanie znalazło całą sprawę.

S058 | lines 205-208 | section: Identifiers in log lines | prose
W kodzie Node.js stałe pola wiersza to `event` albo `failure`, `kind`, `code`, `place` i identyfikatory z listy; dalsze pole, takie jak `linkPurpose`, jest polem, a nie pozycją listy.

S059 | lines 208-209 | section: Identifiers in log lines | prose
W konsoli przeglądarki wiersz jest zwykłym tekstem, a skrypty Bash zostają przy swoim tekście.

S060 | lines 209-211 | section: Identifiers in log lines | prose
Wiersz spoza przebiegu sprawy, taki jak wiersz przy starcie procesu albo skryptu budowania, nie niesie żadnego identyfikatora.

S061 | lines 211-212 | section: Identifiers in log lines | prose
Wiersz obsługi ostatniej szansy nie musi nieść żadnego, bo ta obsługa zwykle nie wie, jaka to była sprawa.

S062 | lines 221-221 | section: Business events | prose
Każde zdarzenie biznesowe z listy `### Logging scope` zostawia wiersz logu.

S063 | lines 222-222 | section: Business events | prose
W kodzie Node.js pisze go `writeEvent` z `src/server/log-line.ts`.

S064 | lines 231-232 | section: Secrets and personal data | prose
Logi nie zawierają żadnego sekretu, bez wyjątku, więc identyfikator będący sekretem zostaje poza nimi, nawet gdyby stał na liście.

S065 | lines 232-234 | section: Secrets and personal data | prose
Nie zawierają danych osobowych; jedynym wyjątkiem od tego zakazu są identyfikatory z listy `### Logging scope`.

S066 | lines 234-235 | section: Secrets and personal data | prose
Kod nie zapisuje całego obiektu ani treści żądania, co nie dotyczy samego błędu.

S067 | lines 235-237 | section: Secrets and personal data | prose
Pierwotny błąd cytujący takie wartości zapisuj bez nich, z jego rodzajem, kodem i miejscem w kodzie, a ta reguła ma pierwszeństwo przed `### Recording a failure`.

S068 | lines 237-238 | section: Secrets and personal data | prose
Dlatego z błędu czytaj tylko jego nazwę i kod oraz numer `errcode` SQLite, nigdy `message` ani `stack`.

S069 | lines 247-247 | section: Logging scope | prose
Identyfikatory:

S070 | lines 249-249 | section: Logging scope | bullet
- `accountId` — numer konta.

S071 | lines 251-251 | section: Logging scope | prose
Zdarzenia biznesowe:

S072 | lines 253-253 | section: Logging scope | bullet
- konto założone (`account-created`);

S073 | lines 254-254 | section: Logging scope | bullet
- logowanie (`signed-in`), także to po rejestracji;

S074 | lines 255-255 | section: Logging scope | bullet
- wylogowanie (`signed-out`);

S075 | lines 256-256 | section: Logging scope | bullet
- odnośnik wystawiony (`link-issued`);

S076 | lines 257-257 | section: Logging scope | bullet
- wiadomość wysłana (`message-sent`);

S077 | lines 258-258 | section: Logging scope | bullet
- adres potwierdzony (`email-confirmed`);

S078 | lines 259-259 | section: Logging scope | bullet
- hasło ustawione odnośnikiem (`password-set`);

S079 | lines 260-260 | section: Logging scope | bullet
- konto zablokowane (`account-blocked`);

S080 | lines 261-261 | section: Logging scope | bullet
- konto odblokowane (`account-unblocked`);

S081 | lines 262-262 | section: Logging scope | bullet
- kopia bazy wykonana;

S082 | lines 263-263 | section: Logging scope | bullet
- wdrożenie.

S083 | lines 265-265 | section: Logging scope | prose
Ta lista jest obietnicą produktu, a nie spisem jego kodu.

S084 | lines 265-267 | section: Logging scope | prose
Pozycja pasująca do zasady z D-252 wchodzi w zmianie, która ją wnosi; agent dodaje ją sam, także identyfikator rzeczy.

S085 | lines 267-268 | section: Logging scope | prose
Pozycja wskazująca na osobę, także numer, który produkt nadaje użytkownikowi, wchodzi tylko za zgodą człowieka, jako nowe znaczenie.

S086 | lines 274-275 | section: PLW1510 | prose
Sprawdzenie powodzenia odczytu procesów jest przydatne przed użyciem stdout do sprzątania.

S087 | lines 275-275 | section: PLW1510 | prose
Nie każdy pomocniczy `subprocess.run` potrzebuje tego samego wzorca.

S088 | lines 279-279 | section: I001 | prose
Porządek importów można poprawić dla czytelności; ta reguła nie blokuje zmiany.

S089 | lines 283-284 | section: ISC004 | prose
Sąsiadujące literały w kolekcji mogą składać czytelną długą treść; ujęcie ich w dodatkowe nawiasy pozostaje sugestią.

S090 | lines 288-289 | section: UP031 | prose
Wybór zapisu interpolacji pozostaje przykładem, bez obowiązkowego przepisywania działających literałów używających `%`.

S091 | lines 293-293 | section: RUF059 | prose
Rozpakowanie wyniku z nazwanym nieużywanym elementem może objaśniać jego strukturę.

S092 | lines 297-297 | section: PIE808 | prose
Jawny początek zakresu może ułatwiać odczyt granic iteracji.

S093 | lines 301-302 | section: RUF007 | prose
Iterowanie po kolejnych parach przez `zip` może pozostać zamiast zamiany na `itertools.pairwise`.

S094 | lines 306-306 | section: RUF012 | prose
Współdzielone dane klasy mogą być celowe; sam komunikat nie nakazuje ich przebudowy.

S095 | lines 310-310 | section: PLR0402 | prose
Zapis importu i aliasu może zachowywać czytelny kontekst modułu.

S096 | lines 314-315 | section: FURB167 | prose
Krótki alias flagi wyrażenia regularnego, taki jak `re.S`, może pozostać zamiast zamiany na dłuższą nazwę `re.DOTALL`.

S097 | lines 319-319 | section: RUF100 | prose
Istniejące `noqa: E402` może pozostać, choć E402 nie jest w blokującym zestawie.

S098 | lines 320-320 | section: RUF100 | prose
Nie uprawnia to do wyciszenia reguły blokującej.

S099 | lines 324-324 | section: SIM117 | prose
Zagnieżdżone konteksty mogą rozdzielać kroki przygotowania i sprzątania.

S100 | lines 328-329 | section: FURB192 | prose
Odczyt pierwszego elementu posortowanej kolekcji może pozostać zamiast zamiany na `min`.

S101 | lines 333-333 | section: SIM102 | prose
Zagnieżdżone warunki mogą pokazywać dwa osobne etapy sprawdzania.

S102 | lines 337-338 | section: Odłożone rodzaje i formatowanie | prose
Zasady testowania, wzorce według poziomów i przykład jawnego czasu określa `guidelines/testing.md`.

S103 | lines 338-338 | section: Odłożone rodzaje i formatowanie | prose
Ogólne kontrole jakości kodu obejmują też pliki testów.

S104 | lines 339-339 | section: Odłożone rodzaje i formatowanie | prose
Automatyczne formatowanie Python i Bash pozostaje odłożone.

S105 | lines 339-340 | section: Odłożone rodzaje i formatowanie | prose
Osobne wzorce budowania, wdrożenia, punktów uruchomienia, HTML i CSS również są odłożone.

S106 | lines 340-342 | section: Odłożone rodzaje i formatowanie | prose
CSS nie ma własnego wzorca ani własnych wytycznych rodzaju; reguły arkuszy stylów, których pilnuje test, stoją w `guidelines/styleguide-browser-view.md`.

S107 | lines 343-344 | section: Odłożone rodzaje i formatowanie | prose
Wzorzec zapisu gry wskazuje rodzaj `saved-game`, a wzorzec poczty rodzaj `mail-sending` w tabeli rodzajów.

S108 | lines 345-345 | section: Odłożone rodzaje i formatowanie | prose
Przed wyborem wzorca odłożonego istniejącego rodzaju porównuje się jego pliki.

S109 | lines 346-346 | section: Odłożone rodzaje i formatowanie | prose
Ogólne kontrole nadal obejmują cały przyjęty zakres kodu.

S110 | lines 346-348 | section: Odłożone rodzaje i formatowanie | prose
Dla przyjętych linterów obowiązują niezmienniki pełnej zgodności kodu, bez przejściowej kontroli „nie pogarszaj starego kodu”.

S111 | lines 352-352 | section: Where in code | bullet
- `package.json`

S112 | lines 353-353 | section: Where in code | bullet
- `package-lock.json`

S113 | lines 354-354 | section: Where in code | bullet
- `eslint.config.mjs`

S114 | lines 355-355 | section: Where in code | bullet
- `prettier.config.mjs`

S115 | lines 356-356 | section: Where in code | bullet
- `requirements-quality.in`

S116 | lines 357-357 | section: Where in code | bullet
- `requirements-quality.txt`

S117 | lines 358-358 | section: Where in code | bullet
- `ruff.toml`

S118 | lines 359-359 | section: Where in code | bullet
- `.gitattributes`

S119 | lines 360-360 | section: Where in code | bullet
- `scripts/audit_dependencies.py`

S120 | lines 361-361 | section: Where in code | bullet
- `tests/quality/test_quality_invariants.py`

