'use client'

import type { LenisOptions } from 'lenis'
import 'lenis/dist/lenis.css'
import type { LenisRef, LenisProps as ReactLenisProps } from 'lenis/react'
import { ReactLenis } from 'lenis/react'
import { useRef } from 'react'
import { useTempus } from 'tempus/react'

interface LenisProps extends Omit<ReactLenisProps, 'ref'> {
  root: boolean
  options: LenisOptions
}

export function Lenis({ root, options }: LenisProps) {
  const lenisRef = useRef<LenisRef>(null)

  useTempus((time: number) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time)
    }
  })

  return (
    <ReactLenis
      options={{
        ...options,
        lerp: options?.lerp ?? 0.18,
        autoRaf: false,
        anchors: true,
        prevent: (node: Element | null) =>
          node?.nodeName === 'VERCEL-LIVE-FEEDBACK' ||
          node?.id === 'theatrejs-studio-root' ||
          Boolean(node?.closest?.('[data-lenis-prevent]')),
      }}
      ref={lenisRef}
      root={root}
    />
  )
}
