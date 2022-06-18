# Produto

Assim como o [Modal de Produto](/frontend/components/prod-modal.html) a tela de produto segue as mesmas configurações, a diferença está no modo de exibição, onde o modal é um componente externo que se abre na tela como um "popup" sem a troca de URL, já a página de produto, como o próprio nome diz, é uma página dinâmica do seu site que abre com a URL do produto.


## Slide das imagens do produto

```html
<main>

    <!-- slide das imagens do produto  -->
    <div class="swiper-container" id="pwat-product__images" pwa-hook="product-page-images">
        <div class="swiper-wrapper">
            <pwa-loop params="4">
                <div pwa-each-image class="swiper-slide">
                    <img pwa-src="image">
                </div>
            </pwa-loop>
        </div>
    </div>

</main>
```

Após inserirmos o HTML, é necessário criar o hook responsável por inicializar o slide das imagens. No caso do exemplo acima
o hook de exemplo é `product-page-images`.

```js
"--product-page-images": component => {
    component.$slide('#pwat-product__images', {
        slidePerView: 1
    });
}
```
- Veja mais em <a href="https://swiperjs.com/demos" target="_blank"> Modelos de slides disponíveis </a>
- Para saber todos os controles para manipular o slide, <a href="https://swiperjs.com/swiper-api" target="_blank"> clique aqui </a>


## Informações do produto

Informações como nome, preço, descrição e etc.. Pode ser implementado da seguinte forma:

```html
<main>
    
    <!-- Nome do produto -->
    <h2>{{ product.name }}</h2>

    <!-- Preços "de", "por" e parcelamento -->
    <div  pwa--if="activeSKU.sale_price > 0">
        <p pwa-with-discount>{{ activeSKU.old_price | price }}</p>
        <p>{{ activeSKU.sale_price | price }}</p>
        <p>{{ activeSKU.plots_number }}x de {{ activeSKU.plots_price | price }}</p>
    </div>

    <!-- Desconto em % -->
    <p pwa-with-discount>{{ activeSKU.discount }}% OFF</p>

    <!-- 
        Descrição do produto 
        A descrição geralmente pode vir em formato de HTML, então para evitar criar
        uma tag para "texto" e outra para "html", é mais simples fazer a chamada do pwa--html
        direto, passando o atributo product.description como parâmetro.
    -->
    <div pwa--html="product.description"><div>

</main>
```

## Configurações do produto


### Magento 2
Para listar os tamanhos, cores e etc.. do produto em projetos Magento 2, temos o seguinte padrão:

```html
<main>

    <pwa-product-configurations-bundle always-list  attribute="variation_bundle"></pwa-product-configurations-bundle>
    <pwa-product-configurations-bundle always-list  attribute="custom_options"></pwa-product-configurations-bundle>

</main>
```

### VTEX

Para listar os tamanhos, cores e etc.. do produto em projetos vtex, temos o seguinte padrão:

```html
<main>

    <pwa-product-configurations-bundle default-selecteds="Cor" prefix="Cor:https://projeto.vteximg.com.br/arquivos/{value}.jpg">
    </pwa-product-configurations-bundle>

</main>
```

## Listagem de produtos relacionados

Abaixo temos um exemplo de código HTML

```html
<pwa-product-linkeds type="relateds">
    <h2>Produtos Relacionados</h2>

    <div class="swiper-container" id="produtos-relacionados">
        <div class="swiper-wrapper">
            <div pwa-each-linked class="swiper-slide">
                <pwa-product-card>
            </div>
        </div>
    </div>
</pwa-product-linkeds>
```

### Exemplos para projetos Magento 2
A tag pai `pwa-product-linkeds`, recebe o atributo `type="relateds"` o valor <strong> relateds </strong> se refere ao campo padrão do produto no magento 2 que traz os produtos relacionados. Porém, você pode utilizar outro campo para realizar a busca desses produtos relacionados, outros exemplos são: `upsell` e `crosssell`.]

### Exemplos para projetos VTEX
A unica diferença entre a chamada de produtos relacionados do magento 2 para VTEX, seria o atributo `type`, na <strong> VTEX </strong> os valores seriam `similar` e `suggestion` como recomendados.

### Controles e Tags
- Tag principal `pwa-product-linkeds`: componente responsável por buscar os produtos corretamente.
- Controle `pwa-each-linked`: responsável por listar todos os produtos encontrados.
- Tag `pwa-product-card`: reutiliza o layout do seu [Cartão de Produtos](/frontend/components/prod-card).

Obs.: Caso você queira que o cartão de produto seja diferente na listagem, baste você aplicar o html diretamente no código abaixo da tag com o controle `pwa-each-linked`, como mostra o exemplo abaixo:

```html
<article>
    <!-- Desconto em % -->
    <div pwa--show="linked.skus[0].discount > 0">{{ linked.skus[0].discount }}% OFF</div>
    
    <!-- Ao clicar na imagem, é redirecionado para a tela de produto -->
    <a pwa-to-linked-page>
        <img pwa-src="linked.image" class="se-w100" pwa-alt="linked.name">
    </a>

    <div>
        <!-- Nome do produto -->
        <h3 class="se-card-full-title">{{ linked.name }}</h3>
        
        <!-- Preço "de" e "por" -->
        <span>{{ linked.skus[0].old_price | price }}</span>
        <span>{{ linked.skus[0].sale_price | price }}</span>

        <!-- Parcelamento -->
        <p>
            {{ linked.skus[0].installment.number }}x de
            {{ linked.skus[0].installment.value | price }}
        </p>
    </div>
</article>
```



## Hooks Padrões da PWA para a página de Produtos

Lista de hooks padrões da Product Page. Lembrando que os `hooks` padrões, não traz os caracteres `--` antes do nome.

```js
    "on-page-product": component => {
        /*
            Após o carregamento da página de produto, esse hook é chamado para que você possa criar diversas funcionalidades, como chamadas de eventos js, slides, ou outras funcionalidades que desejar.
        */
    },

    "product-on-change": (component, product) => {
        /*
            Sempre que um produto é alterado, ou seja, quando você acessar outro produto pela própria página de produto (através de slides relacionados etc..), o hook é chamado para que você possa executar alguma ação, podendo utilizar os atributos do objeto "product" como é chamado no parâmetro do hook.
            parâmetros:
            - product: objeto do produto atual
        */
    },

    "product-on-sku-change": (component, activeSKU) => {
        /*
            Sempre que o sku é alterado, ou seja, quando selecionado uma opção do produto seja pelo tamanho, cor etc.., o hook é acionado para que você possa executar alguma ação, podendo utilizar os atributos do objeto "activeSKU" como é chamado no parâmetro do hook.
            parâmetros:
            - activeSKU: objeto do sku atual
        */
    },
```