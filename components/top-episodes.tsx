"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, BarChart } from "lucide-react"
import { fetchYouTubeVideos, type Video } from "@/app/actions/youtube"
import { motion } from "framer-motion"

export default function TopEpisodes() {
  const [episodes, setEpisodes] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setIsLoading(true)
        const videos = await fetchYouTubeVideos()
        setEpisodes(videos.slice(0, 5)) // Get only the top 5 most recent videos
      } catch (error) {
        console.error("Error loading episodes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEpisodes()
    // Refresh data less frequently to reduce API calls
    const intervalId = setInterval(loadEpisodes, 10 * 60 * 1000) // Every 10 minutes

    return () => clearInterval(intervalId)
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 rounded-full p-2 w-10 h-10"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {episodes.map((episode, index) => (
        <motion.div
          key={episode.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-200 hover:scale-[1.01] transform">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <a href={episode.link} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#FF7B7B] text-white rounded-full p-2 transform hover:scale-105 transition-transform duration-200">
                    <Play className="w-6 h-6" />
                  </div>
                </a>
                <div>
                  <h3 className="font-semibold line-clamp-1">{episode.title}</h3>
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
