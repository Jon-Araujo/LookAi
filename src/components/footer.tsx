export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-700 py-8 mt-10 border-t">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Sobre nós</h2>
            <p className="text-sm">
              A LookAi é uma loja virtual de moda que conecta estilo e tecnologia. Oferecemos os
              melhores produtos com inteligência e personalização.
            </p>
          </div>

          {/* Coluna 2 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Links úteis</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Início
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Política de privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Contato</h2>
            <p className="text-sm">contato@lookai.com.br</p>
            <p className="text-sm mt-1">+55 (11) 99999-9999</p>
            <div className="flex gap-4 mt-4">
              {/* <a href="#">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
              </a>
              <a href="#">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="#">
                <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} LookAi. Todos os direitos reservados.
        </div>
      </footer>
    );
}