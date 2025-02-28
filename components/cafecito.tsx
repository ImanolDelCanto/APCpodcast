"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const CafecitoSupport = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-[#FF7B7B]">
        <motion.div
          className="absolute inset-0 bg-noise opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-6 bg-white p-4 rounded-full shadow-lg"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Coffee className="w-8 h-8 text-[#FF7B7B]" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Apóyanos con un Cafecito
          </motion.h2>

          <motion.p
            className="text-white text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Si disfrutas de nuestro contenido y quieres apoyarnos de una manera más personal, puedes invitarnos a un
            cafecito. Cada aporte nos ayuda a seguir mejorando y creando contenido de calidad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-white text-black hover:bg-gray-100 px-6 py-6 text-lg font-medium shadow-lg group"
                aria-label="Invitarnos un cafecito"
              >
                <Coffee className="w-5 h-5 mr-3 text-[#FF7B7B]" />
                <span>Invitarnos un cafecito</span>
                <ArrowRight className="w-0 h-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Decorative coffee beans */}
          <div className="absolute left-10 top-1/4 opacity-20">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            >
              <Coffee className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          <div className="absolute right-10 bottom-1/4 opacity-20">
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            >
              <Coffee className="w-16 h-16 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(CafecitoSupport)

