# Desenvolver o HTML

Aqui você encontrará um guia com o básico para criar e entender a estrutura de HTML padrão que oferecemos no painel. Para ver mais detalhes use os tutoriais no menu lateral.

Antes, devemos lhe apresentar algumas regras de aquivos HTML:
- Cada aquivo só pode ter 1 elemento HTML, todo o código do arquivo deve estar dentro desse elemento, exemplo `<div>...todo conteúdo aqui</div>`.
- Não deve-se usar tag `script` e `style`,  para isso use hooks e arquivos css. O painel não irá entender essas tags.


## Páginas padrões

Seguindo um fluxo padrão de compra em um ecommerce, no menu `Páginas` oferecemos por padrão as páginas:

- **Inicial**: a home do site, onde normalmente encontramos os banners de promoção e grid de produtos principais
- **De produto**: uma página para o cliente ver mais detalhes sobre o produto e, se disponível, selecionar sua cor, tamanho e adicionar ao carrinho.
- **De categoria**: mostra a seleção de produtos de uma determinada categoria, normalmente apresenta alguns filtros para seleção do cliente.
- **De busca**: na maioria das vexzes é igual a tela de categoria, porém lista o resultado da busca feita pelo cliente.


##  Componentes compartilhados

Além das telas, temos elementos que se repetem várias vezes no site, como é o caso do cabeçalho, rodapé, carrinho e outros. Então no menu `Código` oferemos um arquivo para cada um:

- **Carrinho**: aqui você irá criar um elemento para ser o caarrinho da loja, recomendamos que seja um offset lateral para seguir o padrão esperado em uma PWA.
- **Cabeçalho**: onde fica a apresentação e ações da loja, como o menu de categorias, campo de busca e ícones indicativos do carrinho e cliente logado.
- **Rodapé**: com as informações de endereço e mídias, provavelmente acompanhará o newsletter  e ícones de segurança e pagamento.
- **Cartão de produto**: a apresentação do produto em grid, sela em um slide ou vitrine, normalmente é um elemento que se repete, logo usamos sempre o mesmo.
- **Modal de produto**: caso a loja não tenha página de produto ou tenha que abrir um modal antes de chegar nela, podemos usar essse modal para dar um preview de detalhes do produto.
- **Scripts no head**: todo conteúdo aqui será adicionado na tag head da aplicação, logo você pode importar CDN de bibliotecas CSS aqui.
- **Scripts no body**: todo conteúdo aqui será adicionado no final body da aplicação, logo você pode importar CDN de bibliotecas JS aqui.

Eles serão importados automaticamente pelo painel para seu devido lugar, então cabe a você desenvolvedor apenas cria-los.