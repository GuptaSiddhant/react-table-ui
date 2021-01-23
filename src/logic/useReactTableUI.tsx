import * as React from 'react'
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useFlexLayout
} from 'react-table'
import type { Column } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type { DataType, ReactTableUIProps } from '../utilities/interface'
import { createDefaultColumns } from '../utilities'
import { DefaultColumnFilter } from '../filters'
import useManualPagination from './useManualPagination'

/** Core */
export const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
) => {
  const {
    data = [],
    columns = createDefaultColumns(data),
    tableOptions = {},
    filterOptions = {},
    sortByOptions = {},
    paginationOptions = {}
  } = tableProps

  const {
    initialState: initialPaginationState,
    disablePagination,
    ...paginationTableOptions
  } = paginationOptions

  const defaultColumn: Partial<Column<Data>> = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  )

  const tableInstance = useTable<Data>(
    {
      data,
      columns,
      defaultColumn,
      ...tableOptions,
      ...filterOptions,
      ...sortByOptions,
      ...paginationTableOptions,
      initialState: { ...initialPaginationState }
    },
    useFilters,
    useSortBy,
    disablePagination ? () => {} : usePagination,
    useFlexLayout,
    useSticky
  )

  const tableContext = { tableInstance, tableProps }

  useManualPagination(tableContext)

  return tableContext
}

export default useReactTableUI
