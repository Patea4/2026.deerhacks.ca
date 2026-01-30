import { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import ArchetypeResult from '@/components/Dashboard/RegistrationForms/Archetype/ArchetypeResult'
import { answerToPlanetMap, archetypeQuestion, Planet } from '@/types/Application'
import { ArchetypeZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<ArchetypeZodForm>
  onNext: (data: ArchetypeZodForm) => void
  savedArchetype?: Planet | ''
}

const ArchetypeForm = (props: Props) => {
  const { form, onNext, savedArchetype } = props
  const [showResult, setShowResult] = useState(!!savedArchetype)
  const [calculatedArchetype, setCalculatedArchetype] = useState<Planet | null>(
    savedArchetype || null
  )

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = form

  const handleFormSubmit = (data: ArchetypeZodForm) => {
    const planet = answerToPlanetMap[data.archetype_answer]
    setCalculatedArchetype(planet)
    setShowResult(true)
  }

  const handleContinue = () => {
    onNext(getValues())
  }

  if (showResult && calculatedArchetype) {
    return (
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Your Hacker Archetype</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Based on your answer, we&apos;ve determined your hackathon personality!
          </Typography>
        </Grid>
        <ArchetypeResult archetype={calculatedArchetype} />
        <Button onClick={handleContinue} disabled={isSubmitting}>
          Continue to Review
        </Button>
      </Grid>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Planet Avatar Question</Typography>
          <Typography variant="h3" color="primary" gutterBottom>
            {archetypeQuestion.intro}
          </Typography>
        </Grid>

        <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <CardContent>
            <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
              {archetypeQuestion.question}
            </Typography>
            <Controller
              name="archetype_answer"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  {Object.entries(archetypeQuestion.options).map(([key, value]) => (
                    <FormControlLabel
                      key={key}
                      value={key}
                      control={<Radio />}
                      label={value}
                      sx={{
                        py: 1,
                        alignItems: 'flex-start',
                        '& .MuiRadio-root': { pt: 0 },
                        '& .MuiFormControlLabel-label': { pt: 0.5 },
                      }}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.archetype_answer && (
              <Typography color="error" variant="caption">
                Please select an answer
              </Typography>
            )}
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSubmitting}>
          Reveal My Archetype
        </Button>
      </Grid>
    </form>
  )
}

export default ArchetypeForm
