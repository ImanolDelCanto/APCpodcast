"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"

export default function QuienesSomos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <section ref={ref} className="py-16 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2"
            variants={{
              hidden: { opacity: 0, x: -75 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Image
              src="/host-image.jpg"
              alt="Host del Podcast"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2"
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">¿Quiénes Somos?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Somos un equipo apasionado por contar historias que inspiran, educan y entretienen. Nuestro podcast, Algo
              Para Contar, nació de la idea de que cada persona tiene una historia única que merece ser compartida.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Desde entrevistas con emprendedores locales hasta conversaciones con artistas internacionales, nuestro
              objetivo es traerte historias diversas y fascinantes que te hagan reflexionar, reír y sentir.
            </p>
            <Link href="/sobre-nosotros" passHref>
              <Button
                size="lg"
                className="bg-[#FF7B7B] hover:bg-[#ff6262] transform hover:scale-105 transition-transform duration-300"
              >
                Conoce más sobre nosotros
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

