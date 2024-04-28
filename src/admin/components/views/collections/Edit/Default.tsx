'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateDocument } from '@/admin/components/elements/Table/lib/actions'
import { type UpdateTaskSchema } from '@/admin/components/elements/Table/lib/validations'
import { LoaderIcon } from '@/admin/components/icons'
import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Collections, tableConfig } from '@/convex/config'
import { getErrorMessage } from '@/utils/handle-error'

import EditHeader from './EditHeader'

interface Props {
  task?: Doc<Collections>
  collection: Collections
}

const DefaultEdit: React.FC<Props> = ({ task, collection }) => {
  const [isUpdatePending, startUpdateTransition] = useTransition()

  console.log('dfe', collection)

  const handleUpdate = (input: UpdateTaskSchema) => {
    startUpdateTransition(() => {
      toast.promise(
        updateDocument({
          id: task?._id as Id<Collections>,
          ...input,
        }),
        {
          loading: 'Updating task...',
          success: () => {
            return 'Task updated'
          },
          error: error => {
            return getErrorMessage(error)
          },
        },
      )
    })
  }

  const dynamicZodObject = z.object(tableConfig[collection])
  type dynamicZodObject = z.infer<typeof dynamicZodObject>

  return (
    // skipcq: JS-0415
    <div className='space-y-6 p-10 pb-16 md:block'>
      <EditHeader task={task} />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <div className='flex-1 w-full'>
          <div className='space-y-6'>
            {/* <EditForm task={task} /> */}
            <AutoForm
              formSchema={dynamicZodObject}
              values={task}
              // skipcq: JS-0417
              onSubmit={handleUpdate}>
              <AutoFormSubmit>
                {isUpdatePending ? (
                  <LoaderIcon className='animate-spin h-5 w-5' />
                ) : (
                  'Save'
                )}
              </AutoFormSubmit>
            </AutoForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultEdit
