Study buddy Funkcionális specifikáció

## 1. Technológia architektúra:

A Study Buddy egy háromrétegű webes alkalmazás, amely modern JavaScript- és Python-alapú technológiákat használ a skálázhatóság, a gyors fejlesztés és a mesterséges intelligencia-integráció érdekében.

### 1.1 Architektúra áttekintés: 
1. **Frontend (React.js)**
   - Felhasználói felület, amely a tanulók interakcióit biztosítja.  
   - Kommunikál az Express.js rétegen keresztül a backend API-val.  
   - Funkciók:
     - Bejelentkezés / Regisztráció kezelése  
     - Jegyzetek és kvízek megjelenítése  
     - Eredmények, statisztikák, fejlődési grafikonok megjelenítése  
     - Mobil- és asztali reszponzivitás  

2. **Köztes réteg (Express.js)**
   - REST API réteg, amely a frontend és a Django backend közötti kommunikációt biztosítja.  
   - Feladatai:
     - Hitelesítési folyamat kezelése (JWT token)  
     - Kérések továbbítása a Django szolgáltatások felé  
     - Adatok előfeldolgozása és formázása  
     - Hiba- és jogosultságkezelés  

3. **Backend (Python Django)**
   - A mesterséges intelligencia és az adatkezelés fő logikai rétege.  
   - Feladatai:
     - Kvízkérdések és jegyzetek generálása AI segítségével  
     - Felhasználói adatok, témák és eredmények tárolása  
     - Eredmények kiértékelése és ajánlások generálása  
   - Az AI feldolgozás az **OpenAI API** (vagy más AI szolgáltatás) felhasználásával történik.  

4. **Adatbázis**
   - Tárolja a felhasználói fiókokat, témaköröket, generált kvízeket, eredményeket és statisztikákat.  
   - Javasolt adatbázis: **PostgreSQL**.  
   - Kapcsolat a Django ORM-en (Object Relational Mapper) keresztül.  

5. **Külső szolgáltatások**
   - **OpenAI API**: természetes nyelvi feldolgozáshoz, jegyzetek és kérdések generálásához.  
   - **AI modell** paraméterezhető a téma, nehézségi szint és válaszhossz alapján.  


---

## 2. Alkalmazás funkcionalitása

Az alkalmazás célja, hogy a tanulók számára automatikusan generált tananyagokat és kvízeket biztosítson, valamint mérje a fejlődésüket.  
Az alábbiakban a fő funkcionális modulok és folyamatok olvashatók:


### 2.1 Felhasználói fiókkezelés
- **Regisztráció:**  
  A felhasználó e-mail cím és jelszó megadásával új fiókot hoz létre.  
  A rendszer ellenőrzi az e-mail egyediségét és a jelszó minimális biztonsági feltételeit.  
- **Bejelentkezés:**  
  A felhasználó hitelesítése JWT tokennel történik.  
- **Profil megtekintése / szerkesztése:**  
  A felhasználó módosíthatja adatait (pl. név, profilkép, preferált nyelv).  

### 2.2 Témaválasztás és tanulási folyamat
- **Témaválasztás:**  
  A felhasználó választhat előre definiált témák közül vagy beírhat saját témát.  
- **AI alapú tartalomgenerálás:**  
  A Django backend az OpenAI API-t hívja meg, hogy létrehozzon:
  - egy rövid **összefoglaló jegyzetet**,  
  - és **5–10 kvízkérdést** a megadott témában.  
- **Tananyag megjelenítése:**  
  A React felület formázott módon jeleníti meg a jegyzetet és a kérdéseket.  

### 2.3 Kvízkitöltés és értékelés
- **Kvízindítás:**  
  A felhasználó elindíthatja a kvízt a kiválasztott témához.  
- **Kérdések kezelése:**  
  Minden kérdés 4 válaszlehetőséget tartalmaz.  
  A rendszer opcionálisan azonnal jelzi a helyes választ.  
- **Eredménykiszámítás:**  
  A backend kiszámolja a helyes válaszok arányát és százalékos eredményt ad vissza.  
- **Eredmény mentése:**  
  Az eredmény, a dátum és a téma az adatbázisban eltárolódik.  

### 2.4 Eredmények és statisztikák
- **Eredmények listázása:**  
  A felhasználó megtekintheti korábbi kvízeit és pontszámait.  
- **Grafikonos megjelenítés:**  
  A frontend vizuálisan ábrázolja a fejlődést (pl. React Chart.js vagy Recharts segítségével).  
