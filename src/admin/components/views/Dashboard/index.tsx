import NoCollections from '@/admin/components/elements/EmptyStates/NoCollections'
import { collections } from '@/admin/data/collections'
import { Collections } from '@/admin/data/collections/types'

import Dashboard from './Default'

const DashboardView: React.FC = () => {
  return collections.length ? (
    <Dashboard collections={collections as Collections} />
  ) : (
    <NoCollections />
  )
}

export default DashboardView
