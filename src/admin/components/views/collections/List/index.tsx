import { getTasks } from '@/admin/components/elements/Table/lib/queries'
import { searchParamsSchema } from '@/admin/components/elements/Table/lib/validations'
import type { SearchParams } from '@/admin/components/elements/Table/types'

import DefaultList from './Default'
import ListHeader from './ListHeader'

export interface Props {
  searchParams: SearchParams
}

const ListView: React.FC<Props> = async ({ searchParams }) => {
  const search = searchParamsSchema.parse(searchParams)

  const tasks = await getTasks(search)

  return (
    // skipcq: JS-0415
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <ListHeader tasks={tasks.data} />
      <DefaultList searchParams={searchParams} />
    </div>
  )
}

export default ListView
