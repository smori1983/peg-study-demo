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
        title: 'D3 demo',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/ast-demo01.md',
        ],
      }
    ],
  },

  plugins: [
    [require('./plugins/ast-demo')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};