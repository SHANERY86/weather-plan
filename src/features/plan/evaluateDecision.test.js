import { describe, expect, it } from 'vitest'
import { evaluateDecision } from './evaluateDecision'

describe('evaluateDecision', () => {
  it('returns No-Go for storm conditions regardless of activity', () => {
    const result = evaluateDecision({
      activity: 'hiking',
      condition: 'storm',
      windKmh: 5,
      rainChance: 0,
    })

    expect(result.label).toBe('No-Go')
    expect(result.reason).toBe('Storm conditions are unsafe for outdoor activities.')
  })

  it('returns No-Go when wind exceeds hiking threshold', () => {
    const result = evaluateDecision({
      activity: 'hiking',
      condition: 'clear',
      windKmh: 40,
      rainChance: 10,
    })

    expect(result.label).toBe('No-Go')
    expect(result.reason).toContain('hiking')
  })

  it('returns Caution near kayaking thresholds', () => {
    const result = evaluateDecision({
      activity: 'kayaking',
      condition: 'clear',
      windKmh: 17,
      rainChance: 20,
    })

    expect(result.label).toBe('Caution')
    expect(result.reason).toBe('Conditions are close to limits. Proceed with care.')
  })

  it('returns Go for safe surfing conditions', () => {
    const result = evaluateDecision({
      activity: 'surfing',
      condition: 'clear',
      windKmh: 12,
      rainChance: 10,
    })

    expect(result.label).toBe('Go')
    expect(result.reason).toBe('Conditions look suitable for this activity.')
  })

  it('treats exact hiking thresholds as caution, not no-go', () => {
    const result = evaluateDecision({
      activity: 'hiking',
      condition: 'clear',
      windKmh: 35,
      rainChance: 60,
    })

    expect(result.label).toBe('Caution')
  })
})
