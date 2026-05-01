export function evaluateDecision({ activity, condition, windKmh, rainChance }) {
  if (condition === 'storm') {
    return {
      label: 'No-Go',
      reason: 'Storm conditions are unsafe for outdoor activities.',
    }
  }

  const profiles = {
    hiking: { maxWind: 35, maxRainChance: 60 },
    kayaking: { maxWind: 20, maxRainChance: 40 },
    surfing: { maxWind: 22, maxRainChance: 35 },
  }

  const selectedProfile = profiles[activity]
  const windTooHigh = windKmh > selectedProfile.maxWind
  const rainTooHigh = rainChance > selectedProfile.maxRainChance
  const rainyCondition = condition === 'rain'

  if (windTooHigh || rainTooHigh || rainyCondition) {
    return {
      label: 'No-Go',
      reason: `${activity} is not recommended due to wind/rain risk.`,
    }
  }

  const cautionWind = windKmh > selectedProfile.maxWind - 5
  const cautionRain = rainChance > selectedProfile.maxRainChance - 15

  if (cautionWind || cautionRain || condition === 'cloudy') {
    return {
      label: 'Caution',
      reason: 'Conditions are close to limits. Proceed with care.',
    }
  }

  return {
    label: 'Go',
    reason: 'Conditions look suitable for this activity.',
  }
}
