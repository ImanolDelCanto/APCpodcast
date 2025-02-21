"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, BarChart } from "lucide-react"
import { fetchYouTubeVideos, type Video } from "@/app/actions/youtube"
import { motion } from "framer-motion"

export default function TopEpisodes() {
  const [episodes, setEpisodes] = useState<Video[]>([])

  useEffect(() => {
    const loadEpisodes = async () => {
      const videos = await fetchYouTubeVideos()
      setEpisodes(videos.slice(0, 5)) // Get only the top 5 most recent videos
    }

    loadEpisodes()
    const intervalId = setInterval(loadEpisodes, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="grid gap-4">
      {episodes.map((episode, index) => (
        <motion.div
          key={episode.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-300 transform hover:scale-102">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <a href={episode.link} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#FF7B7B] text-white rounded-full p-2 transform hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6" />
                  </div>
                </a>
                <div>
                  <h3 className="font-semibold">{episode.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BarChart className="w-4 h-4 mr-1" />
                    Publicado el {new Date(episode.published).toLocaleDateString("es-ES")}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold">#{index + 1}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

