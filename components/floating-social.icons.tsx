"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Youtube } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingSocialIcons() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Ocultar los iconos cuando el usuario hace scroll más allá de 200px
      if (window.scrollY > 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    // Agregar el evento de scroll
    window.addEventListener("scroll", handleScroll)

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 left-0 right-0 z-40 px-8 w-full"
        >
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
            <Link
              href="https://www.instagram.com/algoparacontarpodcast/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition-colors duration-300 flex-1 flex justify-center"
            >
              <Instagram size={32} />
              <span className="sr-only">Instagram</span>
            </Link>

            <Link
              href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-400 transition-colors duration-300 flex-1 flex justify-center"
            >
              <Youtube size={32} />
              <span className="sr-only">YouTube</span>
            </Link>

            <Link
              href="https://www.tiktok.com/@algoparacontarpodcast"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 flex-1 flex justify-center"
            >
              <FaTiktok size={28} />
              <span className="sr-only">TikTok</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
