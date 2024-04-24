import { fetchMutation, fetchQuery } from 'convex/nextjs'

import { api } from '@/convex/_generated/api'

export async function GET() {
  const data = await fetchQuery(api.task.paginate, {
    paginationOpts: {
      numItems: 2,
      cursor: null,
    },
  })

  return Response.json({ ...data })
}

export async function POST(request: Request) {
  const body = await request.json()
  console.log(body)

  const data = await fetchMutation(api.task.create, {
    title: 'adding react table',
    status: 'in-progress',
  })

  return Response.json({ success: true, data })
}
