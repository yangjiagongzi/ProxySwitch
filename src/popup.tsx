import { Config } from '~/constants'

function proxySwitch(value: number) {
  chrome.runtime.sendMessage({
    target: 'Background',
    type: 'ProxySwitch',
    data: value
  })
}

window.onload = () => {
  const container = document.querySelector('#root-container')
  if (!container) {
    return
  }

  Config.forEach(item => {
    const itemElement = document.createElement('div')
    itemElement.innerText = item.name
    container.appendChild(itemElement)
  })
}
