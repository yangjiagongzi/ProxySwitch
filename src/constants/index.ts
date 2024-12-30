export const Config = [
  {
    id: 1,
    name: 'Burp Suite',
    color: '#dd6633',
    fallbackProxy: { host: '127.0.0.1', port: 3986 },
    bypassList: [
      { conditionType: 'BypassCondition', pattern: '127.0.0.1' },
      { conditionType: 'BypassCondition', pattern: '[::1]' },
      { conditionType: 'BypassCondition', pattern: 'localhost' }
    ]
  },
  {
    id: 2,
    name: 'Clash',
    color: '#ffee99',
    fallbackProxy: { host: '127.0.0.1', port: 7890 },
    bypassList: [
      { conditionType: 'BypassCondition', pattern: '127.0.0.1' },
      { conditionType: 'BypassCondition', pattern: '[::1]' },
      { conditionType: 'BypassCondition', pattern: 'localhost' }
    ]
  },
  {
    id: 3,
    name: 'Hetty',
    color: '#1de9b6',
    fallbackProxy: { host: '127.0.0.1', port: 3987 },
    bypassList: [
      { conditionType: 'BypassCondition', pattern: '127.0.0.1' },
      { conditionType: 'BypassCondition', pattern: '[::1]' },
      { conditionType: 'BypassCondition', pattern: 'localhost' }
    ]
  }
]
