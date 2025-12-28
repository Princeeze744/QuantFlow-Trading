import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { analysis } = await request.json()

    if (!analysis) {
      return NextResponse.json({ error: 'Analysis text required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a trading signal parser. Extract ALL trade setups from the analysis.
          
Return a JSON object with this EXACT structure:
{
  "asset": "USD/JPY",
  "timeframe": "M15",
  "trend": "Downtrend",
  "confidence": 8,
  "primary_setup": {
    "direction": "SELL",
    "entry_price": 156.440,
    "stop_loss": 156.580,
    "take_profit": 155.020,
    "risk_reward": "1:3",
    "execution_type": "SELL LIMIT",
    "probability": "HIGH"
  },
  "alternative_setups": [
    {
      "direction": "SELL",
      "entry_price": 156.250,
      "stop_loss": 156.370,
      "take_profit": 155.890,
      "risk_reward": "1:3",
      "execution_type": "MARKET",
      "probability": "MEDIUM"
    }
  ],
  "key_resistance": [156.440, 156.650, 157.070],
  "key_support": [155.810, 156.020],
  "summary": "Clear downtrend with lower highs. Selling at resistance retest for 1:3 R:R.",
  "risk_notes": "BOJ intervention risk. High volatility pair."
}

IMPORTANT:
- Extract ALL entry prices mentioned (primary and alternatives)
- Prices must be NUMBERS not strings
- R:R must be in format "1:X"
- If confidence is mentioned as X/10, just return the number X
- Summary should be 2-3 sentences max
- Return ONLY valid JSON, no markdown`
        },
        {
          role: 'user',
          content: analysis
        }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })

    const parsed = JSON.parse(completion.choices[0].message.content || '{}')
    
    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error('Parse error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}