'use server'

import { fetchMutation } from 'convex/nextjs'
import { WithoutSystemFields } from 'convex/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'

import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { getErrorMessage } from '@/utils/handle-error'

// skipcq: JS-0356
export async function createTask(input: WithoutSystemFields<Doc<'task'>>) {
  noStore()

  try {
    const data = await fetchMutation(api.task.create, {
      ...input,
    })

    revalidatePath('/')

    return {
      data,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

// skipcq: JS-0116, JS-0356
export async function updateTask(
  input: WithoutSystemFields<Doc<'task'>> & { id: Id<'task'> },
) {
  noStore()

  const { id, ...newData } = input

  try {
    const data = await fetchMutation(api.task.update, {
      id,
      patch: { ...newData },
    })

    revalidatePath('/')

    return {
      data,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

// skipcq: JS-0116, JS-0356
export async function deleteTask(input: { id: Id<'task'> }) {
  const { id } = input

  try {
    await fetchMutation(api.task.destroy, {
      id,
    })

    revalidatePath('/')

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
