'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Doc } from '@/convex/_generated/dataModel'

import { deleteTasks } from './lib/client-actions'

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Row<Doc<'task'>>[]
  onSuccess?: () => void
  showTrigger?: boolean
}

export function DeleteTasksDialog({
  tasks,
  onSuccess,
  showTrigger = true,
  ...props
}: DeleteTasksDialogProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()

  return (
    // skipcq: JS-0415
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <TrashIcon className='mr-2 size-4' aria-hidden='true' />
            Delete ({tasks.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className='font-medium'>{tasks.length}</span>
            {tasks.length === 1 ? ' task' : ' tasks'} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2 sm:space-x-0'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              aria-label='Delete selected rows'
              variant='destructive'
              // skipcq: JS-0417
              onClick={() => {
                startDeleteTransition(() => {
                  deleteTasks({
                    rows: tasks,
                    onSuccess,
                  })
                })
              }}
              disabled={isDeletePending}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
