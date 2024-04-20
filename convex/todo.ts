import { Table, crud } from 'convex-helpers/server'
import { boolean, string } from 'convex-helpers/validators'

import { mutation, query } from './_generated/server'

export const Todo = Table('todo', {
  task: string,
  completed: boolean,
})

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
