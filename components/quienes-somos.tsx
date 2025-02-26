"use client"
import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { Users, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const QuienesSomos = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()
  const floatControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
      floatControls.start("float")
    }
  }, [isInView, mainControls, floatControls])

  const floatAnimation: Variants = {
    initial: { y: 0 },
    float: {
      y: [-20, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl" />

          <motion.div
            className="w-full md:w-1/2 relative mb-8 md:mb-0"
            variants={{
              hidden: { opacity: 0, x: -75 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <motion.div className="relative" variants={floatAnimation} initial="initial" animate={floatControls}>
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Host del Podcast"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 relative z-10"
                height={1000}
                width={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-2xl z-20" />

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-purple-600 p-3 md:p-4 rounded-full shadow-lg z-30"
                animate={{
                  y: [-5, 5],
                  transition: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 bg-blue-600 p-3 md:p-4 rounded-full shadow-lg z-30"
                animate={{
                  y: [5, -5],
                  transition: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white">¿Quiénes Somos?</h2>
              <div className="space-y-4 md:space-y-6 relative">
                <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
                  Somos un equipo apasionado por contar historias que inspiran, educan y entretienen. Nuestro podcast,
                  Algo Para Contar, nació de la idea de que cada persona tiene una historia única que merece ser
                  compartida.
                </p>
                <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
                  Desde entrevistas con emprendedores locales hasta conversaciones con artistas internacionales, nuestro
                  objetivo es traerte historias diversas y fascinantes que te hagan reflexionar, reír y sentir.
                </p>

                <Link href="/sobre-nosotros">
                  <motion.button
                    className="mt-6 md:mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Users className="w-5 h-5" />
                    <span>Conoce más sobre nosotros</span>
                  </motion.button>
                </Link>
              </div>

              {/* Background decoration */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default QuienesSomos

