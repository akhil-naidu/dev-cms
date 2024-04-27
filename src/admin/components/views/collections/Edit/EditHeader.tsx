'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { DeleteTasksDialog } from '@/admin/components/elements/Table/delete-tasks-dialog'
import { createTask } from '@/admin/components/elements/Table/lib/actions'
import { CreateTaskSchema } from '@/admin/components/elements/Table/lib/validations'
import {
  CheckIcon,
  ChevronLeftIcon,
  CopyIcon,
  MoreVerticalIcon,
} from '@/admin/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'
import { formatDate } from '@/utils/format-date'
import { getErrorMessage } from '@/utils/handle-error'

interface Props {
  task?: Doc<Collections>
}

const EditHeader: React.FC<Props> = props => {
  const { task } = props

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false)
  const [copied, setCopied] = useState(false)
  const [_, startCreateTransition] = useTransition()

  const router = useRouter()

  const onSuccess = () => {
    router.push('./')
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1300)

    return () => clearTimeout(timeout)
  }, [copied])

  const handleCreate = (input: CreateTaskSchema) => {
    startCreateTransition(() => {
      toast.promise(
        createTask({
          ...input,
        }),
        {
          loading: 'Creating task...',
          success: data => {
            router.push(data?.data?._id || './')
            return 'Task created'
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
    <div className='space-y-4 pb-4'>
      <div className='flex items-center gap-4'>
        <DeleteTasksDialog
          open={showDeleteTaskDialog}
          onOpenChange={setShowDeleteTaskDialog}
          rows={[task] as Doc<Collections>[]}
          showTrigger={false}
          // skipcq: JS-0417
          onSuccess={onSuccess}
        />
        <Button
          className='h-7 w-7'
          size='icon'
          variant='outline'
          // skipcq: JS-0417
          onClick={() => router.push('./')}>
          <ChevronLeftIcon className='h-4 w-4' />
          <span className='sr-only'>Back</span>
        </Button>
        <h1 className='group flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          {task?._id}
          <Button
            className={`h-6 w-6 ${copied ? '' : 'opacity-0'} transition-opacity group-hover:opacity-100 ml-2 duration-300 ease-in-out`}
            size='icon'
            variant='outline'
            // skipcq: JS-0417
            onClick={() => {
              navigator.clipboard
                .writeText(task?._id || 'empty data!')
                .catch(error => {
                  console.error('Error copying object to clipboard:', error)
                })

              setCopied(true)
            }}>
            {copied ? (
              <CheckIcon className='h-3 w-3 transition-all duration-300 ease-in-out' />
            ) : (
              <CopyIcon className='h-3 w-3 transition-all duration-300 ease-in-out' />
            )}
            <span className='sr-only'>Copy ID</span>
          </Button>
        </h1>
        <div className='hidden items-center gap-2 md:ml-auto md:flex'>
          <Button size='sm' variant='outline'>
            Discard
          </Button>
          <Button size='sm'>Save</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='h-8 w-8' size='icon' variant='outline'>
                <MoreVerticalIcon className='h-3.5 w-3.5' />
                <span className='sr-only'>More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                // skipcq: JS-0417
                onClick={() => router.push('create')}>
                Create New
              </DropdownMenuItem>
              <DropdownMenuItem
                // skipcq: JS-0417
                onClick={() => setShowDeleteTaskDialog(true)}>
                Delete
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                // skipcq: JS-0417
                onClick={() => {
                  if (!task) return

                  const { _id, _creationTime, ...withoutSystemFileds } = task
                  handleCreate({ ...withoutSystemFileds })
                }}>
                Duplicate
              </DropdownMenuItem> */}
              <DropdownMenuItem
                // skipcq: JS-0417
                onClick={() => {
                  const jsonString = JSON.stringify(task || 'empty data!')

                  navigator.clipboard.writeText(jsonString).catch(error => {
                    console.error('Error copying object to clipboard:', error)
                  })
                }}>
                Copy Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      <div className='grid'>
        <h2 className='text-md tracking-tight font-extrabold'>Created At</h2>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          {task?._creationTime && formatDate(Number(task?._creationTime))}
        </p>
      </div>
      <Separator />
    </div>
  )
}

export default EditHeader
