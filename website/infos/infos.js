export const versions = {
  // 'v0.1': {
  //   link: '/'
  // },
  // 'v0.2': {
  //   link: '/'
  // },
}

export const navs = {
  main: [
    {
      title: '대문',
      link: '/'
    },
    {
      title: '요청하기',
      link: 'https://github.com/baramofme/vue-exercise/issues'
    },
  ],
  en: [
    {
      title: 'Home',
      link: '/en/'
    },
    {
      title: 'Request',
      link: 'https://github.com/baramofme/vue-exercise/issues'
    },
  ]
}

export const sidebars = {
  main: [
    {
      title: '뷰',
      links: [
        {
          title: '목록',
          link: '/vue/'
        },
      ]
    },
    {
      title: '자바스크립트',
      links: [
        {
          title: '목록',
          link: '/js/'
        },
        {
          title: '콘솔 사용',
          link: '/js/console.md'
        },
      ]
    },
  ],
  en: [
  //   {
  //   title: 'somthinggg',
  //   links: [{
  //     title: 'title',
  //     link: '/link'
  //   },]
  // },
  ]
}

export const overrides = {
  en: {
    route: '/en/',
    language: 'English',
    editLinkText: 'Edit on GitHub',
  },
}
