import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { formatCurrency } from '@/lib/utils';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

function GuidesSection() {
  const { data: guides, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/type/guide'],
  });

  return (
    <section id="guias" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="text-primary h-8 w-8 mr-3" />
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-dark">
              Guías en PDF
            </h2>
          </div>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Manuales completos y guías detalladas para profundizar en tu desarrollo personal y profesional.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <Skeleton className="w-full h-40 md:h-48" />
                <div className="p-3 md:p-6">
                  <Skeleton className="h-6 md:h-8 w-28 mb-2 md:mb-3" />
                  <Skeleton className="h-5 md:h-6 w-full mb-2" />
                  <Skeleton className="h-3 md:h-4 w-full mb-3 md:mb-4" />
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <Skeleton className="h-5 md:h-6 w-16 md:w-20" />
                  </div>
                  <Skeleton className="h-8 md:h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mb-12">
            {guides?.slice(0, 4).map((guide) => (
              <div key={guide.id} className="card-hover bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={guide.imageUrl} 
                  alt={guide.title} 
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="p-3 md:p-6">
                  <Badge variant="outline" className="bg-primary/10 text-primary mb-2 md:mb-3 text-xs md:text-sm">
                    {guide.category}
                  </Badge>
                  <h3 className="text-base md:text-xl font-montserrat font-bold mb-1 md:mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-2 md:mb-4 line-clamp-2 text-xs md:text-base">{guide.description}</p>
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <span className="text-primary font-bold text-base md:text-xl">
                      {formatCurrency(guide.price)}
                    </span>
                  </div>
                  <AddToCartButton 
                    product={guide}
                    className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm py-1 md:py-2 h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/guias">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
            >
              Ver todas las guías
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GuidesSection;