import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ToastProvider, ToastViewport } from '@/components/ui/toast_components'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prompt Enhancer | Transform Your Prompts',
  description: 'Professional prompt enhancement service that transforms basic prompts into comprehensive, effective instructions for AI systems.',
  keywords: 'prompt engineering, AI prompts, prompt optimization, AI enhancement',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.jpg" />
        <meta name="theme-color" content="#ea580c" />
        <meta property="og:title" content="Prompt Enhancer | Transform Your Prompts" />
        <meta property="og:description" content="Professional prompt enhancement service that transforms basic prompts into comprehensive, effective instructions for AI systems." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kpatel.site" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prompt Enhancer | Transform Your Prompts" />
        <meta name="twitter:description" content="Professional prompt enhancement service that transforms basic prompts into comprehensive, effective instructions for AI systems." />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            {children}
            <ToastViewport />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}