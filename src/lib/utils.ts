import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIp = (headers: Headers) => {
  return headers.get('x-forwarded-for') ?? '0.0.0.0'
}