import { WithoutSystemFields } from 'convex/server'
import { toast } from 'sonner'

import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'
import { getErrorMessage } from '@/utils/handle-error'

import { createTask, deleteTask, updateTask } from './actions'

export function createTasks({
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
          await createTask({
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

export function deleteTasks({
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
          await deleteTask({
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

export function updateTasks({
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

        await updateTask({
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
