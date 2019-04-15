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
    {
      title: '키우기',
      links: [
        // {
        //   title: '목록',
        //   link: '/incuvate/'
        // },
        {
          title: '실비보험 청구 노트',
          link: '/incuvate/casualty-insurance-claim-note'
        },
        {
          title: '생리주기 어플 클론',
          link: '/incuvate/menstruation-diary-clone'
        },
      ]
    },
    {
      title: '라이브러리',
      links: [
        // {
        //   title: '목록',
        //   link: '/incuvate/'
        // },
        {
          title: '러브필드 퀵스타트',
          link: '/library/lovefield-quick-start'
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
