import { fetchYouTubeVideos } from "../actions/youtube"
import EpisodeCard from "@/components/episode-card"
import { Button } from "@/components/ui/button"

export default async function Episodios() {
  const videos = await fetchYouTubeVideos()

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Nuestros Episodios</h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Explora nuestra colección de episodios llenos de historias fascinantes, conversaciones inspiradoras y momentos
          inolvidables.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <EpisodeCard key={video.id} episode={video} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="gap-2">
            Cargar más episodios
          </Button>
        </div>
      </div>
    </div>
  )
}

