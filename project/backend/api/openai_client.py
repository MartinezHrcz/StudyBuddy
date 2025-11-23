import re
import json
import openai
import os

openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_quiz(topic: str):
    prompt = f'''Készíts 10 rövid quiz kérdést a következő témában magyarul csak: "{topic}".
Ha a megadott téma Matematika, akkor a generált kérdésekre adott válaszoknak matematikailag helyeseknek kell lenniük.
Adj vissza **csak JSON-t**, semmi egyéb szöveget. A JSON formátuma legyen:
[
  {{
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "helyes válasz"
  }},
  ...
]'''

    try:
        resp = openai.chat.completions.create(
            model='gpt-4o-mini',
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
            temperature=0.7,
        )

        text = resp.choices[0].message.content
        # print("Raw response from OpenAI:", text)

        
        match = re.search(r"```json\s*(\[.*\])\s*```", text, re.DOTALL)
        if match:
            text = match.group(1)
        else:
            text = text.strip()

        raw_data = json.loads(text)

        
        formatted = []
        for item in raw_data:
            choices = []
            for opt in item['options']:
                choices.append({
                    "text": opt,
                    "is_correct": (opt == item['answer'])
                })
            formatted.append({
                "prompt": item['question'],
                "type": "mcq",
                "choices": choices
            })

        return formatted

    except Exception as e:
        raise RuntimeError(f"OpenAI returned invalid JSON: {text}\nError: {e}")