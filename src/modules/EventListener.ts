// TODO: change this to a type
export interface IEvent {
  name?: string,
  event: object
}

export type TEventCallback<T> = {
  (event: T)
}

class Listener<T> {
  name: string
  callback: TEventCallback<T>

  constructor(name: string, callback?: TEventCallback<T>)
  constructor(arg1: TEventCallback<T>)
  constructor(arg1: string | TEventCallback<T>, arg2?: TEventCallback<T>) {
    let name = typeof arg1 == 'string' ? arg1 : null
    let callback = typeof arg1 == 'function' ? arg1 : arg2
      
    this.name = name
    this.callback = callback
  }

  find(arg1: string | TEventCallback<T>) {
    let name = typeof arg1 == 'string' ? arg1 : null
    let callback = typeof arg1 == 'function' ? arg1 : null

    return !name && this.callback.toString() === callback.toString() ||
           this.name == name
  }
}

export default class EventListener<T> {
  private listeners: Listener<T>[] = []

  addListener(name: string, callback: TEventCallback<T>): void
  addListener(callback: TEventCallback<T>): void
  addListener(arg1: string | TEventCallback<T>, arg2?: TEventCallback<T>): void {
    let name = typeof arg1 == 'string' ? arg1 : null
    let callback = typeof arg1 == 'function' ? arg1 : arg2
    console.assert(callback)

    const findListener = (listener: Listener<T>) => {
      return !name && listener.find(callback) ||
             listener.find(name)
    }
    
    if (this.listeners.some(findListener))
      return

    this.listeners.push(new Listener<T>(name, callback))
  }

  removeListener(name: string, callback: TEventCallback<T>): void
  removeListener(callback: TEventCallback<T>): void
  removeListener(arg1: string | TEventCallback<T>, arg2?: TEventCallback<T>) {
    let name = typeof arg1 == 'string' ? arg1 : null
    let callback = typeof arg1 == 'function' ? arg1 : arg2

    const findListener = (listener: Listener<T>) => {
        // return listener.find(name) && listener.find(callback) ||
        //        listener.find(name) ||
        //        listener.find(callback)
        return !name && listener.find(callback) ||
               listener.find(name)
    }

    this.listeners.filter(findListener).forEach(listener => {
      let listenerIndex = this.listeners.indexOf(listener)

      console.debug('Event [Debug]: removing listener', listener)
      this.listeners.splice(listenerIndex, 1)
    })
  }

  dispatchEvent(name: string, event?: T): void
  dispatchEvent(event: T): void
  dispatchEvent(arg1: string | T, arg2?: T) {
    let name = typeof arg1 == 'string' ? arg1 : null
    let event = typeof arg1 == 'object' ? arg1 : arg2

    const findListener = (listener: Listener<T>) => {
        // return listener.find(name) || listener.name == null
        return name && listener.find(name) ||
               listener.name == null
    }
    
    if (this instanceof Listener) {
      return this.callback(event)
    }

    let listeners = this.listeners.filter(findListener)
    listeners.forEach(listener => listener.callback(event))

  }
}