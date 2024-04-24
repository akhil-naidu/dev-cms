'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

const formSchema = z.object({
  task: z.string().min(1).max(255),
  completed: z.boolean(),
  email: z.string().email().min(1).max(9999999999),
})

const MyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   task: 'string',
    //   email: 'akh',
    // },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'>
        <FormField
          control={form.control}
          name='task'
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>task</FormLabel>
              <FormControl>
                <Input placeholder='your task' {...field} />
              </FormControl>
              <FormDescription>Add your task here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='completed'
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>completed</FormLabel>
                <FormDescription>
                  true or false, for the done status
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='email' {...field} />
              </FormControl>
              <FormDescription>Enter user email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default MyForm
