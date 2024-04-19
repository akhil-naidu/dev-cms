'use client'

import { BellIcon, Package2Icon } from '../../icons'
import Link from 'next/link'

import { collections } from '@/admin/data/collections'
import { Collections } from '@/admin/data/collections/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import NavLinks from './NavLinks'
import { Props } from './types'

const DefaultNav: React.FC<Props> = props => {
  const { navLinks } = props

  return (
    // skipcq: JS-0415
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link className='flex items-center gap-2 font-semibold' href='#'>
            <Package2Icon className='h-6 w-6' />
            <span className=''>Dev Cms</span>
          </Link>
          <Button className='ml-auto h-8 w-8' size='icon' variant='outline'>
            <BellIcon className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <NavLinks navLinks={navLinks} />
        </div>
        <div className='mt-auto p-4'>
          <Card x-chunk='dashboard-02-chunk-0'>
            <CardHeader className='p-2 pt-0 md:p-4'>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
              <Button className='w-full' size='sm'>
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const Nav = () => {
  return <DefaultNav navLinks={collections as Collections} />
}

export default Nav
