# Study Buddy – Követelmény specifikáció

## 1. Áttekintés

A **Study Buddy** egy mesterséges intelligenciával támogatott tanulást segítő webes alkalmazás, amely a felhasználó által megadott vagy kiválasztott témakörök alapján **jegyzeteket** és **kvízkérdéseket** generál.  
A rendszer célja, hogy segítse a tanulókat az ismeretek elsajátításában, rendszerezésében és önellenőrzésében.

A projektet **Express.js**, **React.js** és **Python Django** technológiák felhasználásával valósítjuk meg.

- **React.js**: a front-end fejlesztéséhez (modern, reszponzív UI)
- **Express.js**: köztes réteg és API-hívások kezelése
- **Django**: az AI-generálás és adatkezelés backend oldali logikája
- **OpenAI API / egyéb AI szolgáltatás**: a kvízkérdések és jegyzetek automatikus generálása

---

## 2. Jelenlegi helyzet

Jelenleg a legtöbb tanulási platform statikus tananyagokat kínál, amelyek nem alkalmazkodnak a felhasználó igényeihez vagy tudásszintjéhez.  
A diákok gyakran:

- nehezen találnak személyre szabott tanulási anyagokat,
- nem tudják önállóan felmérni a tudásukat,
- nehezen koncentrálnak a hosszú, statikus tananyagokra.

Hiányzik egy olyan **interaktív rendszer**, amely azonnal képes tanulási segédanyagot és gyakorlófeladatokat létrehozni bármely megadott témában,
dinamikusan alkalmazkodva a diák aktuális teljesítményéhez, tudásszintjéhez és a felhasználói interakciókhoz.
Ez a rendszer szükségképpen magában foglalja a következőket:

Valós idejű, adaptív visszajelzés és korrekció:
A feladatok megoldása során azonnali, személyre szabott visszajelzést ad,
és szükség esetén átirányítja a diákot azokra a területekre, ahol további segítségre van szüksége.

Tudásszint-felmérés és nyomon követés:
Beépített mechanizmusokat tartalmaz a diák erősségeinek és hiányosságainak folyamatos,
automatizált felmérésére, és vizuálisan követhetővé teszi a tanulási fejlődést.

Gamifikált elemek és motiváció:
Beépített motivációs eszközökkel (pl. pontok, jelvények, fejlődési sávok) segíti a diákok elkötelezettségét,
fenntartva a koncentrációt a hosszú, statikus anyagok helyett egy interaktív, célzott tanulási környezetben.

Természetes nyelvi interakció:
Lehetővé teszi a diák számára, hogy természetes nyelven tegyen fel kérdéseket a témával kapcsolatban,
és érezhetően "beszélget" a segítővel, ezáltal növelve a megértést és a koncentrációt.

Témaválasztás és mélység személyre szabása:
Képes szabályozni a generált tananyagok mélységét,
részletességét és a feladatok nehézségi fokát a felhasználó által megadott kritériumok vagy az automatikus tudásszint-felmérés alapján.

---

## 3. Vágyálom rendszer

A jövőbeni, ideális rendszer (a Study Buddy):

- képes **valós időben** reagálni a felhasználó igényeire,
- a megadott témában automatikusan generál **összefoglaló jegyzetet**,
- képes **kvízkérdéseket** készíteni a tananyag alapján,
- elemzi a felhasználó eredményeit, és ezek alapján javasol új gyakorlóanyagokat
- mobilról és asztali gépről is könnyen használható,
- egyszerű, intuitív és játékos felhasználói élményt biztosít.

---

## 4. Jelenlegi üzleti folyamatok modellje

**(Jelenlegi, nem automatizált folyamat)**

1. A diák saját maga keres tananyagokat az interneten.
2. Ezekből kézzel készít jegyzeteket vagy kártyákat.
3. Saját maga próbál kvízeket keresni a gyakorláshoz.
4. Az eredményeit nem méri rendszeresen, csak becsüli a tudását.

**A Study Buddy által bevezetett új folyamat:**

