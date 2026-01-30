import { Controller, UseFormReturn } from 'react-hook-form'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import FormTextArea from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextArea'
import { OpenEndedResponsesZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<OpenEndedResponsesZodForm>
  onNext: (data: OpenEndedResponsesZodForm) => void
}

const OpenEndedResponsesForm = (props: Props) => {
  const { form, onNext } = props

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">What do you hope to do at DeerHacks?</Typography>
          <Controller
            name="deerhacks_pitch"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="Your answer (150 words max)"
                errors={errors}
                inputRef={ref}
                maxLength={1000}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">What would make you a valuable teammate?</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Technical skills, collaborative skills, etc. are all welcome
          </Typography>
          <Controller
            name="shared_project"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="Your answer (150 words max)"
                errors={errors}
                inputRef={ref}
                maxLength={1000}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">What type of project would you like to work on in the near future?</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            How would you approach making it come to life?
          </Typography>
          <Controller
            name="future_tech"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="Your answer (150 words max)"
                errors={errors}
                inputRef={ref}
                maxLength={1000}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Dream Project Pitch</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Given no limits on tech, time, money, scale, etc, pitch a project idea.
          </Typography>
          <Controller
            name="project_pitch"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label="Your pitch (25 words max)"
                errors={errors}
                inputRef={ref}
                maxLength={200}
                {...field}
              />
            )}
          />
        </Grid>

        <Button type="submit" disabled={isSubmitting}>
          Next
        </Button>
      </Grid>
    </form>
  )
}

export default OpenEndedResponsesForm
