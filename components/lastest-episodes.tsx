import { Button } from "@/components/ui/button"
import EpisodeCard from "@/components/episode-card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fetchYouTubeVideos, type Video } from "@/app/actions/youtube"



export default function LatestEpisodes() {
    const [latestVideos, setLatestVideos] = useState<Video[]>([])


    useEffect(() => {
        async function loadVideos() {
        const videos = await fetchYouTubeVideos()
        setLatestVideos(videos.slice(0, 3))
        }
        loadVideos()
    }, [])

    return ( 
        <div>
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
        </div>
    )
}   