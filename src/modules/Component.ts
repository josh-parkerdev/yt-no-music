import ComponentBuilder from "@modules/ComponentBuilder"
import ElementObserver from "@modules/ElementObserver"
import EventListener, {TEventCallback} from "@modules/EventListener"

type TContext = 'background' | 'content' | null

export interface IComponent {
  name: string
  url: string
}

export interface IComponentEvent {
  data: {[key: string]: any}
}

export default class Component implements IComponent {
  context: 'background' | 'content'
  name: string = ''
  url: string = ''
  builder: ComponentBuilder
  component: Component
  observer: ElementObserver
  
  private eventListener: EventListener<IComponentEvent>

  constructor(builder: ComponentBuilder) {    
    this.context = getContext()
    this.name = builder.name
    this.url = builder.url
    this.eventListener = new EventListener()

    this.observer = builder.observer && new builder.observer(this)
  }

  background() {

  }

  content() {

  }

  addListener(name: string, callback: TEventCallback<IComponentEvent>) {
    console.debug('Component: adding event listener for', name)
    this.eventListener.addListener(name, callback)
  }

  dispatchEvent(name: string, data: object) {
    console.debug('Component: dispatching event for', name)
    this.eventListener.dispatchEvent(name, {
      data: data
    })
  }
}

function getContext(): TContext {
  const protocol = location.protocol
  const context = protocol === 'chrome-extension:' ? 'background' :
        protocol === 'http:' || protocol === 'https:' ? 'content' : null

  return context
}