'use server'

import { fetchQuery } from 'convex/nextjs'
import { unstable_noStore as noStore } from 'next/cache'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

import { GetTasksSchema } from './validations'

export async function getTask(input: {
  id: Id<Collections>
  collection: Collections
}) {
  noStore()
  const { id, collection } = input

  try {
    // skipcq: JS-0295
    // @ts-expect-error
    const data = await fetchQuery(api[collection].read, { id })

    return { data, error: null }
  } catch (err) {
    return { data: [], error: err }
  }
}

export async function getTasks(input: GetTasksSchema, collection: Collections) {
  noStore()
  // skipcq: JS-0356
  const { page, per_page, sort, title, status, priority, operator, from, to } =
    input

  try {
    // const data = (await tasksData) as Doc<Collections>[]
    const data = await fetchQuery(api[collection].paginate, {
      paginationOpts: {
        numItems: per_page,
        cursor: null,
      },
    })

    return { data: data.page, pageCount: 2 }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}

// export async function getTaskCountByStatus() {
//   noStore()
//   try {
//     return await tasksData.length
//   } catch (err) {
//     return []
//   }
// }

// export async function getTaskCountByPriority() {
//   noStore()
//   try {
//     return await tasksData.length
//   } catch (err) {
//     return []
//   }
// }
