# Tesztesetek

## Backend Auth tesztek

| Teszt ID | Művelet                         | Bemenet                        | Várt eredmény                    | Kapott eredmény       | Állapot |
| -------- | ------------------------------- | ------------------------------ | -------------------------------- | --------------------- | ------- |
| AUTH-01  | POST `/register/`               | `username=test, password=1234` | 201 Created, user created        | 201 Created | Sikeres       |
| AUTH-02  | POST `/register/` (régi névvel) | `username=test, password=1234` | 400 Bad Request, username exists | 400 Bad Request| Sikeres       |
| AUTH-03  | POST `/token/`                  | helyes username + password     | 200 OK + access + refresh token  | 200 OK | Sikeres       |
| AUTH-04  | POST `/token/`                  | rossz password                 | 401 Unauthorized                 | 401 Unauthorized | Sikeres       |
| AUTH-05  | POST `/token/refresh/`          | refresh token                  | 200 OK + új access token         | 200 OK | Sikeres       |
| AUTH-06  | Védett endpoint token nélkül    | GET `/api/quizzes/generate/`   | 401 Unauthorized                 | 401 Unauthorized| Sikeres       |

## Backend Quiz tesztek

### Quiz generálás

| Teszt ID | Metódus                       | Bement                              | Várt eredmény               | Kapott eredmény | Állapot |
| -------- | ----------------------------- | ----------------------------------- | --------------------------- | --------------- | ------- |
| QUIZ-01  | POST `/api/quizzes/generate/` | `{ topic: “Math” }`, érvényes token | 201 Created + quiz ID       | 201 Created | Sikeres       |
| QUIZ-02  | POST `/generate/`             | topic hiányzik                      | 400 Bad Request             | 400 Bad Request | Sikeres       |
| QUIZ-03  | POST `/generate/`             | token hiányzik                      | 401 Unauthorized            | 401 Unauthorized | Sikeres       |
| QUIZ-04  | Mockolt AI rossz formátum     | mock: invalid JSON                  | 500 Server Error            | 500 Server Error | Sikeres       |

### Quiz lekérés

| Teszt ID | Metódus                  | Bemenet            | Várt eredmény     | Kapott eredmény | Állapot |
| -------- | ------------------------ | ------------------ | ----------------- | --------------- | ------- |
| QUIZ-05  | GET `/api/quizzes/{id}/` | létező quiz        | 200 OK + kérdések | 200 OK | Sikeres       |
| QUIZ-06  | GET `/api/quizzes/999/`  | nem létező quiz ID | 404 Not Found     | 404 Not Found | Sikeres       |
| QUIZ-07  | GET `/api/quizzes/{id}/` | nincs token        | 401 Unauthorized  | 401 Unauthorized | Sikeres       |

### Quiz kitöltés

| Teszt ID | Metódus         | Bemenet           | Várt eredmény                   | Kapott eredmény | Állapot |
| -------- | --------------- | ----------------- | ------------------------------- | --------------- | ------- |
| QUIZ-08  | POST `/submit/` | helyes válaszok   | 200 OK + `correct=X`, `total=Y` | 200 OK | Sikeres       |
| QUIZ-09  | POST `/submit/` | hibás válasz ID-k | 200 OK, correct kevesebb        | 200 OK | Sikeres       |
| QUIZ-10  | POST `/submit/` | üres `answers`    | 200 OK, correct=0               | 200 OK | Sikeres       |
| QUIZ-11  | POST `/submit/` | rossz quiz ID     | 404 Not Found                   | 404 Not Found | Sikeres       |
| QUIZ-12  | POST `/submit/` | token nélkül      | 401 Unauthorized                | 401 Unauthorized | Sikeres       |
