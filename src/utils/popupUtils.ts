import { MessageTarget } from '~/constants'
import { MessageToBackgroundKey, ParamForMessageToBackground } from '~/types/message'

export const sendMessageToBackground = async <T extends MessageToBackgroundKey>(
  type: T,
  value: ParamForMessageToBackground<T>
) => {
  try {
    const res = await chrome.runtime.sendMessage({
      target: MessageTarget.Background,
      type,
      value
    })
    return res
  } catch (e) {
    console.log(`Send message from popup to background for ${type} error:${(e as Error).message}`)
  }
  return null
}
