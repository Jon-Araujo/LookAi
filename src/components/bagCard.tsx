import Image from 'next/image';
import { useEffect, useState } from 'react';
import bdMockado from '@/bd/bdMockado.json';
import ConverterMoeda from '@/hooks/ConverterMoeda';
import { Trash } from 'lucide-react';

interface Product {
  nome: string;
  preço: number;
  sku: string;
  src: string;
  categoria: string;
  mais_procurados: boolean;
}

type BagItem = {
  sku: string;
  quantity: number;
};

export default function BagCard() {
  const [productsBag, setProductsBag] = useState<BagItem[]>([]);
  const [productList, setProductList] = useState<(Product & { quantity: number })[]>([]);

  // Carrega do localStorage
  useEffect(() => {
    const storage = localStorage.getItem('productsBag');
    if (storage) {
      setProductsBag(JSON.parse(storage));
    }
  }, []);

  // Cruza produtos com bdMockado
  useEffect(() => {
    const list = productsBag.map((bagItem) => {
      const productData = bdMockado.find((p) => p.sku === bagItem.sku);
      return productData ? { ...productData, quantity: bagItem.quantity } : null;
    }).filter(Boolean) as (Product & { quantity: number })[];

    setProductList(list);
  }, [productsBag]);

  // Função para alterar quantidade
  const updateQuantity = (sku: string, action: 'add' | 'remove') => {
    setProductsBag((prev) => {
      const updated = prev.map((item) => {
        if (item.sku === sku) {
          return {
            ...item,
            quantity: action === 'add' ? item.quantity + 1 : Math.max(item.quantity - 1, 0)
          };
        }
        return item;
      }).filter((item) => item.quantity > 0); // Remove itens com qtd 0

      localStorage.setItem('productsBag', JSON.stringify(updated));
      return updated;
    });
  };

  if (productList.length === 0) return <p>Sem Produtos</p>;

  return (
    <div className="flex flex-col gap-2">
      {productList.map((product) => (
        <div key={product.sku} className="bg-slate-50 py-2 flex text-slate-600 font-semibold min-h-28 max-h-28">
          <Image
            src={product.src}
            alt={product.nome}
            width={96}
            height={96}
            className="rounded-l-full mr-4"
          />

          <div className="flex flex-col justify-between w-full">
            <p>{product.nome}</p>
            <div className="flex justify-between items-center">
              <p>{ConverterMoeda(product.preço)}</p>
              <div className="flex items-center justify-center mr-6 gap-2 border-2 rounded-lg px-2">
                <button className="text-lg hover:cursor-pointer" onClick={() => updateQuantity(product.sku, 'remove')}>{product.quantity === 1 ? (<Trash stroke="red" className='size-3'/>): '-'}</button>
                <p className='border-x-2 px-2'>{product.quantity}</p>
                <button className="text-lg hover:cursor-pointer" onClick={() => updateQuantity(product.sku, 'add')}>+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

