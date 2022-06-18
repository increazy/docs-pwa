# Rodapé

## Implementando Newsletter

Segue o exemplo de código abaixo, e logo sua explicação:

```html
<pwa-newsletter>
    <!--  campo de nome -->
    <div>
        <label for="pwat-nlt__name">Nome</label>
        <input pwa-name-box id="pwat-nlt__name" />
    </div>

    <!--  campo de email -->
    <div>
        <label for="pwat-nlt__email">Email</label>
        <input pwa-email-box id="pwat-nlt__email"/>
    </div>

    <!-- loading de carregamento enquanto envia ou recebe alguma informação  -->
    <pwa-hidden>
        <div pwa-is-loading>
            Carregando..
        </div>
    </pwa-hidden>

    <!-- botão de cadastrar  -->
    <button pwa-not-loading>Cadastrar</button>
</pwa-newsletter>
```

A implementação do <strong> newsletter </strong> é bem simples, os pontos mais importantes a ficarem atentos acima
são os controles `pwa-name-box` e `pwa-email-box`. A tag pai `pwa-newsletter` representa um formulário padrão do HTML
por isso, não tem necessidade de colocar qualquer tipo de função no botão <strong> Cadastrar</strong>, pois quando não existe
qualquer chamada de método ou até mesmo o `type="submit"` ele vai entender que o type já é do tipo `submit`.

- Um ponto importante, os controles `pwa-name-box` e `pwa-email-box` por padrão já vai trazer o tipo do input, se o input
será `text` ou do tipo `email`, portanto, não tem necessidade de inserir `type="text"` entre outros para identificar o tipo
do campo.


| Controle                  | Descrição                                                                 
|---------------------------|------------------------------------------------------------------|
| `pwa-name-box`            | Recebe o valor do nome enviado pelo usuário                      |
| `pwa-email-box`           | Recebe o valor do email enviado pelo usuário                     |
| `pwa-is-loading`          | Quando a requisição está carregando, o loading entra em ação     |


## Links e Âncoras

Nas informações do rodapé sempre inserimos informações sobre politicas, trocas, páginas institucionais em geral. Então baixo 
segue alguns exemplos já aplicados no HTML, fazendo a chamada dessas páginas e links âncoras para alguma sessão.

```html
    <a pwa-is-logged pwa-to-account>Meu Cadastro</a>
    <a pwa-is-logged pwa-to-orders>Meus Pedidos</a>

    <!-- pagina-customizada é a rota da página criada no dashboard -->
    <a pwa-to-page="pagina-customizada">Página Customizada</a>

    <!-- 
        Link de busca, onde levará para a página de buscas e o resultado será
        todos os produtos que contém "Produto X" 
    -->
    <a pwa-to-search="Produto X">Produto X</a>

    <!-- Links que levam para outra página em uma sessão específica -->
    <a pwa-to-page="/nome-pagina#sessao-x"> </a>

    <!-- Sessão específica da mesma página -->
    <a href="#sessao-x"></a>
```

Lembrando, que o controle `pwa-to-page` leva o cliente para qualquer página do projeto, porém temos algumas ocasições específicas.

- Páginas Criadas no Dashbaord: `pwa-to-page="caminho-da-pagina"`. Não é necessário colocar o `/` antes da rota, pois como é uma página
criada no dashboard, ele já vai reconhecer automáticamente.
- Categorias: `pwa-to-page="/nome-categoria"`, aqui temos a aplicação do caractere `/` antes, pois se trata de uma rota dinâmica, onde o <strong> dashboard </strong> interpreta como uma página desconhecida até o momento de sua validação de que aquela categoria realmente existe, caso não existir o usuário é enviado automáticamente para a página de `not-found`.

| Controle                  | Descrição                                                                 
|---------------------------|-------------------------------------------------------------------------------|
| `pwa-to-account`          | Redireciona o usuário para o seu perfil (É necessário login)                  |
| `pwa-to-orders`           | Redireciona o usuário para para ver seus pedidos  (É necessário login)        |
| `pwa-to-page`             | Redireciona para uma rota (páginas estáticas ou categorias) do seu projeto    |
| `pwa-to-search`           | Redireciona para a página de busca do projeto                                 |