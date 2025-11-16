Study buddy - Rendszerterv

## 1. A rendszer célja
A **Study Buddy** célja, hogy mesterséges intelligencia segítségével **támogassa a tanulást** azáltal, hogy a felhasználó által megadott témákból **összefoglaló jegyzeteket** és **kvízkérdéseket** generál.
A rendszer célkitűzése a tanulási hatékonyság mérése és növelése adatvezérelt módon. A platform figyeli a felhasználó teljesítményét, és az AI személyre szabott tanulási útvonalakat javasol. Emellett motivációs elemek (pl. napi kihívások, jutalmak) beépítésével is fenntartja a felhasználó érdeklődését.  
A rendszer célja továbbá:
- az ismeretszerzés hatékonyságának növelése 
- az önellenőrzés és visszajelzés automatizálása 
- a tanulási folyamat személyre szabása
- valamint egy motiváló, interaktív tanulási felület biztosítása.

## 2. A rendszerrel szemben támasztott általános követelmények

- A rendszer legyen **webalapú**, platformfüggetlen és reszponzív.  
- Biztosítson **stabil, gyors és biztonságos működést**.  
- A felhasználói adatok legyenek védettek és titkosított formában tárolva.  
- Az alkalmazás integrálható legyen külső AI-szolgáltatásokkal (OpenAI API).  
- Az architektúra legyen **moduláris**, hogy könnyen bővíthető és karbantartható legyen.  
- Támogassa a többfelhasználós működést és egyidejű kérések kezelését.
- A rendszer legyen felhőalapú környezetben futtatható.
- A fejlesztés során fontos a DevOps szemlélet, így a telepítés, tesztelés és monitoring is automatizált.
- Ezen felül a rendszer offline fallback funkciót is biztosíthat a korábban letöltött tananyagokhoz.



## 3. Funkcionális követelmények

| Azonosító | Funkcionalitás | Leírás |
|------------|----------------|--------|
| F1 | Regisztráció és bejelentkezés | Felhasználók biztonságos beléptetése JWT tokennel. |
| F2 | Téma kiválasztása | A felhasználó megadhat saját témát vagy választhat a listából. |
| F3 | Jegyzet generálása | AI automatikusan készít összefoglalót a témáról. |
| F4 | Kvízkérdések generálása | AI létrehozza a kérdéseket és válaszlehetőségeket. |
| F5 | Kvízkitöltés és értékelés | A rendszer pontozza a válaszokat és százalékos eredményt ad. |
| F6 | Eredmények mentése és megjelenítése | A korábbi kvízek adatai tárolódnak és grafikonon jelennek meg. |
| F7 | Reszponzív megjelenítés | A felület mobilon és asztali gépen is használható. |
| F8 | Biztonság | Adatok titkosítása, biztonságos kommunikáció (HTTPS). |
| F9 | Jelszóvisszaállítás és e-mail hitelesítés | Elfelejtett jelszó esetén a rendszer e-mailben helyreállítási linket küld. |
| F10 | Szintlépés | A felhasználók pontokat és jelvényeket kapnak a kvízek kitöltéséért, napi aktivitásért és fejlődésért. |
| F11 | AI-alapú ajánlórendszer | A rendszer a korábbi eredmények és a felhasználó tanulási mintázata alapján javasol új témákat vagy ismétlési lehetőségeket. |
| F12 | Adat-export és jelentéskészítés | A felhasználó le tudja tölteni saját tanulási eredményeit CSV vagy PDF formátumban. |

## 4. A felület felépítése és a technológiák kapcsolódása

1. **Frontend – React.js**
- Használható TypeScript a hibák megelőzésére
- Frontend automatikus tesztelését a Jest + React Testing Library biztosíthatja.
   - Feladata: felhasználói interakciók kezelése, megjelenítés.  
   - Kommunikáció: REST API hívások az Express.js felé.  
   - Könyvtárak: React Router, Axios, Chart.js / Recharts.

2. **Köztes réteg – Express.js**
- Az Express réteg API Gateway szerepet is elláthat.
- Middleware rétegek gondoskodnak a CORS szabályozásról és a kérés-validálásról.
   - Feladata: közvetítés a React és Django között.  
   - Hitelesítés és kéréskezelés
   - REST API endpointok definiálása.  

3. **Backend – Django (Python)**
- A Django REST Framework (DRF) biztosítja az endpointokat.
- A backend képes verziózott AI-modell paraméterezésre is.
   - Feladata: AI integráció, adatkezelés, eredményszámítás.  
   - Kommunikáció: OpenAI API hívások, PostgreSQL adatbázis.  

4. **Adatbázis – PostgreSQL**
- Az adatbázis optimalizálható indexekkel és cache-megoldással.
- Fontos a migrációs rendszer (Django Migrations).
- Az adatbázis mentések és visszaállítások automatizálása.
   - Tárolja: felhasználók, témák, kvízek, eredmények.  
   - Django ORM felel az adatlekérésekért és integritásért.

## 5. Felhasználó által elérhető funkciók

