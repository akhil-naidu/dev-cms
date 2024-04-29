'use client'

import { WithoutSystemFields } from 'convex/server'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { createDocument } from '@/admin/components/elements/Table/lib/actions'
import { LoaderIcon } from '@/admin/components/icons'
import { useRouterParams } from '@/admin/hooks/use-router-params'
import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { Doc } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'
import { Task_Zod_Object } from '@/convex/task'
import { getErrorMessage } from '@/utils/handle-error'

import CreateHeader from './CreateHeader'

const Create: React.FC = () => {
  const router = useRouter()

  const [isCreatePending, startCreateTransition] = useTransition()

  const { collection } = useRouterParams()

  const handleCreate = (input: WithoutSystemFields<Doc<Collections>>) => {
    startCreateTransition(() => {
      toast.promise(
        createDocument({
          collection,
          doc: { ...input },
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
