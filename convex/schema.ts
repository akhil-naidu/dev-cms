import { defineSchema } from 'convex/server'

import { Order } from '@/convex/order'
import { Task } from '@/convex/task'

export default defineSchema({
  task: Task.table,
  order: Order.table,
})
