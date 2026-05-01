import './App.css'
import { useMemo, useState } from 'react'
import { evaluateDecision } from './features/plan/evaluateDecision'
import { searchPlace } from './features/weather/openMeteoGeocode'

function dateInputValueFromDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatPlanDateLabel(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function App() {
  const [location, setLocation] = useState('')
  const [planDate, setPlanDate] = useState(() =>
    dateInputValueFromDate(new Date())
  )
  const [activity, setActivity] = useState('hiking')
  const [condition, setCondition] = useState('clear')
  const [windKmh, setWindKmh] = useState(10)
  const [rainChance, setRainChance] = useState(10)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState(null)
  const [geoMatch, setGeoMatch] = useState(null)

  const decision = useMemo(
    () =>
      evaluateDecision({
        activity,
        condition,
        windKmh: Number(windKmh),
        rainChance: Number(rainChance),
      }),
    [activity, condition, windKmh, rainChance]
  )

  function handleSubmit(event) {
    event.preventDefault()
    setHasSubmitted(true)
  }

  async function handleLookUpPlace() {
    const query = location.trim() || 'Waterford, Ireland'
    setGeoLoading(true)
    setGeoError(null)
    setGeoMatch(null)

    try {
      const match = await searchPlace(query)
      if (!match) {
        setGeoError('No match from Open-Meteo. Try another spelling or add ", Ireland".')
        return
      }
      setGeoMatch(match)
    } catch (err) {
      setGeoError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setGeoLoading(false)
    }
  }

  return (
    <main className="app">
      <section className="panel">
        <h1>Activity plan</h1>
        <p>Enter quick conditions and get a simple decision.</p>

        <form className="planner-form" onSubmit={handleSubmit}>
          <label>
            Area
            <input
              type="text"
              placeholder="e.g. Dungarvan, Ireland"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>
          <button type="button" onClick={handleLookUpPlace}>
            {geoLoading ? 'Looking up…' : 'Look up place (Open-Meteo)'}
          </button>
          {geoError ? <p className="geo-note geo-note-error">{geoError}</p> : null}
          {geoMatch ? (
            <p className="geo-note">
              Matched: <strong>{geoMatch.name}</strong>
              {geoMatch.admin1 ? `, ${geoMatch.admin1}` : ''} ({geoMatch.countryCode}) — lat{' '}
              {geoMatch.latitude}, lon {geoMatch.longitude}
            </p>
          ) : null}

          <label>
            Date
            <input
              type="date"
              value={planDate}
              onChange={(event) => setPlanDate(event.target.value)}
            />
          </label>

          <label>
            Activity
            <select
              value={activity}
              onChange={(event) => setActivity(event.target.value)}
            >
              <option value="hiking">Hiking</option>
              <option value="kayaking">Kayaking</option>
              <option value="surfing">Surfing</option>
            </select>
          </label>

          <label>
            Weather condition
            <select
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            >
              <option value="clear">Clear</option>
              <option value="cloudy">Cloudy</option>
              <option value="rain">Rain</option>
              <option value="storm">Storm</option>
            </select>
          </label>

          <label>
            Wind (km/h)
            <input
              type="number"
              min="0"
              max="120"
              value={windKmh}
              onChange={(event) => setWindKmh(event.target.value)}
            />
          </label>

          <label>
            Rain chance (%)
            <input
              type="number"
              min="0"
              max="100"
              value={rainChance}
              onChange={(event) => setRainChance(event.target.value)}
            />
          </label>

          <button type="submit">Check Decision</button>
        </form>

        {hasSubmitted && (
          <article className={`decision decision-${decision.label.toLowerCase()}`}>
            <h2>{decision.label}</h2>
            <p className="decision-meta">
              <strong>{location || 'Selected area'}</strong>
              {planDate ? (
                <>
                  {' '}
                  · <time dateTime={planDate}>{formatPlanDateLabel(planDate)}</time>
                </>
              ) : null}
            </p>
            <p>{decision.reason}</p>
          </article>
        )}
      </section>
    </main>
  )
}

export default App