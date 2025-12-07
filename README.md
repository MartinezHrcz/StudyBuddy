# Study Buddy 📚🤖

Üdvözlünk a **Study Buddy**-ban, egy mesterséges intelligencia alapú webalkalmazásban, amely személyre szabott tananyagot, kvízeket és fejlődési statisztikákat biztosít a diákok számára. Akár vizsgára készülsz, akár egy adott témában szeretnél jobban elmélyülni, a Study Buddy segít a tanulási folyamatban.

## 🚀 Funkciók:

* **AI által generált tananyagok**: Képzeld el, hogy jegyzeteket és kvízeket kapsz a választott témádból, mindezt mesterséges intelligenciával 📖.
* **Kvízek és teljesítmény nyomon követés**: Tölts ki időkorlátos kvízeket, kövesd a fejlődésed és kapj személyre szabott visszajelzést 📊.
* **Interaktív tanulás**: Választhatsz témákat, mentheted kedvenceidet, és letöltheted a tananyagot PDF formátumban 🔄.
* **Felhasználóbarát UI**: Modern, reszponzív dizájn.
* **Gamifikáció**: Szerezz pontokat, szinteket és jelvényeket miközben tanulsz 🏆.

## 🌟 Főbb Jellemzők

| Kategória | Funkció | Leírás | Emoji |
| :--- | :--- | :--- | :--- |
| **Személyre Szabott Tanulás** | **AI-Powered Tartalomgenerálás** | Generálj valós idejű, releváns kvízeket BÁRMELY választott témáról az OpenAI API segítségével. | 🧠 |
| | **Interaktív Kvízek** | Tölts ki időkorlátos kvízeket különböző témákban. | ⏱️ |
| **Teljesítménykövetés** | **Statisztikák** | Kövesd a fejlődésedet, kvízteljesítményedet, pontosságodat és az egyéni erősségeidet/gyengeségeidet. | 📊 |
| **Motiváció & Élmény** | **Gamifikált Tanulás** | Szerezz pontokat, emelkedj szinteken. | 🏆 |
| | **Modern UI/UX** | Reszponzív dizájn, amely zökkenőmentesen. | 💡 |

## 🧑‍💻 Technológiai Stack:

* **Frontend**: React.js TypeScript-tel a dinamikus és reszponzív felhasználói felülethez.
* **Backend**: Python Django az adatkezeléshez és AI integrációhoz.
* **Köztes réteg**: Express.js REST API a frontend és a backend közötti zökkenőmentes kommunikációhoz.
* **Adatbázis**: PostgreSQL a megbízható adattárolás és gyors lekérdezések érdekében.
* **AI**: OpenAI API a tananyagok és kvízek generálásához 🤖.

## 🛡️ Biztonság

* **JWT (JSON Web Tokens)**: Állapotmentes, biztonságos hitelesítés minden API híváshoz. 🔑
* **HTTPS** kommunikáció az adatvédelem és biztonság érdekében 🔒


## 🚨 Követelmények:
* **Node**: Npm, Nodejs v25.2.1
* **Python**: Python3.11, pip
* **OpenAI**: OpenAi api kulcs


## 🚧 Hogyan kezdj hozzá:

1. Klónozd le a repót
2. Telepítsd a függőségeket: `npm install` (frontendhez) és `pip install -r requirements.txt` (backendhez)
3. Állítsd be a környezeti változókat (API kulcsok, adatbázis beállítások) a `.env` fájlban.
4. Indítsd el az alkalmazást, és kezdj el tanulni!

## Tests:
# 🧪 Unit and Integration Test Coverage Summary

| Category | Test Suite | Test Case | Description |
| :--- | :--- | :--- | :--- |
| **Authentication & Public API** | `RegistrationAndAuthTests` | `test_register_view_success` | Verifies a new user can successfully **register** and a `User` object is created. |
| **Authentication & Public API** | `RegistrationAndAuthTests` | `test_chat_with_ai_requires_auth` | Ensures the `chat_with_ai` endpoint returns **401 Unauthorized** when accessed without a token. |
| **API Views (AI Mocked)** | `ChatViewTests` | `test_chat_with_ai_view_success` | Mocks the AI client and verifies the endpoint returns **200 OK** and the correct mock response. |
| **API Views (AI Mocked)** | `ChatViewTests` | `test_chat_with_ai_view_api_error` | Ensures the view handles `RuntimeError` from the AI client, returning **500 Internal Server Error**. |
| **API Views (AI Mocked)** | `GenerateQuizViewTests` | `test_generate_quiz_view_success` | Mocks AI output and verifies that the view creates one **Quiz, two Questions, and four Choice** objects with **201 Created**. |
| **Models** | `QuizModelTests` | `test_quiz_creation` | Verifies basic `Quiz` field assignment and ownership relationship. |
| **Models** | `QuizModelTests` | `test_quiz_owner_can_be_null` | Checks that a quiz can be created without an owner (`owner=None`). |
| **Models** | `QuizModelTests` | `test_quiz_str_representation` | Tests the human-readable output of the `Quiz` model's `__str__` method. |
| **Models** | `QuestionAndChoiceModelTests`| `test_question_creation_and_relationship` | Verifies question relationship to `Quiz` and checks the default `is_true_false=False` value. |
| **Models** | `QuestionAndChoiceModelTests`| `test_question_str_representation` | Ensures the `Question` `__str__` method correctly **truncates** long prompts. |
| **Models** | `QuestionAndChoiceModelTests`| `test_choice_creation_and_relationship` | Verifies `Choice` relationship to `Question` and checks the `is_correct` flag. |
| **Models** | `QuizAttemptModelTests` | `test_quiz_attempt_creation` | Verifies that `QuizAttempt` correctly records **user, quiz, correct, and total scores**. |
| **Models** | `QuizAttemptModelTests` | `test_finished_at_is_optional` | Checks that `finished_at` is initially `None` and can be subsequently updated. |
| **Serializers** | `TestSerializer` | `test_register_creation_success` | Validates the `RegisterSerializer` with valid data, ensuring the user is created with a **hashed password**. |
| **Serializers** | `TestSerializer` | `test_register_creation_missing_field` | Ensures `RegisterSerializer` **fails** when the required `username` field is missing. |
| **Serializers** | `TestSerializer` | `test_quiz_attempt_deserialization_creation` | Verifies `QuizAttemptSerializer` can deserialize data and create a new attempt object. |
| **Serializers** | `TestSerializer` | `test_choice_serialization` | Checks that the `ChoiceSerializer` outputs all required fields. |
| **Serializers** | `TestSerializer` | `test_question_serialization_with_choices` | Verifies `QuestionSerializer` uses **nested serialization** to include all related `Choice` objects. |
| **Serializers** | `TestSerializer` | `test_quiz_serialization_with_nesting` | Ensures `QuizSerializer` correctly performs **deep nesting** to include `Question` and `Choice` data. |

Élvezd a tanulást a **Study Buddy**-val! 💡

---

Ha kérdéseid vagy ötleteid vannak, bátran kereshetsz minket!
