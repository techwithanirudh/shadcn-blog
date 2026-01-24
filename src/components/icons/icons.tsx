import type { Icon as LucideIcon, LucideProps } from 'lucide-react'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Code,
  CreditCard,
  File,
  FileText,
  Globe,
  HelpCircle,
  Home,
  Image,
  Info,
  Laptop,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  MoreVertical,
  Newspaper,
  Pencil,
  PhoneCall,
  Pizza,
  Plus,
  Rss,
  SendHorizonal,
  Settings,
  ShareIcon,
  SunMedium,
  Tag,
  Tags,
  Trash,
  User,
  X,
} from 'lucide-react'
import type { ComponentProps, JSX } from 'react'
import { CssOld } from '@/components/icons/brands/css-old'
import { DrizzleOrmDark } from '@/components/icons/brands/drizzle-orm-dark'
import { DrizzleOrmLight } from '@/components/icons/brands/drizzle-orm-light'
import { Expressjs } from '@/components/icons/brands/expressjs'
import { ExpressjsDark } from '@/components/icons/brands/expressjs-dark'
import { Git } from '@/components/icons/brands/git'
import { Hono } from '@/components/icons/brands/hono'
import { Html5 } from '@/components/icons/brands/html5'
import { Javascript } from '@/components/icons/brands/javascript'
import { NextjsLogoDark } from '@/components/icons/brands/nextjs-logo-dark'
import { NextjsLogoLight } from '@/components/icons/brands/nextjs-logo-light'
import { Nodejs } from '@/components/icons/brands/nodejs'
import { ReactDark } from '@/components/icons/brands/react-dark'
import { ReactLight } from '@/components/icons/brands/react-light'
import { ShadcnUi } from '@/components/icons/brands/shadcn-ui'
import { ShadcnUiDark } from '@/components/icons/brands/shadcn-ui-dark'
import { Tailwindcss } from '@/components/icons/brands/tailwindcss'
import { Typescript } from '@/components/icons/brands/typescript'
import { cn } from '@/lib/utils'

export type Icon = typeof LucideIcon

type SvgIcon = (props: ComponentProps<'svg'>) => JSX.Element

const themedIcon = (LightIcon: SvgIcon, DarkIcon: SvgIcon): SvgIcon => {
  const Themed = ({ className, ...props }: ComponentProps<'svg'>) => (
    <span className='inline-flex'>
      <LightIcon {...props} className={cn('dark:hidden', className)} />
      <DarkIcon
        {...props}
        className={cn('hidden dark:inline-flex', className)}
      />
    </span>
  )

  return Themed
}

export const Icons = {
  logo: Code,
  close: X,
  menu: Menu,
  code: Code,
  pencil: Pencil,
  copied: ClipboardCheck,
  success: CheckCircle,
  messageSquare: MessageSquare,
  spinner: Loader2,
  atSign: AtSign,
  globe: Globe,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  tags: Tags,
  tag: Tag,
  share: ShareIcon,
  posts: Newspaper,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  logIn: LogIn,
  logOut: LogOut,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  home: Home,
  info: Info,
  arrowUpRight: ArrowUpRight,
  chevronDown: ChevronDown,
  mail: Mail,
  send: SendHorizonal,
  pricing: CircleDollarSign,
  phone: PhoneCall,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden='true'
      data-icon='github'
      data-prefix='fab'
      focusable='false'
      role='img'
      viewBox='0 0 496 512'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
        fill='currentColor'
      />
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden='true'
      focusable='false'
      height='1em'
      preserveAspectRatio='xMidYMid'
      viewBox='0 0 256 262'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
        fill='#4285F4'
      />
      <path
        d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
        fill='#34A853'
      />
      <path
        d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
        fill='#FBBC05'
      />
      <path
        d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
        fill='#EB4335'
      />
    </svg>
  ),
  check: Check,
  rss: Rss,
  twitter: ({ ...props }: LucideProps) => (
    <svg
      fill='currentColor'
      height='1em'
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  ),
  linkedin: ({ ...props }: LucideProps) => (
    <svg
      fill='currentColor'
      height='1em'
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
    </svg>
  ),
  youtube: ({ ...props }: LucideProps) => (
    <svg
      fill='currentColor'
      height='1em'
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
    </svg>
  ),
  typescript: Typescript,
  javascript: Javascript,
  react: themedIcon(ReactLight, ReactDark),
  nextjs: themedIcon(NextjsLogoLight, NextjsLogoDark),
  tailwind: Tailwindcss,
  html5: Html5,
  css3: CssOld,
  nodejs: Nodejs,
  express: themedIcon(Expressjs, ExpressjsDark),
  git: Git,
  shadcn: themedIcon(ShadcnUi, ShadcnUiDark),
  hono: Hono,
  drizzleOrm: themedIcon(DrizzleOrmLight, DrizzleOrmDark),
}
