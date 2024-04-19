'use client'

import NavLinks from '../Nav/NavLinks'
import { UserNav } from '../UserNav'

import { MenuIcon, SearchIcon } from '@/admin/components/icons'
import { collections } from '@/admin/data/collections'
import { Collections } from '@/admin/data/collections/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Props } from './types'

const DefaultHeader: React.FC<Props> = props => {
  const { navLinks } = props

  return (
    // skipcq: JS-0415
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='shrink-0 md:hidden' size='icon' variant='outline'>
            <MenuIcon className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className='flex flex-col' side='left'>
          <NavLinks navLinks={navLinks} />
          <div className='mt-auto'>
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full' size='sm'>
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
              placeholder='Search collections (or) globals...'
              type='search'
            />
          </div>
        </form>
      </div>
      <div className='flex items-center space-x-2'>
        <UserNav />
      </div>
    </header>
  )
}

const Header: React.FC = () => {
  return <DefaultHeader navLinks={collections as Collections} />
}

export default Header
