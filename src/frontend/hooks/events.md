# Manipulações, Eventos e Padrões

## Reaproveitando Hooks

Através de um `Hook` criado, você consegue fazer a chamada do mesmo dentro de outro hook, como se fossem duas funções diferentes, fazendo assim um reaproveitamento melhor de código e padronizando seu funcionamento. Exemplo básico:

```js
"--hello-world": (component, el, msg = 'printando hook 1') => {
    console.log('Hello World');
    console.log(msg);
    console.log(el);

    // RESULTADO
    // 1º Console: Hello World
    // 2º Console: printando hook 1
    // 3º Console: <div id="div1"></div>
},

"--exibindo-hello-world": (component, el) => {
    component.$hook('--hello-world', component, el, 'printando hook 2');

    // RESULTADO
    // 1º Console: Hello World
    // 2º Console: printando hook 2
    // 3º Console: <div id="div2"></div>
}
```

Seguimos com o seguinte HTML para a chamada dos hooks

```html
    <div pwa-hook="hello-world" id="div1"></div>
    <div pwa-hook="exibindo-hello-world" id="div2"></div>
```

## Utilizando Parâmetro `component`

O Parâmetro `component`, como o próprio nome já diz, ele nada mais é do que um atalho para acessar todos as informações do componente em que você irá disparar o hook. Se o hook está sendo chamado dentro do componente `Carrinho`, você terá acesso às informações do carrinho dentro do Hook, assim como a página Home, Produto, Cartão de Produto entre outros. Podendo então, manipular a visualização dos dados.

```js
{
    "--exibindo-info-carrinho": component => {
        console.log(component.$$cart.subtotal)
    }
}
```

Através do objeto `component`, estamos acessando o mesmo `$$cart` que é responsável por exibir as informações do componente `Carrinho` no dashboard da loja. Essa manobra pode ser muito útil para exibir alguma informação extra, aplicando as alterações via JS através do DOM.


## Tipos de Eventos

Existem outras formas de acionar um `Hook`, não sendo apenas executado sempre que a componente é carregado. Também podemos utilizar através de eventos conhecidos no JavaScript, como exemplo, eventos de Click, MouseOver e etc. A funcionalidade é bem simples, basta colocar `pwa-hook.event_name`. Abaixo temos um exemplo utilizando o click.

```html
    <button pwa-hook.click="hello-world"></button>
```

Ao clicar no botão, teremos como resultado o mesmo valor citado acima no hook `hello-world`.
```js
// RESULTADO
// 1º Console: Hello World
// 2º Console: printando hook 1
// 3º Console: <div id="div1"></div>
```

Para saber mais sobre os eventos, basta clicar em <a href="https://developer.mozilla.org/pt-BR/docs/Web/Events" target="_blank"> Lista de eventos</a>.

## Hook Padrões Gerais

Lista de hooks padrões na PWA. Lembrando que os `hooks` padrões, não traz os caracteres `--` antes do nome.
<strong>
Obs.: Por uma questão de organização, e de fácil localização, os hooks padrões dos `Componentes` e `Páginas` da PWA se encontram em suas respectivas documentações.
</strong>

