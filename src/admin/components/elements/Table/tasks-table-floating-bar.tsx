import {
  ArrowUpIcon,
  CheckCircledIcon,
  Cross2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { SelectTrigger } from '@radix-ui/react-select'
import { type Table } from '@tanstack/react-table'
import { useEffect, useTransition } from 'react'

import { Kbd } from '@/admin/components/elements/Kbd'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'
import { Task_Schema } from '@/convex/task'

import { deleteTasks, updateTasks } from './lib/client-actions'

interface TasksTableFloatingBarProps {
  table: Table<Doc<Collections>>
}

export function TasksTableFloatingBar({ table }: TasksTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows

  const [isPending, startTransition] = useTransition()

  const tasks = Task_Schema

  // Clear selection on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        table.toggleAllRowsSelected(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [table])

  return (
    // skipcq: JS-0415
    <div className='fixed inset-x-0 bottom-4 z-50 w-full px-4'>
      <div className='w-full overflow-x-auto'>
        <div className='mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl'>
          <div className='flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1'>
            <span className='whitespace-nowrap text-xs'>
              {rows.length} selected
            </span>
            <Separator orientation='vertical' className='ml-2 mr-1' />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='size-5 hover:border'
                  // skipcq: JS-0417
                  onClick={() => table.toggleAllRowsSelected(false)}>
                  <Cross2Icon
                    className='size-3.5 shrink-0'
                    aria-hidden='true'
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='flex items-center border bg-accent font-semibold text-foreground dark:bg-zinc-900'>
                <p className='mr-2'>Clear selection</p>
                <Kbd abbrTitle='Escape' variant='outline'>
                  Esc
                </Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation='vertical' className='hidden h-5 sm:block' />
          <div className='flex items-center gap-1.5'>
            <Select
              // skipcq: JS-0417
              onValueChange={(value: Doc<Collections>['status']) => {
                const tasks = rows.map(row => {
                  return { ...row.original, status: value }
                })

                startTransition(() => {
                  updateTasks({
                    rows: [...tasks],
                    onSuccess: () => table.toggleAllRowsSelected(false),
                  })
                })
              }}>
              <Tooltip>
                <SelectTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant='secondary'
                      size='icon'
                      className='size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground'
                      disabled={isPending}>
                      <CheckCircledIcon className='size-4' aria-hidden='true' />
                    </Button>
                  </TooltipTrigger>
                </SelectTrigger>
                <TooltipContent className=' border bg-accent font-semibold text-foreground dark:bg-zinc-900'>
                  <p>Update status</p>
                </TooltipContent>
              </Tooltip>
              <SelectContent align='center'>
                <SelectGroup>
                  {Object.values(tasks.status.enum).map(status => (
                    <SelectItem
                      key={status}
                      value={status}
                      className='capitalize'>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              // skipcq: JS-0417
              onValueChange={(value: string) => {
                const tasks = rows.map(row => {
                  return {
                    ...row.original,
                    priority: value as Doc<Collections>['priority'],
                  }
                })

                startTransition(() => {
                  updateTasks({
                    rows: [...tasks],
                    onSuccess: () => table.toggleAllRowsSelected(false),
                  })
                })
              }}>
              <Tooltip>
                <SelectTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant='secondary'
                      size='icon'
                      className='size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground'
                      disabled={isPending}>
                      <ArrowUpIcon className='size-4' aria-hidden='true' />
                    </Button>
                  </TooltipTrigger>
                </SelectTrigger>
                <TooltipContent className=' border bg-accent font-semibold text-foreground dark:bg-zinc-900'>
                  <p>Update priority</p>
                </TooltipContent>
              </Tooltip>
              <SelectContent align='center'>
                <SelectGroup>
                  {Object.values(tasks.priority.unwrap().enum).map(priority => (
                    <SelectItem
                      key={priority}
                      value={priority}
                      className='capitalize'>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='secondary'
                  size='icon'
                  className='size-7 border'
                  // skipcq: JS-0417
                  onClick={() => {
                    const tasks = rows.map(row => row.original)

                    startTransition(() => {
                      deleteTasks({
                        rows: tasks,
                        onSuccess: () => table.toggleAllRowsSelected(false),
                      })
                    })
                  }}
                  disabled={isPending}>
                  <TrashIcon className='size-4' aria-hidden='true' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className=' border bg-accent font-semibold text-foreground dark:bg-zinc-900'>
                <p>Delete tasks</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
