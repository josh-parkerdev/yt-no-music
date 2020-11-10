import Component from "@modules/Component"
import ElementObserver from "@modules/ElementObserver"

export default class ComponentBuilder {
  name: string = ''
  url: string = ''
  component: {new (builder: ComponentBuilder): any}
  observer: {new (component: Component): ElementObserver}

  constructor(component: any) {
    this.component = component
  }

  addName(name: string): ComponentBuilder {
    if (!name) return this
    this.name = name
    return this
  }

  addUrl(url: string): ComponentBuilder {
    if (!url) return this
    this.url = url
    return this
  }

  addObserver(observer: {new (component: Component): ElementObserver}): ComponentBuilder {
    if (!observer) return this
    this.observer = observer
    return this
  }

  build() {
    let component = new this.component(this)
    
    // Background script
    if (component.context == 'background') {
      component.background()
      component.messenger && component.messenger.connect()
    }

    // Content Script
    if (component.context == 'content') {
      component.content()
      component.observer && component.observer.watch()
      component.messenger && component.messenger.connect()
    }

    return component
  }
}