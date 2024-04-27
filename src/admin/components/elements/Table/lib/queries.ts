'use server'

import { fetchQuery } from 'convex/nextjs'
import { unstable_noStore as noStore } from 'next/cache'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

import { GetTasksSchema } from './validations'

export async function getTask(input: { id: Id<'task'> }) {
  noStore()
  const { id } = input

  try {
    const data = await fetchQuery(api.task.read, { id })

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
    // const data = (await tasksData) as Doc<'task'>[]
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
