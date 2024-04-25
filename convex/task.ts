import { Table, crud } from 'convex-helpers/server'
import { zodToConvexFields } from 'convex-helpers/server/zod'
import {
  array as z_array,
  enum as z_enum,
  infer as z_infer,
  object as z_object,
  string as z_string,
} from 'zod'

import { mutation, query } from './_generated/server'

export const Task_Schema = {
  title: z_string(),
  status: z_enum(['todo', 'in-progress', 'done', 'canceled']),
  label: z_enum(['bug', 'feature', 'enhancement', 'documentation']).optional(),
  priority: z_enum(['low', 'medium', 'high']).optional(),
  array: z_array(z_object({ name: z_string(), age: z_string() })),
}

export const Task = Table('task', zodToConvexFields(Task_Schema))

export const { create, read, paginate, update, destroy } = crud(
  Task,
  query,
  mutation,
)

// types
export const Task_Zod_Object = z_object(Task_Schema)
export type Task = z_infer<typeof Task_Zod_Object>

/*
  Issues in using the crud function:
  1. crud function creates only api endpoints, we can't add session storage for it
  2. using crud we will not have the ability to use the any of the indexes we create

  When to use this crud function
  1. If we are creating any internal functions, which we will not expose to the client
*/
