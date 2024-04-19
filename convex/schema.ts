import { defineSchema } from 'convex/server'

import { Todo } from '@/convex/todo'

export default defineSchema({
  todo: Todo.table,
})
