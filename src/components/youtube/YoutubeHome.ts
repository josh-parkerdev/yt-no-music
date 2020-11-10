import Component from "@modules/Component"
import ComponentBuilder from "@modules/ComponentBuilder"
import ElementObserver, {IMutationEvent} from '@modules/ElementObserver'
import EventListener from "@modules/EventListener"
import { removeParentElement } from "@helpers/document"

export default class YoutubeHome extends Component {

  constructor(builder: ComponentBuilder) {
    super(builder)
    console.log('YT No Music')

    // Content Script
    this.content = () => {

      this.observer.subscribe('grid_item')
      .elementAdded.addListener(event => {
        let target = event.target

        let thumbnail = target.querySelector('#thumbnail')
        
        if (thumbnail && thumbnail.getAttribute('href').includes('&start_radio=1')) {
          let title = target.querySelector('#video-title')
          console.log('removing video', title.innerHTML)
          target.style.setProperty('display', 'none', 'important')
        }
      })

    }

  }
}

export class YoutubeHomeObserver extends ElementObserver {
  onReady: EventListener<IMutationEvent>

  constructor(component: Component) {
    super(component, {
      tags: {
        body: {
          ownedBy: []
        },
        grid_item: {
          ownedBy: ['body']
        },
        grid_item_playlist: {
          ownedBy: ['grid_item']
        }
      },
      watchers: [
        {sources: [null], tag: 'body', selectors: [
          'body'
        ]},
        {sources: ['body'], tag: 'ytd_app', selectors: [
          'ytd-app'
        ]},
        {sources: ['ytd_app'], tag: 'grid_item', selectors: [
          'div#content',
          'ytd-page-manager',
          'ytd-browse',
          'ytd-two-column-browse-results-renderer',
          'div#primary',
          'ytd-rich-grid-renderer',
          'div#contents',
          'ytd-rich-item-renderer'
        ]}
      ],
      finders: {}
    })

  }
}