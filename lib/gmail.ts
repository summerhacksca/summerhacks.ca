import { google } from 'googleapis'

const fallbackFromAddress = 'admin@summerhacks.ca'
const maxSendAttempts = 3

let cachedGmailClient: ReturnType<typeof google.gmail> | null = null

function getFromHeader(): string {
  const fromAddress = process.env.GMAIL_FROM_ADDRESS?.trim() || fallbackFromAddress
  const fromName = process.env.GMAIL_FROM_NAME?.trim()

  return fromName ? `${fromName} <${fromAddress}>` : fromAddress
}

function getGmailClient() {
  if (cachedGmailClient) {
    return cachedGmailClient
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
  )
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })

  cachedGmailClient = google.gmail({ version: 'v1', auth: oauth2Client })
  return cachedGmailClient
}

function buildRawMessage(to: string, subject: string, htmlBody: string): string {
  const fromHeader = getFromHeader()
  const replyTo = process.env.GMAIL_REPLY_TO?.trim()

  const lines = [
    `To: ${to}`,
    `From: ${fromHeader}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    htmlBody,
  ]
  return Buffer.from(lines.join('\n')).toString('base64url')
}

function isRetryableGmailError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false
  }

  const candidate = error as {
    code?: number
    response?: { status?: number; data?: { error?: { errors?: Array<{ reason?: string }> } } }
    errors?: Array<{ reason?: string }>
  }

  const status = candidate.code ?? candidate.response?.status
  if (status !== 429 && status !== 403) {
    return false
  }

  const reasons = [
    ...(candidate.response?.data?.error?.errors ?? []),
    ...(candidate.errors ?? []),
  ]
    .map((entry) => entry.reason?.toLowerCase())
    .filter((reason): reason is string => Boolean(reason))

  return reasons.some(
    (reason) =>
      reason === 'ratelimitexceeded' ||
      reason === 'userratelimitexceeded' ||
      reason === 'quotaexceeded' ||
      reason === 'dailylimitexceeded' ||
      reason === 'backenderror',
  )
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export async function sendEmail(to: string, subject: string, htmlBody: string): Promise<void> {
  const gmail = getGmailClient()

  let lastError: unknown

  for (let attempt = 1; attempt <= maxSendAttempts; attempt += 1) {
    try {
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw: buildRawMessage(to, subject, htmlBody) },
      })
      return
    } catch (error) {
      lastError = error

      if (!isRetryableGmailError(error) || attempt === maxSendAttempts) {
        throw error
      }

      await delay(250 * 2 ** (attempt - 1))
    }
  }

  throw lastError
}
