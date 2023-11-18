import { ChakraProvider } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Github Repo Explorer',
  description: 'Developed using Nextjs 13 by AgungRiyanto',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
        </body>
    </html>
  )
}
