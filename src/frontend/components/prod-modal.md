# Modal de Produto

O Modal basicamente substitui a tela de produto para projetos que optam pela praticidade na hora de escolher os produtos de uma grid de produtos. Segue as funcionalidades recomendadas para o modal.


## Slide das imagens do produto

```html
<main pwa--if="product !== null" class="pwat-product__modal">

    <!-- slide de imagens do produto  -->
    <div class="swiper-container" id="pwat-product__images" pwa-hook="modal-product-images">
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
o hook de exemplo é `modal-product-images`.

```js
"--modal-product-images": component => {
    component.$slide('#pwat-product__images', {
        slidePerView: 1
    });
}
```
- Veja mais em <a href="https://swiperjs.com/demos" target="_blank"> Modelos de slides disponíveis </a>
- Para saber todos os controles para manipular o slide, <a href="https://swiperjs.com/swiper-api" target="_blank"> clique aqui </a>

Além de criarmos o hook do slide, vamos precisar de mais uma alteração. Sabemos que como se trata de um modal, sempre que o seu produto for alterado, precisamos atualizar as imagens e resetar o slide para que seja listada a quantidade certa de imagens do próximo produto. Então o hook `product-modal-on-changed` será responsável por essa façanha. Segue o código abaixo:

```js
'product-modal-on-changed': component => {
    /* 
        Verifico se existe o slide do elemento com o id #pwat-product__images.
        A variável window.slides, é um atributo padrão do Dashboard,
        que recebe todos os slides criados até então, através dele,
        é possivel fazer qualquer minupulação nos slides existentes
        dentro de qualquer outro Hook/Js.
    */
    if ((window.slides || [])['#pwat-product__images']) {

        /*
            Caso exista, o swiper slide (lib padrão de slides do Dashboard) possui
            um método chamado destroy(), que como o próprio nome diz, 
            destrói a funcionalidade do slide
        */
        window.slides['#pwat-product__images'].destroy();
    }

    // Após destruir, é feito a chamada do hook que cria o slide novamente.
    setTimeout(() => {
        component.$hook('--modal-product-images', component, () => {});
    }, 300);
},
```

## Passando para o próximo produto sem sair do modal

De forma bem prática, podemos avançar para o próximo produto da grid sem precisar sair do modal. Segue o exemplo abaixo:

```html
<main pwa--if="product !== null" class="pwat-product__modal">
    <button @click="changeProduct(-1)">Anterior</button>
    <button @click="changeProduct(1)">Próximo</button>
</main>
```

## Informações do produto

Informações como nome, preço, descrição e etc.. Pode ser implementado da seguinte forma:

```html
<main pwa--if="product !== null" class="pwat-product__modal">
    
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
<main pwa--if="product !== null" class="pwat-product__modal">

    <pwa-product-configurations-bundle always-list  attribute="variation_bundle"></pwa-product-configurations-bundle>
    <pwa-product-configurations-bundle always-list  attribute="custom_options"></pwa-product-configurations-bundle>

</main>
```

### VTEX

Para listar os tamanhos, cores e etc.. do produto em projetos vtex, temos o seguinte padrão:

```html
<main pwa--if="product !== null" class="pwat-product__modal">

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


## Hook Padrões da PWA para o Modal de Produto

Lista de hooks padrões do modal do produto. Lembrando que os `hooks` padrões, não traz os caracteres `--` antes do nome.

```js
    "product-modal-on-toggle": component => {
        /*
            Bem parecido com o funcionamento do modal de carrinho, é recomendado que nesse hook
            seja utilizado apenas funções que manipulam o layout do modal de produto, como exemplo:
            document.querySelector('#modal').classList.toggle('ativo')
        */
    },

    "product-modal-on-changed": (component, product) => {
        /*
            Sempre quando abrir o modal de produto, ele vai buscar o produto que você chamou para exibir no modal. Portanto, o hook geralmente é utilizado para realizar alguma ação sempre que o produto é alterado no modal. Um exemplo bem comum é a "destruição" e "nova execução" dos slides de imagens de produto para que o slide funcione corretamente de acordo com as imagens do produto que foi atualizado.
            parâmetros
            - product: produto que foi atualizado no modal
        */
    }
```