import { Controller, FieldError, UseFormReturn } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import FormCheckbox from '@/components/Dashboard/RegistrationForms/FormComponents/FormCheckbox'
import FormDynamicSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormDynamicSelect'
import FormMultiSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormMultiSelect'
import FormResumeUpload from '@/components/Dashboard/RegistrationForms/FormComponents/FormResumeUpload'
import FormSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormSelect'
import FormTextField from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextField'
import {
  hackathonExperienceOptions,
  interestsOptions,
  OTHER_SPECIFY,
  programOptions,
  ResumeUpdateResp,
} from '@/types/Application'
import { ExperienceZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<ExperienceZodForm>
  onNext: (data: ExperienceZodForm) => void
}

const ExperienceForm = (props: Props) => {
  const { form, onNext } = props

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Education</Typography>
          <Controller
            name="school"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="School (Please specify campus)"
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
          >
            <Controller
              name="program"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormDynamicSelect
                  label="Program"
                  options={programOptions}
                  errors={errors}
                  setOtherField={(val: string) => {
                    setValue(
                      'program_other',
                      (programOptions as readonly string[]).includes(val) ? '' : val,
                      { shouldValidate: true }
                    )
                  }}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('program') == OTHER_SPECIFY && (
              <Controller
                name="program_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField label="Other" errors={errors} inputRef={ref} {...field} />
                )}
              />
            )}
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Hackathon Experience</Typography>
          <Controller
            name="hackathon_experience"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormSelect
                label="Number of Hackathons Attended"
                options={hackathonExperienceOptions}
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Box component="div">
            <Typography gutterBottom>Previous DeerHacks Attender?</Typography>
            <Controller
              name="previous_deerhacks_attender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  value={field.value ? 'yes' : 'no'}
                  onChange={(e) => field.onChange(e.target.value === 'yes')}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              )}
            />
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Professional Links</Typography>
          <Controller
            name="github"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Link to Github"
                errors={errors}
                optional
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="linkedin"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Link to LinkedIn"
                errors={errors}
                optional
                inputRef={ref}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Topics of Interest</Typography>
          <Controller
            name="interests"
            control={control}
            render={({ field: { ref, value, ...field } }) => (
              <FormMultiSelect
                label="Select all that apply"
                options={interestsOptions}
                errors={errors}
                inputRef={ref}
                value={value as readonly string[]}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Resume</Typography>
          <FormResumeUpload
            name={getValues('resume_file_name') as string}
            link={getValues('resume_link') as string}
            updateCount={getValues('resume_update_count') as number}
            error={errors.resume_link as FieldError | undefined}
            onSuccess={(resp: ResumeUpdateResp) => {
              setValue('resume_file_name', resp.resume_file_name, { shouldValidate: true })
              setValue('resume_link', resp.resume_link, { shouldValidate: true })
              setValue('resume_update_count', resp.resume_update_count, { shouldValidate: true })
            }}
          />
          <Controller
            name="resume_consent"
            control={control}
            render={({ field: { ref, value, ...field } }) => (
              <FormCheckbox
                label="By uploading, you consent to sharing with third-parties such as sponsors"
                errors={errors}
                inputRef={ref}
                value={value as boolean}
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

export default ExperienceForm
