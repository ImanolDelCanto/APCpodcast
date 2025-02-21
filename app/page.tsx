import Image from "next/image"
import { Play, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import EpisodeCard from "@/components/episode-card"
import ListenerFeedback from "@/components/listener-feedback"
import TopEpisodes from "@/components/top-episodes"
import { fetchYouTubeVideos } from "./actions/youtube"
import Link from "next/link"
import QuienesSomos from "@/components/quienes-somos"
import CafecitoSupport from "@/components/cafecito"

export default async function Home() {
  const videos = await fetchYouTubeVideos()
  const latestVideos = videos.slice(0, 3) // Get the 3 most recent videos

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="container mx-auto px-4 py-12 relative z-10 text-white text-center">
          <Image
            src="/bgUp.png"
            alt="Algo Para Contar Podcast"
            width={300}
            height={300}
            className="mx-auto mb-8 animate-float w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF7B7B] h-20">
            Algo Para Contar
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Un podcast donde las historias cobran vida y las conversaciones te hacen pensar, reír y sentir.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g/videos" target="_blank" >
              <Button size="lg" className="bg-[#FF7B7B] hover:bg-[#ff6262] gap-2 w-full sm:w-auto">
                <Play className="w-5 h-5" />
                Escuchar último episodio
              </Button>
            </Link>
            <Link href="/ser-invitado" passHref>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white text-black hover:bg-white/ w-full sm:w-auto"
              >
                <Mic className="w-5 h-5" />
                Ser invitado
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quienes Somos Section */}
      <QuienesSomos />

      {/* Stats Section */}
      <section className="py-12 bg-[#FF7B7B]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white text-center">
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10">
              <div className="text-3xl sm:text-4xl font-bold mb-2">100+</div>
              <div className="text-base sm:text-lg">Episodios</div>
            </div>
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10">
              <div className="text-3xl sm:text-4xl font-bold mb-2">50K+</div>
              <div className="text-base sm:text-lg">Oyentes mensuales</div>
            </div>
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10 sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-bold mb-2">200+</div>
              <div className="text-base sm:text-lg">Historias compartidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Episodes */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Episodios Más Escuchados</h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12">
            Los favoritos de nuestra audiencia
          </p>
          <TopEpisodes />
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Últimos Episodios</h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Descubre nuestras conversaciones más recientes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestVideos.map((video) => (
              <EpisodeCard key={video.id} episode={video} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="gap-2">
              Ver todos los episodios
            </Button>
          </div>
        </div>
      </section>

      {/* Cafecito Support Section */}
      <CafecitoSupport />

      {/* Listener Feedback Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Tu Voz Importa</h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12">
            Comparte tus ideas, sugerencias o preguntas para futuros episodios
          </p>
          <ListenerFeedback />
        </div>
      </section>
    </div>
  )
}

