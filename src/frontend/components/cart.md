# Carrinho

## Criando um carrinho básico

Segue abaixo o código para a criação básica de um carrinho no HTML do dashboard.
Dentro do component `Carrinho` no dashboard, aplique:

```html
<aside class="pwat-cart">
    <section>
      <div>
        <span pwa-toggle-cart> FECHAR </span>
        <h2>Sua Sacola</h2>
      </div>
  
      <div>
        <ul pwa-has-items>
            <li pwa-each-item>
                <div>
                    <div>
                        <!-- IMAGEM DO PRODUTO  -->
                        <figure>
                            <img pwa-src="product.image" pwa-alt="product.name">
                        </figure>

                        <article>

                            <h3>{{ product.name }}</h3>
                            <span> <strong>OPÇÃO</strong>  {{ product.skuName }} </span>

                            <section>
                                <!-- AUMENTAR/DIMINUIR QUANTIDADE PRODUTO NO CARRINHO  -->
                                <div>
                                    <span pwa-quantity-decrement>–</span>
                                    <input pwa-quantity-box>
                                    <span pwa-quantity-increment>+</span>
                                </div>
                                
                                <!-- PREÇO SEM DESCONTO -->
                                <small pwa--if="(product.price - product.discount) > 0 && product.discount > 0">{{ product.price | price }}</small>
                                
                                <!-- PREÇO COM DESCONTO -->
                                <small pwa--if="(product.price - product.discount) > 0">{{ (product.price - product.discount) | price }}</small>
                                
                                <!-- PRODUTO GRÁTIS (SERVE PARA BRINDES E COISAS DO TIPO) -->
                                <small pwa--if="(product.price - product.discount) <= 0">Grátis</small>
                            </section>
                        </article>
                    </div>
    
                    <a pwa-remove-item>  remover  </a>
                </div>
            </li>
        </ul>
      </div>
    </section>
  
    <footer>
        <!-- SUBTOTAL -->
        <div>  Subtotal: {{ $$cart.subtotal | price }} </div>

        <!-- CALCULAR FRETE -->
        <div>
            <div pwa--if="!freightLoading">
                <input  pwa-freight-box />
            </div>

            <button pwa-freight-submit>CALCULAR</button>

            <div pwa--if="freightLoading">
                carregando..
            </div>
            
            <!-- RESULTADO DA BUSCA PELO FRETE -->
            <span pwa-each-freight>
                <small pwa--if="freight.price > 0">{{ freight.title }}: {{ freight.price | price }}</small>
                <small pwa--if="freight.price <= 0">{{ freight.title }}: Grátis</small>
            </span>
        </div>

        <!-- APLICAR CUPOM DE DESCONTO  -->
        <div>
            <input pwa-coupon-box placeholder="digite seu cupom" />
            <button pwa-coupon-apply>Aplicar</button>

            <!-- SE O CUPOM FOR APLICADO CORRETAMENTE  -->
            <span pwa-with-coupon>✓</span>
        </div>

        <!-- VALOR TOTAL -->
        <div>
            Total {{ $$cart.total | price }}
        </div>

        <button pwa-has-items pwa-checkout>Finalizar compra</button>
    </footer>
</aside>
```

Controles utilizados acima:

| Controle                  | Descrição                                                                 
|---------------------------|-----------------------------------------------------------------------------------|
| `pwa-toggle-cart`         | Ação de <strong>abrir</strong> ou fechar o carrinho                               |
| `pwa-has-items`           | Verifica se existem produtos dentro do carrinho                                   |
| `pwa-each-item`           | Faz um loop trazendo os itens do carrinho, e acessando pelo atributo `product`    |
| `pwa-quantity-decrement`  | Diminui uma quantidade do produto                                                 |
| `pwa-quantity-box`        | Input que recebe a quantidade do produto                                          |
| `pwa-quantity-increment`  | Acrescenta uma quantidade do produto                                              |
| `pwa-remove-item`         | remove o produto do carrinho                                                      |
| `pwa-freight-box`         | input que recebe o CEP do frete                                                   |
| `pwa-freight-submit`      | Ação para calcular o frete                                                        |
| `pwa-coupon-box`          | input que recebe o valor do CUPOM                                                 |
| `pwa-coupon-apply`        | Ação que analisa o cupom e retorna se foi aplicado ou não                         |
| `pwa-with-coupon`         | Cupom retornado com sucesso                                                       |
| `pwa-checkout`            | Ação que envia o cliente para finalizar a compra no checkout                      |


