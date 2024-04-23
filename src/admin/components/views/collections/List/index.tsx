'use client'

import NoCollections from '@/admin/components/elements/EmptyStates/NoCollections'
import { collections } from '@/admin/data/collections'

import DefaultList from './Default'

const ListView: React.FC = () => {
  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      {collections.length ? <DefaultList /> : <NoCollections />}
    </div>
  )
}

export default ListView
