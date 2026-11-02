# Coding guidelines — mail-sending

- **Discipline:** coding
- **Applies to:** account-server

## When to read

Przed dodaniem lub zmianą pliku wysyłki poczty w części account-server:
składania wiadomości o koncie albo jej przekazywania serwerowi poczty.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/server/account-mail.ts` | exemplar | D-162 |

## Rules

### Wysyłka tylko po przejściu połączenia na TLS

- **Decision:** D-154
- **Invariant:** account-email-nodemailer-starttls
- **Good:** Wiadomość wychodzi dopiero po tym, jak połączenie z serwerem poczty przeszło na TLS; serwer bez STARTTLS albo z niezaufanym certyfikatem nie dostaje ani hasła, ani wiadomości.
- **Bad:** Wysyłka wraca do tekstu jawnego, gdy serwer nie oferuje STARTTLS, albo przekazuje hasło przed sprawdzeniem, że połączenie jest szyfrowane.

Połączenie z serwerem poczty wymaga STARTTLS i nie ma wariantu bez
szyfrowania. Certyfikat serwera jest sprawdzany względem nazwy hosta i nigdy nie
jest wyłączany, także w testach. Hasło jest przekazywane dopiero po
przejściu połączenia na TLS.

### Jedna wiadomość dla jednego odbiorcy, od ustalonego nadawcy

- **Decision:** D-158 · D-227
- **Invariant:** none
- **Good:** Wiadomość ma jednego odbiorcę, ustalonego nadawcę z nazwą wyświetlaną, ustalony temat i treść zwykłym tekstem, a adres odbiorcy stoi tylko w jego własnym polu.
- **Bad:** Obok tekstu stoi część HTML, adres gracza trafia do pola innego niż pole odbiorcy albo wiadomość ma drugiego odbiorcę.

Adres odbiorcy pochodzi od gracza, więc plik traktuje go jak dane z zewnątrz:
nie wstawia go do żadnego pola poza polem odbiorcy i nie dopuszcza, żeby dodał
odbiorców lub tekst do nagłówka. Nadawca, nazwa wyświetlana, temat i treść są
ustalone w pliku wysyłki, nie dobierane przez wywołującego; dotyczy to obu
wiadomości, potwierdzającej i o ustawieniu nowego hasła, która ma tekst zwykły
bez HTML (D-227). Przegląd każdej
zmiany porównuje wiadomość z tą zasadą.

### Porażka jest wynikiem, nie błędem

- **Decision:** D-162
- **Invariant:** none
- **Good:** Wysyłka kończy się wynikiem „sent” albo „failed” w ograniczonym czasie, a trasa czyta ten wynik.
- **Bad:** Wysyłka rzuca błąd do wywołującego, czeka bez końca na serwer, który milczy, albo trasa łapie błędy biblioteki poczty.

Operacja wysyłki nigdy nie odrzuca obietnicy; każdą przyczynę porażki
(odmowę adresu, brak TLS, błąd logowania, odrzucenie wiadomości, brak odpowiedzi
w czasie) zwraca jako „failed”. Cały czas wysyłki, z łączeniem włącznie,
ma twardy limit, a późna odpowiedź jest ignorowana. Przegląd każdej zmiany
porównuje wysyłkę z tą zasadą.

### Nic tajnego w dzienniku

- **Decision:** D-162
- **Invariant:** none
- **Good:** Przy porażce plik zapisuje jeden wiersz z rodzajem i kodem błędu biblioteki, a gdy błędu biblioteki nie ma, z kodem nazywającym powód.
- **Bad:** Dziennik dostaje komunikat błędu, odpowiedź serwera poczty, treść wiadomości, odnośnik, token, login albo hasło.

Z błędu biblioteki plik wysyłki zapisuje tylko jego rodzaj i kod. Niczego
innego, co pochodzi od serwera poczty albo z wiadomości, nie zapisuje do
dziennika, bo mogłoby zawierać dane uwierzytelniające lub odnośnik z tokenem. Przegląd każdej zmiany porównuje dziennik pliku z tą zasadą.

### Składanie wiadomości poza trasą

- **Decision:** D-162
- **Invariant:** none
- **Good:** Plik wysyłki składa wiadomość i przekazuje ją serwerowi poczty niezależnie od HTTP i bazy; trasa podaje adres i odnośnik, a odbiera wynik.
- **Bad:** Trasa składa tekst wiadomości albo nagłówki, a plik wysyłki zna żądanie HTTP albo bazę.

Składanie i nadawanie stoją w jednym pliku, bo bezpieczeństwo nagłówków, TLS
i obchodzenie się z sekretami musi stać w jednym miejscu. Trasa dostaje
od pliku wynik i nie sięga do błędów biblioteki poczty.

## Examples

### Wzorzec rodzaju

`src/server/account-mail.ts` ma czyste funkcje składania wiadomości
potwierdzającej (`composeConfirmationMessage`) i o ustawieniu nowego hasła
(`composePasswordResetMessage`), każda z adresu i odnośnika, oraz nadawcę SMTP tworzony z ustawień
poczty. Nadawca ma jedną operację, która przyjmuje złożoną wiadomość
i zwraca wynik; trasy dostają go przez interfejs, więc ich testy podstawiają
zastępczego nadawcę.

### Sprawdzenie odbiorcy

Przed połączeniem plik odrzuca adres, który nie jest jednym zwykłym adresem:
z dokładnie jednym znakiem `@` i tekstem po obu jego stronach, bez białych
znaków, znaków sterujących ani przecinka, średnika, nawiasów, cudzysłowu,
odwrotnego ukośnika i dwukropka. Rejestracja takie adresy przyjmuje, więc
dochodzą do nadawcy.

### Połączenie

Połączenie jest bez ukrytego TLS i z wymaganym STARTTLS, z minimalną wersją
TLS 1.2 i sprawdzaniem certyfikatu. Każda wiadomość ma własne połączenie, bez
puli, z osobnymi limitami faz i ogólnym limitem, który jest opcją konstruktora,
żeby test mógł go skrócić. Koperta SMTP jest podana wprost, a nie wyliczana
z nagłówków.

### Biblioteka poczty

Plik wyłącza dziennik i wyjście diagnostyczne biblioteki oraz jej dostęp do
plików i adresów URL przy składaniu treści.

### Dziennik porażki

Wiersz porażki pisze `writeFailure`, z rodzajem i kodem błędu biblioteki.
Porażka bez błędu biblioteki nazywa swój powód kodem `ReasonedFailure`:
`UNSAFE_RECIPIENT`, `DEADLINE`, `CONNECTION_ENDED` albo `NOT_ENCRYPTED`. Trasa
podaje nadawcy pola swojej sprawy, `accountId` i `linkPurpose`, a plik wysyłki
tylko przenosi je do wiersza.

### Dodatkowy certyfikat w testach

Nadawca przyjmuje opcjonalny, dodatkowy zaufany certyfikat serwera, używany
tylko przez testy z serwerem na lokalnym interfejsie; weryfikacja certyfikatu
nigdy nie jest wyłączana.

### Testowanie

Nadawcę testuje się jako test integracyjny z prawdziwym serwerem SMTP na
lokalnym interfejsie, a trasy z zastępczym nadawcą, zgodnie z D-163.
Zasady testów stoją w `guidelines/testing.md`.

## Where in code

- `src/server/`
- `src/server/account-mail.ts`
- `tests/account-mail.test.mjs`
