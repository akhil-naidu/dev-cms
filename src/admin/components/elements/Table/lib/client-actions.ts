import { WithoutSystemFields } from 'convex/server'
import { toast } from 'sonner'

import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'
import { getErrorMessage } from '@/utils/handle-error'

import { createDocument, deleteDocument, updateDocument } from './actions'

export function createDocuments({
  rows,
  collection,
  onSuccess,
}: {
  rows: WithoutSystemFields<Doc<Collections>>[]
  collection: Collections
  onSuccess?: () => void
}) {
  toast.promise(
    Promise.all(
      rows.map(
        async row =>
          await createDocument({
            collection,
            doc: { ...row },
          }),
      ),
    ),
    {
      loading: `Creating ${collection}s...`,
      success: () => {
        onSuccess?.()
        return `${collection.charAt(0).toUpperCase()}${collection.slice(1)}s created`
      },
      error: err => getErrorMessage(err),
    },
  )
}

export function deleteDocuments({
  rows,
  collection,
  onSuccess,
}: {
  rows: Doc<Collections>[]
  collection: Collections
  onSuccess?: () => void
}) {
  toast.promise(
    Promise.all(
      rows.map(
        async row =>
          await deleteDocument({
            id: row._id,
            collection,
          }),
      ),
    ),
    {
      loading: `Deleting ${collection}s...`,
      success: () => {
        onSuccess?.()
        return `${collection.charAt(0).toUpperCase()}${collection.slice(1)}s deleted`
      },
      error: err => getErrorMessage(err),
    },
  )
}

export function updateDocuments({
  rows,
  collection,
  onSuccess,
}: {
  rows: Doc<Collections>[]
  collection: Collections
  onSuccess?: () => void
}) {
  toast.promise(
    Promise.all(
      rows.map(async row => {
        const { _id, _creationTime, ...withoutSystemFields } = row

        await updateDocument({
          id: row._id,
          collection,
          doc: { ...withoutSystemFields },
        })
      }),
    ),
    {
      loading: `Updating ${collection}s...`,
      success: () => {
        onSuccess?.()
        return `${collection.charAt(0).toUpperCase() + collection.slice(1)} updated`
      },
      error: err => getErrorMessage(err),
    },
  )
}
