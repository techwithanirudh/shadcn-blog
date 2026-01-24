'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface ViewAnimationProps {
  initial?: Record<string, string | number>
  whileInView?: Record<string, string | number>
  animate?: Record<string, string | number>
  delay?: number
  duration?: number
  blur?: boolean
  // className?: ComponentProps<typeof motion.div>['className'];
  className?: string
  children: ReactNode
}

export const ViewAnimation = ({
  initial,
  whileInView,
  animate,
  delay,
  duration,
  blur = false,
  className,
  children,
}: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  const initialState = blur ? { filter: 'blur(4px)', ...initial } : initial
  const whileInViewState = blur
    ? { filter: 'blur(0px)', ...whileInView }
    : whileInView
  const normalizedDelay = delay ? Math.min(delay, 0.2) : delay

  return (
    <motion.div
      animate={animate}
      className={className}
      initial={initialState}
      transition={{ delay: normalizedDelay, duration: duration ?? 0.3 }}
      viewport={{ once: true, amount: 0.1 }}
      whileInView={whileInViewState}
    >
      {children}
    </motion.div>
  )
}
