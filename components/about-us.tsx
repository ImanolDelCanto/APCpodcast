"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Heart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const QuienesSomos = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Fondo con gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100 z-0">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('/noise.png')" }}></div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            ¿Quiénes Somos?
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full"
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: 96 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-6">
              <motion.p
                className="text-lg text-slate-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Somos un equipo apasionado por contar historias que inspiran, educan y entretienen. Nuestro podcast,
                <span className="font-semibold text-pink-600"> Algo Para Contar</span>, nació de la idea de que cada
                persona tiene una historia única que merece ser compartida.
              </motion.p>

              <motion.p
                className="text-lg text-slate-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Desde entrevistas con emprendedores locales hasta conversaciones con artistas internacionales, nuestro
                objetivo es traerte historias diversas y fascinantes que te hagan reflexionar, reír y sentir.
              </motion.p>

              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full">
                    <Heart className="w-4 h-4" />
                    <span>Historias Inspiradoras</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span>Conversaciones Auténticas</span>
                  </div>
                </div>

                <Link href="/sobre-nosotros">
                  <motion.button
                    className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Conoce más sobre nosotros</span>
                    <ArrowRight className="w-0 h-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -top-6 -left-6 w-full h-full rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-600 transform rotate-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />

              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Host del Podcast"
                  className="rounded-2xl"
                  height={800}
                  width={800}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWNlY2ZmIi8+PC9zdmc+"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-sm font-medium">Grabando episodios semanalmente</span>
                    </div>
                    <p className="text-sm opacity-80">Más de 100 episodios y contando</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default QuienesSomos
