'use client';
import Image from 'next/image';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isTransparent, setIsTransparent] = useState<boolean>(false);

  useEffect(() => {
    console.log('oi');
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

      <div className="border-2 p-2 rounded-lg w-1/3 flex justify-between">
        <input type="text" placeholder="Pesquise aqui..." className="w-full focus:outline-none" />
        <button className="cursor-pointer">
          <Search />
        </button>
      </div>

      <ul className="flex w-1/5 justify-between">
        <li>
          <Link href={'/mulheres'}>Mulheres</Link>
        </li>
        <li>
          <Link href={'/homens'}>Homens</Link>
        </li>
        <li>
          <Link href={'/esporte'}>Esporte</Link>
        </li>
        <li>
          <Link href={'/calcados'}>Calçados</Link>
        </li>
      </ul>

      <div className="flex justify-between w-[5%] mr-4">
        <Heart />
        <ShoppingBag />
      </div>
    </div>
  );
}
