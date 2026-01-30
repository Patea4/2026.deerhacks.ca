import NextLink from 'next/link'

import AdjustIcon from '@mui/icons-material/Adjust'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileRegistration = (props: Props) => {
  const { status } = props

  const { toggles } = useFeatureToggle()

  const disabledUser = ['pending', 'rejected'].includes(status)
  const paused = toggles.applicationsPaused
  const disabled = paused || disabledUser || (!toggles.signupHacker && status === 'registering')
  const noApplication = ['admin', 'moderator', 'guest', 'volunteer'].includes(status)

  return (
    <Card
      variant={disabled || noApplication ? 'outlined' : 'elevation'}
      elevation={disabled || noApplication ? 0 : 5}
      sx={{
        background:
          !disabled && !noApplication
            ? 'radial-gradient(circle at 65% 40%, rgba(249, 144, 196, 0.18), transparent 55%), rgba(30, 30, 35, 0.7)'
            : 'rgba(30, 30, 35, 0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <CardActionArea
        href="/dashboard/registration"
        LinkComponent={NextLink}
        disabled={disabled || noApplication}
      >
        <CardContent>
          <Typography
            variant="h1"
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="0.5rem"
            gutterBottom
            color={disabled || noApplication ? 'text.disabled' : 'text.primary'}
          >
            <AdjustIcon color="error" fontSize="inherit" />
            Register
          </Typography>
          <Typography variant="body2">
            {paused
              ? 'Applications are temporarily paused. Please check back soon.'
              : disabled
              ? `Registration is closed ${
                  status === 'pending'
                    ? 'while email is unverified'
                    : 'during this time. Thanks for checking our DeerHacks!'
                }`
              : status === 'registering'
              ? 'Get started on your registration for DeerHacks! Hacker applications are open until January 31'
              : noApplication
              ? `${status.title()}s cannot register as hackers`
              : 'Revisit your application to DeerHacks'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileRegistration
