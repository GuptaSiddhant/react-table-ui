import * as React from 'react'
import type { DataType, TableContext } from './interface'

const Context = React.createContext<TableContext<any>>({
  tableProps: {} as any,
  tableInstance: {} as any
})

export const ContextProvider = <Data extends DataType>({
  children,
  ...props
}: TableContext<Data> & {
  children: React.ReactNode
}): JSX.Element => {
  return <Context.Provider value={props}>{children}</Context.Provider>
}

export const useTableContext = <Data extends DataType>() =>
  React.useContext<TableContext<Data>>(Context)

export default useTableContext
