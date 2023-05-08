import ResponsiveAppBar from '@/components/CustomAppBar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Student Result Management System',
  description: 'Student Result Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <ResponsiveAppBar />
        <main style={{ width: '100%', textAlign: 'center', marginTop: 30 }}>
          {children}
        </main>
      </body>
    </html>
  )
}
