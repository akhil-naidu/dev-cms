'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import { useMutation } from 'convex/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { api } from '@/convex/_generated/api'
import { Task_Schema } from '@/convex/task'
import { getErrorMessage } from '@/utils/handle-error'

import { type CreateTaskSchema, createTaskSchema } from './lib/validations'

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)
  const [isCreatePending, startCreateTransition] = useTransition()

  const createTask = useMutation(api.task.create)

  const { label, priority, status } = Task_Schema

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  })

  function onSubmit(input: CreateTaskSchema) {
    startCreateTransition(() => {
      toast.promise(
        createTask({
          ...input,
        }),
        {
          loading: 'Creating task...',
          success: () => {
            form.reset()
            setOpen(false)
            return 'Task created'
          },
          error: error => {
            setOpen(false)
            return getErrorMessage(error)
          },
        },
      )
    })
  }

  return (
    // skipcq: JS-0415
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <PlusIcon className='mr-2 size-4' aria-hidden='true' />
          New task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>
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
                      placeholder='Do a kickflip'
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='capitalize'>
                        <SelectValue placeholder='Select a label' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(label.unwrap().enum).map(item => (
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='capitalize'>
                        <SelectValue placeholder='Select a status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(status.enum).map(item => (
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='capitalize'>
                        <SelectValue placeholder='Select a priority' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(priority.unwrap().enum).map(item => (
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
            <DialogFooter className='gap-2 pt-2 sm:space-x-0'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isCreatePending}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
