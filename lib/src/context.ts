import * as React from 'react'
import type { DataType, TableContext } from './types'

export const tableContext = React.createContext<TableContext<any> | undefined>(
  undefined
)

export default function useTableContext<
  Data extends DataType
>(): TableContext<Data> {
  const ctx = React.useContext(tableContext)
  if (!ctx)
    throw new Error(
      'useTableContext cannot be used outside ReactTableUI component.'
    )

  return ctx
}
