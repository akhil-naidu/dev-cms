'use client'

import { useRouter } from 'next/navigation'

import { ChevronLeftIcon } from '@/admin/components/icons'
import { Button } from '@/components/ui/button'
import { Doc } from '@/convex/_generated/dataModel'

interface Props {
  isCreatePage: boolean
  task?: Doc<'task'>
}

const EditHeader: React.FC<Props> = props => {
  const { isCreatePage, task } = props

  const router = useRouter()

  return (
    <div className='flex items-center gap-4'>
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
      </div>
    </div>
  )
}

export default EditHeader
