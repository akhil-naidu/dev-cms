'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { createTask } from '@/admin/components/elements/Table/lib/actions'
import { CreateTaskSchema } from '@/admin/components/elements/Table/lib/validations'
import { LoaderIcon } from '@/admin/components/icons'
import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { Task_Zod_Object } from '@/convex/task'
import { getErrorMessage } from '@/utils/handle-error'

import CreateHeader from './CreateHeader'

const Create: React.FC = () => {
  const router = useRouter()

  const [isCreatePending, startCreateTransition] = useTransition()

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
    <div className='space-y-6 p-10 pb-16 md:block'>
      <CreateHeader />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <div className='flex-1 w-full'>
          <div className='space-y-6'>
            <AutoForm
              formSchema={Task_Zod_Object}
              // skipcq: JS-0417
              onSubmit={handleCreate}>
              <AutoFormSubmit className='m-w-24'>
                {isCreatePending ? (
                  <LoaderIcon className='animate-spin h-5 w-5' />
                ) : (
                  'Create'
                )}
              </AutoFormSubmit>
            </AutoForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
