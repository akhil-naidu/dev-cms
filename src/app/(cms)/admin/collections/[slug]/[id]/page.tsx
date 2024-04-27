import EditView from '@/admin/components/views/collections/Edit'
import { Id } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

interface PageProps {
  params: {
    id: Id<Collections>
    slug: Collections
  }
}

const EditPage: React.FC<PageProps> = ({ params }) => {
  console.log(params.slug)
  return <EditView id={params.id} collection={params.slug} />
}

export default EditPage
