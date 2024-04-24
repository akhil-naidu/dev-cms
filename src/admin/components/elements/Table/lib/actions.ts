'use server'

import { unstable_noStore as noStore, revalidatePath } from 'next/cache'

import { getErrorMessage } from '@/utils/handle-error'

import type { CreateTaskSchema, UpdateTaskSchema } from './validations'

// skipcq: JS-0356
export async function createTask(input: CreateTaskSchema) {
  noStore()
  try {
    await Promise.all([
      // db.insert(tasks).values({
      //   code: `TASK-${customAlphabet("0123456789", 4)()}`,
      //   title: input.title,
      //   status: input.status,
      //   label: input.label,
      //   priority: input.priority,
      // }),
    ])

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

// skipcq: JS-0116, JS-0356
export async function updateTask(input: UpdateTaskSchema & { id: string }) {
  noStore()
  try {
    // await db
    //   .update(tasks)
    //   .set({
    //     title: input.title,
    //     label: input.label,
    //     status: input.status,
    //     priority: input.priority,
    //   })
    //   .where(eq(tasks.id, input.id))

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

// skipcq: JS-0116, JS-0356
export async function deleteTask(input: { id: string }) {
  try {
    // await db.delete(tasks).where(eq(tasks.id, input.id))

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
