import PageParserTree, { PageParserTreeOptions } from "page-parser-tree"
import toValueObservable from 'live-set/toValueObservable'

import Component from "@modules/Component"
import EventListener from "@modules/EventListener";

export interface IMutationEvent {
  tag?: string
  target: HTMLElement
  index: number
}

export class MutationEmitter {
  public elementAdded: EventListener<IMutationEvent> = new EventListener()
  public elementRemoved: EventListener<IMutationEvent> = new EventListener()
}

export default class ElementObserver {
  private page: PageParserTree
  private elementAdded: EventListener<IMutationEvent>
  private elementRemoved: EventListener<IMutationEvent>
  onReady: EventListener<IMutationEvent>
  component: Component

  constructor(component: Component)
  constructor(component: Component, options?: PageParserTreeOptions)
  constructor(component: Component, options?: PageParserTreeOptions) {
    this.page = new PageParserTree(document, options || {
      tags: {},
      watchers: [],
      finders: {}
    })
    this.elementAdded = new EventListener()
    this.elementRemoved = new EventListener()
    this.onReady = new EventListener()
    this.component = component
  }

  watch() {
    if (!window.location.href.includes(this.component.url))
      return

    const mutationEvent = (listener: EventListener<IMutationEvent>, tag: string, element: HTMLElement): void => {
      let event: IMutationEvent = {
        tag: tag,
        target: element,
        index: getElementIndex(element)
      }

      listener.dispatchEvent(tag, event)
      // TODO: send to all listeners for debugging or something
      // listener.dispatchEvent(event)
    }

    this.page.tree.getAll().forEach(nodes => {
      
      toValueObservable(nodes).subscribe(({value, removal}) => {
        let tag = value.getTag()
        let element = value.getValue()

        console.debug('ElementObserver: element added', tag)
        mutationEvent(this.elementAdded, tag, element)

        removal.then(() => {
          console.debug('ElementMonitor: element removed', tag)
          mutationEvent(this.elementRemoved, tag, element)
        })
      })

    })
  }

  subscribe(arg1: string): MutationEmitter {
    let mutations = new MutationEmitter()

    // TODO check for already added listeners
    this.elementAdded.addListener(arg1, event => {
      mutations.elementAdded.dispatchEvent(arg1, event)
    })

    this.elementRemoved.addListener(arg1, event => {
      mutations.elementRemoved.dispatchEvent(arg1, event)
    })

    return mutations
  }

}

function getElementIndex(element: HTMLElement) {
  if (!element.parentElement)
    return -1
    
  let nodes = Array.prototype.slice.call(element.parentElement.children)

  return nodes.indexOf(element)
}