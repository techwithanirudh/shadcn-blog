'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface ClockProps {
  className?: string
}

interface TimeStyles extends React.CSSProperties {
  '--time-hours': number
  '--time-minutes': number
  '--time-seconds': number
}

const HAND_BASE_CLASSES =
  'absolute left-1/2 top-1/2 rounded-full bg-neutral-600 dark:bg-neutral-400'
const HAND_ORIGIN = { transformOrigin: '0px 0px' }
const FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
  timeZoneName: 'short',
})

const getParts = (date: Date) => {
  const parts = FORMATTER.formatToParts(date)
  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? '0'

  return {
    hours: Number.parseInt(getPart('hour'), 10) % 12,
    minutes: Number.parseInt(getPart('minute'), 10),
    seconds: Number.parseInt(getPart('second'), 10),
    timeString: FORMATTER.format(date),
  }
}

export function Clock({ className }: ClockProps) {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const { hours, minutes, seconds, timeString } = getParts(time)

  const timeStyles: TimeStyles = {
    '--time-hours': hours,
    '--time-minutes': minutes,
    '--time-seconds': seconds,
  }

  if (!mounted) {
    return (
      <Button className='rounded-full' size='icon' variant='ghost'>
        <div
          className={cn(
            'relative block size-8 rotate-180 rounded-full border border-border',
            className
          )}
        >
          <div className='absolute top-1/2 left-1/2 size-px -translate-x-1/2 -translate-y-1/2 bg-neutral-400 dark:bg-neutral-500' />
        </div>
      </Button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <time
            className={cn(
              'relative block size-8 rotate-180 rounded-full border border-border',
              className
            )}
            dateTime={time.toISOString()}
            style={timeStyles}
          >
            <div className='absolute top-1/2 left-1/2 size-px -translate-x-1/2 -translate-y-1/2 bg-neutral-400 dark:bg-neutral-500' />

            <div
              className={cn(HAND_BASE_CLASSES, 'h-1/4 w-px')}
              style={{
                ...HAND_ORIGIN,
                transform:
                  'rotate(calc((var(--time-hours) * 30deg) + ((var(--time-minutes) / 2) * 1deg))) translate(-50%, 0%)',
              }}
            />

            <div
              className={cn(HAND_BASE_CLASSES, 'h-2/5 w-px')}
              style={{
                ...HAND_ORIGIN,
                transform:
                  'rotate(calc(var(--time-minutes) * 6deg)) translate(-50%, 0%)',
              }}
            />

            <div
              className={cn(
                HAND_BASE_CLASSES,
                'h-2/5 w-[0.5px] bg-neutral-500 dark:bg-neutral-400'
              )}
              style={{
                ...HAND_ORIGIN,
                transform:
                  'rotate(calc(var(--time-seconds) * 6deg)) translate(-50%, 0%)',
              }}
            />
          </time>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{timeString}</p>
      </TooltipContent>
    </Tooltip>
  )
}
