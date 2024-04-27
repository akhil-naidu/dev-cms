import { Doc, Id } from '@/convex/_generated/dataModel'
import { Collections } from '@/convex/config'

export const tasksData: Doc<Collections>[] = [
  {
    _id: '1' as Id<Collections>,
    title: 'Task 1',
    status: 'todo',
    priority: 'high',
    label: 'bug',
    _creationTime: Number(new Date()),
  },
]
