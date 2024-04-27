'use client'

import { DownloadIcon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

import { CreateTaskDialog } from './create-task-dialog'
import { DeleteTasksDialog } from './delete-tasks-dialog'
import { exportTableToCSV } from './lib/export'

interface TasksTableToolbarActionsProps {
  table: Table<Doc<Collections>>
}

export function TasksTableToolbarActions({
  table,
}: TasksTableToolbarActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          rows={table
            .getFilteredSelectedRowModel()
            .rows.map(row => row.original)}
          // skipcq: JS-0417
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
        />
      ) : null}
      <CreateTaskDialog />
      <Button
        variant='outline'
        size='sm'
        // skipcq: JS-0417
        onClick={() =>
          exportTableToCSV(table, {
            filename: 'tasks',
            excludeColumns: ['select', 'actions'],
          })
        }>
        <DownloadIcon className='mr-2 size-4' aria-hidden='true' />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, export, import, etc.
       */}
    </div>
  )
}
