import { Table, crud } from 'convex-helpers/server'
import { boolean, string } from 'convex-helpers/validators'

import { mutation, query } from './_generated/server'

const Todo = Table('todo', {
  task: string,
  completed: boolean,
})

export const { create, read, paginate, update, destroy } = crud(
  Todo,
  query,
  mutation,
)
