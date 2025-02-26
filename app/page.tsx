"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Play, Mic, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import EpisodeCard from "@/components/episode-card"
import TopEpisodes from "@/components/top-episodes"
import Link from "next/link"
import QuienesSomos from "@/components/quienes-somos"
import CafecitoSupport from "@/components/cafecito"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { fetchYouTubeVideos, type Video } from "./actions/youtube"
import { CommentSection } from "@/components/commet-section"

export default function Home() {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [latestVideos, setLatestVideos] = useState<Video[]>([])
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    async function loadVideos() {
      const videos = await fetchYouTubeVideos()
      setLatestVideos(videos.slice(0, 3))
    }
    loadVideos()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-12 relative z-10 text-white text-center"
        >
          <Image
            src="/bgUp.png"
            alt="Algo Para Contar Podcast"
            width={300}
            height={300}
            className="mx-auto mb-8 animate-float w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF7B7B]">
            Algo Para Contar
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Un podcast donde las historias cobran vida y las conversaciones te hacen pensar, reír y sentir.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g/videos" target="_blank">
              <Button
                size="lg"
                className="bg-[#FF7B7B] hover:bg-[#ff6262] gap-2 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300"
              >
                <Play className="w-5 h-5" />
                Escuchar último episodio
              </Button>
            </Link>
            <Link href="/ser-invitado" passHref>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white text-black hover:bg-white/90 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300"
              >
                <Mic className="w-5 h-5" />
                Ser invitado
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Quienes Somos Section */}
      <QuienesSomos />

      {/* Interactive Tip Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-[#FF7B7B]" />
              Tip del día
            </h3>
            <p className="text-lg mb-4">
              ¿Sabías que escuchar podcasts puede mejorar tu vocabulario y habilidades de comunicación?
            </p>
            <Button onClick={() => setShowTip(!showTip)} className="bg-[#FF7B7B] hover:bg-[#ff6262]">
              {showTip ? "Ocultar explicación" : "Aprender más"}
            </Button>
            {showTip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-100 rounded-md"
              >
                <p>
                  Al escuchar podcasts, estás expuesto a una variedad de temas, estilos de habla y vocabulario. Esto te
                  ayuda a:
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Ampliar tu vocabulario</li>
                  <li>Mejorar tu comprensión auditiva</li>
                  <li>Aprender nuevas formas de expresarte</li>
                  <li>Mantenerte informado sobre diversos temas</li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12 bg-[#FF7B7B]"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 rounded-lg backdrop-blur-sm bg-white/10">
              <div className="text-3xl sm:text-4xl font-bold mb-2">100+</div>
              <div className="text-base sm:text-lg">Episodios</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 rounded-lg backdrop-blur-sm bg-white/10">
              <div className="text-3xl sm:text-4xl font-bold mb-2">50K+</div>
              <div className="text-base sm:text-lg">Oyentes mensuales</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg backdrop-blur-sm bg-white/10 sm:col-span-2 md:col-span-1"
            >
              <div className="text-3xl sm:text-4xl font-bold mb-2">200+</div>
              <div className="text-base sm:text-lg">Historias compartidas</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Top Episodes */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Episodios Más Escuchados</h2>
            <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12">
              Los favoritos de nuestra audiencia
            </p>
          </motion.div>
          <TopEpisodes />
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-4xl font-bold text-center mb-4">Últimos Episodios</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Descubre nuestras conversaciones más recientes
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestVideos.map((video) => (
              <EpisodeCard key={video.id} episode={video} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 transform hover:scale-105 transition-transform duration-300"
            >
              Ver todos los episodios
            </Button>
          </div>
        </div>
      </section>

      {/* Cafecito Support Section */}
      <CafecitoSupport />

      {/* Comments Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Tu Voz Importa</h2>
            <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12">
            Comparti tus ideas, sugerencias, preguntas para futuros episodios o simplemente saludá!
            </p>
          </motion.div>
          <CommentSection />
        </div>
      </section>
    </div>
  )
}

