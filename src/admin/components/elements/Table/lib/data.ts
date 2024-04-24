import { Doc, Id } from '@/convex/_generated/dataModel'

export const tasksData: Doc<'task'>[] = [
  {
    _id: '1' as Id<'task'>,
    title: 'Task 1',
    status: 'todo',
    priority: 'high',
    label: 'bug',
    _creationTime: Number(new Date()),
  },
]
