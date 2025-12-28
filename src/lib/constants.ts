// === QUANT FLOW TRADING CONSTANTS ===

// Animation Timings (in ms)
export const MOTION = {
  instant: 100,
  swift: 150,
  smooth: 200,
  deliberate: 300,
  reveal: 400,
  celebrate: 500,
} as const

// Easing Functions
export const EASING = {
  out: [0.0, 0.0, 0.2, 1] as const,
  in: [0.4, 0.0, 1, 1] as const,
  inOut: [0.4, 0.0, 0.2, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
}

// Signal Status
export const SIGNAL_STATUS = {
  ACTIVE: 'ACTIVE',
  TP_HIT: 'TP_HIT',
  SL_HIT: 'SL_HIT',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
} as const

// Signal Direction
export const SIGNAL_DIRECTION = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PRO: 'PRO',
  VIP: 'VIP',
} as const

// Tier Features
export const TIER_FEATURES = {
  FREE: {
    name: 'Free',
    price: 0,
    delay: 4, // hours delay on signals
    features: [
      'Delayed signals (4-6 hours)',
      'Limited signal history',
      'Basic performance stats',
    ],
  },
  BASIC: {
    name: 'Basic',
    price: 29,
    delay: 0,
    features: [
      'Real-time signals',
      'Full signal history',
      'Email notifications',
      'Performance analytics',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 79,
    delay: 0,
    features: [
      'Everything in Basic',
      'Telegram alerts',
      'Position size calculator',
      'Community access',
      'Priority support',
    ],
  },
  VIP: {
    name: 'VIP',
    price: 199,
    delay: 0,
    features: [
      'Everything in Pro',
      '1-on-1 coaching calls',
      'Early access to signals',
      'Exclusive market insights',
      'Direct line to analyst',
    ],
  },
} as const

// Timeframes
export const TIMEFRAMES = [
  '1M',
  '5M',
  '15M',
  '30M',
  '1H',
  '4H',
  'D',
  'W',
] as const

// Common Trading Pairs
export const TRADING_PAIRS = {
  forex: [
    'EUR/USD',
    'GBP/USD',
    'USD/JPY',
    'USD/CHF',
    'AUD/USD',
    'USD/CAD',
    'NZD/USD',
    'EUR/GBP',
    'EUR/JPY',
    'GBP/JPY',
  ],
  synthetics: [
    'Volatility 10',
    'Volatility 25',
    'Volatility 50',
    'Volatility 75',
    'Volatility 100',
    'Boom 300',
    'Boom 500',
    'Boom 1000',
    'Crash 300',
    'Crash 500',
    'Crash 1000',
    'Step Index',
    'Range Break 100',
    'Range Break 200',
  ],
  metals: [
    'XAU/USD',
    'XAG/USD',
  ],
  indices: [
    'US30',
    'US100',
    'US500',
    'UK100',
    'GER40',
  ],
} as const

// App Info
export const APP_CONFIG = {
  name: 'Quant Flow Trading',
  tagline: 'The confident signal in the noise of the markets',
  signalInterval: 4, // hours
  maxRiskReward: '1:3',
  supportEmail: 'support@quantflowtrading.com',
} as const