'use client'

import { HomeIcon } from '../../icons'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  maxLength?: number
  includeSegments?: string[]
  excludeSegmentsLinks?: string[]
}

const Breadcrumbs: React.FC<Props> = props => {
  const { maxLength = 3, includeSegments, excludeSegmentsLinks } = props

  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbItems = segments
    .map((segment, index) => {
      const isLast = index === segments.length - 1
      const href = `/${segments.slice(0, index + 1).join('/')}`

      return (
        <BreadcrumbItem key={segment} className='capitalize'>
          {isLast ? (
            <BreadcrumbPage>{segment}</BreadcrumbPage>
          ) : excludeSegmentsLinks?.includes(segment) ? (
            <p className='cursor-not-allowed'>{segment}</p>
          ) : (
            <BreadcrumbLink href={href} className='hover:underline'>
              {segment}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      )
    })
    ?.filter(breadcrumbItem =>
      includeSegments?.length
        ? includeSegments?.includes(breadcrumbItem?.key || '')
        : true,
    )

  return (
    // skipcq: JS-0415
    <Breadcrumb className='pt-4 px-10'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/admin'>
            <HomeIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {breadcrumbItems.length > maxLength && (
          // skipcq: JS-0415
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  <BreadcrumbEllipsis className='h-4 w-4' />
                  <span className='sr-only'>Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {breadcrumbItems
                    .splice(0, breadcrumbItems.length - maxLength)
                    .map(breadcrumbItem => (
                      <DropdownMenuItem key={breadcrumbItem.key}>
                        {breadcrumbItem}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {breadcrumbItems.map((breadcrumbItem, index) => {
          return (
            <Fragment key={breadcrumbItem.key}>
              {breadcrumbItem}
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
