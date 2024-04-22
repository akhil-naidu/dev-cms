'use client'

import { useMutation, usePaginatedQuery, useQuery } from 'convex/react'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'

export default function Home() {
  const todos = usePaginatedQuery(
    api.task.paginate,
    {},
    { initialNumItems: 10 },
  )
  const firstTodo = useQuery(api.task.read, 'skip')

  const createTodo = useMutation(api.task.create)
  const updateTodo = useMutation(api.task.update)
  // const deleteTodo = useMutation(api.todo.destroy)

  console.log(todos, firstTodo)
  return (
    <div>
      <div className='flex gap-2'>
        <Button
          onClick={() => createTodo({ title: 'new todo', status: 'todo' })}>
          create todo
        </Button>

        <Button
          onClick={() =>
            updateTodo({
              id: todos?.results.at(-1)?._id!,
              patch: { title: 'updated todo name' },
            })
          }>
          update Todo
        </Button>
      </div>

      {todos.results.map(todo => (
        <div key={todo._id}>{todo.title}</div>
      ))}
    </div>
  )
}
