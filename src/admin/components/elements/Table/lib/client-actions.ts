import { type Row } from '@tanstack/react-table'
import { toast } from 'sonner'

import { Doc } from '@/convex/_generated/dataModel'
import { getErrorMessage } from '@/utils/handle-error'

import { deleteTask, updateTask } from './actions'

export function deleteTasks({
  rows,
  onSuccess,
}: {
  rows: Doc<'task'>[]
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
  label,
  status,
  priority,
  onSuccess,
}: {
  rows: Row<Doc<'task'>>[]
  label?: Doc<'task'>['label']
  status?: Doc<'task'>['status']
  priority?: Doc<'task'>['priority']
  onSuccess?: () => void
}) {
  toast.promise(
    Promise.all(
      // skipcq: JS-0116
      rows.map(async row =>
        updateTask({
          id: row.original._id,
          title: row.original.title,
          label,
          status: status || row.original.status,
          priority,
        }),
      ),
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
