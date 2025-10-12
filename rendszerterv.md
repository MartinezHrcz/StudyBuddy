Study buddy - Rendszerterv

## 1. A rendszer célja
A **Study Buddy** célja, hogy mesterséges intelligencia segítségével **támogassa a tanulást** azáltal, hogy a felhasználó által megadott témákból **összefoglaló jegyzeteket** és **kvízkérdéseket** generál.  
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

## 4. A felület felépítése és a technológiák kapcsolódása

1. **Frontend – React.js**
   - Feladata: felhasználói interakciók kezelése, megjelenítés.  
   - Kommunikáció: REST API hívások az Express.js felé.  
   - Könyvtárak: React Router, Axios, Chart.js / Recharts.

2. **Köztes réteg – Express.js**
   - Feladata: közvetítés a React és Django között.  
   - Hitelesítés és kéréskezelés
   - REST API endpointok definiálása.  

3. **Backend – Django (Python)**
   - Feladata: AI integráció, adatkezelés, eredményszámítás.  
   - Kommunikáció: OpenAI API hívások, PostgreSQL adatbázis.  

4. **Adatbázis – PostgreSQL**
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

## 6. Felülettel szemben támasztott követelmények

- Letisztult, intuitív felhasználói élmény.  
- Egységes színvilág és ikonrendszer.  
- Gyors betöltési idő (< 2 másodperc).  
- Reszponzív elrendezés (mobil, tablet, desktop).  
- Akadálymentesített (WCAG-kompatibilis) design.  
- Dark / Light mód támogatása.  


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