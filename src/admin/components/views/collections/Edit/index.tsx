import NothingFound from '@/admin/components/elements/EmptyStates/NothingFound'
import { getTask } from '@/admin/components/elements/Table/lib/queries'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

import DefaultEdit from './Default'

interface Props {
  id: Id<Collections>
  collection: Collections
}

const EditView: React.FC<Props> = async props => {
  const { id, collection } = props

  const taskData = await getTask({ collection, id })

  return taskData.data ? (
    <DefaultEdit
      task={taskData?.data as Doc<Collections>}
      collection={collection}
    />
  ) : (
    <NothingFound />
  )
}

export default EditView
