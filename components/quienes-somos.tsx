"use client"
import { useEffect, useRef, memo, useState } from "react"
import { motion, useInView, useAnimation, type Variants, useScroll, useTransform } from "framer-motion"
import { Users, Heart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const QuienesSomos = () => {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const mainControls = useAnimation()
  const floatControls = useAnimation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5])

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
      floatControls.start("float")
    }
  }, [isInView, mainControls, floatControls])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate mouse position as percentage of window
      const x = clientX / windowWidth - 0.5
      const y = clientY / windowHeight - 0.5

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Optimized float animation
  const floatAnimation: Variants = {
    initial: { y: 0 },
    float: {
      y: [-5, 5],
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
      ref={containerRef}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl z-0"
          style={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
            opacity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl z-0"
          style={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
            opacity,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
          <motion.div
            className="w-full md:w-1/2 relative mb-8 md:mb-0"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ y: y1 }}
          >
            <motion.div
              className="relative transform-gpu"
              variants={floatAnimation}
              initial="initial"
              animate={floatControls}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Host del Podcast"
                  className="rounded-2xl shadow-2xl relative z-10 transform transition-transform duration-700"
                  height={800}
                  width={800}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNTAzQjg3Ii8+PC9zdmc+"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-2xl z-20"
                  animate={{
                    background: [
                      "linear-gradient(to top right, rgba(168, 85, 247, 0.3), transparent)",
                      "linear-gradient(to top right, rgba(79, 70, 229, 0.3), transparent)",
                      "linear-gradient(to top right, rgba(168, 85, 247, 0.3), transparent)",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-purple-600 p-3 md:p-4 rounded-full shadow-lg z-30 transform-gpu"
                animate={{
                  y: [-3, 3],
                  rotate: [0, 3, 0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 bg-blue-600 p-3 md:p-4 rounded-full shadow-lg z-30 transform-gpu"
                animate={{
                  y: [3, -3],
                  rotate: [0, -3, 0, 3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{ y: y2 }}
          >
            <div className="relative">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(168, 85, 247, 0.5)",
                    "0 0 16px rgba(168, 85, 247, 0.3)",
                    "0 0 8px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                ¿Quiénes Somos?
              </motion.h2>
              <div className="space-y-4 md:space-y-6 relative">
                <motion.p
                  className="text-lg md:text-xl text-purple-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Somos un equipo apasionado por contar historias que inspiran, educan y entretienen. Nuestro podcast,
                  <span className="font-semibold text-white"> Algo Para Contar</span>, nació de la idea de que cada
                  persona tiene una historia única que merece ser compartida.
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-purple-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Desde entrevistas con emprendedores locales hasta conversaciones con artistas internacionales, nuestro
                  objetivo es traerte historias diversas y fascinantes que te hagan reflexionar, reír y sentir.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Link href="/sobre-nosotros">
                    <motion.button
                      className="mt-6 md:mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transform hover:shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center group relative overflow-hidden"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                      <span className="relative z-10 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        <span>Conoce más sobre nosotros</span>
                        <ArrowRight className="w-0 h-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Background decoration */}
              <motion.div
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(QuienesSomos)

