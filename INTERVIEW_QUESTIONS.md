# Pytania Rekrutacyjne - Contact List Project

## 📋 Spis Treści

1. [Architektura i Struktura Projektu](#architektura-i-struktura-projektu)
2. [React Hooks i Zarządzanie Stanem](#react-hooks-i-zarządzanie-stanem)
3. [Optymalizacja Wydajności](#optymalizacja-wydajności)
4. [TypeScript](#typescript)
5. [Testowanie](#testowanie)
6. [Alternatywne Rozwiązania](#alternatywne-rozwiązania)
7. [Szczegóły Implementacji](#szczegóły-implementacji)
8. [UX i Dostępność](#ux-i-dostępność)
9. [Edge Cases i Obsługa Błędów](#edge-cases-i-obsługa-błędów)
10. [Refaktoryzacja i Ulepszenia](#refaktoryzacja-i-ulepszenia)

---

## Architektura i Struktura Projektu

### 1. Dlaczego wybrałeś Atomic Design Pattern (atoms, molecules, organisms)?

**Oczekiwana odpowiedź:**

- Ułatwia organizację i ponowne użycie komponentów
- Jasny podział odpowiedzialności
- Łatwiejsze utrzymanie i skalowanie
- Zgodność z best practices w React

**Możliwe follow-up:**

- Czy zawsze używasz tego podejścia, czy są sytuacje gdzie wybrałbyś inną strukturę? - podejście zalezy od danego przypadku, atomic design jest dobry jesli to UI gra główne skrzypce, kiedy mamy wiele podobnych widoków, wtedy stawiamy na maksymalna reuywalność, ale moze kuleć kiedy będziemy mieli więcej logiki biznesowej. W przypadku kiedy projekt zawiera złozne flow i róznorodne funkcjonalności wybrałbym feature-base design lub jakąś hybrydę
- Jak decydujesz, czy komponent powinien być atomem, molekułą czy organizmem? - granica między molecules a organisms jest płynna i dyskusyjna ale za organizmy biorę duze komponenty skłdające się na sam widok, za molekuly nieco mniejsze wchodzące bezpośrenio w skad organizmów a atomy to male komponenty których nie da sie juz raczej podzielic na mniejsze.

### 2. Dlaczego nie użyłeś żadnego state management library (Redux, Zustand, Context API)?

**Oczekiwana odpowiedź:**

- Stan jest lokalny w komponencie ContactList
- Brak potrzeby globalnego stanu
- Zgodność z wytycznymi: "avoid including extra dependencies unless they are essential"
- React hooks wystarczają dla tego przypadku użycia

**Możliwe follow-up:**

- W jakiej sytuacji rozważyłbyś dodanie Context API lub Redux? - Kiedy musiałbym dzielić stan pomiędzy kilkoma widokami lub komponentami oddalonymi od siebie poziomem zagniezdzenia lub kiedy miałbym osiągnąć moliwosc zapamiętywania stanu np formularza pomiędzy przeładowaniami strony
- Jak byś zrefaktoryzował kod, gdyby trzeba było udostępnić stan wybranych kontaktów w innych komponentach?

### 3. Dlaczego użyłeś zwykłego CSS zamiast CSS-in-JS (styled-components, emotion) lub CSS Modules?

**Oczekiwana odpowiedź:**

- Zgodność z wytycznymi: minimalizacja zależności
- CSS jest wystarczający dla tego projektu
- Brak potrzeby dynamicznych stylów opartych na props
- Łatwiejsze utrzymanie dla małego projektu

**Możliwe follow-up:**

- Kiedy wybrałbyś CSS-in-JS? -
- Jak byś zorganizował style dla większego projektu? - uzyłbym z pewnością tailwinda, utworzyłbym plik ze zmiennymi css wg okreslonego designu oraz stworzyłbym jakies podstawowe reuzywalne klasy.

### 4. Dlaczego każdy komponent ma własny folder z index.ts?

**Oczekiwana odpowiedź:**

- Łatwiejsze importy: `from 'src/components/atoms/Button'` zamiast `from 'src/components/atoms/Button/Button'`
- Możliwość dodania dodatkowych plików (np. Button.test.tsx, Button.styles.ts) bez zmiany importów
- Standard w wielu projektach React

**Możliwe follow-up:**

- Czy zawsze używasz tego wzorca? - zazwyczaj tak
- Jakie są wady tego podejścia? - więcej plików do utrzymania

---

## React Hooks i Zarządzanie Stanem

### 5. Dlaczego użyłeś `Map` zamiast `Set` lub tablicy do przechowywania wybranych kontaktów?

**Oczekiwana odpowiedź:**

- Potrzebuję przechowywać nie tylko informację czy kontakt jest wybrany, ale też kolejność wyboru
- `Map` pozwala na przechowywanie pary `id -> order`
- `Set` nie przechowuje kolejności wstawiania w sposób, który pozwala na sortowanie
- Tablica wymagałaby dodatkowych operacji (includes, indexOf) przy sprawdzaniu czy element jest wybrany

**Możliwe follow-up:**

- Jakie są wady użycia Map w tym przypadku? - w tym przypadku nie widzę wad jego uzycia ale tak ogólnie to ma kilka cech któ®e ustępują np Record, tj. gorsza czytelność dla małych struktur, woniejsze iterowanie przy małych strukturach, gorsza czytelność, trudniejsza serializacja JSON, brak spread tak jak na zwykłych obiektach
- Czy rozważałeś użycie obiektu `Record<string, number>`? - Tak rozwaałem jednak Record nie posiada wbudowanych metod które mi się tutaj przydały tj. get, set, delete, poza tym jest mnej optymalny przy dynamicznych strukturach gdzie jest wiele dodawania/usuwania

### 6. Wyjaśnij różnicę między `useEffect` a `useLayoutEffect` w twoim kodzie. Dlaczego użyłeś `useLayoutEffect` do przywracania pozycji scrolla?

**Oczekiwana odpowiedź:**

- `useLayoutEffect` wykonuje się synchronicznie przed malowaniem przez przeglądarkę
- `useEffect` wykonuje się asynchronicznie po malowaniu
- Dla scrolla potrzebuję synchronizacji, żeby uniknąć "skakania" strony
- `useLayoutEffect` gwarantuje, że scroll zostanie przywrócony przed renderowaniem

**Możliwe follow-up:**

- Czy są jakieś wady użycia `useLayoutEffect`? - jest synchroniczny wiec wstrzymuje stronę do momentu zakończenia wykonywania kodu, ciezkie obliczenia mogą powodować efekt freez'a strony
- Kiedy użyłbyś `useEffect` zamiast `useLayoutEffect`? - useEffect uzyłbym np do pobierania danych z api gdy jest to opracja asynchroniczna, dane mogą pbierać się w tle nie blokując całej strony. useLayoutEffect przydaje się kiedy potrzebujemy ykonać jakąś operację przed namalowaniem strony czyli np właśnie rózne obliczenia, manipulacje scrollem DOMem, płynne animacje itd

### 7. Dlaczego użyłeś `useRef` dla `initialFetchDone` zamiast zwykłej zmiennej poza komponentem?

**Oczekiwana odpowiedź:**

- Zmienna poza komponentem byłaby współdzielona między instancjami komponentu
- `useRef` jest związany z konkretną instancją komponentu
- `useRef` nie powoduje re-renderu (w przeciwieństwie do `useState`)
- Potrzebuję wartości, która przetrwa re-rendery, ale nie powinna ich wywoływać

**Możliwe follow-up:**

- Czy `useRef` jest najlepszym rozwiązaniem tutaj? - nie jest najlepszym ale dal tak prostego przypadku wystarczającym. W realnej aplikacje jezeli zapytania bylyby wkonywane przez natywny fetch mozna by uzyc abortControllera, a jesli zdecydowano by sie na uzycie np React Query to ten problem byly z gory zalatwiony
- Jak byś to zrobił, gdyby trzeba było resetować ten flag? - dodałbym flagę do dependecis array useEffecta

### 8. Dlaczego `fetchData` jest opakowane w `useCallback`?

**Oczekiwana odpowiedź:**

- Zapobiega niepotrzebnym re-renderom komponentów, które otrzymują `fetchData` jako prop
- Stabilna referencja funkcji
- W tym przypadku `ErrorState` otrzymuje `fetchData` jako prop

**Możliwe follow-up:**

- Czy zawsze powinno się używać `useCallback`? - nie zawsze jest sens, czasem jest to zbędny narzut, nie ma sensu gdy funkcja jest używana tylko lokalnie w komponencie i nie wpływa na rerenderowanie dzieci.
- Jakie są wady nadużywania `useCallback`? - kazde uzycie tworzy dodtkową funkcje w pamieci, koszt hooka - react musi porównac zaleznosci pryz kazdym renderze co tez kosztuje

### 9. Wyjaśnij logikę sortowania w `useMemo` dla `sortedContacts`.

**Oczekiwana odpowiedź:**

- Sortuję kontakty tak, aby wybrane były na górze
- Używam `order` z Map do zachowania kolejności wyboru (najnowsze na górze)
- `useMemo` zapobiega ponownemu sortowaniu przy każdym renderze
- Sortowanie wykonuje się tylko gdy zmienia się `data` lub `selected`

**Możliwe follow-up:**

- Jaka jest złożoność czasowa tego sortowania? Złozonosc czasowa tego srotowania to O(n log n), sort JS uzywa algorytmu Timsort
- Jak byś to zoptymalizował dla bardzo dużej listy (np. 10,000 kontaktów)? - wewnatrz useMemo moznaby zrobic dwie listy slectedItems i unselectedItems, nastepnie za pomocą petli na tablicy data przyporzadkowac itemy do opowiednich list, następnie wykonac sortowanie tylko na liscie selectedItems

### 10. Dlaczego użyłeś `selectionCounter.current` zamiast po prostu `Date.now()` lub `performance.now()`?

**Oczekiwana odpowiedź:**

- `selectionCounter` jest prostszy i bardziej przewidywalny
- Nie zależy od czasu systemowego
- Łatwiejszy do debugowania (kolejne liczby: 1, 2, 3...)
- `Date.now()` może zwrócić tę samą wartość dla szybkich kliknięć

**Możliwe follow-up:**

- Czy są sytuacje gdzie `Date.now()` byłby lepszy? - dzieki dane.now moglibysmy miec informacje o czasie kiedy item został wyrany
- Co by się stało, gdyby użytkownik wybrał kontakt, odznaczył go, a potem wybrał ponownie? - ostatni zaznaczony kontak zawsze pojawi sie na początku listy

---

## Optymalizacja Wydajności

### 11. Dlaczego użyłeś `memo` dla `ContactItem`?

**Oczekiwana odpowiedź:**

- `ContactItem` renderuje się wiele razy (dla każdego kontaktu)
- `memo` zapobiega re-renderowi, gdy props się nie zmieniają
- Gdy użytkownik wybiera jeden kontakt, inne nie powinny się re-renderować
- Ważne dla wydajności przy dużej liczbie kontaktów

**Możliwe follow-up:**

- Czy `memo` zawsze poprawia wydajność?
- Jak byś to przetestował, żeby upewnić się, że `memo` rzeczywiście pomaga?

### 12. Jak działa optymalizacja scrolla? Wyjaśnij cały mechanizm.

**Oczekiwana odpowiedź:**

1. Gdy użytkownik klika kontakt, zapisuję pozycję scrolla w `savedScrollPosition.current`
2. Po aktualizacji stanu `selected`, lista się re-renderuje i sortuje
3. `useLayoutEffect` przywraca pozycję scrolla przed malowaniem
4. To zapobiega "skakaniu" strony w górę, gdy wybrany kontakt przeskakuje na górę listy

**Możliwe follow-up:**

- Czy są edge cases, gdzie to może nie działać?
- Jak byś to zrobił dla infinite scroll z virtualizacją?

### 13. Czy rozważałeś użycie virtualizacji (react-window, react-virtualized) dla długich list?

**Oczekiwana odpowiedź:**

- Tak, ale zgodnie z wytycznymi: "avoid including extra dependencies unless they are essential"
- Dla 100 kontaktów (10 na stronę) virtualizacja nie jest konieczna
- Gdyby lista była znacznie dłuższa (np. 1000+), rozważyłbym virtualizację

**Możliwe follow-up:**

- Od jakiej liczby elementów rozważyłbyś virtualizację?
- Jakie są wady virtualizacji?

### 14. Dlaczego nie użyłeś `React.memo` z custom comparison function dla `ContactItem`?

**Oczekiwana odpowiedź:**

- Domyślne porównanie shallow equality jest wystarczające
- `isSelected` to boolean, `contact` to obiekt, ale referencja się zmienia tylko gdy dane się zmieniają
- `onSelect` jest stabilne dzięki `useCallback`
- Custom comparison byłby over-engineering dla tego przypadku

**Możliwe follow-up:**

- W jakiej sytuacji użyłbyś custom comparison?
- Jak byś napisał custom comparison function?

---

## TypeScript

### 15. Dlaczego zdefiniowałeś typy w osobnym pliku `types.ts`?

**Oczekiwana odpowiedź:**

- Centralizacja typów ułatwia utrzymanie
- Możliwość ponownego użycia typów w różnych miejscach
- Łatwiejsze zarządzanie zmianami w strukturze danych
- Lepsza organizacja kodu

**Możliwe follow-up:**

- Czy zawsze tworzysz osobny plik z typami?
- Jak byś zorganizował typy dla większego projektu?

### 16. Dlaczego użyłeś `type` zamiast `interface` dla typów?

**Oczekiwana odpowiedź:**

- Oba są w zasadzie równoważne w TypeScript
- `type` jest bardziej uniwersalny (może reprezentować union types, intersections)
- W tym przypadku nie potrzebuję rozszerzania interfejsów
- Preferencja stylistyczna

**Możliwe follow-up:**

- Kiedy użyłbyś `interface` zamiast `type`?
- Jakie są różnice między `type` a `interface`?

### 17. Wyjaśnij typ `ContactListResponse`. Dlaczego nie użyłeś generics?

**Oczekiwana odpowiedź:**

- `ContactListResponse` jest specyficzny dla tego API
- Nie ma potrzeby na generics - zawsze zwracamy `Contact[]`
- Generics byłyby over-engineering dla tego przypadku
- Jeśli API by się zmieniło, łatwo zmienić typ w jednym miejscu

**Możliwe follow-up:**

- W jakiej sytuacji użyłbyś generics?
- Jak by wyglądał generic version tego typu?

### 18. Dlaczego użyłeś `React.ReactNode` zamiast bardziej specyficznych typów?

**Oczekiwana odpowiedź:**

- `React.ReactNode` jest najbardziej elastyczny
- Pozwala na przekazanie stringów, liczb, elementów React, fragmentów, null, undefined
- Standardowy typ dla children w React
- Zgodny z best practices

**Możliwe follow-up:**

- Czy są sytuacje gdzie użyłbyś bardziej restrykcyjnego typu?
- Jaka jest różnica między `React.ReactNode`, `React.ReactElement`, i `JSX.Element`?

---

## Testowanie

### 19. Dlaczego użyłeś `@testing-library/react` zamiast Enzyme?

**Oczekiwana odpowiedź:**

- Testing Library promuje testowanie z perspektywy użytkownika
- Mniej skupienia na implementacji, więcej na zachowaniu
- Oficjalnie rekomendowane przez React team
- Enzyme jest w maintenance mode

**Możliwe follow-up:**

- Jakie są wady Testing Library?
- Jak byś przetestował edge case, który jest trudny do przetestowania przez Testing Library?

### 20. Dlaczego zmockowałeś `apiData` zamiast użycia rzeczywistego API?

**Oczekiwana odpowiedź:**

- Testy powinny być szybkie i niezależne od zewnętrznych zależności
- Mock pozwala kontrolować scenariusze (sukces, błąd)
- Testy nie powinny zależeć od stanu serwera
- Łatwiejsze testowanie edge cases

**Możliwe follow-up:**

- Jak byś przetestował integrację z prawdziwym API?
- Czy użyłbyś MSW (Mock Service Worker)?

### 21. Dlaczego użyłeś `data-testid` zamiast selektorów CSS?

**Oczekiwana odpowiedź:**

- `data-testid` jest bardziej stabilny - nie zmienia się przy zmianach stylów
- Nie zależy od struktury DOM
- Explicit i czytelny
- Best practice w Testing Library

**Możliwe follow-up:**

- Czy zawsze używasz `data-testid`?
- Kiedy użyłbyś selektorów CSS lub role queries?

### 22. Dlaczego nie przetestowałeś komponentów atomów i molekuł osobno?

**Oczewiwana odpowiedź:**

- Testuję głównie funkcjonalność biznesową (ContactList)
- Komponenty atomów są proste i są testowane przez testy integracyjne
- Zgodnie z piramidą testów - więcej testów integracyjnych, mniej unit testów
- Oszczędność czasu i utrzymania

**Możliwe follow-up:**

- W jakiej sytuacji napisałbyś osobne testy dla atomów?
- Jak byś zbalansował testy unit vs integracyjne?

### 23. Jak byś przetestował wydajność (performance) aplikacji?

**Oczekiwana odpowiedź:**

- React DevTools Profiler
- Lighthouse
- Performance API w przeglądarce
- Testy z dużą liczbą elementów
- Sprawdzanie liczby re-renderów

**Możliwe follow-up:**

- Jakie metryki byłyby dla Ciebie ważne?
- Jak byś zautomatyzował testy wydajnościowe?

---

## Alternatywne Rozwiązania

### 24. Jak byś zaimplementował to samo zadanie używając Context API?

**Oczekiwana odpowiedź:**

- Utworzyłbym `ContactListContext` z providerem
- Przeniósłbym stan i funkcje do contextu
- Komponenty korzystałyby z `useContext`
- Ale dla tego przypadku to byłoby over-engineering

**Możliwe follow-up:**

- Jakie byłyby wady tego podejścia?
- Kiedy Context API byłby lepszy?

### 25. Jak byś to zrobił używając Redux Toolkit?

**Oczekiwana odpowiedź:**

- Utworzyłbym slice z akcjami: `fetchContacts`, `selectContact`, `deselectContact`
- Użyłbym `createAsyncThunk` dla async operations
- Komponenty korzystałyby z `useSelector` i `useDispatch`
- Ale to byłoby zbyt skomplikowane dla tego przypadku

**Możliwe follow-up:**

- Jakie byłyby zalety Redux w tym przypadku?
- Kiedy Redux byłby uzasadniony?

### 26. Jak byś zaimplementował sortowanie wybranych kontaktów inaczej?

**Alternatywne rozwiązania:**

- Użyć osobnej tablicy `selectedIds: string[]` i sortować według indeksu w tej tablicy
- Użyć obiektu `Record<string, number>` zamiast Map
- Przechowywać wybrane kontakty w osobnej tablicy i łączyć z resztą

**Możliwe follow-up:**

- Jakie byłyby wady tych alternatyw?
- Które rozwiązanie byłoby najszybsze dla 10,000 kontaktów?

### 27. Jak byś zaimplementował infinite scroll zamiast przycisku "Load more"?

**Oczekiwana odpowiedź:**

- Użyłbym Intersection Observer API
- Dodałbym sentinel element na końcu listy
- Gdy sentinel wchodzi w viewport, automatycznie fetchuję następną stronę
- Alternatywnie: scroll event listener z throttling

**Możliwe follow-up:**

- Jakie są wady infinite scroll?
- Kiedy "Load more" jest lepszy niż infinite scroll?

---

## Szczegóły Implementacji

### 28. Wyjaśnij jak działa funkcja `apiData` w pliku `api.ts`.

**Oczekiwana odpowiedź:**

- Symuluje paginację używając globalnego `cursor`
- `cursor` zwiększa się przy każdym wywołaniu
- Zwraca slice z `mockData` na podstawie `cursor * size`
- Symuluje opóźnienie 1 sekundy
- Losowo rzuca błąd (30% szans) dla testowania error handling

**Możliwe follow-up:**

- Jakie są wady tego podejścia?
- Jak byś to zrefaktoryzował dla prawdziwego API?

### 29. Dlaczego użyłeś `useRef` dla `savedScrollPosition` zamiast `useState`?

**Oczekiwana odpowiedź:**

- `useRef` nie powoduje re-renderu
- Nie potrzebuję, żeby zmiana pozycji scrolla wywoływała re-render
- `useRef` jest idealny dla wartości, które nie powinny wpływać na renderowanie
- Szybsze i bardziej efektywne

**Możliwe follow-up:**

- Czy są sytuacje gdzie `useState` byłby lepszy?
- Jak byś to zrobił, gdyby trzeba było wyświetlić pozycję scrolla w UI?

### 30. Wyjaśnij logikę w `handleSelect`. Dlaczego użyłeś funkcji updater dla `setSelected`?

**Oczekiwana odpowiedź:**

- Funkcja updater `prev => ...` zapewnia, że zawsze pracuję z najnowszą wartością stanu
- Ważne przy async operations i możliwych race conditions
- Best practice w React
- Pozwala na bezpieczne aktualizowanie stanu na podstawie poprzedniej wartości

**Możliwe follow-up:**

- Czy zawsze używasz funkcji updater?
- Kiedy nie jest to konieczne?

### 31. Dlaczego w `ContactItem` użyłeś `stopPropagation` na linku email?

**Oczekiwana odpowiedź:**

- Link email jest wewnątrz klikalnego `li`
- Bez `stopPropagation`, kliknięcie w link wywołałoby również `onSelect`
- To byłoby złe UX - użytkownik chce tylko otworzyć email, nie wybrać kontakt
- `stopPropagation` zapobiega bąbelkowaniu eventu

**Możliwe follow-up:**

- Czy są alternatywne rozwiązania?
- Jakie są wady `stopPropagation`?

### 32. Dlaczego użyłeś `role="button"` i `aria-pressed` w `ContactItem`?

**Oczekiwana odpowiedź:**

- Accessibility - screen readery rozpoznają element jako przycisk
- `aria-pressed` informuje o stanie (wybrany/nie wybrany)
- `aria-label` opisuje akcję
- Zgodność z WCAG guidelines

**Możliwe follow-up:**

- Jakie inne atrybuty ARIA rozważyłbyś?
- Jak byś przetestował dostępność?

---

## UX i Dostępność

### 33. Jakie decyzje UX podjąłeś i dlaczego?

**Oczekiwana odpowiedź:**

- Fixed header z licznikiem - zawsze widoczny
- Outline dla wybranych kontaktów - jasna wizualna informacja
- Hover state - feedback dla użytkownika
- Loading overlay - blokuje interakcję podczas ładowania
- Error state z możliwością retry - użytkownik może spróbować ponownie
- Scroll preservation - użytkownik nie traci pozycji

**Możliwe follow-up:**

- Jakie inne ulepszenia UX rozważyłbyś?
- Jak byś obsłużył bardzo długie listy (1000+ kontaktów)?

### 34. Jak byś poprawił dostępność (accessibility)?

**Możliwe ulepszenia:**

- Keyboard navigation (Tab, Enter, Space)
- Focus management
- Skip links
- Lepsze kontrasty kolorów
- Screen reader announcements dla zmian stanu

**Możliwe follow-up:**

- Jakie narzędzia użyłbyś do testowania dostępności?
- Jakie są najczęstsze błędy dostępności w React?

### 35. Dlaczego użyłeś `fixed` positioning dla loading i error states?

**Oczekiwana odpowiedź:**

- Blokuje interakcję z resztą aplikacji podczas ładowania/błędu
- Jasny komunikat dla użytkownika
- Zapobiega wielokrotnym kliknięciom
- Overlay pattern jest standardem UX

**Możliwe follow-up:**

- Czy są wady tego podejścia?
- Jak byś to zrobił dla mobile devices?

---

## Edge Cases i Obsługa Błędów

### 36. Jakie edge cases rozważyłeś w swoim rozwiązaniu?

**Oczekiwana odpowiedź:**

- Błąd podczas fetchowania - obsłużony przez ErrorState
- Szybkie wielokrotne kliknięcia - `useCallback` i stabilne referencje
- Scroll preservation przy sortowaniu - `useLayoutEffect`
- Pusty stan - nie ma specjalnej obsługi, ale można dodać
- Wszystkie kontakty załadowane - przycisk "Load more" znika

**Możliwe follow-up:**

- Jakie edge cases nie obsłużyłeś?
- Jak byś obsłużył sytuację, gdy użytkownik wybierze kontakt, a potem lista się odświeży?

### 37. Co się stanie, gdy użytkownik szybko kliknie "Load more" wiele razy?

**Oczekiwana odpowiedź:**

- Przycisk jest disabled podczas `loading`
- `fetchData` może być wywołane wielokrotnie, ale `loading` state zapobiega równoległym requestom
- Możliwa race condition - ostatni request może nadpisać poprzedni

**Możliwe follow-up:**

- Jak byś zapobiegł race conditions?
- Czy użyłbyś AbortController?

### 38. Jak byś obsłużył sytuację, gdy API zwróci duplikaty kontaktów?

**Oczekiwana odpowiedź:**

- Obecnie nie ma deduplikacji
- Można dodać sprawdzanie przed dodaniem do `data`
- Użyć `Set` lub `Map` do śledzenia już załadowanych ID
- Filtrowanie przed `setData`

**Możliwe follow-up:**

- Jak byś to zaimplementował?
- Jakie byłyby performance implications?

### 39. Co się stanie, gdy użytkownik wybierze kontakt, a potem lista się odświeży (np. przez "Load more")?

**Oczekiwana odpowiedź:**

- Wybór zostanie zachowany, bo `selected` Map jest niezależne od `data`
- Kontakt pozostanie wybrany nawet po dodaniu nowych danych
- To jest pożądane zachowanie

**Możliwe follow-up:**

- Czy są sytuacje, gdzie chciałbyś zresetować wybory?
- Jak byś to zaimplementował?

### 40. Jak byś obsłużył sytuację, gdy API zwróci kontakt, który już został usunięty z listy (przez użytkownika)?

**Oczekiwana odpowiedź:**

- Obecnie nie ma możliwości usuwania kontaktów
- Gdyby była, trzeba by zsynchronizować `selected` Map z aktualną listą
- Można by filtrować `selected` przed renderowaniem

**Możliwe follow-up:**

- Jak byś to zaimplementował?
- Jakie byłyby edge cases?

---

## Refaktoryzacja i Ulepszenia

### 41. Jakie są główne obszary, które byś poprawił w tym kodzie?

**Możliwe ulepszenia:**

- Dodać error boundary
- Dodać loading skeleton zamiast spinnera
- Dodać debouncing dla scroll events (gdyby były)
- Dodać keyboard navigation
- Dodać animacje dla smooth transitions
- Dodać pagination info (np. "Showing 1-10 of 100")
- Dodać możliwość filtrowania/wyszukiwania
- Dodać możliwość sortowania (alfabetycznie, data dodania)

**Możliwe follow-up:**

- Które z tych byłyby najważniejsze?
- Jak byś priorytetyzował te ulepszenia?

### 42. Jak byś zrefaktoryzował kod dla większej skalowalności?

**Możliwe zmiany:**

- Wyodrębnić custom hooks (`useContacts`, `useContactSelection`)
- Dodać Context API jeśli stan będzie potrzebny w innych miejscach
- Podzielić `ContactList` na mniejsze komponenty
- Dodać error boundary
- Dodać service layer dla API calls
- Dodać caching layer

**Możliwe follow-up:**

- Które z tych byłyby pierwsze?
- Jak byś testował refaktoryzację?

### 43. Jak byś dodał możliwość wyszukiwania/filtrowania kontaktów?

**Oczekiwana odpowiedź:**

- Dodać input search w headerze
- Dodać stan `searchQuery`
- Filtrować `data` przed sortowaniem
- Użyć `useMemo` dla przefiltrowanej listy
- Można dodać debouncing dla inputu

**Możliwe follow-up:**

- Jak byś zoptymalizował wyszukiwanie dla dużej listy?
- Czy użyłbyś useMemo czy useDeferredValue?

### 44. Jak byś dodał możliwość sortowania kontaktów (alfabetycznie, data wyboru)?

**Oczekiwana odpowiedź:**

- Dodać state `sortBy: 'selection' | 'alphabetical'`
- Zmodyfikować `sortedContacts` useMemo
- Dodać UI controls (dropdown, buttons)
- Zachować obecne zachowanie jako domyślne

**Możliwe follow-up:**

- Jak byś to zaimplementował?
- Jakie byłyby performance implications?

### 45. Jak byś obsłużył bardzo dużą listę (10,000+ kontaktów)?

**Rozwiązania:**

- Virtualizacja (react-window)
- Pagination zamiast "Load more"
- Lazy loading
- Debouncing/throttling
- Web Workers dla sortowania
- IndexedDB dla cache'owania

**Możliwe follow-up:**

- Które rozwiązanie byłoby pierwsze?
- Jak byś testował wydajność?

---

## Pytania Techniczne - Głębsze

### 46. Wyjaśnij różnicę między `useMemo` i `useCallback`. Kiedy użyć którego?

**Oczekiwana odpowiedź:**

- `useMemo` memoizuje wartość (wynik obliczeń)
- `useCallback` memoizuje funkcję (referencję)
- `useMemo(() => fn, deps)` jest równoważne `useCallback(fn, deps)`
- Użyj `useMemo` dla kosztownych obliczeń
- Użyj `useCallback` dla funkcji przekazywanych jako props

**Możliwe follow-up:**

- Czy zawsze powinno się używać tych hooków?
- Jakie są wady nadużywania?

### 47. Co to jest "stale closure" i jak byś tego uniknął w swoim kodzie?

**Oczekiwana odpowiedź:**

- Stale closure to sytuacja, gdy funkcja używa starej wartości z closure
- W moim kodzie używam funkcji updater (`prev => ...`) co zapobiega stale closures
- `useCallback` z właściwymi dependencies też pomaga
- `useRef` dla wartości, które nie powinny być w dependencies

**Możliwe follow-up:**

- Czy masz przykłady stale closures w swoim kodzie?
- Jak byś to zdebugował?

### 48. Jak działa React reconciliation i jak wpływa na wydajność twojego rozwiązania?

**Oczekiwana odpowiedź:**

- React porównuje Virtual DOM i aktualizuje tylko zmienione części
- `memo` pomaga React zidentyfikować, które komponenty nie muszą się re-renderować
- Stabilne referencje (`useCallback`, `useMemo`) pomagają React w optymalizacji
- `key` prop jest ważny dla list - używam `personInfo.id`

**Możliwe follow-up:**

- Jak byś zoptymalizował reconciliation dla bardzo długiej listy?
- Co się stanie, jeśli `key` będzie indeksem zamiast ID?

### 49. Wyjaśnij różnicę między controlled i uncontrolled components. Które użyłeś?

**Oczekiwana odpowiedź:**

- Controlled: wartość jest kontrolowana przez React state
- Uncontrolled: wartość jest w DOM (ref)
- W moim kodzie nie ma formularzy, ale `ContactItem` jest "controlled" przez `isSelected` prop
- Lista jest controlled przez `data` state

**Możliwe follow-up:**

- Kiedy użyłbyś uncontrolled component?
- Jakie są wady każdego podejścia?

### 50. Jak byś zaimplementował undo/redo dla wyboru kontaktów?

**Oczekiwana odpowiedź:**

- Użyć Command Pattern
- Przechowywać historię zmian w `useRef` lub state
- Stack dla undo, stack dla redo
- Funkcje `undo()` i `redo()` aktualizują `selected` Map
- Można użyć biblioteki jak `use-undo-redo` lub zaimplementować samodzielnie

**Możliwe follow-up:**

- Jak byś to zoptymalizował dla pamięci?
- Jakie byłyby edge cases?

---

## Pytania o Proces i Best Practices

### 51. Jak byś zorganizował kod dla większego projektu (100+ komponentów)?

**Oczekiwana odpowiedź:**

- Feature-based structure zamiast type-based (atoms/molecules/organisms)
- Shared components w osobnym folderze
- Hooks w folderze `hooks/`
- Utils w folderze `utils/`
- Types w folderze `types/` lub przy każdym feature
- Constants w `constants/`

**Możliwe follow-up:**

- Jakie są wady feature-based structure?
- Jak byś zarządzał shared components?

### 52. Jak byś dodał internationalization (i18n) do tego projektu?

**Oczekiwana odpowiedź:**

- Użyć biblioteki jak `react-i18next` lub `react-intl`
- Wyodrębnić wszystkie stringi do plików tłumaczeń
- Użyć hooków do tłumaczeń w komponentach
- Dodać language switcher
- Obsłużyć RTL languages jeśli potrzebne

**Możliwe follow-up:**

- Jakie byłyby wyzwania?
- Jak byś testował i18n?

### 53. Jak byś dodał error tracking (Sentry, LogRocket)?

**Oczekiwana odpowiedź:**

- Dodać Error Boundary
- W Error Boundary logować błędy do Sentry
- Dodać context (user info, state snapshot)
- Obsłużyć różne typy błędów (API errors, render errors)
- Dodać source maps dla lepszego debuggingu

**Możliwe follow-up:**

- Jakie informacje byłyby najważniejsze w error logs?
- Jak byś testował error tracking?

### 54. Jak byś zoptymalizował bundle size?

**Rozwiązania:**

- Code splitting (React.lazy, Suspense)
- Tree shaking
- Analiza bundle (webpack-bundle-analyzer)
- Usunięcie nieużywanych dependencies
- Dynamic imports dla dużych bibliotek
- Optymalizacja obrazów

**Możliwe follow-up:**

- Jakie byłyby pierwsze kroki?
- Jak byś mierzył postęp?

### 55. Jak byś dodał caching dla API requests?

**Oczekiwana odpowiedź:**

- React Query lub SWR dla automatycznego cache'owania
- Lub własna implementacja z `useMemo` i `useRef`
- Cache w memory lub localStorage
- TTL dla cache entries
- Invalidation strategy

**Możliwe follow-up:**

- Jakie byłyby wady każdego podejścia?
- Jak byś obsłużył stale data?

---

## Pytania Koncepcyjne

### 56. Jak byś zaimplementował to samo zadanie używając React Server Components?

**Oczekiwana odpowiedź:**

- Server Components dla initial data fetch
- Client Components dla interaktywności (selection, load more)
- Streaming dla progressive loading
- Mniejszy bundle size po stronie klienta
- Ale to wymaga Next.js 13+ lub podobnego frameworka

**Możliwe follow-up:**

- Jakie byłyby zalety i wady?
- Kiedy Server Components są najlepszym wyborem?

### 57. Jak byś to zrobił używając GraphQL zamiast REST?

**Oczekiwana odpowiedź:**

- Zdefiniować query z pagination (cursor-based)
- Użyć Apollo Client lub Relay
- Fragments dla Contact data
- Cache management przez GraphQL client
- Real-time updates przez subscriptions (jeśli potrzebne)

**Możliwe follow-up:**

- Jakie byłyby wyzwania?
- Kiedy GraphQL jest lepszy niż REST?

### 58. Jak byś zaimplementował offline support?

**Oczekiwana odpowiedź:**

- Service Worker dla caching
- IndexedDB dla przechowywania danych
- Sync queue dla zmian offline
- Conflict resolution strategy
- UI indicators dla offline state

**Możliwe follow-up:**

- Jakie byłyby największe wyzwania?
- Jak byś testował offline functionality?

---

## Podsumowanie - Najważniejsze Pytania

### Top 10 Pytania, które najprawdopodobniej usłyszysz:

1. **Dlaczego użyłeś Map zamiast Set lub tablicy?** (pytanie #5)
2. **Wyjaśnij różnicę między useEffect a useLayoutEffect.** (pytanie #6)
3. **Jak działa optymalizacja scrolla?** (pytanie #12)
4. **Dlaczego użyłeś memo dla ContactItem?** (pytanie #11)
5. **Jak byś to zrobił inaczej?** (pytania #24-27)
6. **Jakie edge cases rozważyłeś?** (pytanie #36)
7. **Jak byś zoptymalizował dla większej listy?** (pytanie #45)
8. **Dlaczego nie użyłeś Redux/Context API?** (pytania #2, #24)
9. **Jak działa sortowanie wybranych kontaktów?** (pytanie #9)
10. **Jakie są główne obszary do poprawy?** (pytanie #41)

---

## 💡 Wskazówki do Odpowiedzi

1. **Bądź szczery** - jeśli nie wiesz, powiedz że nie wiesz, ale pokaż jak byś to sprawdził
2. **Mów o trade-offs** - każde rozwiązanie ma zalety i wady
3. **Pytaj o kontekst** - czasem odpowiedź zależy od wymagań
4. **Pokazuj myślenie** - rekruterzy chcą zobaczyć jak myślisz, nie tylko czy znasz odpowiedź
5. **Mów o alternatywach** - pokaż że rozumiesz różne podejścia
6. **Przyznaj się do błędów** - jeśli coś można poprawić, powiedz o tym

Powodzenia na rozmowie! 🚀
