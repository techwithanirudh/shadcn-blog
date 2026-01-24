import { fileURLToPath } from 'node:url'
import bundleAnalyzer from '@next/bundle-analyzer'
import { withBotId } from 'botid/next/config'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

async function createNextConfig(): Promise<NextConfig> {
  const { createJiti } = await import('jiti')
  const jiti = createJiti(fileURLToPath(import.meta.url))

  await jiti.import('./src/env')

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: process.env.SOURCE_MAPS === 'true',
    devIndicators: false,
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    experimental: {
      viewTransition: true,
    },
    images: {
      dangerouslyAllowSVG: true,
      qualities: [100, 75, 85, 95],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/techwithanirudh/**',
        },
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/Meeting-BaaS/**',
        },
        {
          protocol: 'https',
          hostname: 'fumadocs.dev',
          port: '',
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    serverExternalPackages: [
      'ts-morph',
      'typescript',
      'oxc-transform',
      'twoslash',
      'twoslash-protocol',
      'shiki',
      '@takumi-rs/image-response',
    ],
    async rewrites() {
      return [
        {
          source: '/blog/:path*.mdx',
          destination: '/blog.mdx/:path*',
        },
        {
          source: '/work/:path*.mdx',
          destination: '/work.mdx/:path*',
        },
        {
          source: '/rss.xml',
          destination: '/blog/rss.xml',
        },
      ]
    },
  }

  return nextConfig
}

const bundleAnalyzerPlugin = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const mdxPlugin = createMDX()

const NextApp = async () => {
  const nextConfig = await createNextConfig()
  const plugins = [bundleAnalyzerPlugin, mdxPlugin]
  const config = plugins.reduce((config, plugin) => plugin(config), nextConfig)
  return withBotId(config)
}

export default NextApp
