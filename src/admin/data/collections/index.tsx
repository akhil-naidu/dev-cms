import {
  HomeIcon,
  LineChartIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/admin/components/icons'

export const collections = [
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
