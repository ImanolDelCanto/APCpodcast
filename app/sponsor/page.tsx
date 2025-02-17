import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee } from "lucide-react"

export default function Sponsor() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Apoya Nuestro Podcast</h1>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground mb-6">
            Tu apoyo nos permite seguir creando contenido de calidad y compartiendo historias inspiradoras. Hay varias
            formas en las que puedes contribuir:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Patrocinio Corporativo</CardTitle>
              <CardDescription>Promociona tu marca en nuestro podcast</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Ofrecemos diferentes paquetes de patrocinio que incluyen:</p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Menciones durante el episodio</li>
                <li>Banners en nuestro sitio web</li>
                <li>Promoción en nuestras redes sociales</li>
                <li>Episodios patrocinados</li>
              </ul>
              <Button className="w-full">Solicitar información</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menciones en Episodios</CardTitle>
              <CardDescription>Promociona tu producto o servicio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Compra menciones individuales en nuestros episodios:</p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Mención de 30 segundos al inicio del episodio</li>
                <li>Mención de 60 segundos en medio del episodio</li>
                <li>Recomendación personal del host</li>
              </ul>
              <Button className="w-full">Ver opciones de menciones</Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Apóyanos con un Cafecito</h2>

          <p className="text-muted-foreground mb-6">
            Si disfrutas de nuestro contenido y quieres apoyarnos de una manera más personal, puedes invitarnos a un
            cafecito. Cada aporte nos ayuda a seguir mejorando.
          </p>
          <Button className="bg-[#FFDD00] text-black hover:bg-[#FFE234]">
            <Coffee className="w-5 h-5 mr-2" />
            Invitarnos un cafecito
          </Button>
        </div>
      </div>
    </div>
  )
}

