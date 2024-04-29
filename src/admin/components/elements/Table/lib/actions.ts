'use server'

import { fetchMutation } from 'convex/nextjs'
import { WithoutSystemFields } from 'convex/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'

import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'
import { getErrorMessage } from '@/utils/handle-error'

// skipcq: JS-0356
export async function createDocument({
  doc,
  collection,
}: {
  doc: WithoutSystemFields<Doc<Collections>>
  collection: Collections
}) {
  noStore()

  try {
    const data = await fetchMutation(api[collection].create, {
      ...doc,
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
export async function updateDocument({
  id,
  collection,
  doc,
}: {
  id: Id<Collections>
  collection: Collections
  doc: WithoutSystemFields<Doc<Collections>>
}) {
  noStore()

  try {
    const data = await fetchMutation(api[collection].update, {
      id,
      patch: { ...doc },
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
export async function deleteDocument({
  id,
  collection,
}: {
  id: Id<Collections>
  collection: Collections
}) {
  try {
    await fetchMutation(api[collection].destroy, {
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
