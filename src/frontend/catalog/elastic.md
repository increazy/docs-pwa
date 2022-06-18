# Entendendo como funciona o catalogo

Para alimentar a PWA com produtos e categorias você precisará saber como esses dados são salvos, quais atributos eles possuem, assim usando essas informações para usar nos filtros de busca da PWA. Veja no GIF abaixo como buscar um produto e categoria da loja para usar como exemplo:

![Busca de categoria e produto no Elastic](https://i.imgur.com/u32Uj0w.gif)

Recomendamos que copie o JSON para um arquivo na sua máquina, para ter uma referência de fácil acesso. Como exemplo, note que o produto tem uma lista `categories` essa lista normalmente é de extrema importância, pois é com ela que montaremos vitrines de determinada categoria. Já na categoria, um atributo importante é o `level` para montarmos a hierarquia do menu da loja.

Embora tenha citado esses dois, você poderá usar qualquer atributo retornado para usar em filtros e pesquisas para a montagem do layout da loja.