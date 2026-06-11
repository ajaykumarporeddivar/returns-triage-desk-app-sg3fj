import { type NextRequest } from 'next/server'
import {
  MOCK_RETURN_REQUESTS,
  MOCK_TRIAGE_LOGS,
  MOCK_ACTION_PACKS,
  STATS,
} from '@/lib/data'
import {
  type ActionPack,
  type ReturnRequest,
  type TriageLog,
  type STATS_TYPE,
} from '@/lib/types'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function GET(): Promise<Response> {
  const data: {
    returnRequests: ReturnRequest[]
    triageLogs: TriageLog[]
    actionPacks: ActionPack[]
    stats: STATS_TYPE
    total: number
  } = {
    returnRequests: MOCK_RETURN_REQUESTS,
    triageLogs: MOCK_TRIAGE_LOGS,
    actionPacks: MOCK_ACTION_PACKS,
    stats: STATS,
    total: MOCK_RETURN_REQUESTS.length,
  }

  return new Response(JSON.stringify({ ok: true, data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  })
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()
    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Demo mode — data not persisted',
        received: body,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: 'Invalid JSON body' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
      },
    )
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  })
}