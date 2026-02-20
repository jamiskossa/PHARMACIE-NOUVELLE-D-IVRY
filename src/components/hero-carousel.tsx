'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface HeroCarouselProps {
  heroImages: string[];
}

export function HeroCarousel({ heroImages }: HeroCarouselProps) {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 3500, stopOnInteraction: false }),
    []
  );

  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin]}
    >
      <CarouselContent className="-ml-0">
        {heroImages.map((src, index) => (
          <CarouselItem key={index} className="pl-0">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={src}
                alt={`Promotion ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
