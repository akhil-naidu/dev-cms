'use client'

// import Link from 'next/link'
// import { useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Textarea } from '@/components/ui/textarea'
import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { toast } from '@/components/ui/use-toast'

const profileFormSchema = z.object({
  username: z.string(),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().min(4).max(160),
  urls: z.array(
    z.object({
      url: z.string().url({ message: 'Please enter a valid URL.' }),
    }),
  ),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   bio: 'I own a computer.',
//   urls: [{ url: 'https://shadcn.com' }, { url: 'http://twitter.com/shadcn' }],
// }

export function ProfileForm() {
  // const form = useForm<ProfileFormValues>({
  //   resolver: zodResolver(profileFormSchema),
  //   defaultValues,
  //   mode: 'onChange',
  // })

  // const { fields, append } = useFieldArray({
  //   name: 'urls',
  //   control: form.control,
  // })

  const [formValues, setFormValues] = useState({})

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <AutoForm
      formSchema={profileFormSchema}
      values={formValues}
      onValuesChange={setFormValues}
      onSubmit={() => console.log(formValues)}>
      <AutoFormSubmit>Update</AutoFormSubmit>
    </AutoForm>
  )
}
