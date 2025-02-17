import Image from "next/image"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Sobre Nosotros</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Creador del Podcast"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestro Creador</h2>
            <p className="text-lg text-muted-foreground mb-6">
              [Nombre del Creador] es un apasionado narrador y entrevistador con más de 10 años de experiencia en
              medios. Su curiosidad insaciable y su habilidad para conectar con las personas lo llevaron a crear{" "}
              <span className="font-semibold">Algo Para Contar</span> en 2020.
            </p>
            <p className="text-lg text-muted-foreground">
              {`Creo firmemente en el poder de las historias para inspirar, educar y unir a las personas. 
              Cada episodio es una oportunidad para descubrir algo nuevo y sorprendente sobre el mundo y nosotros mismos.`}
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">La Historia de Algo Para Contar</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Algo Para Contar nació de la idea de que todos tenemos una historia única que merece ser escuchada. Lo que
            comenzó como un proyecto personal en un pequeño estudio casero, rápidamente se convirtió en una plataforma
            para voces diversas y experiencias fascinantes.
          </p>
          <p className="text-lg text-muted-foreground">
            Desde nuestro primer episodio en 2020, hemos tenido el privilegio de compartir cientos de historias
            inspiradoras, desafiantes y transformadoras. Nuestro podcast ha crecido gracias a una comunidad dedicada de
            oyentes que valoran la autenticidad y la conexión humana.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
          <p className="text-lg text-muted-foreground mb-6">En Algo Para Contar, nos dedicamos a:</p>
          <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2 mb-6">
            <li>Amplificar voces diversas y poco escuchadas</li>
            <li>Explorar temas que desafían nuestras perspectivas</li>
            <li>Crear un espacio de diálogo abierto y respetuoso</li>
            <li>Inspirar a nuestra audiencia a compartir sus propias historias</li>
          </ul>
          <p className="text-lg text-muted-foreground">
            {`Creemos que cada conversación tiene el potencial de cambiar vidas, y estamos comprometidos a seguir buscando 
            y compartiendo historias que importen.`}
          </p>
        </div>
      </div>
    </div>
  )
}
