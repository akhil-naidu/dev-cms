'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import NothingFound from '@/admin/components/elements/EmptyStates/NothingFound'
import {
  createTask,
  updateTask,
} from '@/admin/components/elements/Table/lib/actions'
import {
  CreateTaskSchema,
  type UpdateTaskSchema,
  updateTaskSchema,
} from '@/admin/components/elements/Table/lib/validations'
import { LoaderIcon } from '@/admin/components/icons'
import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { Separator } from '@/components/ui/separator'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Task_Zod_Object } from '@/convex/task'
import { getErrorMessage } from '@/utils/handle-error'

interface Props {
  task?: Doc<'task'>
}

const DefaultEdit: React.FC<Props> = ({ task }) => {
  const pathname = usePathname()

  const router = useRouter()

  const isCreatePage = pathname.split('/').pop() === 'create'

  const [isCreatePending, startCreateTransition] = useTransition()
  const [isUpdatePending, startUpdateTransition] = useTransition()

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task?.title ?? '',
      label: task?.label,
      status: task?.status,
      priority: task?.priority,
    },
  })

  const handleUpdate = (input: UpdateTaskSchema) => {
    console.log('input: ', input)
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

  const handleCreate = (input: CreateTaskSchema) => {
    startCreateTransition(() => {
      toast.promise(
        createTask({
          ...input,
        }),
        {
          loading: 'Creating task...',
          success: data => {
            form.reset()
            router.push(data?.data?._id || '../')
            return 'Task created'
          },
          error: error => {
            return getErrorMessage(error)
          },
        },
      )
    })
  }

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
            {/* <EditForm task={task} /> */}
            <AutoForm
              formSchema={Task_Zod_Object}
              values={task}
              // skipcq: JS-0417
              onSubmit={isCreatePage ? handleCreate : handleUpdate}>
              {isCreatePage ? (
                <AutoFormSubmit>
                  {isCreatePending ? (
                    <LoaderIcon className='animate-spin h-5 w-5' />
                  ) : (
                    'Create'
                  )}
                </AutoFormSubmit>
              ) : (
                <AutoFormSubmit>
                  {isUpdatePending ? (
                    <LoaderIcon className='animate-spin h-5 w-5' />
                  ) : (
                    'Update'
                  )}
                </AutoFormSubmit>
              )}
            </AutoForm>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NothingFound />
  )
}

export default DefaultEdit
