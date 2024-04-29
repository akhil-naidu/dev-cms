'use client'

import { WithoutSystemFields } from 'convex/server'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateDocument } from '@/admin/components/elements/Table/lib/actions'
import { LoaderIcon } from '@/admin/components/icons'
import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Collections, tableConfig } from '@/convex/config'
import { getErrorMessage } from '@/utils/handle-error'

import EditHeader from './EditHeader'

interface Props {
  document?: Doc<Collections>
  collection: Collections
}

const DefaultEdit: React.FC<Props> = ({ document, collection }) => {
  const [isUpdatePending, startUpdateTransition] = useTransition()

  const handleUpdate = (input: WithoutSystemFields<Doc<Collections>>) => {
    startUpdateTransition(() => {
      toast.promise(
        updateDocument({
          id: document?._id as Id<Collections>,
          collection,
          doc: { ...input },
        }),
        {
          loading: `Updating ${collection}...`,
          success: () => {
            return `${collection.charAt(0).toUpperCase() + collection.slice(1)} updated`
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
      <EditHeader document={document} />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <div className='flex-1 w-full'>
          <div className='space-y-6'>
            {/* <EditForm document={document} /> */}
            <AutoForm
              formSchema={dynamicZodObject}
              values={document}
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
