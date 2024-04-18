import Default from '@/admin/components/templates/Default'

import { Props } from './types'

const RootLayout: React.FC<Props> = ({ children }) => {
  return <Default>{children}</Default>
}

export default RootLayout
