export function getChildIndex(element: HTMLElement): number {
  let nodes = Array.prototype.slice.call(element.parentElement.children)
  return nodes.indexOf(element) as number
}

export function adjustCSSRules(props, selector, sheets?) {
  if (!sheets) sheets = [...document.styleSheets]
  else if (sheets.sup) {
    let absoluteURL = new URL(sheets, document.baseURI).href
    sheets = [...document.styleSheets].filter(i => i.href == absoluteURL)
  }
  else sheets = [sheets]

  selector = selector.replace(/\s+/g, ' ')
  const findRule = s => [...s.cssRules].reverse().find(i => i.selectorText == selector)
  let rule = sheets.map(findRule).filter(i=>i).pop()

  const propsArr = props.sup
    ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/))
    : Object.entries(props)

  if (rule) for (let [prop, val] of propsArr) {
    rule.style[prop] = val
  } else {
    let sheet = sheets.pop()
    if (!props.sup) props = propsArr.reduce((str, [k, v]) => `${str}; ${k}: ${v}`, '')
    sheet.insertRule(`${selector} { ${props} }`, sheet.cssRules.length)
  }
}

export function getElementId(element: HTMLElement) {
  let id = element.id.match(/scc-pt-(\d+)/)
  if (id) {
    let tag: string = id[0]
    let number: number = parseInt(id[1])
    return [tag, number]
  }

  return [null, null]
}

export function getElementIndex(element: HTMLElement) {
  let nodes = Array.prototype.slice.call(element.parentElement.children)
  return nodes.indexOf(element)
}

export function removeParentElement(element: HTMLElement, num: number) {
    var parent = element;
    for (var i = 0; i < num; i++) {
        if (parent.parentNode) {
            parent = parent.parentNode as HTMLElement;
        }
    }
    parent.remove();
}