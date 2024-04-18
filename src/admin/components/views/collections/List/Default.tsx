import NoCollections from '@/admin/components/elements/EmptyStates/NoCollections'
import Header from '@/admin/components/elements/Header'

const DefaultList: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <NoCollections />
    </div>
  )
}

export default DefaultList
