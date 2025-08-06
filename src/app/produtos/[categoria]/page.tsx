import { notFound } from 'next/navigation';
import bdMockado from '@/bd/bdMockado.json';
import Image from 'next/image';


interface Props {
  params: {
    categoria: string;
  };
}

export default function ProdutosCategoriaPage({ params }: Props) {
  const { categoria } = params;

  const categoriasValidas = ['homens', 'mulheres', 'esporte', 'calcados'];

  if (!categoriasValidas.includes(categoria)) {
    notFound();
  }


  return (
    <div className="px-8 py-4 mx-auto mt-48">
      <h1 className="text-2xl font-bold capitalize">Categoria: {categoria}</h1>
      <ul className="grid grid-cols-4 gap-8 mt-6">
        {bdMockado.map((produto, index) => {
          if(produto.categoria === categoria) {
            return (
              <li key={index} className="p-4 shadow-md border rounded-xl relative h-56">
                <Image
                  src={produto.src ?? '/produtos/none.png'}
                  fill
                  alt=""
                  className="size-56 object-fill rounded-xl"
                />
                <p className="text-lg font-semibold">{produto.nome}</p>
                <p className="text-gray-500">R$ {produto.preço.toFixed(2)}</p>
              </li>
            );
          } 
        })}
      </ul>
    </div>
  );
}
