import { NextResponse } from 'next/server'

const CF_HANDLE = 'shiki_20'
const CF_API = `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`

export const revalidate = 43200 // 12 hours

export async function GET() {
  try {
    const res = await fetch(CF_API, { next: { revalidate: 43200 } })

    if (!res.ok) throw new Error(`Codeforces API error: ${res.status}`)

    const json = await res.json()
    if (json.status !== 'OK') throw new Error('Codeforces API returned non-OK status')

    const user = json.result[0]

    return NextResponse.json({
      rating: user.rating ?? 0,
      maxRating: user.maxRating ?? 0,
      rank: user.rank ?? 'unrated',
      maxRank: user.maxRank ?? 'unrated',
    })
  } catch (err) {
    console.error('Codeforces fetch failed:', err)
    return NextResponse.json(
      { rating: 1290, maxRating: 1290, rank: 'pupil', maxRank: 'pupil', fallback: true },
      { status: 200 }
    )
  }
}
