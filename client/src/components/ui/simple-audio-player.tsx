import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import { Button } from './button';

interface SimpleAudioPlayerProps {
  src: string;
  className?: string;
}

export function SimpleAudioPlayer({ src, className }: SimpleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error("Error al cargar audio:", e);
        setIsPlaying(false);
      });
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Error al reproducir audio:", err);
        setIsPlaying(false);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button 
        onClick={togglePlayPause}
        size="sm" 
        variant="outline"
        className="flex items-center gap-1 text-xs sm:text-sm hover:bg-primary/10 px-2 sm:px-3 py-1 h-auto min-h-[1.75rem]"
      >
        {isPlaying ? (
          <>
            <Pause className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> 
            <span className="whitespace-nowrap">Pausar</span>
          </>
        ) : (
          <>
            <Play className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> 
            <span className="whitespace-nowrap">Reproducir</span>
          </>
        )}
      </Button>
    </div>
  );
}