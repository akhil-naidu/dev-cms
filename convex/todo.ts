import { Table, crud } from 'convex-helpers/server'
import { zodToConvexFields } from 'convex-helpers/server/zod'
import { enum as z_enum, string as z_string } from 'zod'

import { mutation, query } from './_generated/server'

export const Todo_Schema = {
  title: z_string(),
  status: z_enum(['canceled', 'backlog', 'todo', 'in progress', 'done']),
  label: z_enum(['bug', 'feature', 'documentation']).optional(),
  priority: z_enum(['low', 'medium', 'high']).optional(),
}

export const Todo = Table('todo', zodToConvexFields(Todo_Schema))

export const { create, read, paginate, update, destroy } = crud(
  Todo,
  query,
  mutation,
)

/*
  Issues in using the crud function:
  1. crud function creates only api endpoints, we can't add session storage for it
  2. using crud we will not have the ability to use the any of the indexes we create

  When to use this crud function
  1. If we are creating any internal functions, which we will not expose to the client
*/
