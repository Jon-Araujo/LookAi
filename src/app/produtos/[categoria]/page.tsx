import { notFound } from 'next/navigation';
import ProductCard from '@/components/productCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProdutosCategoriaPage({ params }: any) {
  const { categoria } = params;

  const categoriasValidas = ['homens', 'mulheres', 'esporte', 'calcados'];

  if (!categoriasValidas.includes(categoria)) {
    notFound();
  }

  return (
    <div className="px-8 py-4 mx-auto mt-48">
      <h1 className="text-2xl font-bold capitalize">Categoria: {categoria}</h1>

      <ProductCard isMostWanted={false} category={categoria} />
    </div>
  );
}
