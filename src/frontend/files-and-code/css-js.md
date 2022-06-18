# Adicionar código CSS e Javascript

<span style="color:red">É de EXTREMA importância que a parte <strong>Atenção</strong> seja lida</span>

Por padrão disponibilizamos no menu **Código** os arquivos:

- **CSS Global**: aqui você pode colocar o CSS que será importado tanto no desktop quanto no mobile *
- **CSS Mobile**: nesse você declara todo o CSS para telas com largura < 1024px, pois esse arquivo só é importado nessa ocasião *
- **Javascript**: para declarar suas funções em JS e fazer o controle de layout, porém veja o tópico **Atenção** ao fim da página antes de usa-lo

<small>* nada impede que você declare media queries personalizadas nesses arquivos.</small>

Você pode querer organizar seu código separando-o por tela ou seções. Para isso estão disponíveis as seções de **Outros JS's** e **Outros CSS's**, os arquivos dela seguem a mesma regra da lista dada acima. Veja um exemplo de como criar um novo arquivo separado:

![Criando um arquivo CSS](https://i.imgur.com/wQ22low.gif)


<br><hr>

<strong style="color:red">Atenção:</strong>
- Não use seletores de tag no css, sempre use classes ou ids.
  - Ao usar algo como `div, li.classe { display:flex }`, você poderá estar afetando o design do checkout ou componentes fixos da PWA.
- Não use o JS para outra coisa além de declarar funcões e variáveis.
  - Ao usar direto no JS algo como `document.querySelector('#el').addEventListener(...)` você não seguirá o fluxo dinâmico da PWA, então esse código poderá, e com certeza irá, falhar em algumas situações. Para garantir a execução do código use os `hooks`, vide o menu **Hooks, JS no fluxo da PWA**.