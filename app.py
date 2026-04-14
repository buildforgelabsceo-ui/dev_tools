from flask import Flask, render_template, jsonify
import json
from flask import current_app, send_from_directory
app = Flask(__name__)


@main.route('/sitemap.xml')
def sitemap():
    return send_from_directory(current_app.static_folder, 'sitemap.xml')
TOOLS = [
    {
        "id": "json-formatter",
        "name": "JSON Formatter",
        "description": "Beautify and validate JSON with proper indentation and syntax highlighting.",
        "icon": "{ }",
        "category": "Formatting",
        "color": "#7c3aed"
    },
    {
        "id": "base64-encoder",
        "name": "Base64 Encoder",
        "description": "Encode or decode text to and from Base64 format instantly.",
        "icon": "64",
        "category": "Encoding",
        "color": "#6d28d9"
    },
    {
        "id": "regex-tester",
        "name": "Regex Tester",
        "description": "Test and debug regular expressions with live match highlighting.",
        "icon": ".*",
        "category": "Testing",
        "color": "#7c3aed"
    },
    {
        "id": "url-encoder",
        "name": "URL Encoder",
        "description": "Encode or decode URLs and query string parameters.",
        "icon": "//",
        "category": "Encoding",
        "color": "#8b5cf6"
    },
    {
        "id": "jwt-decoder",
        "name": "JWT Decoder",
        "description": "Decode and inspect JWT tokens — header, payload, and signature.",
        "icon": "JWT",
        "category": "Security",
        "color": "#7c3aed"
    },
    {
        "id": "hash-generator",
        "name": "Hash Generator",
        "description": "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text.",
        "icon": "#",
        "category": "Security",
        "color": "#6d28d9"
    },
    {
        "id": "text-diff",
        "name": "Text Diff",
        "description": "Compare two blocks of text and highlight additions and removals.",
        "icon": "±",
        "category": "Comparison",
        "color": "#8b5cf6"
    },
    {
        "id": "html-formatter",
        "name": "HTML Formatter",
        "description": "Beautify and format messy HTML markup with clean indentation.",
        "icon": "</>",
        "category": "Formatting",
        "color": "#7c3aed"
    }
]

@app.route('/')
def index():
    return render_template('index.html', tools=TOOLS)

@app.route('/tools/<tool_id>')
def tool_page(tool_id):
    tool = next((t for t in TOOLS if t['id'] == tool_id), None)
    if not tool:
        return render_template('404.html'), 404
    return render_template(f'tools/{tool_id}.html', tool=tool, tools=TOOLS)

@app.route('/api/tools')
def api_tools():
    return jsonify(TOOLS)

@app.route('/about')
def about():
    return render_template('about.html', tools=TOOLS)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
