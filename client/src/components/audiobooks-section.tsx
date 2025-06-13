import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimpleAudioPlayer } from '@/components/ui/simple-audio-player';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { AddToCartButton } from '@/components/add-to-cart-button';

function AudiobooksSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/type/audiobook'],
  });

  return (
    <section id="audiolibros" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-dark mb-4">Audiolibros</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Descubre nuestra colección de audiolibros seleccionados para inspirar, 
            motivar y transformar tu mentalidad.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Skeleton className="w-full h-32 sm:h-48" />
                <div className="p-3 sm:p-6">
                  <Skeleton className="h-5 sm:h-8 w-20 sm:w-28 mb-2 sm:mb-3" />
                  <Skeleton className="h-4 sm:h-6 w-full mb-1 sm:mb-2" />
                  <Skeleton className="h-3 sm:h-4 w-full mb-2 sm:mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 sm:h-6 w-12 sm:w-20" />
                    <Skeleton className="h-5 sm:h-8 w-24 sm:w-36" />
                  </div>
                  <Skeleton className="h-8 sm:h-10 w-full mt-2 sm:mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {products?.map((book) => (
              <div key={book.id} className="card-hover bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={book.imageUrl} 
                  alt={book.title} 
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="p-3 sm:p-6">
                  <Badge variant="outline" className="bg-primary/10 text-primary mb-2 sm:mb-3 text-xs sm:text-sm">
                    {book.category}
                  </Badge>
                  <h3 className="text-sm sm:text-xl font-montserrat font-bold mb-1 sm:mb-2 line-clamp-1">{book.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">{book.description}</p>
                  {book.duration && (
                    <div className="flex items-center mb-1 sm:mb-2">
                      <span className="text-gray-500 text-xs sm:text-sm flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        Duración: {book.duration}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-primary font-bold text-sm sm:text-xl">
                      {formatCurrency(book.price)}
                    </span>
                    {book.previewUrl && (
                      <SimpleAudioPlayer
                        src={book.previewUrl}
                        className="w-full sm:w-auto"
                      />
                    )}
                  </div>
                  <AddToCartButton 
                    product={book}
                    className="mt-2 sm:mt-4 text-xs sm:text-sm py-1 sm:py-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Link href="/audiolibros">
            <Button 
              variant="link" 
              className="text-primary font-bold text-lg hover:underline flex items-center justify-center mx-auto whitespace-normal max-w-none"
            >
              Ver todos los audiolibros
              <ChevronRight className="ml-1 h-4 w-4 flex-shrink-0" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AudiobooksSection;