1. A felhasználó kiválaszt egy témát.
2. Az AI létrehozza a jegyzetet és a kvízt.
3. A felhasználó kitölti a kvízt.
4. A rendszer értékeli és tárolja az eredményt.
5. A felhasználó visszajelzést kap, és új anyagokat próbálhat.

---

## 5. Követelménylista

| Azonosító | Követelmény                   | Típus (F/NF) | Leírás                                                                     |
| --------- | ----------------------------- | ------------ | -------------------------------------------------------------------------- |
| K1        | Regisztráció és bejelentkezés | F            | A felhasználók fiókot hozhatnak létre, és biztonságosan bejelentkezhetnek. |
| K2        | Témakör kiválasztása          | F            | A felhasználó választhat előre definiált vagy egyéni témát.                |
| K3        | Jegyzet generálás             | F            | Az AI automatikusan készít összefoglalót a megadott témában.               |
| K4        | Kvízkérdések generálása       | F            | Az AI automatikusan kvízkérdéseket és válaszlehetőségeket hoz létre.       |
| K5        | Kvíz kitöltése és értékelés   | F            | A rendszer értékeli a válaszokat, és pontszámot ad.                        |
| K6        | Eredmények mentése            | F            | A rendszer tárolja az előző kvízek eredményeit.                            |
| K7        | Eredmények megtekintése       | F            | A felhasználó visszanézheti a múltbeli teljesítményét.                     |
| K8        | Reszponzív felület            | NF           | A webalkalmazás mobilon és asztali gépen is jól működik.                   |
| K9        | AI integráció                 | NF           | A rendszer külső AI API-t használ (pl. OpenAI).                            |
| K10       | Adatvédelem                   | NF           | A felhasználói adatok titkosítva kerülnek tárolásra.                       |

---

## 6. A rendszer elvárt működése

### 6.1 Bejelentkezés és kezdőfelület

A felhasználó bejelentkezik, majd a kezdőoldalon látja:

- saját korábbi eredményeit,
- ajánlott témaköröket,
- “Új tanulás indítása” gombot.

### 6.2 Kvíz indítása

A felhasználó kiválasztja a kívánt témát, majd elindítja a kvízt.  
A háttérben az AI generál 5–10 kérdést, négy válaszlehetőséggel.

### 6.3 Kérdések megválaszolása

A felhasználó lépésről lépésre megválaszolja a kérdéseket.  
A rendszer azonnali visszajelzést is adhat (helyes / helytelen válasz).

### 6.4 Kvíz befejezése és eredmény

A kvíz végén a rendszer kiszámolja a pontszámot és százalékos eredményt.  
A felhasználó láthatja, mely kérdésekre válaszolt rosszul, és újra próbálhatja a kvízt.

### 6.5 Eredmények nyomon követése

A rendszer menti a korábbi eredményeket, és grafikonon jeleníti meg a fejlődést.  
A felhasználó láthatja, mely témákban erős, és hol érdemes ismételnie.

### 6.6 Felhasználói élmény

A felület minimalista, letisztult, és játékos elemekkel (progress bar, szintek, badge-ek) motiválja a tanulót.  
Reszponzív kialakításnak köszönhetően telefonon is teljes értékűen működik.

---

## 7. Fogalomtár

| Fogalom                            | Jelentés                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| **AI (Mesterséges Intelligencia)** | Olyan algoritmus, amely természetes nyelven képes jegyzeteket és kvízkérdéseket generálni. |
| **API**                            | Programozási interfész, amelyen keresztül a rendszer kommunikál az AI szolgáltatással.     |
| **Frontend**                       | A felhasználó által látott és használt felület (React).                                    |
| **Backend**                        | A szerveroldali logika (Express + Django).                                                 |
| **Kvíz**                           | Olyan kérdéssorozat, amelyet a rendszer generál a tanulás tesztelésére.                    |
| **Jegyzet**                        | Rövid összefoglaló a tananyagból, amelyet az AI készít.                                    |
| **Felhasználói profil**            | A felhasználó személyes adatai és eredményeinek összessége.                                |
