import './App.css'
import { useMemo, useState } from 'react'
import { evaluateDecision } from './features/plan/evaluateDecision'

function App() {
  const [location, setLocation] = useState('')
  const [activity, setActivity] = useState('hiking')
  const [condition, setCondition] = useState('clear')
  const [windKmh, setWindKmh] = useState(10)
  const [rainChance, setRainChance] = useState(10)
  const [hasSubmitted, setHasSubmitted] = useState(false)

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
              placeholder="e.g. Wicklow Mountains"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
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
            <p>
              <strong>{location || 'Selected area'}:</strong> {decision.reason}
            </p>
          </article>
        )}
      </section>
    </main>
  )
}

export default App