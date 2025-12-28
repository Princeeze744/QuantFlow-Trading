export interface ParsedSignal {
  asset: string | null
  direction: 'BUY' | 'SELL' | null
  entryPrice: number | null
  stopLoss: number | null
  takeProfit: number | null
  takeProfitLevels: { level: string; price: number }[]
  riskReward: string | null
  timeframe: string | null
  confidence: number | null
  trend: string | null
  summary: string | null
  keyResistance: number[]
  keySupport: number[]
  executionType: string | null
  rawAnalysis: string
}

export function parseSignalAnalysis(text: string): ParsedSignal {
  const result: ParsedSignal = {
    asset: null,
    direction: null,
    entryPrice: null,
    stopLoss: null,
    takeProfit: null,
    takeProfitLevels: [],
    riskReward: null,
    timeframe: null,
    confidence: null,
    trend: null,
    summary: null,
    keyResistance: [],
    keySupport: [],
    executionType: null,
    rawAnalysis: text,
  }

  // Extract Asset (e.g., USD/JPY, EUR/USD, XAU/USD, Volatility 75, etc.)
  const assetPatterns = [
    /\b([A-Z]{3}\/[A-Z]{3})\b/,  // Forex pairs
    /\b(XAU\/USD|XAG\/USD)\b/i,   // Gold/Silver
    /\b(Volatility \d+(?:\s*\(\d+s?\))?)/i,  // Synthetics
    /\b(V\d+(?:\s*\(\d+s?\))?)/i,  // V75, V100, etc.
    /\b(Boom \d+|Crash \d+)/i,    // Boom/Crash
    /\b(Step Index)/i,            // Step Index
    /\b(Jump \d+)/i,              // Jump indices
  ]

  for (const pattern of assetPatterns) {
    const match = text.match(pattern)
    if (match) {
      result.asset = match[1].toUpperCase()
      break
    }
  }

  // Extract Timeframe
  const timeframeMatch = text.match(/\b(M1|M5|M15|M30|H1|H4|D1|W1|MN)\b/i)
  if (timeframeMatch) {
    result.timeframe = timeframeMatch[1].toUpperCase()
  }

  // Extract Direction
  const directionPatterns = [
    /PRIMARY TRADE:\s*(SELL|BUY)/i,
    /RECOMMENDED.*?:\s*(SELL|BUY)/i,
    /Direction:\s*(SELL|BUY)/i,
    /\b(SELL|BUY)\s+(?:LIMIT|STOP|NOW|at)/i,
    /Trade Direction.*?(SELL|BUY)/i,
  ]

  for (const pattern of directionPatterns) {
    const match = text.match(pattern)
    if (match) {
      result.direction = match[1].toUpperCase() as 'BUY' | 'SELL'
      break
    }
  }

  // Extract Entry Price - look for various patterns
  const entryPatterns = [
    /Entry[:\s]+(\d+\.?\d*)/i,
    /Entry Price[:\s]+(\d+\.?\d*)/i,
    /SELL LIMIT at[:\s]+(\d+\.?\d*)/i,
    /BUY LIMIT at[:\s]+(\d+\.?\d*)/i,
    /Entry[:\s]*(\d+\.?\d*)/i,
  ]

  for (const pattern of entryPatterns) {
    const match = text.match(pattern)
    if (match) {
      result.entryPrice = parseFloat(match[1])
      break
    }
  }

  // Extract Stop Loss
  const slPatterns = [
    /(?:Stop Loss|SL)[:\s]+(\d+\.?\d*)/i,
    /SL Price[:\s]+(\d+\.?\d*)/i,
    /SL[:\s]+(\d+\.?\d*)/i,
  ]

  for (const pattern of slPatterns) {
    const match = text.match(pattern)
    if (match) {
      result.stopLoss = parseFloat(match[1])
      break
    }
  }

  // Extract Take Profit(s)
  const tpPatterns = [
    /(?:Take Profit|TP)[:\s]+(\d+\.?\d*)/i,
    /TP Price[:\s]+(\d+\.?\d*)/i,
    /TP[:\s]+(\d+\.?\d*)/i,
  ]

  for (const pattern of tpPatterns) {
    const match = text.match(pattern)
    if (match) {
      result.takeProfit = parseFloat(match[1])
      break
    }
  }

  // Extract multiple TP levels
  const tpLevelMatches = text.matchAll(/(?:TP|Take Profit)\s*(\d)?[:\s]+(\d+\.?\d*)/gi)
  for (const match of tpLevelMatches) {
    const level = match[1] || String(result.takeProfitLevels.length + 1)
    const price = parseFloat(match[2])
    if (!result.takeProfitLevels.find(tp => tp.price === price)) {
      result.takeProfitLevels.push({ level: `TP${level}`, price })
    }
  }

  // Extract Risk:Reward
  const rrPatterns = [
    /(?:Risk[:\s]*Reward|R:R|R\/R)[:\s]*(\d+[:\s]*\d+)/i,
    /(\d+:\d+)\s*(?:R:R|Risk)/i,
    /1:(\d+)/,
  ]

  for (const pattern of rrPatterns) {
    const match = text.match(pattern)
    if (match) {
      if (match[1].includes(':')) {
        result.riskReward = match[1].replace(/\s/g, '')
      } else {
        result.riskReward = `1:${match[1]}`
      }
      break
    }
  }

  // Extract Confidence Level
  const confidenceMatch = text.match(/CONFIDENCE[:\s]*(\d+)(?:\/10)?/i)
  if (confidenceMatch) {
    result.confidence = parseInt(confidenceMatch[1])
  }

  // Extract Trend
  const trendPatterns = [
    /Trend[:\s]*(Downtrend|Uptrend|Sideways|Ranging|Bullish|Bearish)/i,
    /(Downtrend|Uptrend|Clear downtrend|Clear uptrend)/i,
  ]

  for (const pattern of trendPatterns) {
    const match = text.match(pattern)
    if (match) {
      result.trend = match[1]
      break
    }
  }

  // Extract Key Resistance Levels
  const resistanceSection = text.match(/(?:Resistance|Key Resistance)[^:]*:([^]*?)(?:Support|Key Support|Step|\n\n)/i)
  if (resistanceSection) {
    const prices = resistanceSection[1].match(/(\d{2,3}\.\d{2,5})/g)
    if (prices) {
      result.keyResistance = [...new Set(prices.map(p => parseFloat(p)))].slice(0, 5)
    }
  }

  // Extract Key Support Levels
  const supportSection = text.match(/(?:Support|Key Support)[^:]*:([^]*?)(?:Resistance|Step|\n\n|Trade)/i)
  if (supportSection) {
    const prices = supportSection[1].match(/(\d{2,3}\.\d{2,5})/g)
    if (prices) {
      result.keySupport = [...new Set(prices.map(p => parseFloat(p)))].slice(0, 5)
    }
  }

  // Extract Execution Type
  const executionMatch = text.match(/(SELL LIMIT|BUY LIMIT|SELL STOP|BUY STOP|SELL NOW|BUY NOW|Market)/i)
  if (executionMatch) {
    result.executionType = executionMatch[1].toUpperCase()
  }

  // Generate Summary from Overall Recommendation or Final Recommendation section
  const summaryPatterns = [
    /(?:Overall Recommendation|Final Recommendation|Summary)[:\s]*([^]*?)(?:\n\n|EXECUTION|INVALIDATION)/i,
    /(?:Rationale|Why.*?Favored)[:\s]*([^]*?)(?:\n\n|Technical)/i,
  ]

  for (const pattern of summaryPatterns) {
    const match = text.match(pattern)
    if (match) {
      // Clean and truncate the summary
      let summary = match[1]
        .replace(/[\n\r]+/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/[•✅❌⚠️⏸️]/g, '')
        .trim()
      
      // Take first 2-3 sentences
      const sentences = summary.match(/[^.!?]+[.!?]+/g)
      if (sentences) {
        result.summary = sentences.slice(0, 3).join(' ').trim()
      } else {
        result.summary = summary.slice(0, 300)
      }
      break
    }
  }

  // Fallback summary generation
  if (!result.summary && result.direction && result.asset) {
    const trendText = result.trend ? `${result.trend}. ` : ''
    const rrText = result.riskReward ? ` targeting ${result.riskReward} R:R.` : '.'
    result.summary = `${trendText}${result.direction} ${result.asset} at ${result.entryPrice}${rrText}`
  }

  return result
}

// Calculate pips between two prices
export function calculatePips(price1: number, price2: number, asset: string): number {
  const diff = Math.abs(price1 - price2)
  
  // JPY pairs have 2 decimal places, others have 4-5
  if (asset.includes('JPY')) {
    return Math.round(diff * 100)
  }
  
  // Gold
  if (asset.includes('XAU')) {
    return Math.round(diff * 10)
  }
  
  // Standard forex
  return Math.round(diff * 10000)
}

// Validate parsed data completeness
export function validateParsedSignal(parsed: ParsedSignal): { valid: boolean; missing: string[] } {
  const missing: string[] = []
  
  if (!parsed.asset) missing.push('Asset')
  if (!parsed.direction) missing.push('Direction')
  if (!parsed.entryPrice) missing.push('Entry Price')
  if (!parsed.stopLoss) missing.push('Stop Loss')
  if (!parsed.takeProfit && parsed.takeProfitLevels.length === 0) missing.push('Take Profit')
  
  return {
    valid: missing.length === 0,
    missing
  }
}