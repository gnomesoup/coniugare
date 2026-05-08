# Coniugare

A Monkeytype-inspired Italian verb conjugation quiz.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Features

- Fuzzy search/select verbs by Italian or English.
- Fuzzy search/select conjugation forms by Italian or English.
- Quiz shows all six pronouns and asks for the Italian conjugation.
- Prompt language switch: Italian, English, or both.
- Settings and name are remembered in `localStorage`.
- Keyboard shortcuts:
  - `/` focus verb search
  - `F` focus form search
  - `Alt + V` focus/select verb search
  - `Alt + F` focus/select form search
  - `Cmd/Ctrl + Enter` check answers
  - `Alt + N` new round

Answers are accent-insensitive, so `saro` is accepted for `sarò`.
