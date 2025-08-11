'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Image from 'next/image';

import bdMockado from '@/bd/bdMockado.json';
import { useEffect, useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

type ProductCardProps = {
  title?: string;
  isMostWanted: boolean;
  category?: string;
};

type BagItem = {
  sku: string;
  quantity: number;
};

export default function ProductCard({ title, isMostWanted, category }: ProductCardProps) {
  const [mobile, setMobile] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [productsBag, setProductsBag] = useState<BagItem[]>([]);

  useEffect(() => {
    const isMobile = (): boolean => {
      return window.innerWidth <= 900;
    };
    const updateMobile = () => setMobile(isMobile());

    updateMobile();
    window.addEventListener('resize', updateMobile);

    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem('favorites');
    if (storage) {
      setFavorites(JSON.parse(storage));
    }
  }, []);

  const toggleFavorite = (sku: string) => {
    let updatedFavorites: string[] = [];

    if (favorites.includes(sku)) {
      updatedFavorites = favorites.filter((item) => item !== sku);
      toast.success('Produto removido dos favoritos com sucesso!');
    } else {
      updatedFavorites = [...favorites, sku];
      toast.success('Produto adicionado aos favoritos com sucesso!');
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setTimeout(() => {
      document.getElementById('favoriteSidebar')?.click();
    }, 300);
  };

  useEffect(() => {
    const storage = localStorage.getItem('productsBag');
    if (storage) {
      setProductsBag(JSON.parse(storage));
    }
  }, []);

  const addProductsBag = (sku: string) => {
    const currentBag = JSON.parse(localStorage.getItem('productsBag') || '[]');

    const index = currentBag.findIndex((item: BagItem) => item.sku === sku);
    const updatedBag = [...currentBag];

    if (index >= 0) updatedBag[index].quantity++;
    else updatedBag.push({ sku, quantity: 1 });

    localStorage.setItem('productsBag', JSON.stringify(updatedBag));
    setProductsBag(updatedBag);

    setTimeout(() => {
      document.getElementById('bagSidebar')?.click();
    }, 300);
  };

  const verifyHeart = (sku: string) => {
    return favorites.includes(sku);
  };

  if (isMostWanted) {
    return (
      <div className="my-6">
        <h1 className="ml-12 text-2xl font-semibold">{title}:</h1>
        <Carousel className={`w-[80%] mx-auto ${mobile ? 'h-96' : ''}`}>
          <CarouselContent className="flex w-4/5 mx-auto mt-8 -ml-4 py-2">
            {bdMockado.map((product, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [imgSrc, setImgSrc] = useState(product.src);
              if (product.mais_procurados) {
                return (
                  <CarouselItem
                    className={`relative group overflow-hidden ${
                      mobile ? 'h-88 basis-1/1' : 'basis-1/3'
                    }`}
                    key={index}
                  >
                    <div className="flex flex-col items-end absolute right-2 top-1">
                      <button
                        className="hover:cursor-pointer"
                        onClick={() => {
                          toggleFavorite(product.sku);
                        }}
                      >
                        {verifyHeart(product.sku) ? (
                          <Heart className="opacity-65 mb-2" stroke="red" fill="red" />
                        ) : (
                          <Heart className="opacity-65 mb-2" stroke="red" />
                        )}
                      </button>
                      <button
                        className="hover:cursor-pointer"
                        onClick={() => {
                          addProductsBag(product.sku);
                        }}
                      >
                        <ShoppingBag className="opacity-65 hover:cursor-pointer" />
                      </button>
                    </div>
                    <Image
                      src={imgSrc}
                      onError={() => setImgSrc('/products/none.webp')}
                      alt={product.nome}
                      width={250}
                      height={250}
                      className="object-cover w-full h-full rounded-lg shadow-lg"
                    />
                    <div className="h-24 flex flex-col justify-around rounded-b-lg absolute bottom-0 left-4 right-0 bg-black bg-opacity-70 text-white p-2 opacity-0 group-hover:opacity-65 transition-opacity duration-300">
                      <p className="text-xl font-bold">{product.nome}</p>
                      <p className="text-lg">R$ {product.preço}</p>
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
  } else {
    return (
      <ul className={`grid gap-8 ${mobile ? 'grid-cols-1 mt-4' : 'grid-cols-4 mt-6'}`}>
        {bdMockado
          .filter((product) => product.categoria === category)
          .map((product, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [imgSrc, setImgSrc] = useState(product.src);
            return (
              <li key={index} className=" p-4 shadow-md border rounded-xl relative h-84 group">
                <Image
                  src={imgSrc}
                  onError={() => setImgSrc('/products/none.webp')}
                  fill
                  alt=""
                  className="size-56 object-fill rounded-xl"
                />
                <div className="h-24 flex flex-col justify-around rounded-b-lg absolute bottom-0 left-0 right-0 bg-black opacity-40 text-white p-2">
                  <p className="text-xl font-bold">{product.nome}</p>
                  <p className="text-lg">R$ {product.preço.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    className="hover:cursor-pointer"
                    onClick={() => {
                      toggleFavorite(product.sku);
                    }}
                  >
                    {verifyHeart(product.sku) ? (
                      <Heart className="opacity-65 mb-2" stroke="red" fill="red" />
                    ) : (
                      <Heart className="opacity-65 mb-2" stroke="red" />
                    )}
                  </button>
                  <button
                    className="hover:cursor-pointer"
                    onClick={() => {
                      addProductsBag(product.sku);
                    }}
                  >
                    <ShoppingBag className="opacity-65 hover:cursor-pointer" />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    );
  }
}
