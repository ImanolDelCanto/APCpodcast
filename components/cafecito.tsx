"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Registrar el plugin de ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const CafecitoSupport = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const coffeeIconRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  const decorativeCoffee1Ref = useRef<HTMLDivElement>(null)
  const decorativeCoffee2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline principal para la animación de entrada
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Animación de entrada del contenedor principal
      tl.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
      )

      // Animación del ícono de café (entrada)
      tl.fromTo(
        coffeeIconRef.current,
        {
          opacity: 0,
          scale: 0.5,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      )

      // Animación del título
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      )

      // Animación del párrafo
      tl.fromTo(
        paragraphRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )

      // Animación del botón
      tl.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.3",
      )

      // Animación flotante continua del ícono de café
      gsap.to(coffeeIconRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Animaciones de los elementos decorativos
      gsap.fromTo(
        decorativeCoffee1Ref.current,
        {
          opacity: 0,
          rotation: -45,
          scale: 0.5,
        },
        {
          opacity: 0.2,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        decorativeCoffee2Ref.current,
        {
          opacity: 0,
          rotation: 45,
          scale: 0.5,
        },
        {
          opacity: 0.2,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animación de rotación continua para elementos decorativos
      gsap.to(decorativeCoffee1Ref.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      })

      gsap.to(decorativeCoffee2Ref.current, {
        rotation: -360,
        duration: 25,
        ease: "none",
        repeat: -1,
      })
    }, sectionRef)

    // Configurar animaciones de hover para el botón
    const button = buttonRef.current
    const arrow = arrowRef.current

    if (button && arrow) {
      // Estado inicial de la flecha
      gsap.set(arrow, {
        width: 0,
        height: 0,
        opacity: 0,
        marginLeft: 0,
      })

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })

        gsap.to(arrow, {
          width: 20,
          height: 20,
          opacity: 1,
          marginLeft: 8,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })

        gsap.to(arrow, {
          width: 0,
          height: 0,
          opacity: 0,
          marginLeft: 0,
          duration: 0.2,
          ease: "power2.in",
        })
      }

      button.addEventListener("mouseenter", handleMouseEnter)
      button.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter)
        button.removeEventListener("mouseleave", handleMouseLeave)
        ctx.revert()
      }
    }

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-indigo-600 z-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/noise.png')" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={containerRef} className="max-w-3xl mx-auto text-center">
          <div ref={coffeeIconRef} className="inline-block mb-6 bg-white p-4 rounded-full shadow-lg">
            <Coffee className="w-8 h-8 text-pink-500" />
          </div>

          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Apóyanos con un Cafecito
          </h2>

          <p ref={paragraphRef} className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Si disfrutas de nuestro contenido y quieres apoyarnos de una manera más personal, puedes invitarnos a un
            cafecito. Cada aporte nos ayuda a seguir mejorando y creando contenido de calidad.
          </p>

          <div ref={buttonRef}>
            <Button
              className="bg-white text-slate-900 hover:bg-gray-100 px-6 py-6 text-lg font-medium shadow-lg group cursor-pointer"
              aria-label="Invitarnos un cafecito"
            >
              <Coffee className="w-5 h-5 mr-3 text-pink-500" />
              <span>Invitarnos un cafecito</span>
              <ArrowRight ref={arrowRef} className="transition-all duration-200" />
            </Button>
          </div>

          {/* Decorative coffee beans */}
          <div ref={decorativeCoffee1Ref} className="absolute left-10 top-1/4">
            <Coffee className="w-12 h-12 text-white" />
          </div>

          <div ref={decorativeCoffee2Ref} className="absolute right-10 bottom-1/4">
            <Coffee className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CafecitoSupport
