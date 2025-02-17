import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/navBar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Algo Para Contar | Podcast",
  description: "Un podcast donde compartimos historias que valen la pena contar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}

