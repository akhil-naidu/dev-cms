'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DeleteTasksDialog } from '@/admin/components/elements/Table/delete-tasks-dialog'
import { ChevronLeftIcon, MoreVerticalIcon } from '@/admin/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Doc } from '@/convex/_generated/dataModel'

interface Props {
  isCreatePage: boolean
  task?: Doc<'task'>
}

const EditHeader: React.FC<Props> = props => {
  const { isCreatePage, task } = props

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false)

  const router = useRouter()

  const onSuccess = () => {
    router.push('./')
  }

  return (
    // skipcq: JS-0415
    <div className='flex items-center gap-4'>
      <DeleteTasksDialog
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        rows={[task] as Doc<'task'>[]}
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
      <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
        {isCreatePage ? 'Create New' : task?._id}
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default EditHeader
