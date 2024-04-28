import { Suspense } from 'react'

import { DataTableSkeleton } from '@/admin/components/data-table/data-table-skeleton'
import { Shell } from '@/admin/components/elements/Shell'
import { getDocuments } from '@/admin/components/elements/Table/lib/queries'
import { searchParamsSchema } from '@/admin/components/elements/Table/lib/validations'
import { Table } from '@/admin/components/elements/Table/table'
import { TableProvider } from '@/admin/components/elements/Table/table-provider'
import type { SearchParams } from '@/admin/components/elements/Table/types'
import { Collections } from '@/convex/config'

export interface Props {
  searchParams: SearchParams
  collection: Collections
}

// skipcq: JS-0116
const DefaultList: React.FC<Props> = ({ searchParams, collection }) => {
  const search = searchParamsSchema.parse(searchParams)

  const tasksPromise = getDocuments(search, collection)

  return (
    <Shell className='gap-2'>
      {/**
       * The `TableProvider` is use to enable some feature flags for the `Table` component.
       * Feel free to remove this, as it's not required for the `Table` component to work.
       */}
      <TableProvider>
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
          <Table tasksPromise={tasksPromise} collection={collection} />
        </Suspense>
      </TableProvider>
    </Shell>
  )
}

export default DefaultList
