"use client"

import { useState, useEffect, useCallback, useRef, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

function throttle<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
  let lastCall = 0;
  return (...args: T) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    callback(...args);
  };
}


const NavItem = memo(
  ({
    href,
    label,
    isActive,
    isHomePage,
    isScrolled,
    onClick,
  }: {
    href: string
    label: string
    isActive: boolean
    isHomePage: boolean
    isScrolled: boolean
    onClick?: () => void
  }) => {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={href}
          className={`${
            isHomePage && !isScrolled ? "text-white" : isActive ? "text-[#FF7B7B]" : "text-gray-600"
          } hover:text-[#FF7B7B] transition-colors relative group`}
          onClick={onClick}
        >
          {label}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF7B7B] transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`}
          ></span>
        </Link>
      </motion.div>
    )
  },
)

NavItem.displayName = "NavItem"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const navRef = useRef<HTMLDivElement>(null)

  // Optimizar el evento de scroll con throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20)

      // Calcular el progreso del scroll para el indicador
      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setScrollProgress(scrollPercent)
    }, 50) // Throttle a 50ms

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, []) // Removed unnecessary pathname dependency

  const navbarClass = isHomePage
    ? `fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"
      }`
    : "fixed w-full z-50 bg-white shadow-md py-2"


  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/episodios", label: "Episodios" },
    { href: "/sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/sponsor", label: "Sponsor" },
  ]

  return (
    <>
      {/* Indicador de scroll */}
      <div className="scroll-indicator" style={{ width: `${scrollProgress * 100}%` }}></div>

      <motion.nav
        ref={navRef}
        className={navbarClass}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="font-bold text-xl flex items-center">
                <motion.div
                  className="relative w-8 h-8 mr-2"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Image
                    src="/bgUp.png"
                    alt="Algo Para Contar Logo"
                    fill
                    className="object-contain"
                    priority // Cargar con prioridad por ser visible inmediatamente
                  />
                </motion.div>
                <span
                  className={`${isHomePage && !isScrolled ? "text-white" : "text-black"} transition-colors duration-300`}
                >
                  Algo Para Contar
                </span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                  isHomePage={isHomePage}
                  isScrolled={isScrolled}
                />
              ))}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/ser-invitado" passHref>
                  <Button className="bg-[#FF7B7B] hover:bg-[#ff6262] transition-all duration-300 shadow-lg hover:shadow-xl">
                    Ser Invitado
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className={isHomePage && !isScrolled ? "text-white" : "text-black"} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className={isHomePage && !isScrolled ? "text-white" : "text-black"} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden bg-white absolute top-16 left-0 right-0 shadow-lg z-50"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex flex-col p-4 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavItem
                        href={item.href}
                        label={item.label}
                        isActive={pathname === item.href}
                        isHomePage={false}
                        isScrolled={true}
                        onClick={toggleMenu}
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <Link href="/ser-invitado" passHref onClick={toggleMenu}>
                      <Button className="bg-[#FF7B7B] hover:bg-[#ff6262] w-full">Ser Invitado</Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  )
}

export default memo(Navbar)

