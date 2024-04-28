'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { DeleteDialog } from '@/admin/components/elements/Table/delete-dialog'
import { MoreVerticalIcon } from '@/admin/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

interface Props {
  tasks: Doc<any>[]
}

const ListHeader: React.FC<Props> = props => {
  const { tasks } = props

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false)

  const pathname = usePathname()

  return (
    // skipcq: JS-0415
    <div className='flex items-center justify-between space-y-2'>
      <DeleteDialog
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        rows={[...tasks] as Doc<Collections>[]}
        showTrigger={false}
      />
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
        <p className='text-muted-foreground'>Manage your tasks.</p>
      </div>
      <div className='flex flex-row items-start h-full space-x-4'>
        <Link
          href={`${pathname}/create`}
          className={buttonVariants({
            variant: 'default',
            size: 'sm',
          })}>
          Create New
        </Link>
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
              onClick={() => setShowDeleteTaskDialog(true)}>
              Delete All
            </DropdownMenuItem>
            <DropdownMenuItem
              // skipcq: JS-0417
              onClick={() => {
                const jsonString = JSON.stringify(tasks || 'empty data!')

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
  )
}

export default ListHeader
