import { Controller, UseFormReturn } from 'react-hook-form'

import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import FormSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormSelect'
import FormTextField from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextField'
import { genderOptions } from '@/types/Application'
import { User } from '@/types/User'
import { AboutYouZodForm } from '@/types/Zod'

type Props = {
  user: User
  form: UseFormReturn<AboutYouZodForm>
  onNext: (data: AboutYouZodForm) => void
}

const AboutYou = (props: Props) => {
  const { user, form, onNext } = props

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Personal Information</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Your basic details for contact
          </Typography>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'start', sm: 'center' }}
            gap="1rem"
          >
            <Typography>First Name</Typography>
            <Typography
              variant="h3"
              display="flex"
              alignItems="center"
              gap="0.5rem"
              width={{ xs: '100%', sm: 'inherit' }}
              justifyContent={{ xs: 'space-between', sm: 'inherit' }}
            >
              {user.first_name}
              <Tooltip title={'Update in account settings'} arrow placement="right">
                <InfoIcon color="disabled" />
              </Tooltip>
            </Typography>
          </Box>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'start', sm: 'center' }}
            gap="1rem"
          >
            <Typography>Last Name</Typography>
            <Typography
              variant="h3"
              display="flex"
              alignItems="center"
              gap="0.5rem"
              width={{ xs: '100%', sm: 'inherit' }}
              justifyContent={{ xs: 'space-between', sm: 'inherit' }}
            >
              {user.last_name}
              <Tooltip title={'Update in account settings'} arrow placement="right">
                <InfoIcon color="disabled" />
              </Tooltip>
            </Typography>
          </Box>
          <Box
            component="div"
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'start', sm: 'center' }}
            gap="1rem"
            mb="1rem"
          >
            <Typography>Email for contact</Typography>
            <Box
              component="div"
              display="flex"
              alignItems="center"
              gap="0.5rem"
              width={{ xs: '100%', sm: 'inherit' }}
              justifyContent={{ xs: 'space-between', sm: 'inherit' }}
            >
              <Typography variant="h3">{user.email}</Typography>
              <Tooltip title={'Update in account settings'} arrow placement="right">
                <InfoIcon color="disabled" />
              </Tooltip>
            </Box>
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Demographics</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            For internal data collection only - answers will have no effect on your acceptance
          </Typography>
          <Controller
            name="age"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextField
                label="Age"
                type="number"
                errors={errors}
                inputProps={{ min: 18, max: 100 }}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormSelect
                label="Gender"
                options={genderOptions}
                errors={errors}
                inputRef={ref}
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

export default AboutYou
