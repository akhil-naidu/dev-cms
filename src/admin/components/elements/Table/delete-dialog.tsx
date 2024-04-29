'use client'

import { LoaderIcon } from '../../icons'
import { TrashIcon } from '@radix-ui/react-icons'
import { useTransition } from 'react'

import { useRouterParams } from '@/admin/hooks/use-router-params'
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
import { Collections } from '@/convex/config'

import { deleteDocuments } from './lib/client-actions'

interface DeleteDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  rows: Doc<Collections>[]
  onSuccess?: () => void
  showTrigger?: boolean
}

export function DeleteDialog({
  rows,
  onSuccess,
  showTrigger = true,
  ...props
}: DeleteDialogProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()

  const { collection } = useRouterParams()

  return (
    // skipcq: JS-0415
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <TrashIcon className='mr-2 size-4' aria-hidden='true' />
            Delete ({rows.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className='font-medium'>{rows.length}</span>
            {rows.length === 1 ? ` ${collection}` : ` ${collection}s`} from our
            servers.
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
                  deleteDocuments({
                    rows,
                    onSuccess,
                  })
                })
              }}
              disabled={isDeletePending}>
              {isDeletePending ? (
                <LoaderIcon className='animate-spin h-5 w-5' />
              ) : (
                'Delete'
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
