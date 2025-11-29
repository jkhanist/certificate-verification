import type { Metadata } from 'next'
import {
  Plus_Jakarta_Sans,
  DM_Sans,
  Syne,
  Montserrat,
  Open_Sans,
  Outfit,
  Khand,
} from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const khand = Khand({
  subsets: ['latin'],
  weight: ['300', '700'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'UKQAM - Verify Certificate',
  description: 'Verify your UKQAM certificate',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} ${syne.variable} ${montserrat.variable} ${openSans.variable} ${outfit.variable} ${khand} font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
