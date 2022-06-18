module.exports = {

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: 'rgb(55,17,63)' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: 'Frontend',
        link: '/frontend/',
      },
      {
        text: 'Recursos',
        link: '/recursos/',
      },
      // {
      //   text: 'Configurações',
      //   link: '/config/'
      // },
      // {
      //   text: 'Infraestrutura',
      //   link: '/infra/'
      // },
      {
        text: 'Painel',
        link: 'https://dash.pwa4all.com'
      }
    ],

    sidebar: {
      // '/guide/': [
      //   {
      //     title: 'Guide',
      //     collapsable: false,
      //     children: [
      //       '',
      //       'using-vue',
      //     ]
      //   }
      // ],

      '/frontend/': [
        '',
        {
          title: 'Assets e arquivos de código',
          collapsable: true,
          children: [
            'files-and-code/drive',
            'files-and-code/css-js',
            'files-and-code/code',
            'files-and-code/pages',
          ]
        },
        {
          title: 'Categorias e produtos',
          collapsable: true,
          children: [
            'catalog/elastic',
            'catalog/category-list',
            'catalog/product-list',
            // 'catalog/filters',
          ]
        },
        {
          title: 'Hooks',
          collapsable: true,
          children: [
            'hooks/create',
            'hooks/events',
          ]
        },
        {
          title: 'Componentes',
          collapsable: true,
          children: [
            'components/cart',
            'components/header',
            'components/footer',
            'components/prod-card',
            'components/prod-modal',
            'components/scripts-body-head',
          ]
        },
        {
          title: 'Páginas',
          collapsable: true,
          children: [
            'pages/home',
            'pages/product',
            'pages/category',
          ]
        },
        {
          title: 'Loading Skeleton',
          collapsable: true,
          children: [
            'skeleton/create'
          ]
        },
        {
          title: 'Tela de categoria e busca',
          collapsable: true,
          children: [
            'category-search/',
            'category-search/result-list',
            'category-search/attribute-filter',
          ]
        },
      ],

      '/recursos/': [
        '',
        'saved-cards',
        'fast-buy'
      ]
    }
  },

  locales: {
    '/': {
      lang: 'pt-BR', // this will be set as the lang attribute on <html>
      title: 'Increazy Dev Center',
      description: 'Central de documentação para desenvolvimento no painel Increazy'
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-smooth-scroll',
    'vuepress-plugin-nprogress',
    [
      'vuepress-plugin-zooming',
      {
        selector: 'img',
        delay: 1000,
        options: {
          bgColor: 'rgb(55,17,63)',
          zIndex: 10000,
        },
      },
    ],
  ]
}
