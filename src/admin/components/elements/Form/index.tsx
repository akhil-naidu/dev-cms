import { Separator } from '@/components/ui/separator'
import { Doc } from '@/convex/_generated/dataModel'

import { EditForm } from './edit-form'

interface Props {
  task: Doc<'task'>
}

const Form: React.FC<Props> = ({ task }) => {
  return (
    // skipcq: JS-0415
    <div className='space-y-6 p-10 pb-16 md:block'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>{task._id}</h2>
        <p className='text-muted-foreground'>Manage your task.</p>
      </div>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <div className='flex-1 w-full'>
          <div className='space-y-6'>
            <Separator />
            <EditForm task={task} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
