'use client'

import { z } from 'zod'

import AutoForm, { AutoFormSubmit } from '@/components/auto-form'

const formSchema = z.object({
  task: z.string().min(1).max(255),
  completed: z.boolean().default(true).optional(),
  email: z.string().email().min(1).max(9999999999),
  priority: z.enum(['low', 'medium', 'high']).default('high'),
})

const MyForm = () => {
  // const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({})
  return (
    <div className='w-1/3 mx-auto pt-36'>
      <AutoForm
        formSchema={formSchema}
        values={{
          completed: false,
          email: 'akhil@gmail.com',
          priority: 'low',
          task: 'test',
        }}
        // onParsedValuesChange={setValues}
        onValuesChange={data => {
          console.log(data)
        }}>
        <AutoFormSubmit>submit</AutoFormSubmit>
      </AutoForm>
    </div>
  )
}

export default MyForm
