export const ProxyMode = {
  direct: 'direct',
  system: 'system',
  fixed: 'fixed_servers'
} as const

export const Config = [
  {
    id: 0,
    name: 'Direct',
    mode: ProxyMode.direct
  },
  {
    id: 1,
    name: 'System',
    mode: ProxyMode.system
  },
  {
    id: 2,
    name: 'Burp Suite',
    mode: ProxyMode.fixed,
    color: '#dd6633',
    singleProxy: { scheme: 'http', host: '127.0.0.1', port: 3986 },
    bypassList: ['127.0.0.1', '[::1]', '192.168.1.1/16', 'localhost']
  },
  {
    id: 3,
    name: 'Clash',
    mode: ProxyMode.fixed,
    color: '#ffee99',
    singleProxy: { scheme: 'socks5', host: '127.0.0.1', port: 7890 },
    bypassList: ['127.0.0.1', '[::1]', '192.168.1.1/16', 'localhost', '*.baidu.com', '*.youdao.com']
  },
  {
    id: 4,
    name: 'Hetty',
    mode: ProxyMode.fixed,
    color: '#1de9b6',
    singleProxy: { scheme: 'http', host: '127.0.0.1', port: 3987 },
    bypassList: ['127.0.0.1', '[::1]', '192.168.1.1/16', 'localhost']
  }
]

export const MessageTarget = {
  Background: 'background',
  Popup: 'popup'
} as const

export const MessageToBackground = {
  getConfig: 'GetConfig',
  proxySwitch: 'ProxySwitch',
  switchDirectCurrent: 'SwitchDirectCurrent'
} as const

export const MessageToPopup = {
  onConfigChange: 'OnConfigChange'
} as const
