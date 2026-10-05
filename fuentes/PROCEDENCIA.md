# Where the site's images come from

The only raster images the site ships are the eight menu dish photos, in
`public/images/carta/`. Everything else is drawn in code:

- The hero ember, the coal bed, the flames and the sparks are drawn on a canvas by `src/components/Escena.jsx`.
- The text ring and the thermometer are SVG and DOM.

| Published | Source (not published) | Treatment |
|---|---|---|
| `public/images/carta/pescado.jpg` | `fuentes/carta/gemini-pescado.jpg` | centered 760 px square crop, scaled to 720 px, no color change |
| `public/images/carta/filete.jpg` | `fuentes/carta/gemini-filete.jpg` | same as above |
| `public/images/carta/tagliatelle.jpg` | `fuentes/carta/gemini-tagliatelle.jpg` | same as above |
| `public/images/carta/vieiras.jpg` | `fuentes/carta/gemini-vieiras.jpg` | same as above |
| `public/images/carta/pato.jpg` | `fuentes/carta/gemini-pato.jpg` | same as above |
| `public/images/carta/gnocchi.jpg` | `fuentes/carta/gemini-gnocchi.jpg` | same as above |
| `public/images/carta/langosta.jpg` | `fuentes/carta/gemini-langosta.jpg` | same as above |
| `public/images/carta/cerdo.jpg` | `fuentes/carta/gemini-cerdo.jpg` | same as above |

The sources are AI-generated images, the same ones the menu has always used.
Ascua is an invented brand, so there are no photos of a real restaurant.

To rebuild them, run `node scripts/carta.mjs` (it uses `ffmpeg-static`). If
real photos arrive, put them in `fuentes/carta/` under the same names and run
the script again.

The 3D and AR models are not in this repo. They are served from Supabase
through `src/lib/arAssets.js`.
