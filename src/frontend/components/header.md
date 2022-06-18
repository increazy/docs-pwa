# Cabeçalho

O Header varia muito de loja para loja. Porém, temos algumas dicas de como você pode criar e padronizar 
o seu cabeçalho, trazendo informações automáticas do seu back-end para o menu, chamada de controles para o 
login, favoritos e etc.

## Controles de redicionamento padrões

```html
    <!-- Chamada do componente carrinhno -->
    <pwa-cart open-on-add/>

     <!-- Redirecionamento para o login/cadastro -->
    <a pwa-not-logged pwa-to-auth>
        <span>Olá! Acesse sua conta</span>
    </a>

    <!-- Redirecionamento para o "perfil" após estar logado -->
    <a pwa-is-logged pwa-to-account>
        <span>Bem vindo! {{ $$user.firstname }}</span>
    </a>

    <!-- Ir para os favoritos quando estiver logado -->
    <a pwa-is-logged pwa-to-wishlist>
        <span>Meus Favoritos</span>
    </a>

    <!-- Caso não esteja logado, o botão de meus favoritos 
        pode manter apenas com a tag pwa-not-logged abaixo,
        Assim, força o cliente a logar para ver os favoritos -->
    <a pwa-not-logged>
        <span>Meus Favoritos</span>
    </a>
```

## Formulário de busca

Formulário de busca, onde o cliente digita alguma palavra e a PWA retorna os produtos sugestivos de
acordo com a palavra que o cliente digitou.

```html
    <!-- Formulário de busca + sugestões encontradas -->
    <pwa-search-form size="5">
        <input pwa-search-box placeholder="O que está buscando ?">

        <div pwa-has-suggest>
            <article pwa-each-suggest>
                <img pwa-src="suggest.image" pwa-alt="suggest.name">
                <div>
                    <h2>{{ suggest.name }}</h2>
                    <small pwa--if="suggest.activeSKU.sale_price > 0">
                    {{ suggest.activeSKU.sale_price | price }}</small>
                    <small pwa--if="suggest.activeSKU.sale_price <= 0">Produto esgotado</small>
                </div>
            </article>
        </div>

        <a pwa-has-suggest pwa-search-button>Ver todos</a>
    </pwa-search-form>
```
- Nota-se que a tag `pwa-search-form` possui um atributo `size`, ele indica qual o máximo de produtos 
que você quer que retorne na busca feita pelo cliente.

| Controle                  | Descrição                                                                 
|---------------------------|-----------------------------------------------------------------------------------|
| `pwa-search-box`          | (Input) Reconhecer o valor digitado e validar a request                           |
| `pwa-has-suggest`         | Verifica se encontrou algum produto da busca                                      |
| `pwa-each-suggest`        | traz todos os itens encontrados na busca                                          |
| `pwa-search-button`       | Botão para ver todos os resultados encontrados nas sugestões                      |

- Temos também o objeto `suggest`, que traz as informações dos produtos encontrados.

## Menu de Categorias e Subcategorias 

Listagem das categorias e subcategorias buscadas do back-end do projeto. É apenas uma sugestão, mas caso queira
que as categorias sejam trazidas manualmente passando tags de listagens fixas, fique à vontade. 

```html
    <!-- Lista de categorias e subcategorias (trazidos automáticamente automáticos) -->
    <pwa-category-list level="2" name="main-menu" size="10">
      <ul>
        <pwa-loop params="10">
            <li pwa-each-category>
                <a
                    pwa-show-list.mouseover="sub-main-menu"
                    pwa-to-category-page
                >
                    {{ category.name }}
                </a>

                <pwa-category-list name="sub-main-menu" size="10">

                    <a pwa-to-category-page>
                        <h2 pwa-has-category>  {{ main_category.name }} </h2> 
                    </a>

                    <div>
                        <pwa-loop params="8">
                            <a
                                pwa-each-category
                                pwa-to-category-page
                            >
                                {{ category.name }}
                            </a>
                        </pwa-loop>
                    </div>
                </pwa-category-list>
          </li>
        </pwa-loop>
      </ul>
    </pwa-category-list>
```
A tag principal, é a `pwa-category-list`, que não sendo apenas uma tag comum, ela simboliza a chamada de um componente 
que é responsável por buscar a árvore de categorias do projeto. 

Dentro da tag `pwa-category-list` temos alguns atributos que influenciam na busca das categorias, são eles: `level`, `size` e `name`.
O `level` sinalize a partir de qual nível da árvore você quer buscar suas categorias. Por padrão, o Magento 2 começa a listagem
de suas categorias a partir do nível "2", isso porque o primeiro nível é o "Default Category" ou "categoria padrão", já o `size`
seria a quantidade de categorias que você deseja buscar, e o `name`, nomeando ao nosso primeiro nível buscado na árvore
de categorias.

- Já dentro do nosso componente, temos algumas outras tags, `pwa-loop` que nada mais cria um loop de quantas categorias você está 
buscando através do atributo `params`. E utilizando o mesmo processo de buscar as categorias, fazemos para buscar as <strong>subcategorias</strong> através da tag `pwa-category-list`, porém, dessa vez passamos o atributo `name` indicando que é um submenu.


| Controle                                  | Descrição                                                                 
|-------------------------------------------|-----------------------------------------------------------------------------------|
| `pwa-each-category`                       | Loop de categorias/subcategorias encontradas                                      |
| `pwa-to-category-page`                    | redireciona o usuário para a tela da categoria clicada                            |
| `pwa-show-list.mouseover="sub-main-menu"` | força o carregamento das subcategorias ao passar o mouse em cima da categoria     |