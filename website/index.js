import html from 'html-template-tag'
import googleAnalytics from 'docute-google-analytics'
import Docute from 'docute'
import prismLanguages from 'docute/lib/utils/prismLanguages'
import ColorBox from './components/ColorBox.vue'
import {versions, navs, sidebars, overrides} from './infos/infos.js'

new Docute({
  target: 'app',
  title: 'Personal Vue.js Exercise',
  layout: 'wide',
  highlight: ['typescript', 'bash', 'json', 'markdown'],
  plugins: [
    // process.env.NODE_ENV === 'production' && googleAnalytics('UA-54857209-11')
  ].filter(Boolean),
  editLinkBase: 'https://github.com/baramofme/vue-exercise/tree/master/website/docs',
  editLinkText: 'GitHub 에서 수정하기',
  router: {
    mode: 'history'
  },
  darkThemeToggler: true,
  sourcePath: '/',
  componentMixins: [
    {
      data() {
        return {
          builtinLanguages: prismLanguages.builtin,
          deps: __DEPS__
        }
      },
      methods: {
        insertCustomFontsCSS() {
          const ID = 'custom-fonts-css'
          const existing = document.getElementById(ID)
          if (existing) {
            existing.parentNode.removeChild(existing)
          } else {
            const style = document.createElement('style')
            style.id = ID
            style.textContent = `
            /* Import desired font from Google fonts */
            @import url('https://fonts.googleapis.com/css?family=Lato');

            /* Apply the font to body (to override the default one) */
            body {
              font-family: Lato, sans-serif;
            }
            `
            document.head.appendChild(style)
          }
        }
      },
      components: {
        ColorBox
      }
    }
  ],
  // no version use
  // versions: versions,

  nav: navs.main,
  sidebar: sidebars.main,

  overrides: {
    // this only needs override default root router's language variable.
    '/': {
      language: '한국어',
      // other props already defined upper sources
    },
    '/en/': {
      language: overrides.en.language,
      editLinkText: overrides.en.editLinkText,
      nav: navs.en,
      sidebar: sidebars.en,
    },
  },
  footer: ``,
  //   `
  // &copy; ${new Date().getFullYear()} Made by <a href="https://egoist.sh">EGOIST</a> While Watching Anime.
  // `,
  banner: ``,
// {
//     template: html`
//       <div class="docute-banner">
//         <note :label="false"
//           ><PatreonIcon width="16" height="16" style="position:relative;top:2px;margin-right:8px;" />Support Docute development by
//           <a href="https://patreon.com/egoist" target="_blank"
//             >becoming a patron or one-time donation <ExternalLinkIcon /></a
//           >.</note
//         >
//       </div>
//     `,
//     components: {
      // PatreonIcon
    // }
  // }
})

Vue.component('ReverseText', {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  template: html`
    <div class="reverse-text">
      {{ reversedText }}
      <v-style>
      .reverse-text {
        border: 1px solid var(--border-color);
        padding: 20px;
        font-weight: bold;
        border-radius: 4px;
      }
      </v-style>
    </div>
  `,
  computed: {
    reversedText() {
      return this.text
        .split('')
        .reverse()
        .join('')
    }
  }
})

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// const PatreonIcon = {
//   template: html`
//     <svg
//       width="569px"
//       height="546px"
//       viewBox="0 0 569 546"
//       version="1.1"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <title>Patreon logo</title>
//       <g>
//         <circle
//           fill="rgb(249, 104, 84)"
//           id="Oval"
//           cx="362.589996"
//           cy="204.589996"
//           r="204.589996"
//         ></circle>
//         <rect
//           fill="rgb(5, 45, 73)"
//           id="Rectangle"
//           x="0"
//           y="0"
//           width="100"
//           height="545.799988"
//         ></rect>
//       </g>
//     </svg>
//   `
// }
