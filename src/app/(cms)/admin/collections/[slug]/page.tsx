import Header from '@/admin/components/elements/Header'
import { columns } from '@/admin/components/elements/Table/columns'
import { DataTable } from '@/admin/components/elements/Table/data-table'
import { tableData } from '@/admin/data/table/tasks'

const Page = () => {
  const tasks = tableData

  return (
    // skipcq: JS-0415
    <div className='overflow-hidden flex flex-col'>
      <Header />
      <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  )
}

export default Page
