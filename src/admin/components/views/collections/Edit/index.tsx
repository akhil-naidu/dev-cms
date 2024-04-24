import From from '@/admin/components/elements/Form'
import { getTask } from '@/admin/components/elements/Table/lib/queries'
import { Doc, Id } from '@/convex/_generated/dataModel'

interface Props {
  id: Id<'task'>
}

const EditView: React.FC<Props> = async props => {
  const { id } = props

  const taskData = await getTask({ id })

  if (!taskData.data) {
    return <div>Loading...</div>
  }

  return <From task={taskData.data as Doc<'task'>} />
}

export default EditView
