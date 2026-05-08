# Coniugare

A fast, keyboard-friendly Italian verb conjugation quiz inspired by Monkeytype. Pick the verbs and tenses you want to practice, type all six pronoun forms, then check your answers instantly.

## Features

- 217 common Italian verbs with English translations.
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

## Configuration

The footer contact address is read from `config.js`. To generate that file from an environment variable, run:

```bash
CONIUGARE_CONTACT_EMAIL=you@example.com node scripts/write-config.js
```

Static hosts that support build commands can run the same command before publishing the site.

## How to use

1. Choose one or more verbs from **Verbs**.
2. Choose one or more conjugation forms from **Forms**.
3. Optionally pick a prompt language.
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
├── index.html      # App markup
├── legal.html      # Cookies, privacy, terms, and license notes
├── config.js       # Runtime configuration
├── styles.css      # Theme and layout
├── verbs.js        # Pronouns, form labels, verb data, irregular forms
├── conjugation.js  # Regular conjugation generation
├── app.js          # State, rendering, and event handling
├── scripts/
│   └── write-config.js
├── README.md
└── LICENSE
```

## Development notes

Coniugare is a dependency-free static web app split into small plain JavaScript files loaded by `index.html`.

To add or adjust content, edit:

- `verbs.js` for `VERB_DATA`, `IRREGULAR_FORMS`, pronouns, and supported form labels.
- `conjugation.js` for regular conjugation generation.
- `app.js` for state management, rendering, and event handling.

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.

No third-party JavaScript or CSS libraries are bundled with this project. The color palette is adapted from Spacemacs, which is GPL-3.0 licensed.
