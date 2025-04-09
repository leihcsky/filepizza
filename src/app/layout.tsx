import React from 'react'
import Footer from '../components/Footer'
import '../styles.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { ModeToggle } from '../components/ModeToggle'
import FilePizzaQueryClientProvider from '../components/QueryClientProvider'
import { Viewport } from 'next'
import { ViewTransitions } from 'next-view-transitions'

export const metadata = {
  title: '传文件，嗖的一下',
  description: 'Peer-to-peer file transfers in your web browser.',
  charSet: 'utf-8',
  openGraph: {
    url: 'https://file.pizza',
    title: 'FilePizza • Your files, delivered.',
    description: 'Peer-to-peer file transfers in your web browser.',
    images: [{ url: 'https://file.pizza/images/fb.png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <FilePizzaQueryClientProvider>
              {/* <header className="fixed top-0 left-0 p-4">
                <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
              </header> */}
              <main>{children}</main>
              {/* <Footer /> */}
              <ModeToggle />
            </FilePizzaQueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
