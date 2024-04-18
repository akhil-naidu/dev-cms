import Nav from '../../elements/Nav'

import { Props } from './types'

const Default: React.FC<Props> = ({ children }) => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Nav />
      {children}
    </div>
  )
}

export default Default
