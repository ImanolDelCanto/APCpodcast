"use client"

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/navBar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Agregamos la fuente Denaria de FontSpace */}
        <style jsx global>{`
        @font-face {
          font-family: 'Denaria Demo'; /* Usa el nombre interno correcto */
          src: url('/fonts/denaria.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Super Dream'; /* Usa el nombre que quieras */
          src: url('/fonts/SuperDream.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
