import {
  LineChartIcon,
  ListIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/admin/components/icons'

import { Collections } from './types'

export const collections: Collections = [
  {
    slug: 'task',
    label: 'Tasks',
    path: '/admin/collections/task',
    icon: <ListIcon className='h-4 w-4' />,
  },
  {
    slug: 'order',
    label: 'Orders',
    path: '/admin/collections/order',
    icon: <ShoppingCartIcon className='h-4 w-4' />,
  },
  {
    slug: 'products',
    label: 'Products',
    path: '/admin/collections/products',
    icon: <PackageIcon className='h-4 w-4' />,
  },
  {
    slug: 'customers',
    label: 'Customers',
    path: '/admin/collections/customers',
    icon: <UsersIcon className='h-4 w-4' />,
  },
  {
    slug: 'analytics',
    label: 'Analytics',
    path: '/admin/collections/analytics',
    icon: <LineChartIcon className='h-4 w-4' />,
  },
]
