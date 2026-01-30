import { answerToPlanetMap, ArchetypeAnswer, Planet, planetOptions } from '@/types/Application'

export const calculateArchetype = (
  answer: ArchetypeAnswer
): { scores: Record<Planet, number>; archetype: Planet } => {
  const scores = {} as Record<Planet, number>

  // Initialize all planets to 0
  planetOptions.forEach((planet) => {
    scores[planet] = 0
  })

  // Direct mapping from answer to planet
  const planet = answerToPlanetMap[answer]
  if (planet) {
    scores[planet] = 1
  }

  return { scores, archetype: planet || 'Earth' }
}
