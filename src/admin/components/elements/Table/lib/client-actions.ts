import { WithoutSystemFields } from 'convex/server'
import { toast } from 'sonner'

import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'
import { getErrorMessage } from '@/utils/handle-error'

import { createDocument, deleteDocument, updateDocument } from './actions'

export function createDocuments({
  rows,
  onSuccess,
}: {
  rows: WithoutSystemFields<Doc<Collections>>[]
  onSuccess?: () => void
}) {
  toast.promise(
    Promise.all(
      rows.map(
        async row =>
          await createDocument({
            ...row,
          }),
      ),
    ),
    {
      loading: 'Creating...',
      success: () => {
        onSuccess?.()
        return 'Tasks created'
      },
      error: err => getErrorMessage(err),
    },
  )
}

export function deleteDocuments({
  rows,
  onSuccess,
}: {
  rows: Doc<Collections>[]
  onSuccess?: () => void
}) {
  toast.promise(
    Promise.all(
      rows.map(
        async row =>
          await deleteDocument({
            id: row._id,
          }),
      ),
    ),
    {
      loading: 'Deleting...',
      success: () => {
        onSuccess?.()
        return 'Tasks deleted'
      },
      error: err => getErrorMessage(err),
    },
  )
}

export function updateDocuments({
  rows,
  onSuccess,
}: {
  rows: Doc<Collections>[]
  onSuccess?: () => void
}) {
  toast.promise(
    Promise.all(
      rows.map(async row => {
        const { _id, _creationTime, ...withoutSystemFields } = row

        await updateDocument({
          id: row._id,
          ...withoutSystemFields,
        })
      }),
    ),
    {
      loading: 'Updating...',
      success: () => {
        onSuccess?.()
        return 'Tasks updated'
      },
      error: err => getErrorMessage(err),
    },
  )
}
