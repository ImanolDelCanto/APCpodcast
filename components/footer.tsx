"use client"

import type React from "react"

import { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Youtube, Instagram, AudioLines, ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { FaTiktok } from "react-icons/fa"

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="text-gray-400 hover:text-[#FF7B7B] transition-all duration-300 flex items-center gap-1 group"
    >
      <span>{children}</span>
      <ArrowRight className="w-0 h-0 opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-300" />
    </Link>
  </motion.li>
)

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
    <Link
      href={href}
      className="hover:text-[#FF7B7B] transition-colors duration-300 flex flex-col items-center gap-1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {icon}
      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
    </Link>
  </motion.div>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-noise opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Image
                src="/bgUp.webp"
                alt="Algo Para Contar Podcast"
                width={150}
                height={150}
                className="mb-4"
                loading="lazy"
              />
            </motion.div>
            <p className="text-gray-400">Un espacio para compartir historias que inspiran y conectan.</p>

            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF7B7B] mt-1" />
                <p className="text-gray-400">Buenos Aires, Argentina</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FF7B7B] mt-1" />
                <p className="text-gray-400">contacto@algoparacontar.com</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FF7B7B] mt-1" />
                <p className="text-gray-400">+54 11 1234 5678</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4 relative">
              Enlaces Rápidos
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-[#FF7B7B]"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/sponsor">Ser Sponsor</FooterLink>
              <FooterLink href="/ser-invitado">Ser Invitado</FooterLink>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4 relative">
              Últimos Episodios
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-[#FF7B7B]"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink href="#">Episodio 42: El poder de la resiliencia</FooterLink>
              <FooterLink href="#">Episodio 41: Emprendimiento en tiempos difíciles</FooterLink>
              <FooterLink href="#">Episodio 40: Historias de superación</FooterLink>
              <FooterLink href="#">Episodio 39: El arte de la comunicación</FooterLink>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4 relative">
              Seguinos
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-[#FF7B7B]"></span>
            </h3>
            <div className="flex gap-6 mb-6">
              <SocialLink
                href="#"
                icon={<AudioLines className="w-6 h-6 transition-transform duration-300 hover:scale-110" />}
                label="Podcast"
              />
              <SocialLink
                href="https://www.youtube.com/@Algoparacontarpodcastt/featured"
                icon={<Youtube className="w-6 h-6 transition-transform duration-300 hover:scale-110" />}
                label="YouTube"
              />
              <SocialLink
                href="https://www.instagram.com/algoparacontarpodcast/"
                icon={<Instagram className="w-6 h-6 transition-transform duration-300 hover:scale-110" />}
                label="Instagram"
              />
              <SocialLink
                href="https://www.tiktok.com/@algoparacontarpodcast"
                icon={
                  <FaTiktok className="w-6 h-6 transition-transform duration-300 hover:scale-110" />
                }
                label="TikTok"
              />
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="overflow-hidden mb-4">
            <div className="animate-marquee inline-block whitespace-nowrap">
              <span className="mx-4">Desarrollo personal</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Historias inspiradoras</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Conversaciones profundas</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Experiencias transformadoras</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Desarrollo personal</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Historias inspiradoras</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Conversaciones profundas</span>
            </div>
          </div>
          <p className="text-gray-400">© {currentYear} Algo Para Contar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
