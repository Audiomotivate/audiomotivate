import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { formatCurrency } from '../lib/utils';
import { ChevronRight } from 'lucide-react';
import { AddToCartButton } from './add-to-cart-button';
import { Link } from 'wouter';

function PDFSection() {
  const { data: pdfs, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/type/pdf'],
  });

  return (
    <section id="scripts" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-dark mb-4">Ebook y Scripts de Videos</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Adquiere nuestros ebooks y los scripts completos de los videos en formato PDF o Word para profundizar en el contenido y estudiarlo a tu propio ritmo.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col">
                <Skeleton className="w-full h-32 sm:h-48" />
                <div className="p-3 sm:p-6 flex-1">
                  <Skeleton className="h-5 sm:h-8 w-20 sm:w-28 mb-2 sm:mb-3" />
                  <Skeleton className="h-4 sm:h-6 w-full mb-1 sm:mb-2" />
                  <Skeleton className="h-3 sm:h-4 w-full mb-2 sm:mb-4" />
                  <div className="flex items-center justify-between mt-auto">
                    <Skeleton className="h-4 sm:h-6 w-12 sm:w-20" />
                    <Skeleton className="h-5 sm:h-10 w-24 sm:w-36" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {pdfs?.map((pdf) => (
              <div key={pdf.id} className="card-hover bg-white rounded-lg overflow-hidden shadow-md flex flex-col">
                <img 
                  src={pdf.imageUrl} 
                  alt={pdf.title} 
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="p-3 sm:p-6 flex-1">
                  <Badge variant="outline" className="bg-secondary/10 text-secondary mb-2 sm:mb-3 text-xs sm:text-sm">
                    {pdf.category}
                  </Badge>
                  <h3 className="text-sm sm:text-xl font-montserrat font-bold mb-1 sm:mb-2 line-clamp-1">{pdf.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">{pdf.description}</p>
                  <div className="flex flex-col mt-auto gap-2 sm:gap-3">
                    <span className="text-secondary font-bold text-sm sm:text-xl">
                      {formatCurrency(pdf.price)}
                    </span>
                    <AddToCartButton
                      product={pdf}
                      variant="accent"
                      className="bg-secondary hover:bg-secondary/90 border-none shadow-sm w-full text-xs sm:text-sm py-1 sm:py-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Link href="/scripts">
            <Button 
              variant="link" 
              className="text-secondary font-bold text-lg hover:underline flex items-center justify-center mx-auto whitespace-normal max-w-none"
            >
              Ver todos los ebooks y scripts
              <ChevronRight className="ml-1 h-4 w-4 flex-shrink-0" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PDFSection;
