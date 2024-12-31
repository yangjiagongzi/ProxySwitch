import { MessageToBackground, MessageToPopup } from '~/constants'

export type MessageToBackgroundKey = Values<typeof MessageToBackground>
export type MessageToPopupKey = Values<typeof MessageToPopup>

// ----------------------- params -----------------------
export type ParamForMessageToBackground<T extends MessageToBackgroundKey> = {
  [MessageToBackground.getConfig]: undefined
  [MessageToBackground.proxySwitch]: number
  [MessageToBackground.switchDirectCurrent]: boolean
}[T]

export type ParamForMessageToPopup<T extends MessageToPopupKey> = {
  [MessageToPopup.onConfigChange]: { configId: number; isDirectCurrent: boolean }
}[T]

// ----------------------- callback params -----------------------
export type CallbackParamForMessageToBackground = Values<{
  [K in MessageToBackgroundKey]: {
    type: K
    value: ParamForMessageToBackground<K>
  }
}>

export type CallbackParamForMessageToPopup = Values<{
  [K in MessageToPopupKey]: {
    type: K
    value: ParamForMessageToPopup<K>
  }
}>
