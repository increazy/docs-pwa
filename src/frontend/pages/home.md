# Home

## Introdução

A Página Home, assim como as outras páginas padrões que a PWA oferece, seu HTML é inserido dentro de uma tag "pai", onde será a unica tag da página e dentro dela todos as suas tags filhas, assim como mostra no exemplo abaixo.

```html
<main>
    <!-- Banner principal -->
    <div></div>

    <!-- Slide de produto 1 -->
    <section></section>

    <!-- Slide de produto 2 -->
    <section></section>
</main>
```

Temos então, a tag `<main>` em contorno de todas as outras. <strong style="background: #f2ff2c45">OBS.: É muito importante que não tenha nenhuma outra tag acima ou abaixo dela, pois pode ocasionar erro na compilação. </strong>

Bom, agora que já temos uma base do esqueleto da HOME, vamos sugerir algumas sessões que geralmente pode conter no seu projeto.

## Slides de Banners

Indo direto ao ponto, siga o código HTML abaixo:

```html
<div pwa-hook="home-banner-1" class="swiper-container" id="home-banner-1">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <a pwa-to-page="/link-pagina"><img pwa-src="banner-1" alt="Produto X"></a>
        </div> 
        <div class="swiper-slide">
            <a pwa-to-page="/link-pagina-2"><img pwa-src="banner-2" alt="Produto Y"></a>
        </div>
    </div>
</div>
```

Explicando um pouco sobre o código acima, na primeira tag temos o atributo `pwa-hook` no qual recebe o nome do hook onde vou fazer a execução do código do slide. Também o `id` para facilitar na identificação do slide criado. As classes `swiper-container`, `swiper-wrapper` e `swiper-slide` são classes padrões utilizadas pela biblioteca <a href="https://swiperjs.com/demos" taget="_blank"> Swiper Slide </a>.

Vamos Hook de criação. Para saber mais sobre hooks [acesse aqui](/frontend/hooks/create.html)

```js
"--home-banner-1": component => {
    component.$slide('#home-banner-1', {
        slidesPerView: 1,
        speed: 1500,
    })
},
```

| Controle                  | Descrição                                                                 
|---------------------------|-----------------------------------------------------------------|
| `pwa-to-page`             | Redireciona o usuário para uma página                           |
| `pwa-src`                 | Nome da imagem que você importou no dashboard                   |

Para saber mais sobre redirecionamento do controle `pwa-to-page` e outros, [acesse aqui](/frontend/components/footer.html#links-e-ancoras)


## Slide/Vitrine de Produtos

Exemplo de código abaixo:

```html
<pwa-product-list name="home-vitrine-1" filter="categories.code:1" size="15" class="swiper-container" id="home-vitrine-1">
    <div class="swiper-wrapper">
        <div pwa-each-product class="swiper-slide">
            <pwa-product-card>
        </div>
    </div>
</pwa-product-list>
```
A tag principal `pwa-product-list`, é o componente responsável por trazer os produtos, nele é passado alguns atributos como:

- `name`: Nome dado à lista de produtos que será buscada
- `filter`: De onde esses produtos serão buscados, de uma categoria, ou através de outros campos que existam no seu produto, outro exemplo seria filtrar por nomes como: `name:Tênis Nike` e etc.
- `size`: Quantidade de produtos que serão listadas nessa vitrine, é importante frizar que não é viável listar muitos produtos, pois isso poderá sobrecarregar sua página e pesando na navegação, `15` é um bom tamanho para ser listado.

Siga o código dee criação do [hook](/frontend/hooks/create.html)

```js
"product-list-home-vitrine-1-loaded": component => {
    component.$slide('#home-vitrine-1', {
        slidesPerView: window.innerWidth < 768 ? 1 : 4,
    });
},
```

Nota-se que o nome `home-vitrine-1` (mesmo valor dado ao atributo `name=`) é aplicado entre `product-list-` e `-loaded`, assim temos uma criação de slide dinâmica, onde o slide só é criado quando os produtos são encontrados, para que não ocorra quebra de layout ou bugs na listagem. Além disso, nosso <strong> hook </strong> não possui `--` antes do nome, isso porque se trata de um hook dinâmico <strong> padrão </strong> do dashboard. [Saiba mais sobre hooks aqui](/frontend/hooks/create.html)



## Vistos por último
Um pouco semelhante a tag "pwa-product-list", o `pwa-last-vieweds-list` traz o conceito um pouco mais simples, não necessitando de nenhum parâmetro para o seu funcionamento, basta fazer a chamada da tag, e dentro da mesma usar os  elementos (tags e atributos) para a chamada dos cards de produtos padrões da PWA, ou também caso queira, criar um novo cartão de produto personalizado utilizando a variável `product` dentro de `pwa-each-product` para trazer as informações dos produtos e assim poder criar novos cards.

Código de exemplo abaixo:
```html
    <pwa-last-vieweds-list>
        <pwa-hidden>
            <div class="pwat-loading" pwa-is-loading>
                Carregando..
            </div>
        </pwa-hidden>

        <div class="swiper-container" id="pwat-last-vieweds__slide" pwa-not-empty>
            <div pwa-not-loading class="swiper-wrapper">
                <div pwa-each-product  class="swiper-slide">
                    <pwa-product-card>
                </div>
            </div>
        </div>

        <div pwa-is-empty>
            Você ainda não visualizou nenhum produto :(
        </div>
    </pwa-last-vieweds-list>
```

Aqui temos o hook padrão do componente, no qual é recomendado utilizar para a criação de funcionalidades dinâmicas como o slide. O Hook será executado sempre que já existir uma lista de produtos, evitando possíveis quebras de layout ou falhas na hora de montar o slide.

```js
"last-vieweds-list-loaded": component => {
    component.$slide('#pwat-last-vieweds__slide', {
        slidesPerView: window.innerWidth < 1024 ? 1 : 4
    });
},
```


## Hooks Padrões da PWA para a página Home

Lista de hooks padrões da Home Page. Lembrando que os `hooks` padrões, não traz os caracteres `--` antes do nome.

```js
    "on-page-home": component => {
        /*
            Após o carregamento da página home, esse hook é chamado para que você possa criar diversas funcionalidades, como chamadas de eventos js, slides, ou outras funcionalidades que desejar.
        */
    },
```