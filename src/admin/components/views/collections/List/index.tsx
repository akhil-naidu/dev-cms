import type { SearchParams } from '@/admin/components/elements/Table/types'

import DefaultList from './Default'
import ListHeader from './ListHeader'

export interface Props {
  searchParams: SearchParams
}

const ListView: React.FC<Props> = ({ searchParams }) => {
  return (
    // skipcq: JS-0415
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <ListHeader />
      <DefaultList searchParams={searchParams} />
    </div>
  )
}

export default ListView
