import { getAboutText } from '../utils'

export const dynamic = 'force-static'

export function GET() {
  return new Response(getAboutText(), {
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
    },
  })
}
