'use client'

import { motion, useScroll } from 'motion/react'

function BlogProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className='fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary'
      style={{ scaleX: scrollYProgress }}
    />
  )
}

export default BlogProgressBar
