import { useMemo } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { sanitizeHtml, substituteVariablesForHtml, substituteVariablesPlain, wrapContent } from './emailTemplate'

type Props = {
  subject: string
  body: string
  sampleUser: {
    first_name: string
    last_name: string
    email: string
    status: string
  }
}

const EmailPreview = ({ subject, body, sampleUser }: Props) => {
  const renderedSubject = useMemo(
    () => substituteVariablesPlain(subject, sampleUser),
    [subject, sampleUser]
  )

  const renderedBody = useMemo(() => {
    const substituted = substituteVariablesForHtml(body, sampleUser)
    const sanitized = sanitizeHtml(substituted)
    return wrapContent(sanitized)
  }, [body, sampleUser])

  return (
    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Preview (using: {sampleUser.first_name} {sampleUser.last_name})
      </Typography>
      <Box
        component="div"
        sx={{
          p: 1,
          mb: 1,
          backgroundColor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Subject:
        </Typography>
        <Typography variant="body1">{renderedSubject || '(empty)'}</Typography>
      </Box>
      <Box
        component="iframe"
        srcDoc={renderedBody}
        sx={{
          flex: 1,
          width: '100%',
          minHeight: 300,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: '#0a0a0a',
        }}
        title="Email Preview"
      />
    </Box>
  )
}

export default EmailPreview
