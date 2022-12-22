module.exports = {
  base: '/peg-study-demo/',
  title: 'peg-study-demo',
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
      {
        title: 'Calc',
        path: '/calc/',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/calc/term-rewriting-01.md',
          '/calc/digest-01.md',
          '/calc/variable-01.md',
        ],
      },
      {
        title: 'Method',
        path: '/method/',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/method/method-01.md',
        ],
      },
    ],
  },

  plugins: [
    [require('./plugins/peg')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
