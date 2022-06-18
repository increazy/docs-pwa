# Cartão de produto

Cartão de produto é o layout de apresentação do produto para usar em grids, vitrines e slides. Ele se encontra no painel do dashboard > Códigos. Veja um exemplo:

```html
<section>
    <a pwa-to-product-page>
        <img pwa-src="product.image" pwa-alt="product.name">
    </a>

    <h3>{{ product.name }}</h3>

    <!-- Desconto em % -->
    <span pwa-with-discount>{{ activeSKU.discount }}%</span>

    <!-- Preço "de" -->
    <p pwa-with-discount>{{ activeSKU.old_price | price }}</p>
    <!-- Preço "por" -->
    <p>{{ activeSKU.sale_price | price }}</p>

    <button pwa-add-in-cart>Adicionar direto ao carrinho</button>
    <button pwa-toggle-modal>Abrir modal do Produto</button>
    <a pwa-to-product-page>Levar para a tela de produto</a>
</section>
```

Importante lembrar:
- `pwa-add-in-cart` só vai servir para produtos simples, ou seja, que não possui nenhuma opção de configuração, como tamanhos,
cores e etc.
- `pwa-toggle-modal` responsável pelo evento de abrir o modal do produto, o código do modal se encontra em <strong>Códigos > Modal do Produto</strong>. Porém, o modal de produto só vai ser exibido aplicando algum evento dentro do hook padrão do dashboard chamado `product-modal-on-toggle`. Como mostra o exemplo abaixo:

```js
'product-modal-on-toggle': component => {
    // código que aplica o evento de abrir e fechar o modal
},
```
- Para saber mais sobre o modal de produtos clique [aqui](/frontend/components/prod-modal).

| Controle                  | Descrição                                                                 
|---------------------------|------------------------------------------------------------------------------------------------|
| `pwa-to-product-page`     | Redireciona para a página do produto                                                           |
| `pwa-with-discount`       | Verifica se o produto possui algum desconto                                                    |
| `pwa-add-in-cart`         | Adiciona o produto direto no carrinho (Apenas para produtos simples - sem cores ou tamanhos)   |
| `pwa-toggle-modal`        | Redireciona para uma rota (páginas estáticas ou categorias) do seu projeto                     |


## Usando lazy loader na imagem

Para deixar a PWA ainda mais performática você pode colocar as imagens para serem carregadas ao deslizar da tela, para isso basta trocar o `pwa-src` por `pwa-lazy-src`. 

## Botões para lista de favoritos

Você pode adicionar os controles para adicionar ou remover o produto dos faavoritos diretamente no cartão. Veja os exemplos:

```html
<section>
    <a pwa-to-product-page>
        <img pwa-src="product.image" pwa-alt="product.name">
    </a>

    <button pwa-add-wishlist>Adicionar aos favoritos</button>
    <button pwa-remove-wishlist>Remover dos favoritos</button>
</section>
```


## Hook Padrões da PWA para o Cartão de Produto

Lista de hooks padrões do cartão de produto. Lembrando que os `hooks` padrões, não traz os caracteres `--` antes do nome.

```js
    "product-card-on-product": component => {
        /*
            Sempre que o cartão de produto é criado/renderizado, você poderá utilizar 
            o hook para acrescentar alguma informação extra no card que esteja fora
            das informações do produto ou similar.
        */
    },
```