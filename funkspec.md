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

---

3. Összefoglalás