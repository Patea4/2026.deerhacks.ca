import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { EmailSendResp } from '@/types/Email'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useEmailSend = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('emailSend', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to send emails. Please try again.'),
      })
    },
    onSuccess: (data: EmailSendResp) => {
      if (data.failed.length === 0) {
        setToast({ type: 'success', message: `Successfully sent ${data.success} emails` })
      } else {
        setToast({
          type: 'warning',
          message: `Sent ${data.success} emails, ${data.failed.length} failed`,
        })
      }
    },
  })
}
