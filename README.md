# Mapa do dyplomu Jeziora Kaszubskie

Lista jezior została pobrana z [tego linku](https://sp2pzh.com/wpr/?page_id=2297) i przekonwertowana do formatu CSV za pomoca LibreOffice Calc, a następnie przekonwertowana do pliku JSON za pomocą skryptu `convert.js`.

Uruchamianie mapy lokalnie:

- `npm install` - instalacja bibliotek
- `npm run dev` - uruchomienie serwera w trybie deweloperskim
- `npm run build` - kompilacja w trybie produkcyjnym do folderu `docs`

Ze względu na hosting ([GitHub Pages](https://pages.github.com/)) konieczne jest ustawienie parametru `base` w `vite.config.ts` ([link](https://github.com/vitejs/vite/discussions/13910#discussioncomment-12547455)).
