# Montando menu de categorias e subcategorias

Está pesquisando como alimentar o menu e submenu de categorias da sua loja? Se sim, está no lugar certo! Vamos iniciar com um código simples, onde montamos uma lista com as categorias de level `2`, que normalmente são as categorias principais de uma loja:

```html
<pwa-category-list name="menu-principal" level="2" class="menu-list">
    <p pwa-is-loading>Carregando...</p>
    <ul pwa-not-loading>
        <li pwa-each-category>
            <a pwa-to-category-page>{{ category.name }}</a>
        </li>
    </ul>
</pwa-category-list>
```

Nesse exemplo usamos o componente `category-list` enviando para ele um nome da lista e o level das categorias que ele deve buscar. Além dessa declaração, fizemos alguns controles para mostrar o layout:

- Com `pwa-is-loading` mostramos uma mensagem padrão enquanto as categorias não foram buscadas.
- Com `pwa-not-loading` deixamos de exibir a mensagem de loading para mostrar a lista das categorias achadas.
- No `pwa-each-category` percorremos a lista das categorias encontradas, então cada `li` será uma categoria.
- Usando `pwa-to-category-page` na tag `a` adicionamos o `href` dinâmico e a ação de clique para direcionar o cliente para a categoria especifica.
- Por fim, exibimos o nome da categoria na lista usando `category.name` entre mustaches.

<strong style="color:blue">Nota:</strong> o uso do controle de loading é opcional, dado que normalmente a busca demora apenas cerca de 150ms.

Além do `name` e do `level` você pode enviar algumas outras propriedades:

| Propriedade  | Descrição                                                                 | Uso                         |
|--------------|---------------------------------------------------------------------------|-----------------------------|
| size         | Limita o tamanho da lista                                                 | `size="5"`                    |
| parent       | Pega categorias filhas desse parente, baseado no ID                       | `parent="15"`                 |
| active-class | Classe que mostra se o cliente está na categoria                          | `active-class="list--active"` |
| force-order  | Força a lista a seguir uma  ordem baseada em id                           | `force-order="16,5,2" `       |
| path         | Pega categorias filhas da categoria com a URL enviada                     | `path="/esporte" `            |
| submenu      | Indica o nome de outro category-list para enviar as subcategorias para lá | `submenu="menu-secundario"`   |

## Adicionar um campo de busca de categoria

Em menus com muitas categorias às vezes se torna necessário oferecer ao cliente uma forma melhor de encontrar uma categoria da lista. Para isso você pode criar um campo de busca assim:

```html
<input pwa-search-box>
```

Como esse `input` estará dentro do componente `category-list` a PWA entenderá automaticamente que ele deve atualizar a lista de categorias a cada caractere digitado.

## Criando listas de subcategorias

Lojas normalmente possuem 2 ou mais níveis de categoria, então se torna necessário exibi-los. Para isso a PWA oferece duas soluções:

### Menus hierárquicos

Quando o menu de subcategorias está dentro do elemento da categoria principal, exemplo:

```html
<pwa-category-list name="menu-principal" level="2" class="menu-list">
    <p pwa-is-loading>Carregando...</p>
    <ul pwa-not-loading>
        <li pwa-each-category>
            <a pwa-to-category-page>{{ category.name }}</a>

            <pwa-subcategory-list>
                <ul pwa-has-subcategory>
                    <li pwa-each-subcategory>
                        <a pwa-to-subcategory-page>{{ subcategory.name }}</a>
                    </li>
                </ul>
            </pwa-subcategory-list>
        </li>
    </ul>
</pwa-category-list>
```

Note que a lista de subcategorias acaba ficando dentro do elemento com `pwa-each-category`, logo ela é hierarquica, então basta usarmos o componente `subcategory-list` para buscar e listar o submenu. Sempre indicamos que o menu seja feito dessa maneira, pois assim a semântica  da sua loja ficará mais clara para o SEO.

### Não hierárquivo (avulso)

Normalmente usado em lojas onde o menu é mais complexo, torna a lista de subcategorias totalmente independente da lista de categorias, veja um exemplo?

```html
<pwa-category-list name="menu-principal" level="2" submenu="menu-secundario" class="menu-list">
    <p pwa-is-loading>Carregando...</p>
    <ul pwa-not-loading>
        <li pwa-each-category pwa-show-list.mouseenter="menu-secundario">
            <a pwa-to-category-page>{{ category.name }}</a>
        </li>
    </ul>
</pwa-category-list>

<pwa-category-list name="menu-secundario" class="submenu-list">
    <h2 pwa-has-category>{{ main_category.name }}</h2>
    <p pwa-is-loading>Carregando subcategorias...</p>
    <ul pwa-not-loading>
        <li pwa-each-category pwa-show-list.mouseenter="menu-secundario">
            <a pwa-to-category-page>{{ category.name }}</a>
        </li>
    </ul>
</pwa-category-list>
```

Agora note que menu de subcategorias não está mais dentro do menu principal, é como se fosse um menu independente. Apenas indicamos para o principal que ele irá usar o `menu-secundario` como `submenu`, e indicamos que ele deve mostrar a lista do menu secundário no evendo `mouseenter` do `li` de cada categoria.