import { Headphones, Video, FileText, BookOpen, ClipboardList } from 'lucide-react';

function AboutSection() {
  return (
    <section id="categorias" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-dark mb-4">
            Tu Camino Hacia el Éxito Personal
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 mb-12">
            En Audiomotivate creemos que la clave del éxito está en la inversión en uno mismo. 
            Nuestro contenido está diseñado para inspirarte, motivarte y ayudarte a desarrollar 
            las habilidades necesarias para alcanzar tus metas.
          </p>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-12">
            <div className="flex flex-col gap-4 sm:gap-6">
              <a href="#audiolibros" className="card-hover bg-gray-50 p-3 sm:p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer h-full">
                <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Headphones className="text-primary" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-montserrat font-bold mb-1 sm:mb-3">Audiolibros</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Desarrollo personal mientras te desplazas o descansas.
                </p>
              </a>
              
              <a href="#videos" className="card-hover bg-gray-50 p-3 sm:p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer h-full">
                <div className="bg-accent/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Video className="text-accent" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-montserrat font-bold mb-1 sm:mb-3">Videos de Superación</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Contenido inspirador para enfocarte en tus objetivos.
                </p>
              </a>
            </div>
            
            <div className="flex flex-col gap-4 sm:gap-6">
              <a href="#scripts" className="card-hover bg-gray-50 p-3 sm:p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer h-full">
                <div className="bg-secondary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <BookOpen className="text-secondary" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-montserrat font-bold mb-1 sm:mb-3">Ebooks y Scripts</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Textos completos para estudiar a tu propio ritmo.
                </p>
              </a>
              
              <a href="#guias" className="card-hover bg-gray-50 p-3 sm:p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer h-full">
                <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <FileText className="text-primary" size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-montserrat font-bold mb-1 sm:mb-3">Guías en PDF</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Ejercicios prácticos para aplicar lo aprendido.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
