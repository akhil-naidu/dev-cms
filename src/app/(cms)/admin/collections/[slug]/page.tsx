import { Suspense } from 'react'

import { DataTableSkeleton } from '@/admin/components/data-table/data-table-skeleton'
import { Shell } from '@/admin/components/elements/Shell'
import { getTasks } from '@/admin/components/elements/Table/lib/queries'
import { searchParamsSchema } from '@/admin/components/elements/Table/lib/validations'
import { TasksTable } from '@/admin/components/elements/Table/tasks-table'
import { TasksTableProvider } from '@/admin/components/elements/Table/tasks-table-provider'
import type { SearchParams } from '@/admin/components/elements/Table/types'

export interface IndexPageProps {
  searchParams: SearchParams
}

// skipcq: JS-0116
export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams)

  const tasksPromise = getTasks(search)

  return (
    <Shell className='gap-2'>
      {/**
       * The `TasksTableProvider` is use to enable some feature flags for the `TasksTable` component.
       * Feel free to remove this, as it's not required for the `TasksTable` component to work.
       */}
      <TasksTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the tasks based on the selected date range it was created at.
         * The business logic for filtering the tasks based on the selected date range is handled inside the component.
         */}
        {/* <DateRangePicker
          triggerSize='sm'
          triggerClassName='ml-auto w-56 sm:w-60'
          align='end'
        /> */}
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          }>
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <TasksTable tasksPromise={tasksPromise} />
        </Suspense>
      </TasksTableProvider>
    </Shell>
  )
}
