import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { isAdmin } from '@/lib/auth/admin'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  // ✅ SECURITY: Admin only
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required' }, 
      { status: 403 }
    )
  }

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
          content: `You are a professional trading signal formatter. Take the raw analysis and format it beautifully while keeping ALL the important details.

FORMAT RULES:
1. Use clear section headers with emojis
2. Highlight key prices, entries, SL, TP levels
3. Keep all trade setups intact
4. Make it scannable but complete
5. Use bullet points for lists
6. Keep risk warnings
7. Be concise but don't remove important info

OUTPUT FORMAT:
📊 [ASSET] - [TIMEFRAME] Analysis

📈 TREND
[Brief trend description]

🎯 KEY LEVELS
- Resistance: [levels]
- Support: [levels]

💼 TRADE SETUPS

▶️ PRIMARY (High Probability)
[Setup details with Entry, SL, TP, R:R]

▶️ AGGRESSIVE (Medium Probability)  
[Setup details]

▶️ COUNTER-TREND (Low Probability)
[Setup details if any]

⚠️ RISK MANAGEMENT
[Key risk points]

Return ONLY the formatted text, no explanations.`
        },
        {
          role: 'user',
          content: analysis
        }
      ],
      temperature: 0.3,
    })

    const polished = completion.choices[0].message.content
    
    return NextResponse.json({ polished })
  } catch (error: any) {
    console.error('Polish error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}