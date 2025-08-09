import { useEffect, useState } from 'react';
import Image from 'next/image';
import bdMockado from '@/bd/bdMockado.json';
import ConverterMoeda from '@/hooks/ConverterMoeda';
import { HeartCrack, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  nome: string;
  preço: number;
  sku: string;
  src: string;
  categoria: string;
  mais_procurados: boolean;
}

export default function FavoriteCard({ sku }: { sku: string }) {
  const [product, setProduct] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('favorites');
    if (storage) {
      setFavorites(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    const filtered = bdMockado.filter((p) => p.sku === sku);
    setProduct(filtered);
  }, [sku]);

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

  if (product.length === 0) return <p>Sem Produtos</p>;
  return (
    <div className="bg-slate-50 py-2 flex text-slate-600 font-semibold">
      <Image
        src={product[0].src}
        alt={product[0].nome}
        width={96}
        height={96}
        className="rounded-l-full mr-4"
      />

      <div className="flex flex-col justify-between">
        <p>{product[0].nome}</p>
        <div className="flex justify-between">
          <p>{ConverterMoeda(product[0].preço)}</p>
          <div className="flex">
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                toggleFavorite(product[0].sku);
              }}
            >
              <HeartCrack className="mr-3" />
            </button>
            <ShoppingBag />
          </div>
        </div>
      </div>
    </div>
  );
}
