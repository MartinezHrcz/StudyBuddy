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