```js
    
    "on-init": component => {
        /* 
            Executado no inicio do carregamento do projeto, ou seja, antes do projeto ter toda sua estrutura carregada.
        */
    },

    "on-page-*": component => {
        /* 
            Executa sempre que qualquer página for carregada.
        */
    },
    
    "on-page-{page}": component => {
        /* 
            Com a mesma função do hook "on-page-*", porém você pode utilizar apenas para páginas customizadas. Ex.: Você criou uma nova página no dashboard chamada "Sobre nós" cuja sua rota é "sobre-nos", você vai utilizar o nome da rota para aplicar no lugar do {name}, portanto a nomenclatura correta do hook fica "on-page-sobre-nos".

            Portanto, além das páginas customizadas, existem páginas padrões da PWA que você pode utilizar para:
            - "on-page-category"
            - "on-page-search"
            - "on-page-home"
            - "on-page-product"
            
            Também  pode ser utilizado para as páginas do checkout do projeto, como:
            - "on-page-dsc-verify"
            - "on-page-dsc-register"
            - "on-page-dsc-login"
            - "on-page-dsc-profile"
            - "on-page-dsc-address"
            - "on-page-dsc-shipping"
            - "on-page-dsc-payment"
            - "on-page-dsc-confirmation"
            - "on-page-dsc-success"
        */
    },

    "attribute-filter-on-select": (component, element, filter) => {
        /* 
            É chamado quando um filtro do attribute-filter é selecionado
            element e filtro são parâmetros padrões para esse hook, onde o 
            'element' traz a tag que está aplicando o filtro, e o 'filter' traz o Objeto do filtro aplicado. 
        */
    },

    "category-list-{name_component}-before-load": component => {
        /* 
            Intercepta a busca de uma categoria, podendo realizar alguma ação com a mesma, o {name_component} será o nome
            passado no atributo "name" da tag <pwa-category-list name=""> que deseja interceptar para realizar a ação. O Nome do hook portanto ficaria por exemplo:
            "category-list-nome_tag_component-before-load".

            Lembrando que através do "component" você consegue ter acesso à lista de categorias listadas, ex.: console.log(component.list) para visualizar o retorno.
        */
    },

    "category-list-{name_component}-after-load": component => {
        /* 
            Após o carregamento da lista de categorias poderá ser realizado alguma ação com a mesma, o {name_component} será o nome passado no atributo "name" da tag <pwa-category-list name=""> que deseja interceptar para realizar a ação. O Nome do hook portanto ficaria por exemplo:
            "category-list-nome_tag_component-before-load".

            Lembrando que através do "component" você consegue ter acesso à lista de categorias listadas, ex.: console.log(component.list) para visualizar o retorno.
        */
    },

    "instagram-feed-loaded": component => {
        /*
            Realiza alguma ação após o feed do componente padrão de instagram da PWA ser carregado.
        */
    },

    "manual-filter-on-changed": component => {
        /*
            Sempre que um filtro manual é alterado, após seu carregamento será possivel realizar algum tipo de ação através deste hook. Para saber mais sobre filtros, acesse no Menu Lateral > Páginas > Categoria/Pesquisa.
        */
    },

    "newsletter-on-sended": component => {
        /*
            Realiza alguma ação após enviar os dados de newsletter do cliente.
        */
    },

    "product-configurations-on-search": component => {
        /*
            Intercepta a busca das configurações de um produto para realizar alguma ação. Isso acontece antes das configurações serem buscadas.
        */
    },

    "on-active-sku-changed": component => {
        /*
            Após o sku atual de um produto ser alterado, você poderá utilizar esse hook para realizar alguma tipo de ação.
        */
    },

    "product-configurations-transformer": (component, configurations) => {
        /*
            Caso queira adicionar dados nas variações do produto ou por algum motivo modificá-las após a busca das configurações ser realizada.
            parâmetros:
            - configurations: Configurações a serem modificadas
        */
    },

    "product-linkeds-on-search": component => {
        /*
            Intercepta a busca de produtos (relacionados, similares, entre outros..), para realizar algum tipo de ação antes da busca ocorrer dee fato.
        */
    },

    "product-linkeds-{type}-loaded": component => {
        /*
            Após o carregamento do componente product-linkeds, você poderá utilizar o hook para carregar o slide dos produtos da tag/componente citado, sem a necessidade de criar um hook personalizado que faça isso, é recomendado que este hook seja utilizado devido a sua segurança na hora de montar o layout de slide dinâmico na tela sem correr o risco do layout ser montado ou acionar qualquer tipo de evento antes dos produtos serem buscados, o que poderá ocasionar em algum erro ou quebra de layout.

            O {type}, é o name="" que você passou como parâmetro na tag <pwa-product-linkeds name="my-similars"> como exemplo. Então seguindo o mesmo exemplo do nome my-similars o nome deste hook seria "product-linkeds-my-similars-loaded".
        */
    },

    "product-list-{name}-loaded": component => {
        /*
            Do mesmo formato que trabalha o hook "product-linkeds-{type}-loaded", esse aqui serve para listagem de produtos em geral, podendo criar e acionar slides dinâmicos em qualquer página do seu projeto. Para saber um exemplo de utilização desse hook, no menu lateral vá em Páginas > Home, onde você encontrará a explicação da criação de um slide de vitrine de produtos. O {name} é o valor do parâmetro "name=" passado no componente <pwa-product-list name="vitrine-exemplo">.
            
            Seguindo então o parâmetro "name" de exemplo acima, o nome desse hook seria: "product-list-vitrine-exemplo-loaded".
        */
    },

    "product-variations-on-search": component => {
        /*
            Intercepta a busca das variações de um produto, podendo realizar qualquer tipo de ação/evento antes da busca.
        */
    },

    "result-list-on-searched": component => {
        /*
            Após a busca dos produtos nas telas de Categoria/Pesquisa, o hook é acionado para que seja realizado qualquer tipo de ação/evento.
        */
    },

    "search-form-on-submit": component => {
        /*
            Antes de redirecionar o usuário para a busca feita por ele através do "Formulário de Busca de Produtos", o hook poderá ser acionado para realizar algum tipo de ação/evento.
        */
    },

    "stock-alert-on-sended": component => {
        /*
            Após o cliente final enviar os dados para o formulário "Avise-me" na tela de produto, o hook poderá ser acionado para realizar algum tipo de ação/evento.
        */
    },

    "variation-filter-on-select": (component, filter) => {
        /*
            Intercepta a seleção de um filtro personalizado (para saber mais sobre filtros personalizados acesse Páginas > Categoria/Pesquisa > Filtros > "Filtros Customizados"), podendo realizar algum tipo de ação/evento. A ação/evento desse hook acontecerá antes do filtro ser setado pelo cliente final.
            
            parâmetros:
            - filter: O filtro selecionado pelo cliente.
        */
    },

    "+authentication-on-logout": component => {
        /*
            Realiza alguma ação/evento no momento em que o usuário fez o logout.
        */
    },

    "-freight-on-search": component => {
        /*
            Intercepta a busca do frete para realizar algum tipo de ação/evento.
        */
    },

    "-sku-automatic-installment": component => {
        /*
            Intercepta o calculo da quantidade e preço do parcelamento de um produto, para realizar alguma ação/evento.
        */
    },

    "product-quantity-changed": component => {
        /*
            Sempre que a quantidade de um produto é alterada no carrinho, tela de produto e etc.., poderá ser feita alguma ação/evento.
        */
    },

    "on-page-account-{screen}": component => {
        /*
            Sempre que uma das páginas de "minha conta" do cliente for carregada, será possível realizar algum tipo de ação/evento.
            Páginas para a montagem deste hook:
            - "on-page-account-wishlist"
            - "on-page-account-orders"
            - "on-page-account-profile"

            Obs.: O Atributo {screen} será substituido por "wishlist, orders ou profile" para que o hook funcione corretamente.
        */
    },

    "+account-to-wishlist-product": component => {
        /*
            Hook acionado sempre que o usuário clicar em algum produto da tela de favoritos, no qual será redirecionado para a tela de detalhe daquele produto.
        */
    },

    "+account-upgrade-on-before": component => {
        /*
            Intercepta a atualização dos dados da conta do cliente podendo realizar algum tipo de ação/evento. Lembrando que o hook será executado antes da chamada da função de atualização das informações.
        */
    },

    "+authentication-confirmation-on-before": component => {
        /*
            Intercepta a confirmação de autenticação do usuário, podendo realizar alguma ação/evento antes da execução acontecer.
        */
    },

    "+authentication-on-screen": (component, screen) => {
        /*
            Intercepta a autenticação do usuário em qualquer página do seu projeto, podendo realizar alguma ação/evento antes da execução do método de autenticação. 

            Parâmetros:
            - screen: Nome da página na qual o usuário será autenticado.
        */
    },

    "+authentication-user-initialized": component => {
        /*
            Após a autenticação de um usuário ser inicializada, poderá ser feito alguma ação/evento.
        */
    },

    "+authentication-signin-on-before": component => {
        /*
            Antes da autenticação de um usuário ser realizada, poderá ser feito alguma ação/evento.
        */
    },

    "+authentication-on-logged": component => {
        /*
            Após o usuário ser autenticado, poderá ser feito alguma ação/evento.
        */
    },

    "+authentication-signin-on-forgot": component => {
        /*
            Intercepta a ação de enviar o código de validação no email do cliente para recuperação de senha. Assim poderá ser feita alguma ação/evento antes de ocorrer o envio do token.
        */
    },

    "+authentication-signup-on-before": component => {
        /*
            Intercepta a ação de enviar o cadastro do cliente para que seja realizada alguma ação/evento. Lembrando que o hook será disparado antes da execução dos métodos de envio do cadastro.
        */
    },

    "+authentication-signup-on-after": component => {
        /*
            Após o cliente enviar o seu cadastro, o hook será disparado para que seja realizado algum evento/ação.
        */
    },

    "+budget-on-init": component => {
        /*
            Hook será disparado após o carregamento do componente de formulário de cadastro do cliente.
        */
    },

    "+budget-on-success": (component, order) => {
        /*
            Após o orçamento ser finalizado, o hook será executado para que seja feita alguma ação/evento. Um ótimo exemplo seria fazer traqueamento do orçamento. 
            Parâmetros:
            - order: Objeto retornado com as informações do orçamento.
        */
    },

```