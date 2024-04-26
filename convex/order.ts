// order.ts
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

export const OrderSchema = {
  orderId: z_string(),
  status: z_enum(['pending', 'processing', 'shipped', 'delivered', 'canceled']),
  items: z_array(z_object({ productId: z_string(), quantity: z_string() })),
  totalPrice: z_string(),
}

export const Order = Table('order', zodToConvexFields(OrderSchema))

export const { create, read, paginate, update, destroy } = crud(
  Order,
  query,
  mutation,
)

// types
export const OrderZodObject = z_object(OrderSchema)
export type Order = z_infer<typeof OrderZodObject>

/*
  Issues in using the crud function:
  1. crud function creates only API endpoints; we can't add session storage for it
  2. Using crud, we will not have the ability to use any of the indexes we create

  When to use this crud function
  1. If we are creating any internal functions that we will not expose to the client
*/
