import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Planet } from '@/types/Application'

type ArchetypeDetail = {
  emoji: string
  role: string
  archetype: string
  cosmicMessage: string
}

const archetypeDetails: Record<Planet, ArchetypeDetail> = {
  Earth: {
    emoji: '🌍',
    role: 'The Builder',
    archetype: 'The Engineer',
    cosmicMessage:
      'You turn concepts into reality. Your work gives structure and stability to every project and keeps ideas grounded in what truly works.',
  },
  Mars: {
    emoji: '🔥',
    role: 'The Warrior',
    archetype: 'The Speedrunner',
    cosmicMessage:
      'You thrive when the pressure is on. Tight deadlines and big obstacles fuel your momentum and push the team forward.',
  },
  Venus: {
    emoji: '☁️',
    role: 'The Designer',
    archetype: 'The Visionary',
    cosmicMessage:
      'You shape how ideas look and feel. Your creativity turns functional projects into experiences people remember.',
  },
  Mercury: {
    emoji: '💨',
    role: 'The Messenger',
    archetype: 'The Strategist',
    cosmicMessage:
      'You keep teams connected and ideas clear. Your communication turns scattered thoughts into strong plans and compelling stories.',
  },
  Jupiter: {
    emoji: '🌀',
    role: 'The Innovator',
    archetype: 'The Architect',
    cosmicMessage:
      'You see beyond the immediate problem. Your vision helps teams design systems that scale and ideas that last.',
  },
  Saturn: {
    emoji: '🔮',
    role: 'The Debugger',
    archetype: 'The Scientist',
    cosmicMessage:
      'You bring order to complexity. When things break, you stay focused and methodical until everything runs smoothly again.',
  },
  Neptune: {
    emoji: '🌊',
    role: 'The Dreamer',
    archetype: 'The Creator',
    cosmicMessage:
      'You imagine what does not yet exist. Your ideas spark innovation and inspire teams to explore new directions.',
  },
  Uranus: {
    emoji: '❄️',
    role: 'The Rebel',
    archetype: 'The Outlier',
    cosmicMessage:
      'You challenge norms and push boundaries, finding the most unconventional ideas and tech. Your curiosity leads to surprising discoveries and bold breakthroughs.',
  },
  Moon: {
    emoji: '🌓',
    role: 'The Supporter',
    archetype: 'The Backbone',
    cosmicMessage:
      'You hold everything together. By adapting to every phase and requirement, you keep projects alive through constant motion.',
  },
  Sun: {
    emoji: '🌞',
    role: 'The Leader',
    archetype: 'The Captain',
    cosmicMessage:
      'You are the core of your team. When things get intense, others look to you for direction. Your energy brings people together and powers the mission forward.',
  },
}

type Props = {
  archetype: Planet
}

const ArchetypeResult = ({ archetype }: Props) => {
  const details = archetypeDetails[archetype]

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        textAlign: 'center',
        py: 4,
      }}
    >
      <CardContent>
        <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
          {details.emoji}
        </Typography>
        <Typography variant="h2" color="primary" gutterBottom>
          {archetype} Hacker
        </Typography>
        <Typography variant="h3" gutterBottom>
          {details.role} — {details.archetype}
        </Typography>
        <div style={{ maxWidth: 600, margin: '16px auto 0' }}>
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {details.cosmicMessage}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ArchetypeResult
