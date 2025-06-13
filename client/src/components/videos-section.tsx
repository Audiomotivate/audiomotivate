import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { SimpleAudioPlayer } from './ui/simple-audio-player';
import { formatCurrency } from '../lib/utils';
import { AddToCartButton } from './add-to-cart-button';

function VideosSection() {
  const { data: videos, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/type/video'],
  });

  return (
    <section id="videos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-dark mb-4">Videos de Superación Personal</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Contenido inspirador para superar obstáculos, mantener tu motivación al máximo nivel y enfocarte en tus metas.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <Skeleton className="w-full h-32 sm:h-48" />
                <div className="p-3 sm:p-6">
                  <Skeleton className="h-5 sm:h-8 w-20 sm:w-28 mb-2 sm:mb-3" />
                  <Skeleton className="h-4 sm:h-6 w-full mb-1 sm:mb-2" />
                  <Skeleton className="h-3 sm:h-4 w-full mb-2 sm:mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 sm:h-6 w-12 sm:w-20" />
                    <Skeleton className="h-3 sm:h-4 w-16 sm:w-24" />
                  </div>
                  <Skeleton className="h-8 sm:h-10 w-full mt-2 sm:mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {videos?.map((video) => (
              <div key={video.id} className="card-hover bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={video.imageUrl} 
                  alt={video.title} 
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="p-3 sm:p-6">
                  <Badge variant="outline" className="bg-accent/10 text-accent mb-2 sm:mb-3 text-xs sm:text-sm">
                    {video.category}
                  </Badge>
                  <h3 className="text-sm sm:text-xl font-montserrat font-bold mb-1 sm:mb-2 line-clamp-1">{video.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <span className="text-accent font-bold text-sm sm:text-xl">
                      {formatCurrency(video.price)}
                    </span>
                    {video.duration && (
                      <span className="text-gray-500 text-xs sm:text-sm flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        Duración: {video.duration}
                      </span>
                    )}
                  </div>
                  
                  {video.previewUrl && (
                    <div className="mt-2 sm:mt-3 mb-1 sm:mb-2">
                      <SimpleAudioPlayer
                        src={video.previewUrl}
                        className="w-full"
                      />
                    </div>
                  )}
                  <AddToCartButton 
                    product={video}
                    variant="accent"
                    className="mt-2 sm:mt-4 text-xs sm:text-sm py-1 sm:py-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Link href="/videos">
            <Button 
              variant="link" 
              className="text-accent font-bold text-lg hover:underline flex items-center justify-center mx-auto whitespace-normal max-w-none"
            >
              Ver todos los videos de superación personal
              <ChevronRight className="ml-1 h-4 w-4 flex-shrink-0" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default VideosSection;
