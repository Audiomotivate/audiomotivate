export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Audio Motívate</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-600">Inicio</a>
            <a href="/audiolibros" className="text-gray-600 hover:text-blue-600">Audiolibros</a>
            <a href="/videos" className="text-gray-600 hover:text-blue-600">Videos</a>
            <a href="/checkout" className="text-gray-600 hover:text-blue-600">Checkout</a>
          </nav>
        </div>
      </div>
    </header>
  );
}