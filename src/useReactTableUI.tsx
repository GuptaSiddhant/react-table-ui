import * as React from 'react'
import { useTable, useSortBy, useFlexLayout } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type {
  DataType,
  ReactTableUIProps,
  TableContext
} from './utilities/interface'
import { createDefaultColumns } from './utilities'
import { ContextProvider } from './utilities/Context'
import Table from './components/Table'

/** Core */
export const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
) => {
  const {
    data,
    columns = createDefaultColumns(data),
    sortByOptions
  } = tableProps

  const tableInstance = useTable<Data>(
    { data, columns, ...sortByOptions },
    useSortBy,
    useFlexLayout,
    useSticky
  )
  const tableContext: TableContext<Data> = {
    tableInstance,
    tableProps
  }
  const TableWrapper: React.FC = ({ children }) => (
    <ContextProvider {...tableContext}>{children}</ContextProvider>
  )

  return { TableWrapper, tableInstance, tableProps, Table }
}

export default useReactTableUI
