#  Study Buddy – Követelmény specifikáció

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

Hiányzik egy olyan **interaktív rendszer**, amely azonnal képes tanulási segédanyagot és gyakorlófeladatokat létrehozni bármely megadott témában.

---