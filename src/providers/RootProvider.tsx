import ConvexClientProvider from './ConvexClientProvider'

// all the providers should be wrapped here
export default function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>
}
