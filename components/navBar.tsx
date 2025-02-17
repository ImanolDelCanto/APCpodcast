"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navbarClass = isHomePage
    ? `fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`
    : "bg-white shadow-md"

  const linkClass = (isActive: boolean) =>
    `${
      isHomePage && !isScrolled ? "text-white" : isActive ? "text-[#FF7B7B]" : "text-gray-600"
    } hover:text-[#FF7B7B] transition-colors`

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <Image src="/bgUp.png" alt="Algo Para Contar Logo" fill className="object-contain" />
            </div>
            <span className={isHomePage && !isScrolled ? "text-white" : "text-black"}>Algo Para Contar</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClass(pathname === "/")}>
              Inicio
            </Link>
            <Link href="/sobre-nosotros" className={linkClass(pathname === "/sobre-nosotros")}>
              Sobre Nosotros
            </Link>
            <Link href="/sponsor" className={linkClass(pathname === "/sponsor")}>
              Sponsor
            </Link>
            <Link href="/ser-invitado" passHref>
              <Button className="bg-[#FF7B7B] hover:bg-[#ff6262]">Ser Invitado</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className={isHomePage && !isScrolled ? "text-white" : "text-black"} />
            ) : (
              <Menu className={isHomePage && !isScrolled ? "text-white" : "text-black"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-16 left-0 right-0 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/" className="text-gray-600 hover:text-[#FF7B7B]" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </Link>
              <Link
                href="/sobre-nosotros"
                className="text-gray-600 hover:text-[#FF7B7B]"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link href="/sponsor" className="text-gray-600 hover:text-[#FF7B7B]" onClick={() => setIsMenuOpen(false)}>
                Sponsor
              </Link>
              <Link href="/ser-invitado" passHref onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-[#FF7B7B] hover:bg-[#ff6262] w-full">Ser Invitado</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

