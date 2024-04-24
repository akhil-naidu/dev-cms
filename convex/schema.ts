import { defineSchema } from 'convex/server'

import { Task } from '@/convex/task'

export default defineSchema({
  task: Task.table,
})