## Como exibir o carrinho na tela

Após fazermos a criação do esqueleto base do carrinho no `HTML`, vamos precisar fazer a chamada
do seu componente no seu componente `Cabeçalho`, que é encontrado em [Código > Cabeçalho](/frontend/components/header).
Siga o Exemplo abaixo:

A chama do carrinho ela pode variar de acordo com sua necessidade. Por exemplo, caso queira fazer a chamada aplicando a regra
onde sempre que um produto for adicionado ele abra, basta inserir o controle `open-on-add`, porém, caso não tenha necessidade no seu projeto
basta inserir apenas a tag `<pwa-cart />`, lembrando de sempre <strong>fechar</strong> a tag.

```html
<header>
    <pwa-cart open-on-add/>
    <div class="pwat-cart__darken" id="pwat-cart__darken" pwa-toggle-cart></div>
</header>
```

Nota-se, que temos uma `<div>` a mais no código acima. O Seu uso é opcional, serve apenas para aplicar o efeito de escurecer a tela sempre que o carrinho
é aberto. Então para facilitar a vida do desenvolvedor, vamos utiliza-lo em nosso exemplo.

## Evento de abrir e fechar o carrinho

Estamos quase lá, o último ponto é criar um evento e fazer a chamada de seu método em algum botão para que o carrinho abra e fecha.
Para isso, vamos utilizar um evento [`hook`](/frontend/hooks/create) onde vamos criá-lo da seguinte forma:

No dashboard no menu lateral acesse <strong>Hooks</strong>, dentro de <strong>default</strong> ou em outra pasta personalizada, aplique o seguinte
código abaixo:

```js
"cart-on-toggle": component => {
    var cart = document.getElementById("pwat-cart");
    var darken = document.getElementById("pwat-cart__darken");

    if (cart) {
        if (cart.classList.contains("pwat-cart--open")) {
            darken.style.display = "none";
            component.$scroll.unlock();
        } else {
            darken.style.display = "block";
            component.$scroll.lock();
        }

        cart.classList.toggle("pwat-cart--open");
    }
    event.stopPropagation();
}
```

Temos por padrão do dashboard, o <strong>hook</strong> `cart-on-toggle`, é dentro dele que criamos a regra para abrir o modal do carrinho no front-end através 
do controle `pwa-toggle-cart`. Vamos ao conceito do código acima:

- variável `cart`: recebe o elemento do carrinho através do DOM.
- variável `darken`: rebece o elemento da tag `<div class="pwat-cart__darken" id="pwat-cart__darken" pwa-toggle-cart>`, que escurece a tela quando abre o carrinho.
- `component.$scroll.lock()`: Sempre que um modal é aberto, ele trava o conteúdo de fundo do site, deixando apenas o modal em funcionamento.
- `component.$scroll.unlock()`: Sempre que um modal é fechado, ele volta o funcionamento do site normalmente.

Temos algumas classes no css, que dão vida ao funcionamento do método e ao layout em funcionamento. Sendo elas `pwa-cart--open`, `pwa-cart`, e `pwat-cart__darken`.
<strong>Lembrando que não é obrigatório as classes seguirem esse padrão de nomenclatura.</strong>

```css
.pwat-cart {
  width: 0;
  visibility: hidden;
  opacity: 0;
  top: 0;
  z-index: -1;
  transition: all .25s ease-in;
  position: fixed;
  display: flex;
  flex-flow: column;
  background: #fff;
  height: 100vh;
  right: 0;
  padding: 0 0;
  text-transform: none !important;
  font-weight: 400 !important
}
.pwat-cart--open {
  transition: all .25s ease-in;
  width: 25vw;
  min-width: 280px;
  max-width: 350px;
  visibility: visible;
  opacity: 1;
  z-index: 10001;
}
.pwat-cart__darken {
  width: 100%;
  background: #000000a6;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 998;
  position: fixed;
  display: none;
}
```

Feito! Agora o seu carrinho já criou vida, provavelmente não vai estar estilizado da melhor forma, mas os passos acima te dará uma boa noção de como
fazer a implementação e funcionamento. Por fim, um exemplo para acionar o carrinho `<button pwa-toggle-cart> Carrinho </button>`.


