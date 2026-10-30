import { readFileSync, writeFileSync } from 'node:fs';
const root = '.runs/task-cycles/wprawa-i-drzewa/reports/';
const mutation = JSON.parse(readFileSync(root + 'review-mutation.json', 'utf8'));
const types = JSON.parse(readFileSync(root + 'review-mutant-types.json', 'utf8'));
const reasons = new Map();
function group(ids, category, reason) {
  for (const id of ids) reasons.set(String(id), { category, reason });
}
group([37,80], 'zachowanie niewarte utrwalania', 'Zmienia dokładny tekst błędu programisty; wymagane jest odrzucenie, nie ten wewnętrzny komunikat.');
group([44,46], 'równoważna w obecnych danych', 'Każdy dopuszczony atak zadaje dodatnie obrażenia (patyk 6, kopnięcie 3, dodatnie premie); warunek damage > 0 jest wtedy prawdziwy.');
group([700,701,702,704], 'zachowanie niewarte utrwalania', 'Ogólne porównanie zdarzenia z polem skill nie uczestniczy dziś w odkrywaniu: treeDiscovered obsługuje osobny przebieg po nowych drzewach, a happened nie emituje takiego zdarzenia. Nie utrwalam nieosiągalnego rozgałęzienia.');
group([650,651], 'zachowanie niewarte utrwalania', 'Żaden konsument nie odczytuje repertoire.trees; ekran filtruje understanding.trees po predyspozycjach sam. Osobna asercja chroniłaby dziś nieużywaną projekcję, nie zachowanie gracza.');
group([663,664,665,666], 'równoważna w obecnych danych', 'Odczyt wybiera tylko archetyp. Wszystkie tworzone postacie są Magiem, takim samym jak wartość domyślna; kupione gałęzie nadal bierze z postaci przejścia.');
group([691,693,695], 'równoważna w obecnych danych', 'Jedynym stworzeniem i jedyną odmianą zdarzenia attacked jest wolf, więc dodatkowe porównanie stworzenia nie rozróżnia dziś żadnych prawidłowych zdarzeń.');
group([689,698], 'równoważna dla zdarzeń produktu', 'Warianty Revelation określają obecność item/creature przez kind. Przy zgodnym kind obie strony mają to samo pole albo obie go nie mają; zmiana kontroli w gałęzi braku pola nie zmienia wyniku.');
group([769], 'równoważna', 'Usuwa break z ostatniego, pustego default switcha; po nim nie ma żadnego case.');
group([818], 'równoważna dla obecnego odkrywania', 'Nowy wolf odkrywa razem trzy akcje, dwa warunki i drzewa. Odjęcie jednego stworzenia zamiast dodania go nadal daje niepusty wynik. Ponowne spotkanie nie dodaje stworzenia.');
group([821], 'równoważna', 'Każde nowe drzewo w tym samym wywołaniu pochodzi z nowej akcji, więc dodatnia liczba drzew nigdy nie jest jedyną niepustą listą.');
group([54,55,56,57], 'równoważna w osiągalnych stanach', 'W trakcie przejścia repertuar bierze gałęzie ze snapshotu, a wszystkie postacie mają ten sam archetyp. Przy wysłaniu Obchód i tak nie może ruszyć na nieodkrytym polu wejścia; przed następnym wyborem dostępny jest już snapshot.');
group([60], 'równoważna w osiągalnych stanach', 'Przy wysłaniu brak gałęzi w pierwszym wyborze nie zmienia wykonalności Obchodu na nieodkrytym wejściu. W trwającym/restartowanym przejściu rangi postaci i snapshotu są takie same, bo kupowanie przy zachowanym przejściu jest odrzucone; różnica wprawy po domknięciu nie otwiera akcji.');
group([72], 'zachowanie niewarte utrwalania', 'Publiczny kontrakt tej wewnętrznej funkcji przyjmuje string, a UI przekazuje string. Dla pozostałych typów prostych obie drogi odrzucają wywołanie; specjalnego obiektu String nie wprowadza produkt ani granica zaufania tej zmiany.');
group([239], 'równoważna', 'walkTo przechodzi do wspólnego zwrotu kind: value.kind, resource: checkResource(...), co daje ten sam obiekt.');
group([290], 'zachowanie niewarte utrwalania', 'Zmienia wyłącznie pojedynczy punkt graniczny generatora (< na <=). Nie utrwalam konkretnego 32-bitowego wyniku losowania tylko dla tej mutacji; przypadek realnego przekroczenia progu przez premię 5 pp jest sprawdzony.');
group([342], 'zachowanie niewarte utrwalania', 'Defensywna ponowna kontrola patyka na końcu zapalania. W prawidłowej akcji wymagany patyk był przy starcie i żadna równoległa akcja go nie zabiera; Czysty płomień wymaga zera. Brak patyka jest sprawdzony przy wykonalności.');
group([377,378], 'zachowanie niewarte utrwalania', 'Defensywna kontrola ogniska/paliwa na końcu zasilania; wykonalność sprawdza je przed startem. Ognisko po wypaleniu zostaje, a w trakcie jednej akcji inna nie zużywa paliwa.');
group([436], 'zachowanie niewarte utrwalania', 'W prawidłowym przejściu eksploracja rozpoczyna się na nieodkrytym bieżącym kafelku i nic równolegle go nie odkrywa. Nie dodaję testu wymuszającego niemożliwy stan zakończenia; odmowa startu na odkrytym kafelku ma asercję.');
group([516], 'równoważna dla prawidłowych rang', 'Każda umiejętność przechowuje rangi własnych gałęzi. Koszt gałęzi innej umiejętności bierze slice(0, 0), więc dodaje zero.');
group([575], 'rzeczywista luka wymagająca asercji', 'R2: odjęcie wprawy walki zamiast dodania przechodzi cały mutacyjny zestaw testów; potrzebny odczyt wprawy przejścia po rozstrzygnięciu walki.');
group([538], 'rzeczywista luka wymagająca asercji', 'R3: pominięcie listy akcji gałęzi przenosi premię na inne akcje, a testy z pojedynczą pasującą gałęzią nadal przechodzą.');
group([313], 'rzeczywista luka wymagająca asercji', 'R4 (Minor): modyfikacja zapasu wszystkich kafelków przechodzi testy skupione na plecaku; sprawdzić także niezmienione zasoby innego kafelka.');
group([820], 'rzeczywista luka wymagająca asercji', 'R5 (Minor): pierwsze zapalenie może dać jedną akcję i jeden warunek, bez nowego drzewa; odejmowanie gubi całe odkrycie.');
const output = ['# Klasyfikacja mutacji', '', 'Zakres: 63 Survived i 4 NoCoverage z review-mutation.json. Każda ma osobny wiersz. Analiza typów: wirtualne źródło, API TypeScript 6.0.2 dostępne w repo, bez zapisu źródeł i bez emitowania plików. To dodatkowa analiza diagnostyk, nie podmiana kompilatora produktu 7.0.2 ani powtórzenie pełnej bramki.', '', '| ID | Miejsce | Status | Klasa | Powód |', '|---|---|---|---|---|'];
let count = 0;
for (const [file, data] of Object.entries(mutation.files)) {
  for (const mutant of data.mutants.filter(m => ['Survived', 'NoCoverage'].includes(m.status))) {
    const type = types.find(t => t.id === mutant.id);
    const classified = type.errors.length ? {
      category: 'kod niekompilowalny',
      reason: type.errors.map(e => `TS${e.code}: ${e.message}`).join('; '),
    } : reasons.get(mutant.id);
    if (!classified) throw new Error('Unclassified ' + mutant.id);
    const link = `[${file}:${mutant.location.start.line}](C:/Storage/repos/loop2-wt/wprawa-i-drzewa/${file}:${mutant.location.start.line})`;
    output.push(`| ${mutant.id} | ${link} | ${mutant.status} | ${classified.category} | ${classified.reason.replaceAll('|', '\\|')} |`);
    count++;
  }
}
if (count !== 67) throw new Error('Unexpected count ' + count);
writeFileSync(root + 'review-mutations.md', output.join('\n') + '\n');
console.log(JSON.stringify({ classified: count, typeRejected: types.filter(t => t.errors.length).length }));
