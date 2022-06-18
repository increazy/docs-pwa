# Exibindo a grid de resultados

Você pode exibir a lista de produtos da busca ou categoria assim:

```html
<pwa-result-list size="6" automatic-scrolls="2">
    <div pwa-each-product>
        <pwa-product-card>
    </div>

    <div pwa-not-last-page>
        <button pwa-not-loading pwa-load-more>Carregar mais</button>
    </div>
<pwa-result-list>
```

Com o simples código acima já poderemos ver grid com os produtos da categoria ou com o termo buscado. Vamos explicar um pouco mais?
- para o componente `result-list` enviamos o tamanho de cadaa parte/página do resultado, no caso de 6 em 6 produtos. E em `automatic-scrolls` determinamos a quantidade de scrolls infinitos que a listagem deve ter, após chegar o limite de scrools infinitos o botão "Carregar mais" será exibido.
- a exibição dos produtos seguem o padrão de [lista de produto](/frontend/catalog/product-list), com o percorrimento e o uso do cartão para exibição.
- Por fim temos alguns controles, que já dizem tudo, `pwa-nott-last-page` e `pwa-not-loading` servem para controlar o layout quando não está  na última página de resultados e quando a pwa não está executando uma busca. Enquanto o `pwa-load-more` adiciona um evento de clique para buscar a próxima lista de produtos.