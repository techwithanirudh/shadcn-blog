import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { lookup } from 'mime-types'

export const getLocalImageDataUrl = async (
  imagePath?: string
): Promise<string | null> => {
  if (!imagePath?.startsWith('/')) {
    return null
  }

  const mimeType = lookup(imagePath)

  if (!mimeType || typeof mimeType !== 'string') {
    return null
  }

  try {
    const absolutePath = path.join(process.cwd(), 'public', imagePath.slice(1))
    const buffer = await readFile(absolutePath)
    return `data:${mimeType};base64,${buffer.toString('base64')}`
  } catch {
    return null
  }
}
