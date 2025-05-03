"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Play, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import EpisodeCard from "@/components/episode-card"
import Link from "next/link"
import QuienesSomos from "@/components/about-us"
import CafecitoSupport from "@/components/cafecito"
import { motion, useAnimation, useInView } from "framer-motion"
import { fetchYouTubeVideos, type Video } from "./actions/youtube"
import CommetSection from "@/components/commet-section"
import people from "@/animations/people.json"
import TipDelDia from "@/components/tip"
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const controls = useAnimation()
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const [latestVideos, setLatestVideos] = useState<Video[]>([])

  useEffect(() => {
    if (isStatsInView) {
      controls.start("visible")
    }
  }, [controls, isStatsInView])

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                src="/bgUp.png"
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
                <Link href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g/videos" target="_blank">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-0 gap-2 w-full sm:w-auto transform transition-all duration-300 shadow-lg shadow-pink-500/25"
                  >
                    <Play className="w-5 h-5" />
                    Escuchar último episodio
                  </Button>
                </Link>
                <Link href="/ser-invitado" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 w-full sm:w-auto transform transition-all duration-300"
                  >
                    <Mic className="w-5 h-5" />
                    Ser invitado
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Tip Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <TipDelDia />
        </div>
      </section>

      {/* Quienes Somos Section */}
      <QuienesSomos />

      {/* Stats Section */}
      <motion.section ref={statsRef} className="py-16 relative overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-600 z-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/noise.png')" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-xl backdrop-blur-md"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">5+</div>
              <div className="text-lg opacity-90">Episodios</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-xl backdrop-blur-md"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Oyentes mensuales</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-xl backdrop-blur-md sm:col-span-2 md:col-span-1"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">10+</div>
              <div className="text-lg opacity-90">Historias compartidas</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Latest Episodes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-SuperDream mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600">
              Últimos Episodios
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Descubre nuestras conversaciones más recientes</p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-indigo-600 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EpisodeCard episode={video} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 hover:border-slate-400 hover:bg-slate-50 gap-2 transform hover:scale-105 transition-all duration-300"
            >
              Ver todos los episodios
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Cafecito Support Section */}
      <CafecitoSupport />

      {/* Comments Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-SuperDream bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600">
              TU VOZ IMPORTA
            </h2>
            <Lottie animationData={people} loop={true} className="w-80 h-80 mx-auto" />
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Compartí tus ideas, sugerencias, preguntas para futuros episodios o simplemente saludá!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <CommetSection />
        </div>
      </section>
    </div>
  )
}
