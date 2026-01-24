import type { JSX } from 'react'

export interface Social {
  icon: JSX.Element
  name: string
  url: string
  description?: string
}
