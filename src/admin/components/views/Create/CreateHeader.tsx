'use client'

import { useRouter } from 'next/navigation'

import { ChevronLeftIcon } from '@/admin/components/icons'
import { Button } from '@/components/ui/button'

const CreateHeader: React.FC = () => {
  const router = useRouter()

  return (
    // skipcq: JS-0415
    <div className='space-y-4 pb-4'>
      <div className='flex items-center gap-4'>
        <Button
          className='h-7 w-7'
          size='icon'
          variant='outline'
          // skipcq: JS-0417
          onClick={() => router.push('./')}>
          <ChevronLeftIcon className='h-4 w-4' />
          <span className='sr-only'>Back</span>
        </Button>
        <h1 className='group flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          Create New
        </h1>
      </div>
    </div>
  )
}

export default CreateHeader
