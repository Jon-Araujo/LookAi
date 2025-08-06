'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import ProductCard from '@/components/productCard';
import Link from 'next/link';

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

      {/* Categorias: */}
      <p className="ml-12 text-2xl font-semibold">Categorias:</p>
      <ul className="grid grid-cols-2 gap-12 mt-8 w-1/2 mx-auto">
        <li className="relative aspect-square max-w-[360px] size-124 overflow-hidden rounded-xl group">
          <Link href="/produtos/homens">
            <Image
              src="/categories/homens.png"
              fill
              alt=""
              className="object-cover object-top transition-transform duration-300 group-hover:scale-125"
            />
            <div className="absolute bg-black bg-opacity-70 text-white h-full w-full opacity-0 group-hover:opacity-30 flex items-center justify-center transition-opacity duration-300">
              <p className="text-2xl font-bold">Homens</p>
            </div>
          </Link>
        </li>
        <li className="relative aspect-square max-w-[360px] size-124 overflow-hidden rounded-xl group">
          <Link href="/produtos/calcados">
            <Image
              src="/categories/calcados.png"
              fill
              alt=""
              className="object-cover object-top transition-transform duration-300 group-hover:scale-125"
            />
            <div className="absolute bg-black bg-opacity-70 text-white h-full w-full opacity-0 group-hover:opacity-30 flex items-center justify-center transition-opacity duration-300">
              <p className="text-2xl font-bold">Calçados</p>
            </div>
          </Link>
        </li>
        <li className="relative aspect-square max-w-[360px] size-124 overflow-hidden rounded-xl group">
          <Link href="/produtos/esporte">
            <Image
              src="/categories/esporte.png"
              fill
              alt=""
              className="object-cover object-top transition-transform duration-300 group-hover:scale-125"
            />
            <div className="absolute bg-black bg-opacity-70 text-white h-full w-full opacity-0 group-hover:opacity-30 flex items-center justify-center transition-opacity duration-300">
              <p className="text-2xl font-bold">Esporte</p>
            </div>
          </Link>
        </li>
        <li className="relative aspect-square max-w-[360px] size-124 overflow-hidden rounded-xl group">
          <Link href="/produtos/mulheres">
            <Image
              src="/categories/mulheres.png"
              fill
              alt=""
              className="object-cover object-top transition-transform duration-300 group-hover:scale-125"
            />
            <div className="absolute bg-black bg-opacity-70 text-white h-full w-full opacity-0 group-hover:opacity-30 flex items-center justify-center transition-opacity duration-300">
              <p className="text-2xl font-bold">Mulheres</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
