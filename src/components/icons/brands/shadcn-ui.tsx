import type { SVGProps } from 'react'

const ShadcnUi = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox='0 0 256 256'>
    <path d='M0 0h256v256H0z' fill='none' />
    <path
      d='M208 128l-80 80M192 40L40 192'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth='25'
    />
  </svg>
)

export { ShadcnUi }
