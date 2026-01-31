export type EmailVerifyReq = {
  token: string
}

export type EmailVerifyResp =
  | { status: 'success'; context: 'signup' | 'rsvp' }
  | { status: 'expired'; context: 'signup' | 'rsvp' }
  | { status: 'invalid'; context: 'invalid' }

export type EmailSendReq = {
  userIds: string[]
  subject: string
  body: string
}

export type EmailSendResp = {
  success: number
  failed: Array<{ email: string; error: string }>
}
