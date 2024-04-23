import { Separator } from '@/components/ui/separator'

import { ProfileForm } from './profile-form'

export default function SettingsProfilePage() {
  return (
    // skipcq: JS-0415
    <div className='space-y-6 p-10 pb-16 md:block'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Blog</h2>
        <p className='text-muted-foreground'>Manage your blogs.</p>
      </div>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <div className='flex-1 w-full'>
          <div className='space-y-6'>
            <Separator />
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  )
}
