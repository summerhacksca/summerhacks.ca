import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const emailDir = path.join(process.cwd(), 'app/api/email/emailformat')
const emailHtmlPath = path.join(emailDir, 'email.html')
const emailHtml = fs.readFileSync(emailHtmlPath, 'utf8')

const svgBlocks = [...emailHtml.matchAll(/<svg[\s\S]*?<\/svg>/g)].map((match) => match[0])

if (svgBlocks.length < 3) {
  throw new Error(`Expected at least 3 inline SVG blocks, found ${svgBlocks.length}`)
}

const outputs = [
  { fileName: 'email-decor-left.png', svg: svgBlocks[0] },
  { fileName: 'email-decor-right.png', svg: svgBlocks[1] },
  { fileName: 'email-logo.png', svg: svgBlocks[2] },
]

for (const output of outputs) {
  const outPath = path.join(emailDir, output.fileName)
  await sharp(Buffer.from(output.svg)).png().toFile(outPath)
}

console.log('Converted inline SVG blocks to PNG files.')
