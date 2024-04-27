import Breadcrumbs from '@/admin/components/elements/Breadcrumbs'
import Header from '@/admin/components/elements/Header'
import Default from '@/admin/components/templates/Default'

import { Props } from './types'

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <Default>
      <div className='overflow-hidden flex flex-col'>
        <Header />
        <Breadcrumbs maxLength={4} excludeSegmentsLinks={['collections']} />
        {children}
      </div>
    </Default>
  )
}

export default RootLayout
