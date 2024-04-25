'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'

const ListHeader = () => {
  const pathname = usePathname()

  return (
    <div className='flex items-center justify-between space-y-2'>
      <div>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
          <Link
            href={`${pathname}/create`}
            className={buttonVariants({
              variant: 'default',
              size: 'sm',
            })}>
            Create New
          </Link>
        </div>
        <p className='text-muted-foreground'>Manage your tasks.</p>
      </div>
    </div>
  )
}

export default ListHeader
