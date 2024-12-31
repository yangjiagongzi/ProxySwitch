import { ParseResultType, fromUrl, parseDomain } from 'parse-domain'
import { MessageTarget, ProxyMode } from '~/constants'
import { MessageToPopupKey, ParamForMessageToPopup } from '~/types/message'

export const getProxySettings = () => {
  return new Promise<chrome.proxy.ProxyConfig | null>(resolve => {
    try {
      chrome.proxy.settings.get({}, res => {
        resolve(res.value as chrome.proxy.ProxyConfig)
      })
    } catch (err) {
      resolve(null)
    }
  })
}

export const getCurrentTab = () => {
  return new Promise<chrome.tabs.Tab | null>(resolve => {
    try {
      chrome.tabs
        .query({
          active: true,
          currentWindow: true
        })
        .then(tabs => {
          const tb = tabs[0]
          if (!tb) {
            resolve(null)
          }
          resolve(tb)
        })
    } catch (err) {
      resolve(null)
    }
  })
}

export const setProxyServer = ({
  mode,
  singleProxy,
  bypassList
}: {
  mode: Values<typeof ProxyMode>
  singleProxy?: chrome.proxy.ProxyServer
  bypassList?: string[]
}) => {
  const config =
    mode != ProxyMode.fixed
      ? {
          mode
        }
      : {
          mode,
          rules: {
            singleProxy,
            bypassList
          }
        }
  chrome.proxy.settings.set({ value: config, scope: 'regular' })
}

export const sendMessageToPopup = async <T extends MessageToPopupKey>(
  type: T,
  value: ParamForMessageToPopup<T>
) => {
  try {
    const res = await chrome.runtime.sendMessage({
      target: MessageTarget.Popup,
      type,
      value
    })
    return res
  } catch (e) {
    console.log(`Send message from background to popup for ${type} error:${(e as Error).message}`)
  }
  return null
}

export const getHostFromUrl = (url: string) => {
  const { type, hostname } = parseDomain(fromUrl(url))
  if (type != ParseResultType.Listed) {
    return ''
  }
  return hostname
}
