import React, { useState, useEffect } from 'react';
import { Play, Users, Heart, MessageCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function PodcastHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = [
    "Cada historia merece ser contada...",
    "Cada persona tiene algo único que compartir...",
    "Cada conversación puede cambiar una vida...",
    "Cada momento tiene su historia..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-20 sm:pt-24 md:pt-0">
      
      {/* Background simple y limpio */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Solo 2 efectos de luz sutiles */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 md:w-48 md:h-48 lg:w-72 lg:h-72 bg-pink-500/6 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}} />
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 xl:gap-32">
          
          {/* Sección visual - Simplificada */}
          <div className="flex-1 flex justify-center lg:justify-end order-2 lg:order-1">
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {/* Imagen principal */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image 
                  src="/heart.webp" 
                  alt="Corazón del podcast" 
                  width={384} 
                  height={384} 
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                  priority
                />
                
                {/* Glow sutil */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm animate-pulse" />
              </div>

              {/* Solo 3 elementos decorativos pequeños */}
              <div className="absolute -top-4 -right-4 w-12 h-12 md:w-16 md:h-16 bg-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center animate-float">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-purple-300" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-14 h-14 md:w-18 md:h-18 bg-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
                <Heart className="w-7 h-7 md:w-9 md:h-9 text-pink-300" />
              </div>

              <div className="absolute top-1/4 -left-8 w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center animate-float" style={{animationDelay: '2s'}}>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-300" />
              </div>
            </div>
          </div>

          {/* Sección de texto */}
          <div 
            className={`flex-1 text-center lg:text-left space-y-6 lg:space-y-8 order-1 lg:order-2 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Título principal */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-SuperDream">
                <span className="block">Sé nuestro </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  próximo invitado
                </span>
              </h1>
              
              {/* Frase dinámica */}
              <div className="h-8 md:h-10 flex items-center justify-center lg:justify-start">
                <p className="text-lg md:text-xl text-gray-300 transition-opacity duration-500">
                  {phrases[currentPhrase]}
                </p>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Bienvenido a un espacio donde las voces se encuentran con las emociones, 
                donde cada invitado trae consigo un universo de experiencias esperando ser descubiertas.
              </p>
              
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                No es solo un podcast, es un viaje a través de las historias que nos definen, 
                nos conectan y nos inspiran a seguir escribiendo nuestro propio capítulo.
              </p>
            </div>

            {/* Botones */}
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <Link href="https://www.youtube.com/channel/UCiz7KCGQNHCEjtoUpuMfF9g" className="w-full sm:w-auto" target='_blank' rel='noopener noreferrer'>
                <Button className="w-full sm:w-auto min-w-[220px] h-14 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center gap-3 border-0 focus-visible:ring-2 focus-visible:ring-purple-400">
                  <Play className="w-5 h-5 flex-shrink-0" />
                  <span>Escucha las historias</span>
                </Button>
              </Link>
              <Link href="/ser-invitado" className="w-full sm:w-auto" rel='noopener noreferrer'>
                <Button className="w-full sm:w-auto min-w-[220px] h-14 px-8 py-4 border-2 border-white/30 hover:border-purple-400/70 rounded-2xl text-white font-semibold text-base backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-white/20 flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-white/50">
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span>Comparte tu historia</span>
                </Button>
              </Link>
            </div>

            {/* Mensaje inspiracional */}
            <div className="pt-4">
              <p className="text-sm text-purple-200/80 italic max-w-lg mx-auto lg:mx-0">
                &quot;Porque detrás de cada micrófono hay un alma, y detrás de cada historia, hay una vida esperando ser compartida.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Optimización para performance */
        .animate-pulse-slow,
        .animate-float {
          will-change: transform, opacity;
        }

        /* Mejoras para mobile */
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 4s;
          }
        }
      `}</style>
    </div>
  );
}