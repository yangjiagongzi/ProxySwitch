import { Config, MessageTarget, MessageToBackground, MessageToPopup, ProxyMode } from '~/constants'
import { CallbackParamForMessageToBackground } from '~/types/message'
import {
  getCurrentTab,
  getHostFromUrl,
  getProxySettings,
  sendMessageToPopup,
  setProxyServer
} from '~/utils/serviceWorkerUtils'

async function syncSettingsToPopup() {
  const settings = await getProxySettings()
  if (!settings) {
    return
  }

  const { mode, rules } = settings

  if (mode != ProxyMode.fixed) {
    const findItem = Config.find(item => item.mode === mode)
    if (findItem) {
      sendMessageToPopup(MessageToPopup.onConfigChange, {
        configId: findItem.id,
        isDirectCurrent: false
      })
    }

    return
  }

  const findItem = Config.find(item => {
    if (!('singleProxy' in item)) {
      return false
    }
    return (
      item?.singleProxy?.scheme === rules?.singleProxy?.scheme &&
      item?.singleProxy?.host === rules?.singleProxy?.host &&
      item?.singleProxy?.port === rules?.singleProxy?.port
    )
  })

  const currentTab = await getCurrentTab()
  const hostname = getHostFromUrl(currentTab?.url || '')
  const isDirectCurrent = !!hostname && (rules?.bypassList || []).includes(hostname)
  if (findItem) {
    sendMessageToPopup(MessageToPopup.onConfigChange, {
      configId: findItem.id,
      isDirectCurrent
    })
  }
}

function proxySwitch(value: number) {
  const rule = Config.find(item => item.id === value)
  if (!rule) {
    return
  }

  setProxyServer(rule)
  syncSettingsToPopup()
}

async function switchDirectCurrent(value: boolean) {
  const settings = await getProxySettings()
  if (!settings) {
    return
  }

  const { mode, rules } = settings
  if (mode != ProxyMode.fixed || !rules) {
    return
  }

  const currentTab = await getCurrentTab()
  if (!currentTab || !currentTab.url) {
    return
  }

  const hostname = getHostFromUrl(currentTab.url)
  if (!hostname) {
    return
  }

  const bypassList = value
    ? [...(rules.bypassList || []), hostname]
    : (rules.bypassList || []).filter(bypass => bypass !== hostname)

  setProxyServer({ mode, singleProxy: rules.singleProxy, bypassList })
  syncSettingsToPopup()
}

chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension successfully installed!')
})

chrome.runtime.onMessage.addListener(
  (
    message: {
      target: Values<typeof MessageTarget>
    } & CallbackParamForMessageToBackground
  ) => {
    if (message.target === MessageTarget.Background) {
      const { type, value } = message
      switch (type) {
        case MessageToBackground.getConfig:
          syncSettingsToPopup()
          break
        case MessageToBackground.proxySwitch:
          proxySwitch(value)
          break
        case MessageToBackground.switchDirectCurrent:
          switchDirectCurrent(value)
          break
      }
    }
  }
)
