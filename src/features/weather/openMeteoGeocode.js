const GEOCODE_BASE = 'https://geocoding-api.open-meteo.com/v1/search'

/**
 * Ask Open-Meteo which coordinates match a place name (e.g. "Dungarvan, Ireland").
 * Returns the best match, or null if nothing was found.
 */
export async function searchPlace(query) {
  const trimmed = query.trim()
  if (!trimmed) {
    return null
  }

  const params = new URLSearchParams({
    name: trimmed,
    count: '5',
    language: 'en',
    format: 'json',
  })

  const url = `${GEOCODE_BASE}?${params}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Geocoding failed (${response.status})`)
  }

  const data = await response.json()
  const first = data.results?.[0]

  if (!first) {
    return null
  }

  return {
    name: first.name,
    admin1: first.admin1,
    countryCode: first.country_code,
    latitude: first.latitude,
    longitude: first.longitude,
  }
}
