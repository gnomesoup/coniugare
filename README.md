# Coniugare

A fast, keyboard-friendly Italian verb conjugation quiz inspired by Monkeytype. Pick the verbs and tenses you want to practice, type all six pronoun forms, then check your answers instantly.

## Features

- 100 common Italian verbs with English translations.
- 6 practice forms:
  - presente indicativo
  - passato prossimo
  - imperfetto
  - futuro semplice
  - condizionale presente
  - congiuntivo presente
- Fuzzy search for verbs and forms in Italian or English.
- Multi-select verb and form pickers with quick **All** and **Clear** actions.
- Prompts in Italian, English, or both.
- All six subject pronouns in every round.
- Accent-insensitive checking, so `saro` is accepted for `sarò`.
- Settings saved in `localStorage`.
- Responsive dark UI using plain HTML, CSS, and JavaScript.

## Run locally

No install step is required. Open `index.html` directly in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 5173
```

Then visit:

```text
http://localhost:5173
```

## How to use

1. Choose one or more verbs from **Verbs**.
2. Choose one or more conjugation forms from **Forms**.
3. Optionally enter your name and pick a prompt language.
4. Type the Italian conjugation for each pronoun.
5. Select **Check answers** to see your score and corrections.
6. Move to another random verb/form round with the arrow button.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `/` | Focus verb search |
| `F` | Focus form search |
| `Alt + V` | Focus/open verb picker |
| `Alt + F` | Focus/open form picker |
| `Cmd/Ctrl + Enter` | Check answers, clear incorrect answers, or advance after a perfect score |
| `Alt + N` | New random round |

## Project structure

```text
.
├── index.html   # App markup
├── styles.css   # Theme and layout
├── app.js       # Verb data, conjugation logic, quiz behavior
├── README.md
└── LICENSE
```

## Development notes

Coniugare is a dependency-free static web app. The verb list, irregular forms, generated regular conjugations, state handling, and UI events all live in `app.js`.

To add or adjust content, edit:

- `VERB_DATA` for available verbs, auxiliaries, participles, and `-isc-` markers.
- `IRREGULAR_FORMS` for verb-specific irregular conjugations.
- `FORMS` for supported tenses/forms and prompt labels.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

No third-party JavaScript or CSS libraries are bundled with this project.
