import EditView from '@/admin/components/views/collections/Edit'
import { Id } from '@/convex/_generated/dataModel'

interface PageProps {
  params: {
    id: Id<'task'>
  }
}

const EditPage: React.FC<PageProps> = ({ params }) => {
  return <EditView id={params.id} />
}

export default EditPage