- **Ajánlások:**  
  Az AI vagy a backend algoritmus javasolhat új témákat vagy ismétlő kvízeket az eredmények alapján.  

### 2.5 Felhasználói élmény és UI
- **Reszponzív design:**  
  Mobilon és asztali gépen is jól használható.  
- **Gamifikáció:**  
  A felhasználó szinteket vagy teljesítményértékeket kaphat.  
- **Egyszerű, letisztult interfész:**  
  Minimalista, modern felhasználói élmény, sötét/világos mód támogatással.  

### 2.6 Biztonság és adatvédelem
- Jelszavak **bcrypt** algoritmussal kerülnek titkosításra.  
- Az API kommunikáció **HTTPS** protokollon keresztül történik.    
---

## 3. Összefoglalás:

A **Study Buddy** egy többtechnológiás, AI-alapú tanulást segítő webalkalmazás, amely React, Express és Django technológiák integrálásával biztosítja a személyre szabott tanulási élményt.  
A rendszer automatizáltan generál tananyagot és kvízeket, értékeli a teljesítményt, és statisztikai visszajelzéseket ad, ezáltal támogatva a hatékony és motivált tanulást.

## 4. Fogalomtár

| Fogalom | Jelentés |
| :--- | :--- |
| **AI (Mesterséges Intelligencia)** | Olyan algoritmus, amely természetes nyelven képes jegyzeteket és kvízkérdéseket generálni. |
| **API** | Programozási interfész, amelyen keresztül a rendszer kommunikál az AI szolgáltatással. |
| **Frontend** | A felhasználó által látott és használt felület (**React**). |
| **Backend** | A szerveroldali logika (**Express** + **Django**). |
| **Kvíz** | Olyan kérdéssorozat, amelyet a rendszer generál a tanulás tesztelésére. |
| **Jegyzet** | Rövid összefoglaló a tananyagból, amelyet az AI készít. |
| **Felhasználói profil** | A felhasználó személyes adatai és eredményeinek összessége. |
| **OpenAI API** | Az **OpenAI** cég által biztosított **alkalmazásprogramozási felület**, amely hozzáférést biztosít a nagyméretű nyelvi modellekhez (LLM) (pl. GPT) a jegyzetek és kvízkérdések generálásához. |
| **JWT (JSON Web Token)** | Nyílt szabvány, amely lehetővé teszi a hitelesítési információk biztonságos továbbítását a felek között **JSON** objektumként, általában a bejelentkezett felhasználók jogosultságainak ellenőrzésére használva. |
| **Express.js** | **Node.js** alapú, gyors és minimalista webes alkalmazás keretrendszer, ami a jelen architektúrában **köztes REST API rétegként** szolgál. |
| **React.js** | JavaScript könyvtár a **felhasználói felületek** (UI) építésére. Segíti a dinamikus, komponens alapú frontend fejlesztést. |
| **Django** | Magas szintű, Python alapú webes keretrendszer, amely a jelen architektúrában az **adatkezelési logikáért** (ORM) és az **AI hívások** kezeléséért felel. |
| **PostgreSQL** | Objektum-relációs adatbázis-kezelő rendszer, amelyet a felhasználói adatok, kvízek és statisztikák megbízható tárolására javasol az architektúra. |
| **ORM (Object Relational Mapper)** | **(Django esetében)** Egy olyan programozási technika, amely lehetővé teszi az adatbázis adatainak és lekérdezéseinek kezelését az alkalmazás programozási nyelve (Python) objektumain keresztül SQL helyett. |
| **bcrypt** | Egy kriptográfiai hash függvény, amelyet a **jelszavak biztonságos tárolására** használnak a visszafejtés megakadályozása érdekében. |
| **HTTPS** | A **Hypertext Transfer Protocol Secure** rövidítése. Egy biztonságos kommunikációs protokoll, amely **titkosítással** védi az adatátvitelt a böngésző és a szerver között (pl. bejelentkezési adatok). |
| **Gamifikáció** | Tanulási kontextusba beépített **játékos elemek** (pl. pontok, szintek, jelvények) használata a felhasználói elkötelezettség és motiváció növelésére. |
| **Reszponzivitás (Design)** | A weboldal azon képessége, hogy **automatikusan alkalmazkodjon** a különböző képernyőméretekhez (mobil, tablet, asztali gép) anélkül, hogy a felhasználói élmény romlana. |
