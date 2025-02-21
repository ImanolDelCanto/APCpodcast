"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Share2, Heart, Pause } from "lucide-react"
import type { Video } from "@/app/actions/youtube"
import { motion } from "framer-motion"

interface EpisodeCardProps {
  episode: Video
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const formattedDate = new Date(episode.published).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode.title,
        text: episode.description,
        url: episode.link,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Comparte este episodio: " + episode.link)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video">
          <Image
            src={episode.thumbnail || "/placeholder.svg"}
            alt={episode.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-[#FF7B7B] hover:bg-[#ff6262] transform hover:scale-110 transition-transform duration-300"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
          </div>
          {isPlaying && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-2 right-2 bg-[#FF7B7B] text-white px-2 py-1 rounded-full text-sm"
            >
              {formatDuration(episode.duration)}
            </motion.div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{episode.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{episode.description}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>{formattedDate}</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

