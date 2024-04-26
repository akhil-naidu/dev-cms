import NothingFound from '@/admin/components/elements/EmptyStates/NothingFound'
import { getTask } from '@/admin/components/elements/Table/lib/queries'
import { Doc, Id } from '@/convex/_generated/dataModel'

import DefaultEdit from './Default'

interface Props {
  id: Id<'task'>
}

const EditView: React.FC<Props> = async props => {
  const { id } = props

  const taskData = await getTask({ id })

  return taskData.data ? (
    <DefaultEdit task={taskData?.data as Doc<'task'>} />
  ) : (
    <NothingFound />
  )
}

export default EditView
