import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

import ConvexClientProvider from './ConvexClientProvider'

// all the providers should be wrapped here
export default function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ConvexClientProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ConvexClientProvider>
      <Toaster />
    </>
  )
}
