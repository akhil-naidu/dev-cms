'use client'

import { LoaderIcon } from '../../icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { updateTask } from '@/admin/components/elements/Table/lib/actions'
import {
  type UpdateTaskSchema,
  updateTaskSchema,
} from '@/admin/components/elements/Table/lib/validations'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Doc } from '@/convex/_generated/dataModel'
import { Task_Schema } from '@/convex/task'
import { getErrorMessage } from '@/utils/handle-error'

interface Props {
  task: Doc<'task'>
}

export function EditForm({ task }: Props) {
  const [isUpdatePending, startUpdateTransition] = useTransition()

  const tasks = Task_Schema

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task?.title ?? '',
      label: task?.label,
      status: task?.status,
      priority: task?.priority,
    },
  })

  function onSubmit(input: UpdateTaskSchema) {
    toast.info('hii')
    startUpdateTransition(() => {
      toast.promise(
        updateTask({
          id: task._id,
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='title'
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Title...'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='label'
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder='Select a label' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(tasks.label.unwrap().enum).map(item => (
                      <SelectItem
                        key={item}
                        value={item}
                        className='capitalize'>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder='Select a status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(tasks.status.enum).map(item => (
                      <SelectItem
                        key={item}
                        value={item}
                        className='capitalize'>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='priority'
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder='Select a priority' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(tasks.priority.unwrap().enum).map(item => (
                      <SelectItem
                        key={item}
                        value={item}
                        className='capitalize'>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type='submit' disabled={isUpdatePending} className='min-w-24'>
            {isUpdatePending ? (
              <LoaderIcon className='animate-spin h-5 w-5' />
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
