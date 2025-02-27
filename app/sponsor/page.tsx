'use client'

import { useState, ChangeEvent, FormEvent } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { Briefcase } from "lucide-react"
import Image from "next/image"

// Definimos el tipo para el estado del formulario
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function SponsorPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Función para manejar el cambio de los valores del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validación básica de campos
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor, llena todos los campos.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (response.ok) {
        toast({
          title: "Mensaje enviado",
          description: "Gracias por tu interés en patrocinarnos. Nos pondremos en contacto pronto.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error(result.error || "Hubo un problema al enviar el mensaje.")
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Intenta nuevamente más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden relative pt-20">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl z-0" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
        >
          Conviértete en Sponsor
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24"
        >
          {/* Imagen o contenido sobre la oportunidad de patrocinio */}
          <motion.div variants={fadeInUp} className="relative order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Patrocinio"
                className="w-full aspect-square object-cover transform hover:scale-105 transition-transform duration-700"
                height={600}
                width={600}
              />
            </div>
          </motion.div>

          {/* Información sobre los beneficios del patrocinio */}
          <motion.div variants={fadeInUp} className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-300">¿Por qué patrocinar?</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Al convertirte en sponsor de Algo Para Contar, tendrás la oportunidad de llegar a una audiencia
              comprometida y en crecimiento. Nuestros oyentes son personas curiosas, interesadas en historias
              inspiradoras y nuevas ideas.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Ofrecemos diferentes opciones de patrocinio para adaptarnos a tus necesidades y objetivos de marketing.
              Desde menciones en episodios hasta contenido personalizado, trabajaremos contigo para crear una
              experiencia única para nuestra audiencia.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#contact-form">
                <Button className="bg-[#FF7B7B] hover:bg-[#ff6262] gap-2">
                  <Briefcase className="w-4 h-4" />
                  Contactar para patrocinar
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>


        {/* Formulario de contacto */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative"
          id="contact-form"
        >
          <motion.div variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-8 text-center text-purple-300">
            Contáctanos para Patrocinar
          </motion.div>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white"
                  required
                ></textarea>
              </div>
              <div>
                <Button type="submit" className="w-full bg-[#FF7B7B] hover:bg-[#ff6262]" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
