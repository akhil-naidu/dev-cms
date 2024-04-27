import { OrderSchema } from './order'
import { Task_Schema } from './task'

export const tableConfig = {
  task: Task_Schema,
  order: OrderSchema,
}

export type Collections = 'task' | 'order'
