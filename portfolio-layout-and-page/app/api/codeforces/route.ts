import { NextResponse } from 'next/server'

const CF_HANDLE = 'shiki_20'
const CF_API = `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`

export const revalidate = 43200 // 12 hours

export async function GET() {
  try {
    const res = await fetch(CF_API, {
      next: { revalidate: 43200 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!res.ok) {
      throw new Error(`Codeforces API error: ${res.status}`)
    }

    const json = await res.json()

    if (json.status !== 'OK') {
      throw new Error(`Codeforces API returned non-OK status: ${json.status}`)
    }

    if (!json.result || json.result.length === 0) {
      throw new Error('No Codeforces user found')
    }

    const user = json.result[0]

    return NextResponse.json({
      rating: user.rating ?? 0,
      maxRating: user.maxRating ?? 0,
      rank: user.rank ?? 'unrated',
      maxRank: user.maxRank ?? 'unrated',
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Codeforces fetch failed:', err)
    return NextResponse.json(
      {
        rating: 1290,
        maxRating: 1290,
        rank: 'pupil',
        maxRank: 'pupil',
        fallback: true,
        timestamp: new Date().toISOString(),
        error: String(err)
      },
      { status: 200 }
    )
  }
}
