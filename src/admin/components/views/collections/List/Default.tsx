import { usePaginatedQuery } from 'convex/react'

import type { SearchParams } from '@/admin/components/elements/Table/types'
import { columns } from '@/admin/components/elements/TableOld/columns'
import { DataTable } from '@/admin/components/elements/TableOld/data-table'
import { api } from '@/convex/_generated/api'

export interface IndexPageProps {
  searchParams: SearchParams
}

const DefaultList = () => {
  // const search = searchParamsSchema.parse(searchParams)

  const { results } = usePaginatedQuery(
    api.task.paginate,
    {},
    { initialNumItems: 20 },
  )

  // const tasksPromise = Promise.resolve({
  //   data: getTasks,
  //   pageCount: 1,
  // })

  return <DataTable data={results} columns={columns} />
  // return (
  //   <Shell className='gap-2'>
  //     {/**
  //      * The `TasksTableProvider` is use to enable some feature flags for the `TasksTable` component.
  //      * Feel free to remove this, as it's not required for the `TasksTable` component to work.
  //      */}
  //     <TasksTableProvider>
  //       {/**
  //        * The `DateRangePicker` component is used to render the date range picker UI.
  //        * It is used to filter the tasks based on the selected date range it was created at.
  //        * The business logic for filtering the tasks based on the selected date range is handled inside the component.
  //        */}
  //       <DateRangePicker
  //         triggerSize='sm'
  //         triggerClassName='ml-auto w-56 sm:w-60'
  //         align='end'
  //       />
  //       <Suspense
  //         fallback={
  //           <DataTableSkeleton
  //             columnCount={5}
  //             searchableColumnCount={1}
  //             filterableColumnCount={2}
  //             cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem']}
  //             shrinkZero
  //           />
  //         }>
  //         {/**
  //          * Passing promises and consuming them using React.use for triggering the suspense fallback.
  //          * @see https://react.dev/reference/react/use
  //          */}
  //         <TasksTable tasksPromise={tasksPromise} />
  //       </Suspense>
  //     </TasksTableProvider>
  //   </Shell>
  // )
}

export default DefaultList
