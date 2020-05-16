//route store

import pages from "pages"
import { writable } from "svelte/store"

export const history = writable([])
export const component = writable(null)

export const setComponent = path => {
   if (pages[path]) {
      push(path)
      pages[path]().then(newComponent => component.set(newComponent.default))
   } else {
      component.set(null)
   }
}

export const push = path => {
   window.history.pushState(null, null, path)
   history.update(old => [...old, window.location])
}

export const replace = path => {
   window.history.replaceState(null, null, path)
   history.update(() => [window.location])
}
