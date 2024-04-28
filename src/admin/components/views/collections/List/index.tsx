import { getDocuments } from '@/admin/components/elements/Table/lib/queries'
import { searchParamsSchema } from '@/admin/components/elements/Table/lib/validations'
import type { SearchParams } from '@/admin/components/elements/Table/types'
import { Collections } from '@/convex/config'

import DefaultList from './Default'
import ListHeader from './ListHeader'

export interface Props {
  searchParams: SearchParams
  collection: Collections
}

const ListView: React.FC<Props> = async ({ searchParams, collection }) => {
  const search = searchParamsSchema.parse(searchParams)

  const tasks = await getDocuments(search, collection)

  return (
    // skipcq: JS-0415
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <ListHeader tasks={tasks.data} />
      <DefaultList searchParams={searchParams} collection={collection} />
    </div>
  )
}

export default ListView
