# Cartão de produto

No menu `Código` do painel, é possível encontrar o arquivo `Cartão de produto`, nele você irá desenvolver o layout de aapresentação do produto papra usar em grids, vitrines e slides. Veja um exemplo disso:

```html
<div class="cartao-produto">
    <img pwa-to-product-page pwa-src="product.image" pwa-alt="product.name">

    <h3>{{ product.name }}</h3>
    <span pwa-with-discount>{{ activeSKU.discount }}%</span>
    <span>{{ activeSKU.sale_price | price }}</span>

    <button pwa-add-in-cart>Adicionar ao carrinho</button>
    <button pwa-togle-modal>Modal de produto</button>
</div>
```

## Usando lazy loader na imagem

Para deixar a PWA ainda mais performática você pode colocar as imagens para serem carregadas ao deslizar da tela, para isso basta trocar o `pwa-src` por `pwa-lazy-src`. 

## Botões para lista de favoritos

Você pode adicionar atalhos para adicionar ou remover o produto dos faavoritos diretamente no cartão. Veja os exemplos:

```html
<div class="cartao-produto">
    <img pwa-to-product-page pwa-src="product.image" pwa-alt="product.name">


    <button pwa-add-wishlist>Adicionar aos favoritos</button>
    <button pwa-remove-wishlist>Remover dos favoritos</button>
</div>
```