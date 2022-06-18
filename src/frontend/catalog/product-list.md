# Exibindo listas e vitrines de produtos

Aqui você poderá aprender a criar vitrines e listagem de produtos para sua loja, seja com slide, em grid ou de qualquer outro tipo. Veja um exemplo simples para iniciarmos:

```html
<pwa-product-list name="lancamentos" filter="categories.code:10" size="15">
    <p pwa-is-loading>Carregando...</p>

    <div pwa-not-loading class="lista">
        <div pwa-each-product>
            <pwa-product-card>
        </div>
    </div>

    <p pwa-is-empty>Sem produtos para mostrar.</p>
</pwa-product-list>
```

No componente `product-list` somos obrigados a passar ao menos um nome, um filtro de busca e o tamanho da lista. Além disso temos alguns atributos de controle, como:

- `pwa-is-loading` para mostrar um loading enquanto a lista é pesquisada
- `pwa-not-loading` para mostrar a lista após ela ser encontrada
- `pwa-each-product` para percorrer em cada produto encontrado
- `pwa-is-empty` para mostrar uma mensagem quando a lista está vazia

<strong style="color:red">Atenção:</strong> Os dados usados no atributo `filter` foram verificados no catalogo, [veja aqui](/frontend/catalog/elastic.html) para saber mais sobre como buscar os produtos certos para cara lista. Você também pode combinar múltiplos filtros para a lista, por exemplo, além de buscar produtos da categoria 10, você poderia buscar apenas por produtos com frete grátis, deixando assim: `filter="categories.code:10" filter="frete_gratis:Sim"`.

## Listar produtos sem usar o cartão de produto

Ao ver o exemplo anterior, usamos a tag `<pwa-product-card>` para indicar que cada produto encontrado será representado pelo cartão de produto padrão da loja. Porém você pode mudar esse comportamento, para isso basta substituir essa tag pelo HTML que representará o produto, como exemplo:

```html
<pwa-product-list name="lancamentos" filter="categories.code:10" size="15">
    <p pwa-is-loading>Carregando...</p>

    <div pwa-not-loading class="lista">
        <div pwa-each-product>
            <h3 pwa-to-product-page>{{ product.name }}</h3>
            <p>{{ product.skus[0].sale_price }}</p>
        </div>
    </div>

    <p pwa-is-empty>Sem produtos para mostrar.</p>
</pwa-product-list>
```

## Usando um termo de busca para montar a lista

Não encontrou um atributo que representa os produtos que a lista deve conter? Sem problemas, você pode usar o `query` para indicar um termo de pesquisa, assim a lista irá ser representada pelo resultado da busca daquele termo. Para isso basta substituir o `filter` por `query`:

```html
<pwa-product-list name="lancamentos" query="Tenis azul" size="15">
    <p pwa-is-loading>Carregando...</p>

    <div pwa-not-loading class="lista">
        <div pwa-each-product>
            <pwa-product-card>
        </div>
    </div>

    <p pwa-is-empty>Sem produtos para mostrar.</p>
</pwa-product-list>
```

## Adicionar abas na lista de produtos

Em algumas lojas a lista pode representar diversas listas, ou seja, teremos alguns botões que trocarão os filtros da listagem, consequentemente os produtos exibidos ali. Para isso basta usar o atributo `pwa-tab` indicando o novo filtro que a lista deve tomar no evennto de clique:

```html
<pwa-product-list name="lancamentos" filter="categories.code:10" size="15" active-class="tab--active">
    <ul>
        <li pwa-tab="categories.code:10">Tênis</li>
        <li pwa-tab="categories.code:15">Sapatos</li>
        <li pwa-tab="categories.code:8">Sandálias</li>
    </ul>

    <p pwa-is-loading>Carregando...</p>

    <div pwa-not-loading class="swiper-container lista">
        <div class="swiper-wrapper">
            <div pwa-each-product class="swiper-slide">
                <pwa-product-card>
            </div>
        </div>
    </div>

    <p pwa-is-empty>Sem produtos para mostrar.</p>
</pwa-product-list>
```

Note também a propriedade `active-class` ela indica a classe que será adicionada ao `pwa-tab` quando ele estiver ativo na listagem.


## Montando  slide da lista de produto

Sua vitrine deve ser um slide? Se sim, é simples! Já temos algo pronto pra você, por padrão usamos a biblioteca [Swiper](https://swiperjs.com/) para criar. Assim que a lista é encontrada pelo catalogo, a PWA dispara um hook chamado `product-list-{nome}-loaded`, onde `{nome}` deve ser substituido pelo nome dado a lista. Veja um exemplo:

```javascript
"product-list-lancamentos-loaded": component => {
    component.$slide('.lista', {
        slidesPerView: (window.screen.width < 1024) ? 2 : 5,
        spaceBetween: (window.screen.width < 1024) ? 10 : 20,
        speed: 1500
    })
},
```

O hook nada mais é que um método que recebe o componente, então usamos o método `$slide` enviando um seletor indicando em qual elemento o slide será montado, e um objeto com as opções do Swiper. Ao  usar esse hook garantimos que o slide será montado independente  do delay da busca.

Não sabe como e onde criar esse hook? [Clique aqui e saiba mais sobre hooks](/frontend/hooks)
