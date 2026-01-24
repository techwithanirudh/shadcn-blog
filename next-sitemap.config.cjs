'use strict'
const siteUrl =
  process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_BASE_URL
    ? new URL('https://localhost:3000')
    : new URL(process.env.NEXT_PUBLIC_BASE_URL)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
}
