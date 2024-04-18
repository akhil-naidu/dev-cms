'use client'

import {
  BellIcon,
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '../../icons'
import NoCollections from '../EmptyStates/NoCollections'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { NavLink, Props } from './types'

const DefaultNav: React.FC<Props> = props => {
  const pathname = usePathname()
  const { navLinks } = props

  return (
    // skipcq: JS-0415
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link className='flex items-center gap-2 font-semibold' href='#'>
            <Package2Icon className='h-6 w-6' />
            <span className=''>Acme Inc</span>
          </Link>
          <Button className='ml-auto h-8 w-8' size='icon' variant='outline'>
            <BellIcon className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            {navLinks?.map(({ label, url, icon }: NavLink) => {
              const isActive = pathname === url
              const linkClassNames = isActive
                ? 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'
                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'

              return (
                <Link key={url} className={linkClassNames} href={url}>
                  {icon}
                  {label}
                </Link>
              )
            })}
          </nav>
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
  const navLinks = [
    {
      label: 'Home',
      url: '/admin/collections/home',
      icon: <HomeIcon className='h-4 w-4' />,
    },
    {
      label: 'Orders',
      url: '/admin/collections/orders',
      icon: <ShoppingCartIcon className='h-4 w-4' />,
    },
    {
      label: 'Products',
      url: '/admin/collections/products',
      icon: <PackageIcon className='h-4 w-4' />,
    },
    {
      label: 'Customers',
      url: '/admin/collections/customers',
      icon: <UsersIcon className='h-4 w-4' />,
    },
    {
      label: 'Analytics',
      url: '/admin/collections/analytics',
      icon: <LineChartIcon className='h-4 w-4' />,
    },
  ]

  return navLinks.length ? (
    <DefaultNav navLinks={navLinks} />
  ) : (
    <NoCollections />
  )
}

export default Nav