- Fiók létrehozása, bejelentkezés és kijelentkezés  
- Téma kiválasztása vagy megadása  
- Jegyzet generálása adott témában  
- Kvíz létrehozása és kitöltése  
- Eredmények megtekintése és összehasonlítása  
- Saját fejlődés grafikonos megjelenítése  
- Profiladatok szerkesztése  
- Újratanulás vagy ismétlés indítása
- Közösségi megosztás (pl. tananyag export vagy linkmegosztás)
- AI-asszisztens chat a téma elmélyítésére
- Értesítések (push/email)
- Bejelentkezési ábra:

![Bejelentkezes](./Ábrák/Bejelentkezes_graf.svg)

- Regisztrációs ábra:

![Regisztracio](./Ábrák/Regisztracio_graf.svg)


## 6. Felülettel szemben támasztott követelmények

- Letisztult, intuitív felhasználói élmény.  
- Egységes színvilág és ikonrendszer.  
- Gyors betöltési idő (< 2 másodperc).  
- Reszponzív elrendezés (mobil, tablet, desktop).  
- Akadálymentesített (WCAG-kompatibilis) design.  
- Dark / Light mód támogatása.
- A Dark / Light mód automatikus szinkronizálása a rendszerbeállítással  
- A UI komponensek újrahasznosíthatók
- Az animációkhoz Framer Motion használható.


## 7. Adatbázis terv

**Főbb táblák:**

| Tábla | Leírás | Fő mezők |
|--------|---------|----------|
| **users** | Felhasználói fiókok | id, email, password_hash, name, created_at |
| **topics** | Témák | id, title, description, created_by |
| **notes** | AI által generált jegyzetek | id, topic_id, content, created_at |
| **quizzes** | AI által generált kvízek | id, topic_id, created_at |
| **questions** | Kvízkérdések | id, quiz_id, question_text, correct_answer |
| **answers** | Kvízválaszok | id, question_id, answer_text, is_correct |
| **results** | Kvízeredmények | id, user_id, quiz_id, score, date |

**Kapcsolatok:**
- Egy `user` több `topic`-ot és `quiz`-t hozhat létre.  
- Egy `quiz` több `question`-t tartalmaz.  
- Egy `question` több `answer`-rel kapcsolódik.  
- Egy `result` egy `user` és egy `quiz` kapcsolatát tárolja.


## 8. Fejlesztési ütemezés:
- A fejlesztési folyamat agilis (Scrum) módszertannal zajlik 2 hetes sprintekben.
- Minden sprint végén van demo és retrospektív.
  1. Alap backend struktúra (Django, modellek, API endpointok)  
  2. Frontend inicializálás (React, routing, login rendszer)  
  3. Express köztes réteg beépítése  
  4. AI integráció (OpenAI API kapcsolódás)  
  5. Tesztelés és hibajavítás  
  6. Deployment (Render / Railway / Vercel / Heroku)  

## 9. Karbantartási terv

## Működés és Karbantartás

---

### **Kódkarbantartás:**

* **Verzióváltások és bugfixek rendszeres bevezetése Git ágon keresztül.** A fejlesztés a **GitFlow** (vagy hasonló, ág alapú) munkafolyamatot követi:
    * **`main` (vagy `master`):** Éles (produkciós) kód. Kizárólag tesztelt kód kerül ide beolvasztásra (`merge`).
    * **`develop`:** Integrációs ág. Az összes új funkció ide kerül beolvasztásra.
    * **`feature` ágak:** Minden új funkció külön ágon (pl. `feature/nev-funkcio`) készül el.
    * **`bugfix` ágak:** Hibajavítások külön ágon (pl. `bugfix/issue-szam`).
    * **Pull Requestek (PRs):** Minden beolvasztás (merge) előtt kötelező a **Pull Request (PR)** használata a kódban, ami magában foglalja a **Code Review-t** (kódellenőrzést) is.
* **CI/CD (Continuous Integration/Continuous Deployment):** **GitHub Actions** vagy **GitLab CI** segítségével automatizált tesztek futtatása minden PR esetén (unit, integrációs és end-to-end tesztek futtatása a **React** frontend és a **Node.js/Django** backend rétegeken). Sikeres tesztek esetén automatikus buildelés és deployment a staging/éles környezetbe.
* **Függőségek kezelése:** Rendszeres (legalább havi) frissítés a külső könyvtárakhoz (**`package.json`** a Node.js/React számára és **`requirements.txt`** vagy **`Pipfile`** a Django számára) a biztonsági rések (vulnerability) elkerülése és a kompatibilitás megőrzése érdekében.

---

### **AI modell frissítése:**

* **OpenAI API verziófrissítések figyelése, paraméterek hangolása.** Az API hívásokat egy **absztrakciós réteg** mögé helyezzük a backendben (Django/Node.js), hogy a modellváltások minimális beavatkozást igényeljenek a fő logikában.
* **Prompt Engineering és Finomhangolás:** Rendszeres felülvizsgálat a prompt sablonokon a jobb tanulási segédanyagok és gyakorlófeladatok generálása érdekében. A **prompt verziózás** implementálása, hogy könnyen vissza lehessen térni korábbi, jól teljesítő beállításokhoz.

