import { type NextRequest } from 'next/server'
import {
  MOCK_RETURN_REQUESTS,
  MOCK_TRIAGE_LOGS,
  MOCK_ACTION_PACKS,
} from '@/lib/data'
import {
  type ReturnRequest,
  type TriageLog,
  type ActionPack,
} from '@/lib/types'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const type = searchParams.get('type') // Optional: 'returns', 'triage', 'actionpacks'
  const sanitizedQuery = query.toLowerCase().trim()
  const MAX_RESULTS = 20

  let results: (ReturnRequest | TriageLog | ActionPack)[] = []

  if (!sanitizedQuery) {
    // If query is empty, return first 5 return requests
    results = MOCK_RETURN_REQUESTS.slice(0, 5)
  } else {
    // Search Return Requests
    if (!type || type === 'returns') {
      const returnRequestMatches = MOCK_RETURN_REQUESTS.filter(
        (req: ReturnRequest) =>
          req.customerEmail.toLowerCase().includes(sanitizedQuery) ||
          req.productName.toLowerCase().includes(sanitizedQuery) ||
          req.reasonForReturn.toLowerCase().includes(sanitizedQuery) ||
          req.shopifyOrderId.toLowerCase().includes(sanitizedQuery) ||
          req.notes.toLowerCase().includes(sanitizedQuery),
      )
      results = results.concat(returnRequestMatches)
    }

    // Search Triage Logs
    if (!type || type === 'triage') {
      const triageLogMatches = MOCK_TRIAGE_LOGS.filter(
        (log: TriageLog) =>
          log.action.toLowerCase().includes(sanitizedQuery) ||
          log.details.toLowerCase().includes(sanitizedQuery),
      )
      results = results.concat(triageLogMatches)
    }

    // Search Action Packs
    if (!type || type === 'actionpacks') {
      const actionPackMatches = MOCK_ACTION_PACKS.filter(
        (pack: ActionPack) =>
          pack.name.toLowerCase().includes(sanitizedQuery) ||
          pack.description.toLowerCase().includes(sanitizedQuery),
      )
      results = results.concat(actionPackMatches)
    }
  }

  // Limit results
  const finalResults = results.slice(0, MAX_RESULTS)

  return new Response(
    JSON.stringify({
      ok: true,
      data: {
        results: finalResults,
        total: finalResults.length,
        query: query,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    },
  )
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  })
}