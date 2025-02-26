"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Headphones, Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import EpisodeCard from "@/components/episode-card"
import { fetchYouTubeVideos } from "../actions/youtube"
import Image from "next/image"



const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Definir la interfaz Video
interface Video {
  id: string
  title: string
  link: string
  duration: number
  published: string
  thumbnail: string
  description: string 
}


export default function Episodios() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    async function loadVideos() {
      const fetchedVideos = await fetchYouTubeVideos()
      
      // Asegurar que duration sea un string
      const formattedVideos = fetchedVideos.map((video) => ({
        ...video,
        duration: Number(video.duration), // Convertir duration a string
      }))
    
      setVideos(formattedVideos)
      setLoading(false)
    }
    
    loadVideos()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden relative pt-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl z-0" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
        >
          Nuestros Episodios
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Explora nuestra colección de episodios llenos de historias fascinantes, conversaciones inspiradoras y momentos
          inolvidables.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            <div className="col-span-3 text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-[#FF7B7B] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg">Cargando episodios...</p>
            </div>
          ) : (
            videos.map((video) => (
              <motion.div key={video.id} variants={fadeInUp}>
                <EpisodeCard episode={video} />
              </motion.div>
            ))
          )}
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center mt-12">
          <Button size="lg" variant="outline" className="gap-2">
            <ChevronDown className="w-4 h-4" />
            Cargar más episodios
          </Button>
        </motion.div>
      </div>

      {/* Featured Episode Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-white/5 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-8 text-center text-purple-300">
            Episodio Destacado
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeInUp} className="relative rounded-lg overflow-hidden shadow-xl">
              <Image height={1000} width={1000} src="/placeholder.svg?height=400&width=600" alt="Episodio Destacado" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <Button className="bg-[#FF7B7B] hover:bg-[#ff6262] gap-2">
                  <Play className="w-4 h-4" />
                  Reproducir ahora
                </Button>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-2xl font-bold">Título del Episodio Destacado</h3>
              <p className="text-gray-300">
                Una breve descripción del episodio destacado, resaltando los puntos más interesantes y por qué los
                oyentes deberían escucharlo.
              </p>
              <div className="flex items-center gap-4">
                <Headphones className="w-6 h-6 text-[#FF7B7B]" />
                <span>Duración: 45 minutos</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

