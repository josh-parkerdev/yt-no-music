export function injectScript(fn: Function, ...args: any[]) {
  const script = document.createElement('script')
  const node = document.createTextNode(`(${fn})(${[...args].join(', ')})`)
  script.type = 'text/javascript'
  script.appendChild(node)
  window.document.head.appendChild(script)
  document.head.removeChild(script)
}