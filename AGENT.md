# Maturaziehung — Project Overview

## What is this?

**Maturaziehung** (German for "Matura topic draw") is a web application for randomly drawing exam topics for the Austrian **Matura** (the final school-leaving examination). It was created by [Haschek Solutions](https://haschek.solutions) and appears to be used at **BRG1** (Bundesrealgymnasium 1) in Vienna, Austria.

The app allows examiners or students to select a school subject and then randomly "draw" two distinct topics from that subject's topic pool — simulating the real-world process where Matura exam topics are drawn at random.

## How it works

### Data Pipeline

1. Teachers submit their subject topics via a Google Form, which exports a **CSV/TSV file** (`data/themenpool.csv` or `data/themenpool.tsv`). Each row contains a subject/teacher name and up to 18 topic entries.
2. A PHP script (`data/prepare.php`) parses the TSV file, normalizes subject names into URL-friendly hashes, and generates a `database.json` file containing all subjects and their topics.
3. The frontend web app loads `database.json` at runtime via AJAX and uses it to populate the UI.

### Frontend

- **Single-page web app** served from `index.html`
- Built with **Bootstrap 3** for layout/styling and **jQuery** for DOM manipulation
- Uses the **ShuffleText** library to create a slot-machine-style text animation when topics are drawn
- Workflow:
  1. User selects a subject from a dropdown
  2. Clicks the "Zufallsgenerator starten" (Start random generator) button
  3. Two random, distinct topics are selected and displayed with a shuffle animation
  4. A "Reset" button reloads the page to start over
  5. A `beforeunload` event handler warns the user if they try to leave mid-draw (to prevent accidental page reloads during an official drawing)

### Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | HTML, CSS (Bootstrap 3), JavaScript (jQuery) |
| Animation | ShuffleText (npm package) |
| Data prep | PHP (`prepare.php`) |
| Data format | CSV/TSV input → JSON output |
| Server | Any static web server (for frontend); PHP-capable server (for data prep) |

## Project Structure

```
├── index.html              # Main web app page
├── favicon.png             # Browser tab icon
├── logo_png.png            # School/brand logo
├── README.md               # Installation instructions (German)
├── css/
│   ├── bootstrap*.css      # Bootstrap 3 CSS (regular + minified)
│   └── matura.css          # Custom styles (minimal)
├── js/
│   ├── bootstrap*.js       # Bootstrap 3 JS
│   ├── jquery-*.js         # jQuery
│   ├── matura.js           # Main app logic (drawing, UI)
│   ├── npm.js              # Bootstrap npm helper
│   └── node_modules/       # ShuffleText dependency
├── data/
│   ├── prepare.php         # CSV→JSON conversion script
│   ├── themenpool.csv      # Source topic data (CSV format)
│   ├── themenpool.tsv      # Source topic data (TSV format)
│   ├── database.json       # Generated JSON database (used by frontend)
│   └── .gitignore          # Ignores database.json from version control
└── fonts/                  # Bootstrap/Glyphicons fonts
```

## Subjects Covered

The 2023 dataset includes ~27 subjects from BRG1, including: Mathematics, English, French, Spanish, Latin, Biology, Chemistry, Physics (multiple teachers), Geography, History (GSP), Art (BE), Music, IKT/Computer Science, Psychology & Philosophy (PUP), Ethics, Catholic/Islamic/Evangelical Religion, Sports Science, Biochemistry, and Descriptive Geometry (cDG).
