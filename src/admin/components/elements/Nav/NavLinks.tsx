import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CollectionItem } from '@/admin/data/collections/types'

import { Props } from './types'

const NavLinks: React.FC<Props> = props => {
  const pathname = usePathname()
  const { navLinks } = props

  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      {!navLinks?.length && (
        <h3 className='place-self-center pt-5'>No Collections</h3>
      )}
      {navLinks?.map(({ slug, label, url, icon }: CollectionItem) => {
        const isActive = pathname === url
        const linkClassNames = isActive
          ? 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'
          : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'

        return (
          <Link
            key={url}
            className={linkClassNames}
            href={url || `/admin/collections/${slug}`}>
            {icon}
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavLinks
