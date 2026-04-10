# DevToolbox 🛠

A fast, modern developer utilities platform. Dark UI with purple accents, fully browser-based tools, zero sign-ups.

## Quick Start

```bash
pip install -r requirements.txt
python app.py
```

Visit `http://localhost:5000`

## Deploy to Railway / Render / Heroku

```bash
# Already includes Procfile
git init && git add . && git commit -m "init"
# Push to your platform
```

## Adding a New Tool

1. Add entry to `TOOLS` list in `app.py`
2. Create `templates/tools/<tool-id>.html` (extend `base.html`)
3. Done — it appears on the homepage grid automatically

## Tools Included

- JSON Formatter
- Base64 Encoder / Decoder
- Regex Tester
- URL Encoder / Decoder
- JWT Decoder
- Hash Generator (SHA-1/256/384/512)
- Text Diff
- HTML Formatter
