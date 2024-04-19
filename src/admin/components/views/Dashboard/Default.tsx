'use client'

import Link from 'next/link'

import { CollectionItem } from '@/admin/data/collections/types'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Props } from './types'

const Dashboard: React.FC<Props> = props => {
  const { collections } = props

  return (
    // skipcq: JS-0415
    <main className='flex flex-1 flex-col gap-6 p-6 lg:gap-8 lg:p-10'>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Collections</h1>
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {collections?.map((collection: CollectionItem) => {
          // skipcq: JS-0356
          const { slug, label, description, icon, path } = collection

          return (
            <Link key={slug} href={path || `/admin/collections/${slug}`}>
              <Card>
                <CardHeader>
                  {/* <SearchIcon className='h-8 w-8 mb-4' /> */}
                  <CardTitle>{label}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </section>
    </main>
  )
}

export default Dashboard
