import Image from "next/image"
import Link from "next/link"
import { Youtube, Instagram, AudioLines } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <Image
              src="/bgUp.png"
              alt="Algo Para Contar Podcast"
              width={150}
              height={150}
              className="mb-4"
            />
            <p className="text-gray-400">Un espacio para compartir historias que inspiran y conectan.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#FF7B7B]">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-gray-400 hover:text-[#FF7B7B]">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/sponsor" className="text-gray-400 hover:text-[#FF7B7B]">
                  Ser Sponsor
                </Link>
              </li>
              <li>
                <Link href="/ser-invitado" className="text-gray-400 hover:text-[#FF7B7B]">
                  Ser Invitado
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Seguinos</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[#FF7B7B] transition-colors" target="_blank">
                <AudioLines className="w-6 h-6" />
              </Link>
              <Link href="https://www.youtube.com/@Algoparacontarpodcastt/featured" className="hover:text-[#FF7B7B] transition-colors" target="_blank">
                <Youtube className="w-6 h-6" />
              </Link>
              <Link href="https://www.instagram.com/algoparacontarpodcast/" className="hover:text-[#FF7B7B] transition-colors" target="_blank">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://www.tiktok.com/@algoparacontarpodcast" className="hover:text-[#FF7B7B] transition-colors" target="_blank">
                <Image className="w-6 h-6" height={500} width={500} src="/tiktokicon.svg" alt="tiktok"/>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Algo Para Contar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

