import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import type { Video } from "@/app/actions/youtube"

interface EpisodeCardProps {
  episode: Video
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const formattedDate = new Date(episode.published).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-video">
        <Image
          src={episode.thumbnail || "/placeholder.svg"}
          alt={episode.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a href={episode.link} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#FF7B7B] hover:bg-[#ff6262]">
              <Play className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{episode.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{episode.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>{formattedDate}</div>
        </div>
      </CardContent>
    </Card>
  )
}

