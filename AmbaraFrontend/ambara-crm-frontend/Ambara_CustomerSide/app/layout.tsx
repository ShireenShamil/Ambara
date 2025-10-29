import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { NotificationProvider } from '@/contexts/notification-context'
import { ThemeProvider } from '@/components/theme-provider'
import ChatButton from '@/components/chat-button'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Ambara',
  description: 'Ambara — custom printing and design',
  generator: 'ambara',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning avoids React logging attribute mismatches
    // for attributes that are intentionally different between server and client
    // (e.g. theme class applied to <html> by a client-side provider).
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NotificationProvider>
            {children}
            <div id="chat-portal" />
            <ChatButton />
            <Analytics />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
