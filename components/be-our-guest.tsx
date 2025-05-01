"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function BeOurGuest() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo side */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/bgUp.png"
                alt="Algo Para Contar Logo"
                fill
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(255, 123, 123, 0.3))",
                }}
              />
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600">
              Sé nuestro próximo invitado
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              ¿Tenés una historia que vale la pena contar? ¿Una experiencia única o conocimientos que quieras compartir?
              Nos encantaría tenerte como invitado en nuestro podcast y ayudarte a amplificar tu voz.
            </p>
            <Link href="/ser-invitado" passHref>
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-0 gap-2 transform transition-all duration-300 shadow-lg shadow-pink-500/25"
              >
                Quiero participar
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
