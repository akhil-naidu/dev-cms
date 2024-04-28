'use client'

import { createContext, useContext, useState } from 'react'

import {
  type DataTableConfig,
  dataTableConfig,
} from '@/admin/config/data-table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type FeatureFlagValue = DataTableConfig['featureFlags'][number]['value']

interface TableContextProps {
  featureFlags: FeatureFlagValue[]
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>
}

const TableContext = createContext<TableContextProps>({
  featureFlags: [],
  setFeatureFlags: () => {
    // empty because <reason>
  },
})

export function useTable() {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTable must be used within a TableProvider')
  }
  return context
}

export function TableProvider({ children }: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagValue[]>([])

  return (
    <TableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags,
      }}>
      <div className='w-full overflow-x-auto'>
        <ToggleGroup
          type='multiple'
          variant='outline'
          size='sm'
          value={featureFlags}
          // skipcq: JS-0417
          onValueChange={(value: FeatureFlagValue[]) => setFeatureFlags(value)}
          className='w-fit'>
          {dataTableConfig.featureFlags.map(flag => (
            <Tooltip key={flag.value} delayDuration={500}>
              <ToggleGroupItem
                value={flag.value}
                className='whitespace-nowrap px-3 text-xs'
                asChild>
                <TooltipTrigger>
                  <flag.icon
                    className='mr-2 size-3.5 shrink-0'
                    aria-hidden='true'
                  />
                  {flag.label}
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent
                align='start'
                side='bottom'
                sideOffset={6}
                className='flex max-w-60 flex-col space-y-1.5 border bg-background px-3 py-2 font-semibold text-foreground'>
                <div>{flag.tooltipTitle}</div>
                <div className='text-xs text-muted-foreground'>
                  {flag.tooltipDescription}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>
      </div>
      {children}
    </TableContext.Provider>
  )
}
