"use client"
  import { useRef } from "react"
  import { motion, useInView } from "framer-motion"
  import { Users, Heart, Sparkles } from "lucide-react"
  import about from "@/animations/about.json"
  import dynamic from "next/dynamic";
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
              Detrás del micrófono
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
                  <span className="font-semibold text-pink-600">Algo Para Contar</span> es un espacio creado para
                  compartir historias, ideas y experiencias que inspiran, emocionan y conectan. Cada episodio busca abrir
                  la puerta a nuevas perspectivas, fomentar la curiosidad y celebrar la diversidad de voces y relatos.
                  Aquí se encuentran conversaciones auténticas, reflexiones y momentos que invitan a pensar, reír y
                  descubrir juntos.
                </motion.p>

                <motion.p
                  className="text-lg text-slate-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Desde entrevistas con personas inspiradoras hasta charlas sobre temas actuales, el objetivo es ofrecer contenido diverso y enriquecedor para quienes buscan algo más en cada escucha.
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
                  className="relative rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center w-full h-full min-h-[250px]">
                    <Lottie
                      animationData={about}
                      loop={true}
                      className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg"
                      style={{ margin: "0 auto" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-sm font-medium">Grabando episodios semanalmente</span>
                      </div>
                      <p className="text-sm opacity-80">Más de 10 episodios y contando</p>
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
