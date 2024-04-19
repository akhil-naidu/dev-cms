'use client'

import { useMutation, usePaginatedQuery, useQuery } from 'convex/react'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'

export default function Home() {
  const todos = usePaginatedQuery(
    api.todo.paginate,
    {},
    { initialNumItems: 10 },
  )
  const firstTodo = useQuery(api.todo.read, 'skip')

  const createTodo = useMutation(api.todo.create)
  const updateTodo = useMutation(api.todo.update)
  // const deleteTodo = useMutation(api.todo.destroy)

  console.log(todos, firstTodo)
  return (
    <div>
      <div className='flex gap-2'>
        <Button
          onClick={() => createTodo({ task: 'new todo', completed: false })}>
          create todo
        </Button>

        <Button
          onClick={() =>
            updateTodo({
              id: todos?.results.at(-1)?._id!,
              patch: { task: 'updated todo name' },
            })
          }>
          update Todo
        </Button>
      </div>

      {todos.results.map(todo => (
        <div key={todo._id}>{todo.task}</div>
      ))}
    </div>
  )
}
