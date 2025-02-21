import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"

export default function CafecitoSupport() {
  return (
    <div className="bg-gradient-to-r  bg-[#FF7B7B] py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Apóyanos con un Cafecito</h2>
        <p className="text-white mb-6 max-w-2xl mx-auto">
          Si disfrutas de nuestro contenido y quieres apoyarnos de una manera más personal, puedes invitarnos a un
          cafecito. Cada aporte nos ayuda a seguir mejorando y creando contenido de calidad.
        </p>
        <Button className="bg-white text-black hover:bg-gray-100">
          <Coffee className="w-5 h-5 mr-2" />
          Invitarnos un cafecito
        </Button>
      </div>
    </div>
  )
}

