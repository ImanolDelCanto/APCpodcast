import Image from "next/image"
import { Play, Mic } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"



export default function Hero() {

    return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo con gradiente mejorado y efecto de partículas */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-800 z-0">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/noise.png')" }}></div>
        </div>

        {/* Círculos decorativos con animaciones suaves */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
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
            {/* Logo side - ahora ocupa exactamente la mitad y está centrado */}
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
              />
            </motion.div>

            {/* Text side - ahora ocupa exactamente la mitad */}
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
                  {/* Brillo animado al pasar el mouse */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                  {/* Icono con leve flotación */}
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