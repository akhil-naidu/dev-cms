'use client'

import { DownloadIcon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

import { CreateDialog } from './create-dialog'
import { DeleteDialog } from './delete-dialog'
import { exportTableToCSV } from './lib/export'

interface TableToolbarActionsProps {
  table: Table<Doc<Collections>>
}

export const TableToolbarActions = ({ table }: TableToolbarActionsProps) => {
  return (
    <div className='flex items-center gap-2'>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteDialog
          rows={table
            .getFilteredSelectedRowModel()
            .rows.map(row => row.original)}
          // skipcq: JS-0417
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
        />
      ) : null}
      <CreateDialog />
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
