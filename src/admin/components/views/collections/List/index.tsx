'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { SearchParams } from '@/admin/components/elements/Table/types'
import { buttonVariants } from '@/components/ui/button'

import DefaultList from './Default'

export interface Props {
  searchParams: SearchParams
}

const ListView: React.FC<Props> = ({ searchParams }) => {
  const pathname = usePathname()

  return (
    // skipcq: JS-0415
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <Link
              href={`${pathname}/create`}
              className={buttonVariants({
                variant: 'default',
                className: 'w-24',
              })}>
              Create New
            </Link>
          </div>
          <p className='text-muted-foreground'>Manage your tasks.</p>
        </div>
      </div>
      <DefaultList searchParams={searchParams} />
    </div>
  )
}

export default ListView
