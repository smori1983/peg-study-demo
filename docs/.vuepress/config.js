module.exports = {
  base: '/peg-study-demo/',
  title: 'peg-study-demo',
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    search: false,
    nav: [
      { text: 'GitHub', link: 'https://github.com/smori1983/peg-study-demo' },
    ],
    sidebar: [
      {
        title: 'Calc',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/calc/demo-01.md',
          '/calc/digest-01.md',
        ],
      },
      {
        title: 'D3 demo',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/ast-demo01.md',
        ],
      },
    ],
  },

  plugins: [
    [require('./plugins/ast-demo')],
    [require('./plugins/calc')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
