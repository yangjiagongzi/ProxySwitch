import { Config, MessageTarget, MessageToBackground, MessageToPopup } from '~/constants'
import { CallbackParamForMessageToPopup } from '~/types/message'
import { sendMessageToBackground } from '~/utils/popupUtils'
import './styles/popup.css'

const handleCallback = (
  message: {
    target: Values<typeof MessageTarget>
  } & CallbackParamForMessageToPopup
) => {
  if (message.target === MessageTarget.Popup) {
    const { type, value } = message
    if (type === MessageToPopup.onConfigChange) {
      checkSelected(value.configId)
      checkDirectCurrent(value.isDirectCurrent)
    }
  }
}

const getConfig = () => {
  sendMessageToBackground(MessageToBackground.getConfig, undefined)
}

function proxySwitch(value: number) {
  sendMessageToBackground(MessageToBackground.proxySwitch, value)
}

function switchDirectCurrent(value: boolean) {
  sendMessageToBackground(MessageToBackground.switchDirectCurrent, value)
}

function checkSelected(value: number) {
  const allItem = document.querySelectorAll('.item')
  allItem.forEach(item => {
    const itemValue = item.id
    if (itemValue === `${value}`) {
      item.classList.add('checked')
    } else {
      item.classList.remove('checked')
    }
  })
}

function checkDirectCurrent(value: boolean) {
  const switchRadio = document.querySelector('.direct-this')
  if (!switchRadio) {
    return
  }
  if (value) {
    switchRadio.classList.add('checked')
  } else {
    switchRadio.classList.remove('checked')
  }
}

function generateItems(value: number, name: string) {
  const itemElement = document.createElement('div')
  itemElement.className = 'item'
  itemElement.id = `${value}`
  itemElement.innerHTML = `<div class="radio"><span></span></div><div>${name}</div>`
  itemElement.addEventListener('click', () => {
    proxySwitch(value)
  })
  return itemElement
}

window.onload = () => {
  chrome.runtime.onMessage.addListener(handleCallback)

  const container = document.querySelector('#root-container')
  if (!container) {
    return
  }

  Config.forEach(item => {
    const itemElement = generateItems(item.id, item.name)
    container.appendChild(itemElement)
  })

  const directThisUrlElement = document.createElement('div')
  directThisUrlElement.className = 'direct-this item'
  directThisUrlElement.innerHTML = `<div class="radio"><span></span></div><div>Direct Current</div>`
  directThisUrlElement.addEventListener('click', () => {
    const nextValue = !directThisUrlElement.classList.contains('checked')
    checkDirectCurrent(nextValue)
    switchDirectCurrent(nextValue)
  })
  container.appendChild(directThisUrlElement)

  getConfig()
}
