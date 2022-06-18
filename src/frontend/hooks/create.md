# Criando novo Hook

## Introdução

Os `Hooks` exerce uma função muito importante nas PWAs, que vai muito além de um código feito com javascript comum, a vantagem da utilização dos hooks, se dá pelo fato de ser `asyncrono`, ou seja, ele aguarda o carregamento dos componentes da PWA para depois ser inicializado, isso traz uma confiança maior para o carregamento de informações trazidas direto do back-end, evitando quebra de conteúdo ou erros de eventos que não são executados devido à ausência de elementos que não foram processados e listados pela PWA.

## Como criar um hook customizado
O Exemplo abaixo, mostra a criação de um `hook` básico e `customizado`, onde sua principal função é rodar um `console.log('Hello World!')` assim que a página onde a `<div></div>` listada abaixo for carregada.

<strong>Arquivo Hook</strong>

```js
"--hello-world": component => {
    console.log('Hello World!');
}
```

<strong>Página/Component HTML</strong>

```html
<div pwa-hook="hello-world"></div>
```

Explicando um pouco sobre o código acima, temos a criação de um `hook customizado`, por que customizado? Se nota pelos `--` antes do nome `hello-world`, o motivo dessa customização é devido aos hooks padronizados que a PWA já traz com ela, ou seja, o usuário não poderá modificar os `hooks` `padronizados` pois os mesmos já possuem nomes e funções pré-definidas. Então passando os `--` antes de qualquer nomenclatura dos hooks, a pwa entende que é um hook totalmente novo e pronto para receber qualquer tipo de função.

Seguindo a sintaxe da criação do hook, nota-se um parâmetro chamado `component`, ele é o responsável por trazer as informações do componente em que se encontra o HTML, essas informações inclui as funções, atributos entre outros relacionados. Mais detalhes sobre o `component` <a href="#">podem ser encontrados aqui</a>.

## Adicionando parâmetros no hook

Seguindo a mesma estrutura de código acima, existe a possibilidade de você adicionar parâmetros no hook, para uma manipulação mais legível e simplificada do seu código HTML.

<strong>Arquivo Hook</strong>

```js
"--hello-world": (component, el, msg) => {
    console.log(el); // Resultado: <div id="identificacao"></div>

    console.log(msg); // Resultado: 'Enviando Alguma Coisa'

    console.log('Hello World!');
}
```

<strong>Página/Component HTML</strong>

```html
<div pwa-hook="hello-world:Enviando Alguma Coisa" id="identificacao"></div>
```

Começando pela implementação HTML, vemos que o `pwa-hook` ganhou um novo parâmetro, que no caso é uma string passada logo após os `:` dentro de duas aspas simples `''` sem conter espaçamento, essa informação é acessada através do nosso parâmetro `msg` criado na estrutura do hook. Ok, mas onde está o valor do parâmetro `el` ? Por padrão, a pwa de forma oculta, já possui esse parâmetro aplicado, então você passando qualquer outro parâmetro após o `component` a pwa vai entender que você quer acessar o `tag elemento` do seu HTML, então a escolha do nome para esse parâmetro fica a seu critério, nesse exemplo, estamos usando como apenas `el`.
