"use client"
import Image from "next/image"
import { Play, Mic } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reducir el delay para acelerar el renderizado inicial
    const timer = setTimeout(() => setIsLoaded(true), 16) // Un frame
    return () => clearTimeout(timer)
  }, [])

  // Variantes de animación optimizadas manteniendo el aspecto visual
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const floatingElementVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20 
    },
    visible: {
      opacity: [0, 0.6, 0.4],
      scale: [0.8, 1, 1.05, 1],
      y: [20, 0, -5, 0],
      transition: {
        duration: 2,
        ease: "easeOut",
        opacity: {
          duration: 1.5
        }
      }
    }
  }

  const continuousFloat = {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo optimizado con gradiente CSS puro */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      {/* Círculos decorativos optimizados - renderizado inmediato */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/8 blur-3xl animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl animate-pulse" 
           style={{ animationDuration: '10s', animationDelay: '2s' }} />

      {/* Contenido principal - imagen renderizada inmediatamente */}
      <div className="container mx-auto px-4 py-12 relative z-10 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Logo - sin animación inicial para renderizado inmediato */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/bgUp.webp"
              alt="Algo Para Contar Podcast"
              width={300}
              height={300}
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255, 123, 123, 0.3))",
              }}
              priority
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 768px) 192px, 256px"
              // Preload hint para la imagen crítica
              onLoad={() => {
                // Disparar animaciones después de que la imagen esté cargada
                if (!isLoaded) setIsLoaded(true)
              }}
            />
          </div>

          {/* Contenido de texto con animación reducida pero manteniendo aspecto */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-SuperDream">
              Sé nuestro próximo invitado
            </h2>
            <p className="text-lg text-gray-200 mb-6 max-w-xl">
              Un podcast donde las historias cobran vida y las conversaciones te hacen pensar, reír y sentir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/ser-invitado" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full sm:w-auto rounded-md px-6 py-3 border border-white/20 text-white bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/30 hover:border-pink-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Mic className="w-5 h-5 mr-2 text-white" />
                  Ser invitado
                </Button>
              </Link>
              <Link href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g/videos" target="_blank">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-0 gap-2 w-full sm:w-auto transition-all duration-300 shadow-lg shadow-pink-500/25 hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  Escuchar último episodio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Elementos flotantes - con optimización de will-change para mejor performance */}
      {isLoaded && (
        <motion.div
          className="absolute inset-0 z-5 pointer-events-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: 'transform' }}
        >
          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute top-20 left-10 text-white/30 text-4xl select-none"
            style={{ willChange: 'transform' }}
          >
            💭
          </motion.div>
          
          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute bottom-40 left-16 px-3 py-1 bg-purple-500/15 rounded-2xl backdrop-blur-sm border border-white/10"
            style={{ animationDelay: '1s', willChange: 'transform' }}
          >
            <span className="text-white text-xs">¡Hola!</span>
          </motion.div>

          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute top-40 right-32 text-white/30 text-4xl font-bold select-none"
            style={{ animationDelay: '2s', willChange: 'transform' }}
          >
            ?
          </motion.div>
          
          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute bottom-60 right-10 text-pink-300/40 text-5xl font-bold select-none"
            style={{ animationDelay: '0.5s', willChange: 'transform' }}
          >
            ?
          </motion.div>

          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute top-60 left-32 text-purple-300/30 text-3xl font-bold select-none"
            style={{ animationDelay: '1.5s', willChange: 'transform' }}
          >
            ¿
          </motion.div>

          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute bottom-32 right-40 text-white/40 text-4xl select-none"
            style={{ animationDelay: '2.5s', willChange: 'transform' }}
          >
            🎙️
          </motion.div>

          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute top-16 left-1/2 text-indigo-300/30 text-4xl select-none"
            style={{ animationDelay: '3s', willChange: 'transform' }}
          >
            📻
          </motion.div>

          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute top-80 left-20 text-indigo-300/30 text-4xl select-none"
            style={{ animationDelay: '0.8s', willChange: 'transform' }}
          >
            🎧
          </motion.div>

          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute top-52 right-16 text-purple-300/30 text-3xl select-none"
            style={{ animationDelay: '1.8s', willChange: 'transform' }}
          >
            ♪
          </motion.div>

          <motion.div 
            variants={floatingElementVariants}
            animate={continuousFloat}
            className="absolute bottom-52 left-40 text-indigo-300/30 text-4xl select-none"
            style={{ animationDelay: '2.2s', willChange: 'transform' }}
          >
            ♫
          </motion.div>
        </motion.div>
      )}

      {/* CSS optimizado para mejor performance */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}