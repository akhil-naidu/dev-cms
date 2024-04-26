'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { updateTask } from '@/admin/components/elements/Table/lib/actions'
import { type UpdateTaskSchema } from '@/admin/components/elements/Table/lib/validations'
import { LoaderIcon } from '@/admin/components/icons'
import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Task_Zod_Object } from '@/convex/task'
import { getErrorMessage } from '@/utils/handle-error'

import EditHeader from './EditHeader'

interface Props {
  task?: Doc<'task'>
}

const DefaultEdit: React.FC<Props> = ({ task }) => {
  const [isUpdatePending, startUpdateTransition] = useTransition()

  const handleUpdate = (input: UpdateTaskSchema) => {
    startUpdateTransition(() => {
      toast.promise(
        updateTask({
          id: task?._id as Id<'task'>,
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

  return (
    // skipcq: JS-0415
    <div className='space-y-6 p-10 pb-16 md:block'>
      <EditHeader task={task} />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <div className='flex-1 w-full'>
          <div className='space-y-6'>
            {/* <EditForm task={task} /> */}
            <AutoForm
              formSchema={Task_Zod_Object}
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
