import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"



export default function Stats() {
    const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const controls = useAnimation()
  

  useEffect(() => {
    if (isStatsInView) {
      controls.start("visible")
    }
  }, [controls, isStatsInView])

    return ( 
    <motion.section ref={statsRef} className="py-16 relative overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-600 z-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/noise.png')" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-xl backdrop-blur-md"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">5+</div>
              <div className="text-lg opacity-90">Episodios</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-xl backdrop-blur-md"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Oyentes</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-xl backdrop-blur-md sm:col-span-2 md:col-span-1"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">10+</div>
              <div className="text-lg opacity-90">Historias compartidas</div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    )
}   