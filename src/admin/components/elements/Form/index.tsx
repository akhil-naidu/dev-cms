'use client'

import NothingFound from '../EmptyStates/NothingFound'
import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

import { EditForm } from './edit-form'

interface Props {
  task?: Doc<Collections>
}

const Form: React.FC<Props> = ({ task }) => {
  const pathname = usePathname()

  const isCreatePage = pathname.split('/').pop() === 'create'

  return task?._id || isCreatePage ? (
    // skipcq: JS-0415
    <div className='space-y-6 p-10 pb-16 md:block'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>
          {isCreatePage ? 'Create New' : task?._id}
        </h2>
      </div>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <div className='flex-1 w-full'>
          <div className='space-y-6'>
            <Separator />
            <EditForm task={task} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NothingFound />
  )
}

export default Form
