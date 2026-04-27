<div align="center">
  <h1>🔐 Password Generator</h1>
  <p><strong>A modern, zero-dependency password generator built with vanilla HTML, CSS, and JavaScript.</strong></p>
  <p>Generate strong, customizable passwords instantly — entirely in your browser, with no data ever leaving your machine.</p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=fff" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=fff" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000" alt="JavaScript">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="MIT License">
  </p>
</div>

<br>

![Password Generator Screenshot](img/Password%20generator.png)

<br>

---

## ✨ Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | 🎚️ **Adjustable Length** | Drag the slider from **8 to 128 characters** to control password length in real time. |
| 2 | 🔤 **Character Set Toggle** | Independently enable or disable **uppercase**, **lowercase**, **digits**, and **symbols** to tailor the character pool. |
| 3 | 🚫 **Ambiguous Character Filter** | Remove easily confused characters (`I`, `l`, `1`, `O`, `0`) to improve readability. |
| 4 | 📊 **Strength Indicator** | A live, color-coded bar and label rates passwords from **Very Weak** → **Very Strong** based on entropy heuristics. |
| 5 | 📋 **One-Click Copy** | Copy the generated password to your clipboard with a single click and a **1.5-second confirmation toast**. |
| 6 | 🌙 **Dark Mode** | Toggle between light and dark themes. Your preference is persisted automatically via `localStorage`. |
| 7 | 📱 **Fully Responsive** | Optimized for every viewport — from mobile phones to ultrawide desktop displays. |
| 8 | 🧩 **Zero Dependencies** | No frameworks, no build tools, no runtime libraries. Just vanilla HTML, CSS, and JavaScript. |

---

## 🔄 How It Works

```
  1. Customize Options ──►  2. Generate Password  ──►  3. Review Strength  ──►  4. Copy & Use
```

1. **Configure** your preferences — set the desired length (8–128), toggle character sets, and enable the ambiguous character filter.
2. **Generate** — the password is computed instantly. Auto-generation fires on every option change so you never need to click a button unless you want to.
3. **Evaluate** — the strength indicator provides immediate visual feedback (score 0–100) based on length, character variety, and pool diversity.
4. **Copy** — click the copy button to move the password to your clipboard. A brief toast confirms success.

### Generation Algorithm

- A character pool is assembled from every enabled character set.
- Ambiguous characters are stripped from the pool when the filter is active.
- At least **one character from each selected set** is guaranteed in the final output.
- Remaining positions are filled with uniformly random picks from the pool.
- The full candidate is shuffled via **Fisher–Yates** and truncated to the target length.
- Entropy is scored 0–100 using a heuristic that weights length, pool size, and character-class mixing.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5 — semantic, accessible structure |
| **Styling** | CSS3 — custom properties, responsive grid, theme variables |
| **Logic** | Vanilla JavaScript (ES6+) — no transpilation or bundling |
| **Typography** | Inter (Google Fonts) |
| **Persistence** | `localStorage` — dark mode preference |
| **Security** | Client-side only — zero network activity |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Batu1-1an/Password-generator.git

# Open the app (no build step required)
open src/index.html        # macOS
start src/index.html       # Windows
xdg-open src/index.html    # Linux
```

No package manager, no `npm install`, no build step. Open the file and go.

---

## 📁 Project Structure

```
Password-generator/
├── img/
│   └── Password generator.png     # Application screenshot
├── src/
│   ├── index.html                  # HTML entry point
│   ├── css/
│   │   └── style.css              # All styles (light & dark themes)
│   └── js/
│       └── script.js              # Application logic & generation
├── .gitignore
└── README.md
```

---

## 🔒 Security

- **Fully client-side** — all password generation takes place in your browser. **No data is sent over the network**, ever.
- **No telemetry** — the app contains no trackers, analytics, or external requests of any kind.
- **Cryptographic note** — the current implementation uses `Math.random()` for character selection. For production environments requiring cryptographically secure randomness, replace with `crypto.getRandomValues()`.

---

<div align="center">
  <sub>Built with ❤️ using vanilla web technologies.</sub>
  <br>
  <sub>Distributed under the <strong>MIT License</strong>. See <a href="LICENSE">LICENSE</a> for details.</sub>
</div>