---

### **Felhasználói támogatás:**

* **Hibabejelentő visszajelzés a felületen.** Kiegészítve a hibabejelentési mechanizmust:
    * **Integráció:** A bejelentések automatikusan bekerülnek egy projektmenedzsment rendszerbe (**Jira/Trello/GitHub Issues**) a nyomon követhetőség és a feladatok delegálása érdekében.
    * **Naplózás (Logging):** Minden kritikus **backend (Node.js/Django)** és **frontend (React)** művelet naplózása (**ELK Stack, Sentry, vagy AWS CloudWatch**) segítségével. A felhasználói hiba bejelentésekor a rendszer automatikusan begyűjti a releváns **alkalmazás- és szerver-naplókat** a gyors hibaelhárítás érdekében.
    * **SLA (Service Level Agreement):** Definált válaszidők és felbontási célok beállítása a bejelentett hibák súlyossága alapján (kritikus, magas, közepes, alacsony).
    * **Tudásbázis:** Gyakran ismételt kérdések (FAQ) és hibaelhárítási útmutatók karbantartása a felhasználói felületen belül.

## 10. Biztonsági terv

- **Hitelesítés:** JWT token-alapú azonosítás.  
- **Adattitkosítás:** bcrypt jelszóhash, HTTPS kommunikáció.  
- **Adatvédelem:** GDPR-kompatibilis adatkezelés.  
- **Hibakezelés:** REST API hibakódok és biztonságos naplózás.  
- **Mentések:** napi adatbázis-backup automatikusan.
- A rendszer védi magát:
  - Brute-force támadások ellen rate-limitinggel.
  - XSS és CSRF ellen beépített middleware-ekkel.
  - Backup-ok titkosított formában AWS S3-on tárolva.
  - Hibás API-hívások naplózása audit trail formában.

## 11. Rendszerarchitektúra (logikai modell)
A komponensek között HTTPS alapú kommunikáció történik, JSON formátumú adatokkal.
Az architektúra horizontálisan skálázható: a backend és az API gateway külön konténerben (Docker) futtatható.

```
[React Frontend]  →  [Express API Gateway]  →  [Django Backend]  →  [PostgreSQL DB]
                                       ↘
                                        →  [OpenAI API / AI Service]
```

**Adatáramlás:**  
1. A felhasználó React felületen keresztül adja meg a témát.  
2. Express közvetíti a kérést Django felé.  
3. Django hívja az AI API-t és feldolgozza az eredményt.  
4. Az eredményt PostgreSQL-ben tárolja.  
5. Az Express továbbítja a React felé a megjelenítéshez.

## 12. Tesztelési terv
- A CI/CD pipeline automatikusan futtatja ezeket a teszteket minden új commit után.
- A teszteredményekről automatikus jelentés készül (Allure Report / Jest Coverage).
- A felhasználói A/B tesztek segítenek a UI döntések validálásában.

| Teszt típus | Cél | Eszköz |
|--------------|-----|--------|
| **Unit tesztek** | Egyes modulok működésének ellenőrzése | PyTest, Jest |
| **Integrációs tesztek** | Backend–Frontend kommunikáció | Postman, Insomnia |
| **Funkcionális tesztek** | Felhasználói funkciók tesztelése | Cypress, Selenium |
| **Teljesítményteszt** | AI hívások és válaszidő mérése | Locust, k6 |
| **Biztonsági teszt** | Jogosultság, adatvédelem | OWASP ZAP |

### 12.1. Egységteszt (Unit Tests)
A tesztelési piramis alapja, amely a legkisebb, izolált kódrészleteket (függvényeket, metódusokat) ellenőrzi.
* **Frontend (React/Jest):**
    * Ellenőrzi, hogy egy **React komponens** megfelelően renderelődik-e a kapott adatok alapján.
    * Teszteli a segédfüggvényeket (pl. dátumformázás, validálás).
    * **React Testing Library-t (RTL)** használ a felhasználói viselkedés szimulálására (pl. gombnyomás, input mező kitöltése).
* **Backend (Django):**
    * Teszteli a modell metódusokat (ORM).
    * Ellenőrzi a pontszámító algoritmus helyességét.
    * Teszteli az egyedi validátorokat és segédfüggvényeket.

## 13. Jövőbeli fejlesztési lehetőségek

- **Többnyelvű támogatás** (angol, német, magyar).  
- **Csoportos tanulási mód** (megosztható kvízek).  
- **Tanulási statisztika AI elemzéssel** (gyengeségek felismerése).  
- **Mobilalkalmazás** (React Native).  
- **Offline mód** a korábbi jegyzetek megtekintéséhez.
- **AI mentor mód** a felhasználó kérdezhet a tananyagról chat formában.
- **API nyilvános dokumentáció** más fejlesztők is integrálhatják a rendszert.
- **Gamifikált ranglista** a felhasználók pontok alapján versenyezhetnek.
- **Tanári felület** tanárok kvízeket készíthetnek és követhetik a diákok előrehaladását.