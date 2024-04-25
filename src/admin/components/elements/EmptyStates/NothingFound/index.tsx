'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const NothingFound = () => {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 md:px-6'>
      <div className='max-w-xl text-center space-y-4'>
        <h1 className='text-3xl font-bold tracking-tighter md:text-4xl'>
          Nothing found
        </h1>
        <p className='text-gray-500 dark:text-gray-400'>
          Sorry—there is nothing to correspond with your request.
        </p>

        <Button
          type='button'
          size='lg'
          // skipcq: JS-0417
          onClick={() => router.push('/admin')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default NothingFound
