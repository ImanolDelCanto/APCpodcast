import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/navBar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

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
        <Footer />
        <Toaster />

        {/* Cursor personalizado - Descomenta para activar */}
        <div id="cursor" className="fixed w-8 h-8 rounded-full bg-[#FF7B7B]/30 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"></div>
        <div id="cursor-dot" className="fixed w-2 h-2 rounded-full bg-[#FF7B7B] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"></div> 
      </body>
    </html>
  )
}

