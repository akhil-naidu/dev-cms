'use client'

import React from 'react'

import contentTypeConfig from '@/app/(cms)/cms.config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const DynamicForm = () => {
  const { label, fields } = contentTypeConfig

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted!')
  }

  return (
    <div>
      <h1>{label} Form</h1>
      <form onSubmit={e => handleSubmit(e)}>
        {fields.map(field => (
          <div key={field.name} className='flex items-center gap-4'>
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.name}
                name={field.name}
                required={field.required}
              />
            ) : (
              <Input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
              />
            )}
          </div>
        ))}
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default DynamicForm
