import Image from "next/image"
import { Play, Mic } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (containerRef.current) {
      const elements = elementsRef.current

      // Configurar estado inicial inmediatamente para evitar el flash
      gsap.set(elements, {
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 360 
      })

      // Configurar burbujas también
      const bubbles = containerRef.current.querySelectorAll('.bubble')
      gsap.set(bubbles, {
        opacity: 0,
        scale: 0
      })

      // Pequeño delay para asegurar que el DOM esté listo
      const timer = setTimeout(() => {
        // Animación inicial de los elementos flotantes
        elements.forEach((element, index) => {
          gsap.to(element, {
            opacity: 0.6,
            scale: 1,
            duration: 2,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            onComplete: () => {
              // Animación continua de flotación
              gsap.to(element, {
                y: "+=20",
                rotation: "+=10",
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              })
            }
          })
        })

        // Animación de las burbujas de diálogo
        bubbles.forEach((bubble, index) => {
          gsap.to(bubble, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: index * 0.3,
            ease: "back.out(1.2)",
            onComplete: () => {
              gsap.to(bubble, {
                scale: 1.1,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              })
            }
          })
        })
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Fondo base con gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 z-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/noise.png')" }}></div>
      </div>

      {/* Elementos flotantes de conversación */}
      <div className="absolute inset-0 z-5">
        {/* Burbujas de diálogo */}
        <div 
          ref={addToRefs}
          className=" absolute top-20 left-10 w-16 h-16 text-white/40 text-4xl font-bold opacity-0"
        >
          <span className="text-white">💭</span>
        </div>
        
      
        <div 
          ref={addToRefs}
          className="bubble absolute bottom-40 left-16 w-24 h-18 bg-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm opacity-0"
        >
          <span className="text-white text-xs">¡Hola!</span>
        </div>

        {/* Signos de interrogación flotantes */}
        <div 
          ref={addToRefs}
          className="absolute top-40 right-32 text-white/40 text-4xl font-bold opacity-0"
        >
          ?
        </div>
        
        <div 
          ref={addToRefs}
          className="absolute bottom-60 right-10 text-pink-300/50 text-6xl font-bold opacity-0"
        >
          ?
        </div>

        <div 
          ref={addToRefs}
          className="absolute top-60 left-32 text-purple-300/40 text-3xl font-bold opacity-0"
        >
          ¿
        </div>

    
        <div 
          ref={addToRefs}
          className="absolute bottom-32 right-40 text-white/50 text-5xl font-bold opacity-0"
        >
          🎙️​ 
        </div>

        <div 
          ref={addToRefs}
          className="absolute top-16 left-1/2 text-indigo-300/40 text-4xl font-bold opacity-0"
        >
          📻​
        </div>

        {/* Elementos de libros/páginas */}
        <div 
          ref={addToRefs}
          className="absolute top-80 left-20 text-indigo-300/40 text-4xl font-bold opacity-0"
        >
          🎧​
        </div>

        <div 
          ref={addToRefs}
          className="absolute bottom-20 right-60 text-indigo-300/40 text-4xl font-bold opacity-0"
        >
          🎧​ 
        </div>

        {/* Comillas decorativas */}
        <div 
          ref={addToRefs}
          className="absolute top-24 right-60 text-white/30 text-7xl font-serif opacity-0"
        >
          &quot;
        </div>

        <div 
          ref={addToRefs}
          className="absolute bottom-40 left-60 text-pink-300/30 text-6xl font-serif transform rotate-180 opacity-0"
        >
          🎙️​
        </div>

        {/* Notas musicales para representar el podcast */}
        <div 
          ref={addToRefs}
          className="absolute top-52 right-16 text-purple-300/40 text-3xl opacity-0"
        >
          ♪
        </div>

        <div 
          ref={addToRefs}
          className="absolute bottom-52 left-40 text-indigo-300/40 text-4xl opacity-0"
        >
          ♫
        </div>
      </div>

      {/* Círculos decorativos con animaciones suaves */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-12 relative z-10 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Logo side */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/bgUp.webp"
              alt="Algo Para Contar Podcast"
              width={300}
              height={300}
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255, 123, 123, 0.5))",
              }}
              priority
            />
          </motion.div>

          {/* Text side */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 font-SuperDream"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Sé nuestro próximo invitado
            </motion.h2>
            <motion.p
              className="text-lg text-gray-200 mb-6 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Un podcast donde las historias cobran vida y las conversaciones te hacen pensar, reír y sentir.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href="/ser-invitado" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="relative group w-full sm:w-auto overflow-hidden rounded-md px-6 py-3 border border-white/20 text-white bg-white/10 backdrop-blur-md hover:bg-gradient-to-r from-pink-500/20 to-purple-500/30 hover:border-pink-500/40 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg hover-lift"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  <Mic className="w-5 h-5 mr-2 text-white group-hover:animate-float transition-transform duration-300" />
                  <span className="z-10 relative">Ser invitado</span>
                </Button>
              </Link>
              <Link href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g/videos" target="_blank">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-0 gap-2 w-full sm:w-auto transform transition-all duration-300 shadow-lg shadow-pink-500/25"
                >
                  <Play className="w-5 h-5" />
                  Escuchar último episodio
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}