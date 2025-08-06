'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import ProductCard from '@/components/productCard';

export default function Home() {
  return (
    <div className="mt-28">
      {/* Carrosel de banners: */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="relative h-96 w-full">
            <Image src="/banners/nike1.jpg" alt="Nike Banner" fill className="object-cover" />
          </CarouselItem>
          <CarouselItem className="relative h-96 w-full">
            <Image src="/banners/adidas1.webp" alt="Nike Banner" fill className="object-cover" />
          </CarouselItem>
          <CarouselItem className="relative h-96 w-full">
            <Image src="/banners/puma1.webp" alt="Nike Banner" fill className="object-cover" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      {/* Produtos mais procurados: */}
      <ProductCard title="Produtos mais procurados" />
    </div>
  );
}
