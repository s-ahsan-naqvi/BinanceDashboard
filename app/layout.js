import './globals.css'
import { Inter } from 'next/font/google'
import SideNav from "@/components/SideNav"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Project Curve',
  description: 'binance data visualisation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-full flex flex-row">
          <SideNav />
          <div className='bg-[#142232] flex-1 border-1 border-dashed overflow-y-scroll'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
