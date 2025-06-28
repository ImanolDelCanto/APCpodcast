"use client"
import Image from "next/image"
import { Play, Mic } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function OptimizedHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized background with pure CSS */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Simplified noise texture */}
        <div className="absolute inset-0 opacity-5 bg-noise" />
      </div>

      {/* Optimized decorative circles - pure CSS animations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/8 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl animate-pulse-slow-delayed" />

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 relative z-10 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Optimized logo section */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div
              className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <Image
                src="/bgUp.webp"
                alt="Algo Para Contar Podcast"
                width={300}
                height={300}
                className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-glow"
                priority
                fetchPriority="high"
                loading="eager"
                sizes="(max-width: 768px) 192px, 256px"
                quality={85}
              />
            </div>
          </div>

          {/* Text content with optimized animations */}
          <div
            className={`w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-SuperDream">Sé nuestro próximo invitado</h2>
            <p className="text-lg text-gray-200 mb-6 max-w-xl">
              Un podcast donde las historias cobran vida y las conversaciones te hacen pensar, reír y sentir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/ser-invitado" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full sm:w-auto rounded-md px-6 py-3 border border-white/20 text-white bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/30 hover:border-pink-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Mic className="w-5 h-5 mr-2 text-white" />
                  Ser invitado
                </Button>
              </Link>
              <Link href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g/videos" target="_blank">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-0 gap-2 w-full sm:w-auto transition-all duration-300 shadow-lg shadow-pink-500/25 hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  Escuchar último episodio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified floating elements - pure CSS animations */}
      <div
        className={`absolute inset-0 z-5 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Reduced number of floating elements for better performance */}
        <div className="absolute top-20 left-10 text-white/30 text-4xl select-none animate-float-1">💭</div>
        <div className="absolute bottom-40 left-16 px-3 py-1 bg-purple-500/15 rounded-2xl backdrop-blur-sm border border-white/10 animate-float-2">
          <span className="text-white text-xs">¡Hola!</span>
        </div>
        <div className="absolute top-40 right-32 text-white/30 text-4xl font-bold select-none animate-float-3">?</div>
        <div className="absolute bottom-60 right-10 text-pink-300/40 text-5xl font-bold select-none animate-float-4">
          ?
        </div>
        <div className="absolute top-60 left-32 text-purple-300/30 text-3xl font-bold select-none animate-float-5">
          ¿
        </div>
        <div className="absolute bottom-32 right-40 text-white/40 text-4xl select-none animate-float-6">🎙️</div>
      </div>

      {/* Optimized CSS animations */}
      <style jsx>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px rgba(255, 123, 123, 0.3));
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow 10s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.12; }
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-3 {
          animation: float-3 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-4 {
          animation: float-4 6.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-float-5 {
          animation: float-5 7.5s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-float-6 {
          animation: float-6 9s ease-in-out infinite;
          animation-delay: 2.5s;
        }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-3deg); }
        }

        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }

        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-5deg); }
        }

        @keyframes float-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }

        /* Hardware acceleration for better performance */
        .animate-float-1,
        .animate-float-2,
        .animate-float-3,
        .animate-float-4,
        .animate-float-5,
        .animate-float-6 {
          will-change: transform;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  )
}
