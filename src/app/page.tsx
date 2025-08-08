'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import ProductCard from '@/components/productCard';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    const isMobile = (): boolean => {
      return window.innerWidth <= 900;
    };
       const updateMobile = () => setMobile(isMobile());
  
       updateMobile();
       window.addEventListener('resize', updateMobile);
  
       return () => window.removeEventListener('resize', updateMobile);
     }, []);

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
          <CarouselItem className={`relative w-full ${mobile ? 'h-56' : 'h-96'}`}>
            <Image
              src="/banners/nike1.jpg"
              alt="Nike Banner"
              fill
              className={`${mobile ? 'object-fill' : 'object-cover'}`}
            />
          </CarouselItem>
          <CarouselItem className={`relative w-full ${mobile ? 'h-56' : 'h-96'}`}>
            <Image
              src="/banners/adidas1.webp"
              alt="Nike Banner"
              fill
              className={`${mobile ? 'object-fill' : 'object-cover'}`}
            />
          </CarouselItem>
          <CarouselItem className={`relative w-full ${mobile ? 'h-56' : 'h-96'}`}>
            <Image
              src="/banners/puma1.webp"
              alt="Nike Banner"
              fill
              className={`${mobile ? 'object-fill' : 'object-cover'}`}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Categorias: */}
      <p className="ml-12 mt-8 text-2xl font-semibold">Categorias:</p>
      <ul
        className={`grid ${
          mobile ? 'grid-cols-2 w-[90%] gap-6' : 'grid-cols-4 w-1/2 hover:w-3/5'
        } mt-8 mx-auto transform-all duration-300`}
      >
        <li className={`relative ${mobile?'size-48':'size-56'} shadow-xl overflow-hidden rounded-full group`}>
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
        <li className={`relative ${mobile?'size-48':'size-56'} shadow-xl overflow-hidden rounded-full group`}>
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
        <li className={`relative ${mobile?'size-48':'size-56'} shadow-xl overflow-hidden rounded-full group`}>
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
        <li className={`relative ${mobile?'size-48':'size-56'} shadow-xl overflow-hidden rounded-full group`}>
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

      {/* Produtos mais procurados: */}
      <ProductCard title="Produtos mais procurados" isMostWanted={true} />

      {/* Accordion de perguntas mais frequentes: */}
      <Accordion type="single" collapsible className="w-4/5 mt-12 mx-auto" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>1. Por que os preços são tão baixos?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Nós trabalhamos diretamente com fornecedores de confiança, com produtos de excelente
              qualidade e sem intermediários. Isso nos permite oferecer preços mais acessíveis ao
              cliente final. Nosso objetivo é democratizar a moda, oferecendo estilo e economia em
              um só lugar.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>2. Os produtos são de qualidade?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Sim! Todos os nossos produtos são novos e com controle de qualidade. Trabalhamos com
              fornecedores que já atuam no mercado com responsabilidade e possuem reconhecimento.
              Você recebe exatamente o que vê nas fotos.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>3. Por que a compra é finalizada pelo WhatsApp?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Estamos em fase de expansão e, por isso, ainda não ativamos o sistema de checkout
              automatizado no site. Mas você pode comprar com total segurança pelo WhatsApp, onde
              nossa equipe está pronta para te atender, tirar dúvidas e finalizar seu pedido com
              rapidez e atenção.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>4. É seguro finalizar a compra pelo WhatsApp?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Sim! Nosso atendimento é feito por pessoas reais e treinadas, com CNPJ registrado e
              histórico de clientes satisfeitos. No WhatsApp, você pode confirmar disponibilidade,
              tirar dúvidas, receber fotos e ainda acompanhar o andamento do seu pedido em tempo
              real.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>5. Como é feita a entrega dos pedidos?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Enviamos para todo o Brasil via Correios ou transportadora, dependendo da sua região.
              Assim que o pagamento for confirmado, você recebe um código de rastreio para
              acompanhar seu pedido até a entrega. Tudo de forma transparente e segura.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>6. Posso trocar ou devolver um produto?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Claro! Seguimos o Código de Defesa do Consumidor e garantimos seu direito de troca ou
              devolução dentro do prazo legal. Se tiver qualquer problema, é só entrar em contato
              com nossa equipe pelo WhatsApp que resolvemos tudo de forma prática e rápida.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
