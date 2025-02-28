"use client"
import { useState, useCallback, memo, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Share2, Heart, Clock, Calendar, ExternalLink } from "lucide-react"
import type { Video } from "@/app/actions/youtube"
import Image from "next/image"

interface EpisodeCardProps {
  episode: Video
}

const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Efecto parallax al mover el mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return

      const card = cardRef.current
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 25
      const moveY = (y - centerY) / 25

      card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) scale3d(1.02, 1.02, 1.02)`
    }


    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovered])

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: episode.title,
          text: episode.description,
          url: episode.link,
        })
        .catch((err) => {
          console.error("Error al compartir:", err)
        })
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard
        .writeText(episode.link)
        .then(() => alert("Enlace copiado al portapapeles: " + episode.link))
        .catch(() => alert("No se pudo copiar el enlace: " + episode.link))
    }
  }, [episode.title, episode.description, episode.link])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => !prev)
  }, [])

  // Formatear la duración del episodio
  const formattedDuration = new Date(episode.duration * 1000).toDateString().substr(14, 5)

  // Formatear la fecha de publicación
  const formattedDate = new Date(episode.published).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transition: "transform 0.3s ease-out" }}
      whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={episode.thumbnail || "/placeholder.svg"}
          alt={episode.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          height={720}
          width={1280}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI3MjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <motion.button
          onClick={togglePlay}
          className="absolute bottom-4 left-4 bg-[#FF7B7B] hover:bg-[#ff6262] p-4 rounded-full shadow-lg"
          aria-label={isPlaying ? "Pausar episodio" : "Reproducir episodio"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Pause className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <motion.div
            className="flex items-center gap-1 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Clock className="w-3 h-3 mr-1" />
            {formattedDuration}
          </motion.div>

          <motion.div
            className="flex items-center gap-1 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(episode.published).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </motion.div>
        </div>

        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
            >
              <div className="text-center p-6">
                <h3 className="text-white text-xl font-bold mb-2">{episode.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{episode.description}</p>
                <motion.a
                  href={episode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF7B7B] hover:bg-[#ff6262] text-white px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver en YouTube
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
          {episode.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
          {episode.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formattedDate}
          </span>

          <div className="flex gap-2">
            <motion.button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              aria-label="Compartir episodio"
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </motion.button>

            <motion.button
              onClick={toggleLike}
              className={`p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 ${
                isLiked ? "text-[#FF7B7B]" : "text-gray-600"
              }`}
              aria-label={isLiked ? "Quitar me gusta" : "Me gusta"}
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                style={{
                  filter: isLiked ? "drop-shadow(0 0 2px rgba(255, 123, 123, 0.5))" : "none",
                }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(EpisodeCard)

