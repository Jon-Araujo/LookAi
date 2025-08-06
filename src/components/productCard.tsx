import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Image from 'next/image';

import bdMockado from '@/bd/bdMockado.json';

type ProductCardProps = {
  title: string;
};

export default function ProductCard({ title }: ProductCardProps) {
  return (
    <div className="my-6">
      <h1 className="ml-12 text-2xl font-semibold">{title}:</h1>
      <Carousel className="w-[80%] mx-auto">
        <CarouselContent className="flex w-4/5 mx-auto mt-8 -ml-4">
          {bdMockado.map((product, index) => {
            if (title === 'Produtos mais procurados') {
              if (product.mais_procurados) {
                return (
                  <CarouselItem
                    className="relative group overflow-hidden rounded shadow-lg basis-1/3"
                    key={index}
                  >
                    <Image
                      src={product.src}
                      alt={product.nome}
                      width={250}
                      height={250}
                      className="object-cover w-full h-full"
                    />

                    <div className="h-24 flex flex-col justify-around absolute bottom-0 left-4 right-0 bg-black bg-opacity-70 text-white p-2 opacity-0 group-hover:opacity-65 transition-opacity duration-300">
                      <p className="text-xl font-bold">{product.nome}</p>
                      <p className="text-lg">R$ {product.preço}</p>
                    </div>
                  </CarouselItem>
                );
              }
            } else {
                return (
                  <CarouselItem
                    className="relative group overflow-hidden rounded shadow-lg"
                    key={index}
                  >
                    <Image
                      src={product.src}
                      alt={product.nome}
                      width={250}
                      height={250}
                      className="object-cover w-full h-full"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-semibold">{product.nome}</p>
                      <p className="text-sm">R$ {product.preço}</p>
                    </div>
                  </CarouselItem>
                );
            }
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
