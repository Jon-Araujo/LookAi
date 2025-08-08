'use client';
import Image from 'next/image';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

export default function Navbar() {
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

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
    console.log('send to wpp');
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
          <DrawerTrigger className="hover:cursor-pointer">
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
          <DrawerTrigger className="hover:cursor-pointer">
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
