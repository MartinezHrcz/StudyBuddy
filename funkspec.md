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

2. Alkalmazá funkcionalitása:

3. Összefoglalás