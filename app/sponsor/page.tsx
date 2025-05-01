"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { Briefcase, CheckCircle } from "lucide-react"
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
    <div className="min-h-screen bg-white overflow-x-hidden relative pt-20">
      {/* Fondo decorativo moderno */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[70vh] bg-gradient-to-b from-indigo-50 to-white z-0" />
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-indigo-100 z-0"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-pink-50 z-0"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-SuperDream mb-12 md:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500"
        >
          Convertite en nuestro Sponsor
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24"
        >
          {/* Imagen o contenido sobre la oportunidad de patrocinio */}
          <motion.div variants={fadeInUp} className="relative order-2 md:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Patrocinio"
                className="w-full aspect-square object-cover transform hover:scale-105 transition-transform duration-700"
                height={600}
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              <motion.div
                className="absolute bottom-6 left-6 right-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Oportunidad de crecimiento</span>
                </div>
                <p className="text-sm opacity-90">Alcanza a una audiencia comprometida</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Información sobre los beneficios del patrocinio */}
          <motion.div variants={fadeInUp} className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600">¿Por qué patrocinar?</h2>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Al convertirte en sponsor de Algo Para Contar, tendrás la oportunidad de llegar a una audiencia
              comprometida y en crecimiento. Nuestros oyentes son personas curiosas, interesadas en historias
              inspiradoras y nuevas ideas.
            </p>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Ofrecemos diferentes opciones de patrocinio para adaptarnos a tus necesidades y objetivos de marketing.
              Desde menciones en episodios hasta contenido personalizado, trabajaremos contigo para crear una
              experiencia única para nuestra audiencia.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#contact-form">
                <Button className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 gap-2">
                  <Briefcase className="w-4 h-4" />
                  Contactar para patrocinar
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Planes de patrocinio */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <motion.div variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-600">
            Planes de Patrocinio
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Básico",
                features: ["Mención en 1 episodio", "Logo en nuestra web", "Agradecimiento en redes sociales"],
                color: "from-indigo-500 to-indigo-600",
              },
              {
                title: "Premium",
                features: [
                  "Mención en 3 episodios",
                  "Logo destacado en nuestra web",
                  "Publicaciones en redes sociales",
                  "Segmento de 30 segundos",
                ],
                color: "from-pink-500 to-indigo-600",
                featured: true,
              },
              {
                title: "Exclusivo",
                features: [
                  "Mención en 5 episodios",
                  "Logo destacado en nuestra web",
                  "Campaña en redes sociales",
                  "Segmento de 60 segundos",
                  "Episodio temático personalizado",
                ],
                color: "from-pink-500 to-pink-600",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`rounded-3xl overflow-hidden ${plan.featured ? "transform md:-translate-y-4" : ""}`}
              >
                <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                <div
                  className={`p-8 border border-t-0 border-slate-200 rounded-b-3xl ${
                    plan.featured ? "bg-white shadow-xl" : "bg-white"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-6 text-slate-800">{plan.title}</h3>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="#contact-form">
                    <Button
                      className={`w-full ${
                        plan.featured
                          ? "bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700"
                          : "bg-white border border-slate-300 text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      Seleccionar plan
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Formulario de contacto */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative"
          id="contact-form"
        >
          <motion.div variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-600">
            Contáctanos para Patrocinar
          </motion.div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                ></textarea>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600"
                  disabled={isSubmitting}
                >
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
