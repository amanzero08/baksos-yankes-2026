import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bakti Sosial Lintas Sinodal 2026',
    short_name: 'Baksos 2026',
    description: 'Aplikasi Donasi dan Informasi Bakti Sosial Yayasan Kesehatan GPIB & GMIM',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/logo-apps.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-apps.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-apps.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo-apps.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }
    ],
  }
}
