# Local preview

Open `index.html` directly in your browser. The bundled corpus JavaScript uses relative paths and works without a server or internet connection.

Alternatively, from this repository folder run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8000/ . Press Ctrl+C in the terminal to stop it.

## Data

`data/NVAtlas-AI-Agent.csv` is the exact CSV extracted from `NVAtlas.zip`; the original archive is retained. macOS metadata was not extracted. `data/corpus.js` contains the same 500 records, generated with Python's CSV parser and JSON serializer, preserving all five field values and Chinese characters. If updating the CSV later, regenerate the JavaScript dataset too.

The site searches all five fields using Unicode normalization and case-insensitive substring matching. All data and search run locally. The NV Atlas project link is an ordinary outbound link; no external scripts, fonts, analytics or APIs are used.

The static site can later be served by GitHub Pages from the repository root without a build step. No deployment has been configured or performed.