## Hooks Padrões da PWA para o Carrinho

Lista de hooks padrões do carrinho. Lembrando que os `hooks` padrões, não traz os caracteres `--` antes do nome.

```js
    "cart-transformer": (component, cart, setCart) => {
        /*
            Sempre que o carrinho sofre alguma mutação, seja a inserção, atualização ou remoção de produtos,
            o hook é acionado.
            parâmetros:
            - cart: é o objeto carrinho após a mutação. Não é obrigatório o seu uso.
            - setCart: usado para aplicar uma nova configuração no carrinho caso você necessite fazer.
            Como exemplo: Você poderia inserir um novo campo no carrinho para auxiliar em alguma funcionalidade.
            Após a inserção desse campo, é importante que você acione o setCart(novoCarrinho), passando como 
            parâmetro o novo objeto do carrinho que você usou para inserir tal campo. Obs.: Não é obrigatório seu uso.
        */
    },


    "cart-on-loaded": component => {
        /*
            Executa alguma ação após o carrinho ser carregado
        */
    },

    
    "cart-on-add": (component, product, quantity) => {
        /*
            Intercepta o carrinho antes de fazer a inserção de um produto
            parâmetros:
            - product: produto que foi adicionado ao carrinho
            - quantity: quantidade do produto
        */
    },

    "cart-on-added": (component, product, quantity) => {
        /*
            Executa alguma ação após um produto ser adicionado no carrinho
            parâmetros:
            - product: produto a ser adicionado
            - quantity: quantidade do produto a ser adicionado
        */
    },

    "cart-bundle-on-add": (component, dataToCart, products) => {
        /*
            Intercepta o carrinho antes de fazer a inserção dos produtos em massa (USADO GERALMENTE EM B2Bs)
            parâmetros:
            - dataToCart: dados que estão sendo enviados para o carrinho
            - products: produtos a serem enviados
        */
    },
    
    "cart-on-remove": (component, product) => {
        /*
            Executa alguma ação antes um produto ser removido do carrinho
            parâmetros:
            - product: produto que foi removido
        */
    },

    "cart-on-removed": (component, product) => {
        /*
            Executa alguma ação após um produto ser removido do carrinho
            parâmetros:
            - product: produto que foi removido
        */
    },

    "cart-on-update": (component, product, quantity) => {
        /*
            Executa alguma ação antes de um produto ser atualizado no carrinho
            parâmetros:
            - product: produto que foi removido
            - quantity: quantidade do produto atualizado
        */
    },
    

    "cart-on-updated": (component, product, quantity) => {
        /*
            Executa alguma ação após um produto ser atualizado no carrinho
            parâmetros:
            - product: produto que foi removido
            - quantity: quantidade do produto atualizado
        */
    },

    "cart-on-coupon": (component, coupon, insert) => {
        /*
            Executa alguma ação após um cupom ser aplicado no carrinho
            parâmetros:
            - coupon: cupom aplicado no carrinho
            - insert: true para adicionar, false para remover um cupom
        */
    },

    "cart-on-coupon-inserted": (component, coupon) => {
        /*
            Executa alguma ação após um cupom ser aplicado no carrinho
            parâmetros:
            - coupon: cupom aplicado
        */
    },

    "cart-on-coupon-removed": (component, coupon) => {
        /*
            Executa alguma ação após um cupom ser removido do carrinho
            parâmetros:
            - coupon: cupom removido
        */
    },

    "cart-on-toggle": component => {
        /*
            Hook que faz parte do funcionamento de abrir e fechar o carrinho.
            Geralmente é utilizado código JS como exemplo:
            document.querySelector('#cart').classList.toggle('ativo')
            para exibir ou ocultar o modal do carrinho.
        */
    },

    "cart-on-gift": component => {
        /*
            Intercepta o carrinho para que você possa validar se existe algum gift
        */
    },

    "cart-add-gift": component => {
        /*
            por aqui você consegue quando um usuário adiciona um Gift no carrinho;
        */
    },

    "cart-to-checkout": component => {
        /*
            Executa alguma ação antes de enviar o usuário ao checkout.
        */
    }

    "cart-freight-search": (component, freight) => {
        /*
            Intercepta a ação de calcular o frete para realizar a 
            função implementada nesse hook
            parâmetros
            - freight: CEP digitado
        */
    }
```