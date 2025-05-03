"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import listen from "@/animations/listen.json" 
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Array de tips que rotarán según la fecha
const tips = [
  {
    id: 1,
    title: "Mejora tu vocabulario con podcasts",
    shortDescription: "¿Sabías que escuchar podcasts puede mejorar tu vocabulario y habilidades de comunicación?",
    longDescription:
      "Al escuchar podcasts, estás expuesto a una variedad de temas, estilos de habla y vocabulario. Esto te ayuda a:",
    points: [
      { text: "Ampliar tu vocabulario con términos específicos de diferentes campos", color: "bg-pink-500" },
      { text: "Mejorar tu comprensión auditiva y capacidad de atención", color: "bg-indigo-500" },
      { text: "Aprender nuevas formas de expresarte y estructurar argumentos", color: "bg-pink-500" },
      { text: "Mantenerte informado sobre diversos temas de actualidad", color: "bg-indigo-500" },
    ],
  },
  {
    id: 2,
    title: "Podcasts para la creatividad",
    shortDescription: "Los podcasts pueden ser una excelente fuente de inspiración para potenciar tu creatividad.",
    longDescription:
      "Escuchar historias y conversaciones estimulantes puede tener un impacto significativo en tu proceso creativo:",
    points: [
      { text: "Exposición a nuevas ideas y perspectivas diferentes", color: "bg-pink-500" },
      { text: "Estimulación de la imaginación a través de narrativas", color: "bg-indigo-500" },
      { text: "Conexión con experiencias humanas que pueden inspirar proyectos", color: "bg-pink-500" },
      { text: "Descubrimiento de técnicas y métodos creativos de otros profesionales", color: "bg-indigo-500" },
    ],
  },
  {
    id: 3,
    title: "Aprendizaje continuo con podcasts",
    shortDescription: "Los podcasts son una herramienta poderosa para el aprendizaje informal y continuo.",
    longDescription:
      "Incorporar podcasts a tu rutina diaria puede transformar momentos cotidianos en oportunidades de aprendizaje:",
    points: [
      { text: "Aprovecha tiempos muertos como desplazamientos o ejercicio", color: "bg-pink-500" },
      { text: "Accede a expertos y conocimientos especializados gratuitamente", color: "bg-indigo-500" },
      { text: "Mantente actualizado en tu campo profesional o intereses", color: "bg-pink-500" },
      { text: "Desarrolla una mentalidad de crecimiento y curiosidad constante", color: "bg-indigo-500" },
    ],
  },
]

export default function TipDelDia() {
  const [showTip, setShowTip] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  // Determinar qué tip mostrar según la fecha actual
  useEffect(() => {
    const today = new Date()
    const dayOfMonth = today.getDate()
    const tipIndex = dayOfMonth % tips.length
    setCurrentTipIndex(tipIndex)
  }, [])

  // Medir la altura del contenido cuando cambia
  useEffect(() => {
    if (contentRef.current && showTip) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [showTip, currentTipIndex])

  const currentTip = tips[currentTipIndex]

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <motion.div
          className="bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
        >
          <Lottie animationData={listen} loop={true} className="w-20 h-20"/>
          </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3 text-slate-900">{currentTip.title}</h3>
          <p className="text-lg mb-4 text-slate-700">{currentTip.shortDescription}</p>

          <Button
            onClick={() => setShowTip(!showTip)}
            className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 border-0 transition-all duration-300"
          >
            {showTip ? "Ocultar explicación" : "Aprender más"}
          </Button>

          {/* Contenedor para la animación de altura */}
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false}>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: contentHeight,
                    transition: {
                      height: {
                        duration: 0.35,
                        ease: [0.4, 0.0, 0.2, 1], // Material Design easing
                      },
                      opacity: { duration: 0.2, delay: 0.1 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        duration: 0.35,
                        ease: [0.4, 0.0, 0.2, 1], // Material Design easing
                      },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div ref={contentRef} className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-slate-800 mb-4">{currentTip.longDescription}</p>

                    <ul className="space-y-3 text-slate-700">
                      {currentTip.points.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: 0.2 + index * 0.05,
                              duration: 0.3,
                            },
                          }}
                          className="flex items-start gap-2"
                        >
                          <div className={`w-2 h-2 rounded-full ${point.color} mt-2 flex-shrink-0`}></div>
                          <span>{point.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
