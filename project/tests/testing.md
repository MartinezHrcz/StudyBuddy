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