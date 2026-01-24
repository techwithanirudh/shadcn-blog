'use client'

import { ArrowUp } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { useState } from 'react'

export function ScrollToTop() {
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShow(latest > 300)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='fixed right-6 bottom-6 z-50'
          exit={{ opacity: 0, y: 16 }}
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
        >
          <button
            aria-label='Scroll to top'
            className='inline-flex items-center justify-center rounded-full border bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground'
            onClick={scrollToTop}
            type='button'
          >
            <ArrowUp className='size-5' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
