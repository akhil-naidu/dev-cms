import type { SearchParams } from '@/admin/components/elements/Table/types'
import ListView from '@/admin/components/views/collections/List'
import { Collections } from '@/convex/config'

export interface PageProps {
  searchParams: SearchParams
  params: { slug: Collections }
}

const ListPage: React.FC<PageProps> = ({ searchParams, params: { slug } }) => {
  return <ListView searchParams={searchParams} collection={slug} />
}

export default ListPage
