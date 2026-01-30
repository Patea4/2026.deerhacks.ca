import { APIError } from '@/api/types'

const BUSY_MESSAGE = "We're busy right now, please try again in a few moments."

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  const apiError = (error as APIError | undefined)?.apiError
  if (apiError?.status === 429) return BUSY_MESSAGE
  const message = apiError?.err?.message ?? apiError?.err?.error
  return message || fallback
}

export const isBusyError = (error: unknown) =>
  (error as APIError | undefined)?.apiError?.status === 429
