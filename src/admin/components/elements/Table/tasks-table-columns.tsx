'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type ColumnDef } from '@tanstack/react-table'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { DataTableColumnHeader } from '@/admin/components/data-table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Doc } from '@/convex/_generated/dataModel'
import { Task_Schema } from '@/convex/task'
import { formatDate } from '@/utils/format-date'
import { getErrorMessage } from '@/utils/handle-error'

import { DeleteTasksDialog } from './delete-tasks-dialog'
import { updateTask } from './lib/actions'
import { getPriorityIcon, getStatusIcon } from './lib/utils'
import { UpdateTaskSheet } from './update-task-sheet'

export function getColumns(): ColumnDef<Doc<'task'>>[] {
  const tasks = Task_Schema

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          // skipcq: JS-0417
          onCheckedChange={value =>
            table.toggleAllPageRowsSelected(Boolean(value))
          }
          aria-label='Select all'
          className='translate-y-0.5'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          // skipcq: JS-0417
          onCheckedChange={value => row.toggleSelected(Boolean(value))}
          aria-label='Select row'
          className='translate-y-0.5'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: '_id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Id' />
      ),
      cell: ({ row }) => <div>{row.getValue('_id')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Title' />
      ),
      cell: ({ row }) => {
        const label = Object.values(tasks.label.unwrap().enum).find(
          label => label === row.original.label,
        )

        return (
          <div className='flex space-x-2'>
            {label && <Badge variant='outline'>{label}</Badge>}
            <span className='max-w-[31.25rem] truncate font-medium'>
              {row.getValue('title')}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const status = Object.values(tasks.status.enum).find(
          status => status === row.original.status,
        )

        if (!status) return null

        const Icon = getStatusIcon(status)

        return (
          <div className='flex w-[6.25rem] items-center'>
            <Icon
              className='mr-2 size-4 text-muted-foreground'
              aria-hidden='true'
            />
            <span className='capitalize'>{status}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Priority' />
      ),
      cell: ({ row }) => {
        const priority = Object.values(tasks.priority.unwrap().enum).find(
          priority => priority === row.original.priority,
        )

        if (!priority) return null

        const Icon = getPriorityIcon(priority)

        return (
          <div className='flex items-center'>
            <Icon
              className='mr-2 size-4 text-muted-foreground'
              aria-hidden='true'
            />
            <span className='capitalize'>{priority}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: '_creationTime',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Created At' />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = useTransition()
        const [showUpdateTaskSheet, setShowUpdateTaskSheet] = useState(false)
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false)

        return (
          // skipcq: JS-0415
          <>
            <UpdateTaskSheet
              open={showUpdateTaskSheet}
              onOpenChange={setShowUpdateTaskSheet}
              task={row.original}
            />
            <DeleteTasksDialog
              open={showDeleteTaskDialog}
              onOpenChange={setShowDeleteTaskDialog}
              rows={[row.original]}
              showTrigger={false}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label='Open menu'
                  variant='ghost'
                  className='flex size-8 p-0 data-[state=open]:bg-muted'>
                  <DotsHorizontalIcon className='size-4' aria-hidden='true' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-40'>
                <DropdownMenuItem
                  // skipcq: JS-0417
                  onSelect={() => setShowUpdateTaskSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.label}
                      // skipcq: JS-0417, JS-0356
                      onValueChange={value => {
                        startUpdateTransition(() => {
                          toast.promise(
                            updateTask({
                              id: row.original._id,
                              title: row.original.title,
                              status: row.original.status,
                            }),
                            {
                              loading: 'Updating...',
                              success: 'Label updated',
                              error: err => getErrorMessage(err),
                            },
                          )
                        })
                      }}>
                      {Object.values(tasks.label.unwrap().enum).map(label => (
                        <DropdownMenuRadioItem
                          key={label}
                          value={label}
                          className='capitalize'
                          disabled={isUpdatePending}>
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  // skipcq: JS-0417
                  onSelect={() => setShowDeleteTaskDialog(true)}>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
