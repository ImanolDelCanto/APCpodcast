"use client"

import QuienesSomos from "@/components/about-us"
import CafecitoSupport from "@/components/cafecito"
import { motion } from "framer-motion"
import CommetSection from "@/components/commet-section"
import people from "@/animations/people.json"
import TipDelDia from "@/components/tip"
import dynamic from "next/dynamic";
import FloatingSocialIcons from "@/components/floating-social.icons"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import LatestEpisodes from "@/components/lastest-episodes"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section>
        <Hero />
      </section>

      <FloatingSocialIcons />
      
      {/* Interactive Tip Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <TipDelDia />
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="py-20 bg-white">
        <LatestEpisodes />
      </section>

      {/* Stats Section */}
      <Stats />
   
      {/* Quienes Somos Section */}
      <QuienesSomos />

      {/* Cafecito Support Section */}
      <CafecitoSupport />

      {/* Comments Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-SuperDream bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600">
              TU VOZ IMPORTA
            </h2>
            <Lottie animationData={people} loop={true} className="w-80 h-80 mx-auto" />
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Compartí tus ideas, sugerencias, preguntas para futuros episodios o simplemente saludá!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <CommetSection />
        </div>
      </section>
    </div>
  )
}
