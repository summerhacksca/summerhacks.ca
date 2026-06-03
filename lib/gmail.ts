import { google } from 'googleapis'

const fallbackFromAddress = 'admin@summerhacks.ca'

function getFromHeader(): string {
  const fromAddress = process.env.GMAIL_FROM_ADDRESS?.trim() || fallbackFromAddress
  const fromName = process.env.GMAIL_FROM_NAME?.trim()

  return fromName ? `${fromName} <${fromAddress}>` : fromAddress
}

function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
  )
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })
  return google.gmail({ version: 'v1', auth: oauth2Client })
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

export async function sendEmail(to: string, subject: string, htmlBody: string): Promise<void> {
  const gmail = getGmailClient()
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: buildRawMessage(to, subject, htmlBody) },
  })
}
