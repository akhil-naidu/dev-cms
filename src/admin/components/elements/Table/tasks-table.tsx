'use client'

import * as React from 'react'

import { DataTableAdvancedToolbar } from '@/admin/components/data-table/advanced/data-table-advanced-toolbar'
import { DataTable } from '@/admin/components/data-table/data-table'
import { DataTableToolbar } from '@/admin/components/data-table/data-table-toolbar'
import type { DataTableFilterField } from '@/admin/components/elements/Table/types'
import { useDataTable } from '@/admin/hooks/use-data-table'
import { Doc } from '@/convex/_generated/dataModel'
import { Task_Schema } from '@/convex/task'

import { getPriorityIcon, getStatusIcon } from './lib/utils'
import { getColumns } from './tasks-table-columns'
import { TasksTableFloatingBar } from './tasks-table-floating-bar'
import { useTasksTable } from './tasks-table-provider'
import { TasksTableToolbarActions } from './tasks-table-toolbar-actions'

interface TasksTableProps {
  // tasksPromise: ReturnType<typeof getTasks>
  tasksPromise: Promise<{ data: Doc<'task'>[]; pageCount: number }>
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useTasksTable()

  const tasks = Task_Schema

  const { data, pageCount } = React.use(tasksPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Doc<'task'>>[] = [
    {
      label: 'Title',
      value: 'title',
      placeholder: 'Filter titles...',
    },
    {
      label: 'Status',
      value: 'status',
      options: Object.values(tasks.status.enum).map(status => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: getStatusIcon(status),
        withCount: true,
      })),
    },
    {
      label: 'Priority',
      value: 'priority',
      options: Object.values(tasks.priority.unwrap().enum).map(priority => ({
        label: priority[0]?.toUpperCase() + priority.slice(1),
        value: priority,
        icon: getPriorityIcon(priority),
        withCount: true,
      })),
    },
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // optional props
    filterFields,
    enableAdvancedFilter: featureFlags.includes('advancedFilter'),
    defaultPerPage: 10,
    // defaultSort: 'createdAt.desc',
  })

  return (
    <div className='w-full space-y-2.5 overflow-auto'>
      {featureFlags.includes('advancedFilter') ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
      <DataTable
        table={table}
        floatingBar={
          featureFlags.includes('floatingBar') ? (
            <TasksTableFloatingBar table={table} />
          ) : null
        }
      />
    </div>
  )
}
