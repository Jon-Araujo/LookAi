'use client';
import Image from 'next/image';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import bdMockado from '@/bd/bdMockado.json';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import FavoriteCard from './favoriteCard';
import BagCard from './bagCard';
import { toast } from 'sonner';

export default function Navbar() {
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [productsBag, setProductsBag] = useState<string[]>([]);
  const [controller, setController] = useState<boolean>(false);

  useEffect(() => {
    const storage = localStorage.getItem('favorites');
    if (storage) {
      setFavorites(JSON.parse(storage));
    }
  }, [controller]);

  useEffect(() => {
    const storage = localStorage.getItem('productsBag');
    if (storage) {
      setProductsBag(JSON.parse(storage));
    }
  }, [controller]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const limit = window.innerHeight / 3;

      setIsTransparent(scroll > limit);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const isMobile = (): boolean => {
      return window.innerWidth <= 900;
    };
    const updateMobile = () => setMobile(isMobile());

    updateMobile();
    window.addEventListener('resize', updateMobile);

    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  const SendToWpp: () => void = () => {
    try {
      const currentBag = JSON.parse(localStorage.getItem('productsBag') || '[]');
      const productsBag = currentBag
        .map((cartItem: { sku: string; quantity: number }) => {
          const productData = bdMockado.find((item) => item.sku === cartItem.sku);

          if (!productData) return null;

          return {
            sku: productData.sku,
            nome: productData.nome,
            preco: productData.preço,
            qtd: cartItem.quantity,
          };
        })
        .filter(Boolean);
      const phone = '5521983471227';
      const messageFormatted =
        `Olá! Quero prosseguir com a compra dos produtos:\n` +
        productsBag
          .map(
            (p: { nome: string; sku: string; preco: number; qtd: number }) =>
              `- ${p.nome} (SKU: ${p.sku}), preço: R$${p.preco.toFixed(2)}, quantidade: ${p.qtd}`
          )
          .join('\n');

      console.log(messageFormatted);
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(messageFormatted)}`;
      if (currentBag.length === 0) {
        toast.error('Adicione produtos para finalizar sua compra!');
        setTimeout(() => {
          document.getElementById('bagSidebar')?.click();
        }, 450);
      } else {
        window.open(url, '_blank');
        setTimeout(() => {
          document.getElementById('bagSidebar')?.click();
        }, 450);
        toast.success('Tudo certo, fale com um dos nossos vendedores pelo WhatsApp!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro, atualize a página e tente novamente!');
    }
  };

  return (
    <div
      onClick={() => setIsTransparent(false)}
      className={`bg-white fixed top-0 left-0 z-50 w-full shadow-xl px-4 py-2 flex items-center justify-between transition-all duration-500 ${
        isTransparent ? 'opacity-75' : 'opacity-100'
      }`}
    >
      <Link href={'/'}>
        <Image src={'/logo.png'} alt={''} width={100} height={30}></Image>
      </Link>

      <div
        className={`border-2 p-2 rounded-lg flex justify-between ${mobile ? 'w-[45%]' : 'w-1/3'}`}
      >
        <input type="text" placeholder="Pesquise aqui..." className="w-full focus:outline-none" />
        <button className="cursor-pointer">
          <Search />
        </button>
      </div>
      {mobile ? null : (
        <ul className="flex w-1/5 justify-between">
          <li>
            <Link href={'/produtos/mulheres'}>Mulheres</Link>
          </li>
          <li>
            <Link href={'/produtos/homens'}>Homens</Link>
          </li>
          <li>
            <Link href={'/produtos/esporte'}>Esporte</Link>
          </li>
          <li>
            <Link href={'/produtos/calcados'}>Calçados</Link>
          </li>
        </ul>
      )}

      <div className={`flex justify-between ${mobile ? 'w-1/4' : 'w-[5%] mr-4'}`}>
        {/* SideBar de Favoritos: */}
        <Drawer direction="right">
          <DrawerTrigger
            className="hover:cursor-pointer"
            id="favoriteSidebar"
            onClick={() => setController(!controller)}
          >
            <Heart />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-lg font-semibold flex justify-between items-center text-[#109deb]">
                Seus Favoritos ❤️{' '}
                <DrawerClose asChild>
                  <Button variant="outline" className="rounded-full p-3 hover:cursor-pointer">
                    X
                  </Button>
                </DrawerClose>
              </DrawerTitle>
              <DrawerDescription>Sua lista de produtos favoritos aqui:</DrawerDescription>
            </DrawerHeader>
            <div>
              {favorites.map((cod, index) => (
                <FavoriteCard sku={cod} key={index} />
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="hover:cursor-pointer w-3/5 text-[#109deb] mx-auto"
                >
                  Adicionar Mais Produtos
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* SideBar da Sacola de compras: */}
        <Drawer direction="right">
          <DrawerTrigger
            className="hover:cursor-pointer"
            id="bagSidebar"
            onClick={() => setController(!controller)}
          >
            <ShoppingBag />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-lg font-semibold flex justify-between items-center text-[#109deb]">
                Sacola de Compras 🛍️{' '}
                <DrawerClose asChild>
                  <Button variant="outline" className="rounded-full p-3 hover:cursor-pointer">
                    X
                  </Button>
                </DrawerClose>
              </DrawerTitle>
              <DrawerDescription>Finalize a compra dos produtos escolhidos aqui:</DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto">
              <BagCard />
            </div>
            <DrawerFooter>
              <Button
                className="hover:cursor-pointer w-3/5 mx-auto bg-[#109deb]"
                onClick={SendToWpp}
              >
                Finalizar Compra
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="hover:cursor-pointer w-3/5 text-[#109deb] mx-auto"
                >
                  Continuar comprando
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Menu Hamburguer para mobile: */}
        {mobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Categorias</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/produtos/mulheres'}>Mulheres</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/produtos/homens'}>Homens</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/produtos/esporte'}>Esporte</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/produtos/calcados'}>Calçados</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </div>
  );
}
