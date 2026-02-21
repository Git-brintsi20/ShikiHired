import { NextResponse } from 'next/server'

const LEETCODE_USERNAME = 'hac_brintsi20'
const LEETCODE_API = 'https://leetcode.com/graphql'

const STATS_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
      userCalendar(year: 0) {
        activeDays
        submissionCalendar
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      localRanking
      topPercentage
    }
  }
`

export const revalidate = 43200 // 12 hours

export async function GET() {
  try {
    const res = await fetch(LEETCODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({ query: STATS_QUERY, variables: { username: LEETCODE_USERNAME } }),
      next: { revalidate: 43200 },
    })

    if (!res.ok) throw new Error(`LeetCode API error: ${res.status}`)

    const json = await res.json()
    const user = json?.data?.matchedUser
    const contest = json?.data?.userContestRanking

    if (!user) throw new Error('User not found')

    const solved = user.submitStats.acSubmissionNum.find((x: { difficulty: string }) => x.difficulty === 'All')?.count ?? 0
    const activeDays = user.userCalendar?.activeDays ?? 0
    const rating = Math.round(contest?.rating ?? 0)
    const topPct = parseFloat((contest?.topPercentage ?? 0).toFixed(2))
    const contests = contest?.attendedContestsCount ?? 0

    return NextResponse.json({
      solved,
      activeDays,
      rating,
      topPercentage: topPct,
      contests,
    })
  } catch (err) {
    console.error('LeetCode fetch failed:', err)
    // Return fallback values so the UI always works
    return NextResponse.json(
      { solved: 275, activeDays: 142, rating: 1842, topPercentage: 6.17, contests: 14, fallback: true },
      { status: 200 }
    )
  }
}
