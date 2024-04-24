import { unstable_noStore as noStore } from 'next/cache'

import { Doc } from '@/convex/_generated/dataModel'

import { tasksData } from './data'

export async function getTasks() {
  // input: GetTasksSchema
  noStore()
  // const { page, per_page, sort, title, status, priority, operator, from, to } =
  //   input

  try {
    const data = (await tasksData) as Doc<'task'>[]
    const pageCount = 5
    return { data, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}

export async function getTaskCountByStatus() {
  noStore()
  try {
    return await tasksData.length
  } catch (err) {
    return []
  }
}

export async function getTaskCountByPriority() {
  noStore()
  try {
    return await tasksData.length
  } catch (err) {
    return []
  }
}
