import {createApp, h, App} from 'vue'

import {Props} from '@/components/context-menu/types'

import ContentMenu from '@/components/context-menu/index.vue'

let ContentMenuInstance: App<Element> | null = null
let wrapperEl: HTMLElement | null = null

export const useContextMenu = (props: Props) => {
  const {event} = props
  props.customEvent = event
  props.axis = {x: event.clientX, y: event.clientY}

  const bodyClick = () => {
    ContentMenuInstance && wrapperEl && ContentMenuInstance.unmount(wrapperEl) && document.body.removeChild(wrapperEl) && wrapperEl.remove()
    document.body.removeEventListener('click', bodyClick);
    document.body.removeEventListener('scroll', bodyClick);
    ContentMenuInstance = null;
  }

  bodyClick()

  if (!ContentMenuInstance) {
    ContentMenuInstance = createApp({
      render() {
        return h(ContentMenu, props)
      }
    })
    wrapperEl = document.createElement('div')
    document.body.appendChild(wrapperEl)
    ContentMenuInstance.mount(wrapperEl)
  }

  document.body.addEventListener('click', bodyClick);
  document.body.addEventListener('scroll', bodyClick);
}


