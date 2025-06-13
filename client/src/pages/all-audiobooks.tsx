import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export default function AllAudiobooks() {
  const { data: audiobooks, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/type/audiobook'],
  });

  if (isLoading) {
    return <div className="p-12 text-center">Cargando audiolibros...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Todos los Audiolibros</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiobooks?.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${product.price / 100}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}