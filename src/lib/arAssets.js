/**
 * Adaptador provisional de modelos 3D y realidad aumentada para la carta.
 *
 * En la arquitectura objetivo (Fases P-1 y P-2), los modelos se cargan desde
 * content/restaurants/<slug>/assets/ mediante el repositorio estático.
 * Este módulo mantiene compatibilidad hacia atrás durante la Fase 0 sin depender
 * de ningún proyecto Supabase externo o de terceros.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const ASSET_BASE = SUPABASE_URL ? `${SUPABASE_URL}/storage/v1/object/public/dish-assets` : ''

// Assets provisionales. En Fase 5 y P-2 se sustituyen por los modelos
// normalizados generados localmente por la CLI Estudio 3D en content/.
const PUBLISHED_ASSETS = {
  '1aaa9c9d-833b-4179-9396-b40610db0a4a': {
    glbUrl: ASSET_BASE ? `${ASSET_BASE}/1aaa9c9d-833b-4179-9396-b40610db0a4a/993724c47f799279.glb` : '',
    usdzUrl: ASSET_BASE ? `${ASSET_BASE}/1aaa9c9d-833b-4179-9396-b40610db0a4a/1c73ce63841209bd.usdz` : '',
    posterUrl: ASSET_BASE ? `${ASSET_BASE}/1aaa9c9d-833b-4179-9396-b40610db0a4a/dbf5275bbd404a8c.webp` : '',
  },
  '9e3c1bcc-f81f-4319-a40e-19ed426bec5f': {
    glbUrl: ASSET_BASE ? `${ASSET_BASE}/9e3c1bcc-f81f-4319-a40e-19ed426bec5f/13669505254372c7.glb` : '',
    usdzUrl: ASSET_BASE ? `${ASSET_BASE}/9e3c1bcc-f81f-4319-a40e-19ed426bec5f/9f052e1d5944b5c8.usdz` : '',
    posterUrl: ASSET_BASE ? `${ASSET_BASE}/9e3c1bcc-f81f-4319-a40e-19ed426bec5f/6f916b57bc33d859.webp` : '',
  },
}

const DISH_INDEX_TO_ASSET_FOLDER = {
  0: '1aaa9c9d-833b-4179-9396-b40610db0a4a', // Lubina a la plancha
  1: '9e3c1bcc-f81f-4319-a40e-19ed426bec5f', // Filete a la parrilla
}

function isTrustedAssetUrl(url) {
  if (!ASSET_BASE || typeof url !== 'string') return false
  return url.startsWith(`${ASSET_BASE}/`)
}

/**
 * Consulta un modelo activo remoto si hay una URL configurada.
 * Si no hay backend configurado (caso de la demo estática), retorna null de inmediato
 * para no emitir peticiones a dominios de terceros.
 *
 * @param {string} dishId - Identificador del plato
 * @returns {Promise<{glbUrl: string, usdzUrl: string, posterUrl: string} | null>}
 */
export async function fetchActiveAsset(dishId) {
  if (!dishId || !SUPABASE_URL || !SUPABASE_ANON_KEY) return null
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

/**
 * Resuelve el asset asociado al plato según su índice en la carta.
 *
 * @param {number} index - Índice del plato en el menú
 * @returns {{dishId: string, glbUrl: string, usdzUrl: string, posterUrl: string} | null}
 */
export function getAssetForDishIndex(index) {
  const folder = DISH_INDEX_TO_ASSET_FOLDER[index]
  return folder ? { dishId: folder, ...PUBLISHED_ASSETS[folder] } : null
}
