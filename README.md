# Password Generator

> A modern, fully-featured password generator built with vanilla HTML, CSS, and JavaScript.

![Password Generator Screenshot](img/Password%20generator.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)

---

## Features

- **Customizable length** — Drag the slider from 8 to 32 characters.
- **Character set selection** — Toggle uppercase, lowercase, numbers, and symbols on or off.
- **Exclude ambiguous characters** — Remove easily confused characters like `I`, `l`, `1`, `O`, and `0`.
- **Password strength indicator** — Real-time visual bar and label (Very Weak → Very Strong).
- **One-click copy** — Copies to clipboard with inline confirmation feedback.
- **Dark mode** — Toggle between light and dark themes; preference is persisted to `localStorage`.
- **Responsive design** — Works on desktop and mobile viewports.
- **Zero dependencies** — No frameworks, no external runtime libraries.

## Tech Stack

| Layer    | Technology |
| -------- | ---------- |
| Markup   | HTML5      |
| Styling  | CSS3 (custom properties, responsive grid) |
| Logic    | Vanilla JavaScript (ES6+) |
| Font     | Inter (Google Fonts) |
| Storage  | `localStorage` for theme persistence |

## Getting Started

### Prerequisites

Nothing — just a modern web browser.

### Installation

```bash
git clone https://github.com/Batu1-1an/Password-generator.git
```

Open `src/index.html` in your browser:

```bash
open src/index.html        # macOS
start src/index.html       # Windows
xdg-open src/index.html    # Linux
```

No build step or package manager required.

## Project Structure

```
Password-generator/
├── img/
│   └── Password generator.png   # App screenshot
├── src/
│   ├── index.html               # Main HTML entry point
│   ├── css/
│   │   └── style.css            # All styles (light/dark theme)
│   └── js/
│       └── script.js            # Application logic
├── .gitignore
└── README.md
```

## How It Works

1. Select your desired password options (length, character types, ambiguous char filter).
2. Click **Generate Password** — or let it auto-generate on option change.
3. The password appears in the display field. A strength indicator evaluates it in real time.
4. Click **Copy** to send it to your clipboard (1.5 s confirmation toast).
5. Toggle **Dark Mode** for a comfortable low-light experience.

### Password Generation

- Builds a character pool from selected sets.
- Optionally filters out ambiguous characters.
- Guarantees at least one character from each selected set.
- Fills the remaining length with random picks, shuffles via Fisher–Yates, and truncates to the target length.
- Strength is scored from 0–100 based on length, character variety, and type mixing.

## Security

- All password generation happens **client-side** — no data is sent over the network.
- Uses `Math.random()` for character selection. For production use cases requiring cryptographic randomness, consider replacing with `crypto.getRandomValues()`.
- The app uses no external trackers, analytics, or telemetry.

## License

Distributed under the MIT License.
