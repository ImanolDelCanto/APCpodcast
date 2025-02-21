"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const sponsorOptions = [
  {
    title: "Paquete Básico",
    price: "$100",
    description: "Una mención de 30 segundos al inicio del episodio",
    episodes: 1,
  },
  {
    title: "Paquete Estándar",
    price: "$250",
    description: "Una mención de 60 segundos en medio del episodio",
    episodes: 2,
  },
  {
    title: "Paquete Premium",
    price: "$500",
    description: "Dos menciones de 30 segundos y una recomendación personal del host",
    episodes: 3,
  },
  {
    title: "Paquete VIP",
    price: "$1000",
    description: "Episodio completo dedicado a tu marca con múltiples menciones",
    episodes: 1,
  },
]

export default function Sponsor() {
  const [showOptions, setShowOptions] = useState(false)

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
              <Button className="w-full mb-4" onClick={() => setShowOptions(!showOptions)}>
                {showOptions ? "Ocultar opciones" : "Ver opciones de menciones"}
                {showOptions ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
              {showOptions && (
                <ul className="space-y-4 mt-4">
                  {sponsorOptions.map((option, index) => (
                    <li key={index} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-bold text-lg">{option.title}</h3>
                      <p className="text-muted-foreground">{option.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-primary">{option.price}</span>
                        <span>{option.episodes} episodio(s)</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



