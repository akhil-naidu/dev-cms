import { useParams } from 'next/navigation'

import { Collections } from '@/convex/config'

interface RouterParams {
  [key: string]: string | string[] | undefined
}

export const useRouterParams = () => {
  const params = useParams()
  //   const searchParams = useSearchParams()

  const { id, slug }: RouterParams = params

  return {
    params,
    // searchParams,
    id,
    collection: slug as Collections,
  }
}
