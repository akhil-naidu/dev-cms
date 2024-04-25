import type { SearchParams } from '@/admin/components/elements/Table/types'
import ListView from '@/admin/components/views/collections/List'

export interface IndexPageProps {
  searchParams: SearchParams
}

const ListPage: React.FC<IndexPageProps> = ({ searchParams }) => {
  return <ListView searchParams={searchParams} />
}

export default ListPage
