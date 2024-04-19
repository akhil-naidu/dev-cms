import NoCollections from '@/admin/components/elements/EmptyStates/NoCollections'
import Header from '@/admin/components/elements/Header'
import { collections } from '@/admin/data/collections'
import { Collections } from '@/admin/data/collections/types'

import Dashboard from './Default'

const DashboardView: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      {collections.length ? (
        <Dashboard collections={collections as Collections} />
      ) : (
        <NoCollections />
      )}
    </div>
  )
}

export default DashboardView
