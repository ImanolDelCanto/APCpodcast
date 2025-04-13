"use client"
import { motion } from "framer-motion"
import { Mic, Users, Target, Heart, Award, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative pt-20">
      {/* Fondo decorativo moderno */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[70vh] bg-gradient-to-b from-pink-50 to-white z-0" />
        <div className="absolute top-0 left-0 w-1/2 h-[50vh] bg-[url('/grid.svg')] bg-center opacity-5 z-0" />
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-pink-100 z-0"
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
          className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-indigo-50 z-0"
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

      <div className="container mx-auto px-4 py-12 md:py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600"
        >
          Sobre Nosotros
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24"
        >
          <motion.div variants={fadeInUp} className="relative order-2 md:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Creador del Podcast"
                className="w-full aspect-square object-cover transform hover:scale-105 transition-transform duration-700"
                height={1000}
                width={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-pink-500 to-indigo-600 p-4 rounded-full shadow-lg"
                animate={{
                  y: [-5, 5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Mic className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-600">Nuestro Creador</h2>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              [Nombre del Creador] es un apasionado narrador y entrevistador con más de 10 años de experiencia en
              medios. Su curiosidad insaciable y su habilidad para conectar con las personas lo llevaron a crear{" "}
              <span className="font-semibold text-pink-600">Algo Para Contar</span> en 2020.
            </p>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Creo firmemente en el poder de las historias para inspirar, educar y unir a las personas. Cada episodio es
              una oportunidad para descubrir algo nuevo y sorprendente sobre el mundo y nosotros mismos.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="https://www.youtube.com/@Algoparacontarpodcastt/featured" target="_blank">
                <Button
                  variant="outline"
                  className="border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 gap-2"
                >
                  <Headphones className="w-4 h-4" />
                  Escuchar episodios
                </Button>
              </Link>
              <Link href="/ser-invitado">
                <Button className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 gap-2">
                  <Mic className="w-4 h-4" />
                  Ser invitado
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-pink-600">La Historia de Algo Para Contar</h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                Algo Para Contar nació de la idea de que todos tenemos una historia única que merece ser escuchada. Lo
                que comenzó como un proyecto personal en un pequeño estudio casero, rápidamente se convirtió en una
                plataforma para voces diversas y experiencias fascinantes.
              </p>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                Desde nuestro primer episodio en 2020, hemos tenido el privilegio de compartir cientos de historias
                inspiradoras, desafiantes y transformadoras. Nuestro podcast ha crecido gracias a una comunidad dedicada
                de oyentes que valoran la autenticidad y la conexión humana.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-8 text-center text-pink-600">
            Nuestra Misión
          </motion.div>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-700 text-center mb-12">
            En Algo Para Contar, nos dedicamos a:
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                text: "Amplificar voces diversas y poco escuchadas",
              },
              {
                icon: <Target className="w-8 h-8" />,
                text: "Explorar temas que desafían nuestras perspectivas",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                text: "Crear un espacio de diálogo abierto y respetuoso",
              },
              {
                icon: <Award className="w-8 h-8" />,
                text: "Inspirar a nuestra audiencia a compartir sus propias historias",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-slate-100"
                whileHover={{ y: -5 }}
              >
                <div className="bg-gradient-to-r from-pink-500 to-indigo-600 p-4 rounded-full w-fit mx-auto mb-6 text-white">
                  {item.icon}
                </div>
                <p className="text-base md:text-lg text-slate-700">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-700 text-center mt-12 max-w-3xl mx-auto px-4"
          >
            Creemos que cada conversación tiene el potencial de cambiar vidas, y estamos comprometidos a seguir buscando
            y compartiendo historias que importen.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
