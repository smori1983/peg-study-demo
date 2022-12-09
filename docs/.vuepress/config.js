module.exports = {
  base: '/peg-study-demo/',
  title: 'peg-study-demo',
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    search: false,
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
    ],
  },

  plugins: [
    [require('./plugins/calc')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
