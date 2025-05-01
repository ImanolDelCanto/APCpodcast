import type React from "react"
import ClientLayout from "./clientLayout"

export const metadata = {
  title: "Algo Para Contar | Podcast",
  description: "Un podcast donde compartimos historias que valen la pena contar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
