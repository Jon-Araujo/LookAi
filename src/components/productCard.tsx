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
      <h1 className="ml-12 text-xl font-semibold">{title}</h1>
      <Carousel className="w-[80%] mx-auto">
        <CarouselContent className="flex w-4/5 mx-auto mt-8 -ml-4">
          {bdMockado.map((item, index) => {
            if (title === 'Produtos mais procurados') {
              if (item.mais_procurados) {
                return (
                  <CarouselItem className="basis-1/3 cursor-pointer" key={index}>
                    <Link href={'/'}>
                      <Image
                        src={item.src}
                        alt=""
                        width={250}
                        height={250}
                        className="object-cover"
                      />
                    </Link>
                  </CarouselItem>
                );
              }
            } else {
                <CarouselItem className="basis-1/3 cursor-pointer" key={index}>
                  <Link href={'/'}>
                    <Image
                      src={item.src}
                      alt=""
                      width={250}
                      height={250}
                      className="object-cover"
                    />
                  </Link>
                </CarouselItem>;
            }
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
