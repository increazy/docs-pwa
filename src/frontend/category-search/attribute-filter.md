# Criar filtro de algum atributo

Nessa parte você precisará voltar ao [Elastic](/frontend/catalog/elastic) para relembrar os atributos, aqui nós iremos pedir parra a PWA criar lista de atributos filtráveis. Assim como você vê em várias lojas, filtros de marcas, de condição, entre outros:

```html
<pwa-attribute-filter static multiple attribute="product_brands">
    <h2>Marcas</h2>
    <ul pwa-has-filters>
        <li pwa-each-filter pwa-filter-input="data-checked">
            {{ filter.label}} ({{ filter.count}})
        </li>
    </ul>
</pwa-attribute-filter>
```

A váriavel `filter` representa cada dado encontrado no atributo, nele temos o `label` com o valor do filtro e o `count` com a quantidade de produtos que inclui esse filtro.

<strong style="color:red">Atenção:</strong> Se você estiver tentanod criar um filtro de categorias use `categories.code` como `attribute` e na exibição use a variável `filter.name` no lugar de `filter.label`. Isso se torna necessário para termos um filtro mais fidedigno.

Note que usamos algumas propriedades e passamos para o `attribute-filter`, veja uma lista  detalhada sobre cada uma:

| Propriedade | Descrição                                                                                                                     | Uso                |
|-------------|-------------------------------------------------------------------------------------------------------------------------------|--------------------|
| attribute   | Indica em qual atributo a ser buscado, veja no Elastic os nomes                                                               | `attribute="brand"` |
| multiple    | Permite a seleção de mais de uma opção do filtro                                                                              | `multiple`           |
| static      | Trava a atualização da lista do filtro, mesmo que os produtos mudem a lista permanecerá estática                              | `static`             |
| sort        | Ordena a lista de filtros encontrada, usando a label em ordem crescente ou decrescente                                        | `sort="-"`           |
| size        | Determina o tamanho máximo de itens na lista do filtro                                                                        | `size="5"`           |
| query       | Caso queira incluir um termo de busca no filtro, exemplo, além de buscar pelo atribute, buscar em produtos que tenham "tenis" | `query="masculino"`   |

