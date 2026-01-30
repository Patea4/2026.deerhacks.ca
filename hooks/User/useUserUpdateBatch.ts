import { useAPI } from '@/contexts/API'
import { useAuth } from '@/contexts/Auth'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useUserUpdateBatch = () => {
  const api = useAPI()
  const { user } = useAuth()
  const { setToast } = useToast()

  return api.useMutation('userUpdateBatch', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Something went wrong, try again later.'),
      })
    },
    onSuccess: (_, req) => {
      if (req.users.some((updatedUser) => updatedUser.discord_id === user?.discord_id)) {
        api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
      }
      api.queryClient.invalidateQueries({ queryKey: ['userList'] })
      setToast({ type: 'success', message: 'Users updated successfully' })
    },
  })
}
