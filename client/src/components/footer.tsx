export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Audio Motívate</h3>
            <p className="text-gray-400">
              Transforma tu vida con contenido motivacional de alta calidad.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/audiolibros" className="hover:text-white">Audiolibros</a></li>
              <li><a href="/videos" className="hover:text-white">Videos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/terminos" className="hover:text-white">Términos</a></li>
              <li><a href="/privacidad" className="hover:text-white">Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">info@audiomotivate.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Audio Motívate. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}