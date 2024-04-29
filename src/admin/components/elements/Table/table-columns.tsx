'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type ColumnDef } from '@tanstack/react-table'
import { WithoutSystemFields } from 'convex/server'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { DataTableColumnHeader } from '@/admin/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections, tableConfig } from '@/convex/config'
import { formatDate } from '@/utils/format-date'
import { getErrorMessage } from '@/utils/handle-error'

import { DeleteDialog } from './delete-dialog'
import { createDocument } from './lib/actions'

export function getColumns(
  collection: Collections,
): ColumnDef<Doc<Collections>>[] {
  // const tableSchema = OrderSchema
  const tableSchema = tableConfig[collection]

  const columnsArray: ColumnDef<Doc<Collections>>[] = Object.entries(
    tableSchema,
  ).map(([name, _]) => {
    return {
      accessorKey: name,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex space-x-2'>
            <span className='max-w-[20.25rem] truncate font-medium'>
              {JSON.stringify(row.getValue(name))}
            </span>
          </div>
        )
      },
    }
  })

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
    ...columnsArray,
    // {
    //   accessorKey: 'title',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Title' />
    //   ),
    //   cell: ({ row }) => {
    //     const label = Object.values(tableSchema.label.unwrap().enum).find(
    //       label => label === row.original.label,
    //     )

    //     return (
    //       <div className='flex space-x-2'>
    //         {label && <Badge variant='outline'>{row.getValue('label')}</Badge>}
    //         <span className='max-w-[31.25rem] truncate font-medium'>
    //           {row.getValue('title')}
    //         </span>
    //       </div>
    //     )
    //   },
    // },
    // {
    //   accessorKey: 'status',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Status' />
    //   ),
    //   cell: ({ row }) => {
    //     const status = Object.values(tableSchema.status.enum).find(
    //       status => status === row.original.status,
    //     )

    //     if (!status) return null

    //     const Icon = getStatusIcon(status)

    //     return (
    //       <div className='flex w-[6.25rem] items-center'>
    //         <Icon
    //           className='mr-2 size-4 text-muted-foreground'
    //           aria-hidden='true'
    //         />
    //         <span className='capitalize'>{row.getValue('status')}</span>
    //       </div>
    //     )
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id))
    //   },
    // },
    // {
    //   accessorKey: 'priority',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Priority' />
    //   ),
    //   cell: ({ row }) => {
    //     const priority = Object.values(tableSchema.priority.unwrap().enum).find(
    //       priority => priority === row.original.priority,
    //     )

    //     if (!priority) return null

    //     const Icon = getPriorityIcon(priority)

    //     return (
    //       <div className='flex items-center'>
    //         <Icon
    //           className='mr-2 size-4 text-muted-foreground'
    //           aria-hidden='true'
    //         />
    //         <span className='capitalize'>{priority}</span>
    //       </div>
    //     )
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id))
    //   },
    // },
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
        const [showDeleteDialog, setShowDeleteDialog] = useState(false)
        const [_, startCreateTransition] = useTransition()

        const router = useRouter()
        const pathname = usePathname()

        const handleCreate = (input: WithoutSystemFields<Doc<Collections>>) => {
          startCreateTransition(() => {
            toast.promise(
              createDocument({
                doc: {
                  ...input,
                },
                collection,
              }),
              {
                loading: `Creating ${collection}...`,
                success: () => {
                  return `${collection.charAt(0).toUpperCase() + collection.slice(1)} created`
                },
                error: error => {
                  return getErrorMessage(error)
                },
              },
            )
          })
        }

        return (
          // skipcq: JS-0415
          <>
            <DeleteDialog
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
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
                  onSelect={() => {
                    router.push(`${pathname}/${row.getValue('_id')}`)
                  }}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  // skipcq: JS-0417
                  onClick={() => {
                    const { _id, _creationTime, ...withoutSystemFields } =
                      row.original

                    handleCreate({ ...withoutSystemFields })
                  }}>
                  Duplicate
                </DropdownMenuItem>

                {/* <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.label}
                      // skipcq: JS-0417, JS-0356
                      onValueChange={value => {
                        startUpdateTransition(() => {
                          const {
                            _id,
                            _creationTime,
                            // skipcq: JS-0356
                            label,
                            ...withoutSystemFields
                          } = row.original

                          toast.promise(
                            updateDocument({
                              id: _id,
                              ...withoutSystemFields,
                              label: value as Doc<Collections>['label'],
                            }),
                            {
                              loading: 'Updating...',
                              success: 'Label updated',
                              error: err => getErrorMessage(err),
                            },
                          )
                        })
                      }}>
                      {Object.values(tableSchema.label.unwrap().enum).map(label => (
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
                </DropdownMenuSub> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  // skipcq: JS-0417
                  onSelect={() => setShowDeleteDialog(true)}>
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
