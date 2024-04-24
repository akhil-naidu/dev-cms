'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Doc } from '@/convex/_generated/dataModel'

import { EditForm } from './edit-form'

interface Props {
  task?: Doc<'task'>
}

const Form: React.FC<Props> = ({ task }) => {
  const pathname = usePathname()

  const router = useRouter()

  const isCreatePage = pathname.split('/').pop() === 'create'

  return (
    // skipcq: JS-0415, JS-0012
    task?._id || isCreatePage ? (
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
      <div className='flex flex-col items-center justify-center min-h-screen px-4 md:px-6'>
        <div className='max-w-xl text-center space-y-4'>
          <h1 className='text-3xl font-bold tracking-tighter md:text-4xl'>
            Nothing found
          </h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Sorry—there is nothing to correspond with your request.
          </p>

          <Button
            type='button'
            size='lg'
            // skipcq: JS-0417
            onClick={() => router.push('create')}>
            Create New
          </Button>
        </div>
      </div>
    )
  )
}

export default Form
