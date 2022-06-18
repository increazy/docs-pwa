# Filtros

## Filtros Manuais

O `Filtro Manual` te dá a liberdade de ordenar os filtros conforme você queira através de campos pré-definidos ou também por campos customizados do produto. Abaixo temos o exemplo de filtros pré-definidos implementados com um `<select></select>`.

```html
<pwa-manual-filter>
    <select pwa-filter-input name="order">
        <option value="">Todos</option>
        <option value="price:-">Maior Preço</option>
        <option value="price:+">Menor Preço</option>
    </select>
</pwa-manual-filter>
```

### Filtros com atributos customizados

Caso queira filtrar através de um campo customizado, é preciso saber ao certo os campos disponíveis no seu produto, para mais detalhes sobre esses campos, você pode seguir a <a href="#">documentação do elastic</a>. Segue um exemplo básico abaixo acrescentando um campo customizado.

```html
<pwa-manual-filter>
    <select pwa-filter-input name="order">
        <option value="">Todos</option>
        <option value="price:-">Maior Preço</option>
        <option value="price:+">Menor Preço</option>

        <!-- CAMPOS CUSTOMIZADOS -->
        <option value="product_texture:Couro">Tecido Couro</option>
        <option value="price:30">Produtos no valor de R$30</option>
    </select>
</pwa-manual-filter>
```

### Filtros disparados com eventos

Ampliando um pouco mais o uso dos filtros manuais, temos também a opção de utilizá-lo com o evento `onchange`. Segue o exemplo utilizando `<input type="radio" />`.

```html
<pwa-manual-filter>
    <li pwa-change-filter.click="price:-">
        <input type="radio" name="order" value="price:-" id="maior-preco"/>
        <label for="maior-preco" >Maior Preço</label>
    </li>
    
    <li pwa-change-filter.click="price:+">
        <input type="radio" name="order" value="price:+" id="menor-preco"/>
        <label for="menor-preco" >Menor Preço</label>
    </li>
</pwa-manual-filter>
```