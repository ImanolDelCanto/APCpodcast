"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Users, Target, Sparkles } from 'lucide-react';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
        >
          Sobre Nosotros
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Creador del Podcast"
                className="w-full aspect-square object-cover transform hover:scale-105 transition-transform duration-700"
                height={1000}
                width={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              
              <motion.div
                className="absolute -bottom-6 -right-6 bg-purple-600 p-4 rounded-full shadow-lg"
                animate={{
                  y: [-5, 5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <Mic className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-4xl font-bold mb-6 text-purple-300">Nuestro Creador</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              [Nombre del Creador] es un apasionado narrador y entrevistador con más de 10 años de experiencia en
              medios. Su curiosidad insaciable y su habilidad para conectar con las personas lo llevaron a crear{" "}
              <span className="font-semibold text-purple-300">Algo Para Contar</span> en 2020.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Creo firmemente en el poder de las historias para inspirar, educar y unir a las personas. 
              Cada episodio es una oportunidad para descubrir algo nuevo y sorprendente sobre el mundo y nosotros mismos.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-purple-300">La Historia de Algo Para Contar</h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                Algo Para Contar nació de la idea de que todos tenemos una historia única que merece ser escuchada. Lo que
                comenzó como un proyecto personal en un pequeño estudio casero, rápidamente se convirtió en una plataforma
                para voces diversas y experiencias fascinantes.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Desde nuestro primer episodio en 2020, hemos tenido el privilegio de compartir cientos de historias
                inspiradoras, desafiantes y transformadoras. Nuestro podcast ha crecido gracias a una comunidad dedicada de
                oyentes que valoran la autenticidad y la conexión humana.
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
          <motion.div 
            variants={fadeInUp}
            className="text-4xl font-bold mb-8 text-center text-purple-300"
          >
            Nuestra Misión
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 text-center mb-12"
          >
            En Algo Para Contar, nos dedicamos a:
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                text: "Amplificar voces diversas y poco escuchadas"
              },
              {
                icon: <Target className="w-8 h-8" />,
                text: "Explorar temas que desafían nuestras perspectivas"
              },
              {
                icon: <Mic className="w-8 h-8" />,
                text: "Crear un espacio de diálogo abierto y respetuoso"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                text: "Inspirar a nuestra audiencia a compartir sus propias historias"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300"
              >
                <div className="bg-purple-600/30 p-4 rounded-full w-fit mx-auto mb-6">
                  {item.icon}
                </div>
                <p className="text-lg text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 text-center mt-12 max-w-3xl mx-auto"
          >
            Creemos que cada conversación tiene el potencial de cambiar vidas, y estamos comprometidos a seguir buscando 
            y compartiendo historias que importen.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}