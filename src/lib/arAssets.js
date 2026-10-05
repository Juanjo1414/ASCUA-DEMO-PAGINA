// Fuente de los modelos 3D/AR: el mismo proyecto Supabase de ARFOODS.
// No se descarga ni se duplica nada — se apunta a las URLs públicas del
// bucket `dish-assets` que el worker de ARFOODS ya generó.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const ASSET_BASE = `${SUPABASE_URL}/storage/v1/object/public/dish-assets`

// Assets ya publicados en el bucket, por carpeta de dish_id (ARFOODS los
// organiza así: dish-assets/{dish_id}/{hash}.{glb|usdz|webp}).
const PUBLISHED_ASSETS = {
  '1aaa9c9d-833b-4179-9396-b40610db0a4a': {
    glbUrl: `${ASSET_BASE}/1aaa9c9d-833b-4179-9396-b40610db0a4a/993724c47f799279.glb`,
    usdzUrl: `${ASSET_BASE}/1aaa9c9d-833b-4179-9396-b40610db0a4a/1c73ce63841209bd.usdz`,
    posterUrl: `${ASSET_BASE}/1aaa9c9d-833b-4179-9396-b40610db0a4a/dbf5275bbd404a8c.webp`,
  },
  '9e3c1bcc-f81f-4319-a40e-19ed426bec5f': {
    glbUrl: `${ASSET_BASE}/9e3c1bcc-f81f-4319-a40e-19ed426bec5f/13669505254372c7.glb`,
    usdzUrl: `${ASSET_BASE}/9e3c1bcc-f81f-4319-a40e-19ed426bec5f/9f052e1d5944b5c8.usdz`,
    posterUrl: `${ASSET_BASE}/9e3c1bcc-f81f-4319-a40e-19ed426bec5f/6f916b57bc33d859.webp`,
  },
}

// Qué plato de esta landing muestra qué modelo. La clave es el índice del
// plato en el menú (mismo orden en ES y EN); el valor, la carpeta del
// dish_id en Supabase. Agregar un plato con modelo = agregar una línea.
const DISH_INDEX_TO_ASSET_FOLDER = {
  0: '1aaa9c9d-833b-4179-9396-b40610db0a4a', // Lubina a la plancha
  1: '9e3c1bcc-f81f-4319-a40e-19ed426bec5f', // Filete a la parrilla
}

// Solo se aceptan URLs que efectivamente vengan del bucket público de
// ARFOODS: si algún día una fila de dish_assets queda mal protegida por RLS
// y algo la escribe, esto evita que una URL arbitraria llegue al
// <model-viewer> o al intent:// de Android.
function isTrustedAssetUrl(url) {
  return typeof url === 'string' && url.startsWith(`${ASSET_BASE}/`)
}

// Igual que `app/m/[slug]/page.tsx` de ARFOODS: solo se ofrece AR cuando
// hay un dish_assets con is_active=true, glb y poster. La landing es
// estática, así que la consulta va con la anon key desde el navegador; si
// RLS la bloquea o no hay fila activa, se cae al asset ya publicado.
export async function fetchActiveAsset(dishId) {
  if (!dishId) return null
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/dish_assets?select=glb_url,usdz_url,poster_url&dish_id=eq.${dishId}&is_active=eq.true&limit=1`,
      { headers: { apikey: SUPABASE_ANON_KEY } },
    )
    if (!response.ok) return null
    const [row] = await response.json()
    if (!row?.glb_url || !row?.poster_url) return null
    if (!isTrustedAssetUrl(row.glb_url) || !isTrustedAssetUrl(row.poster_url)) return null
    if (row.usdz_url && !isTrustedAssetUrl(row.usdz_url)) return null
    return { glbUrl: row.glb_url, usdzUrl: row.usdz_url, posterUrl: row.poster_url }
  } catch {
    return null
  }
}

export function getAssetForDishIndex(index) {
  const folder = DISH_INDEX_TO_ASSET_FOLDER[index]
  return folder ? { dishId: folder, ...PUBLISHED_ASSETS[folder] } : null
}
