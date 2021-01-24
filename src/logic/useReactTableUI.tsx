import * as React from 'react'
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useFlexLayout,
  useExpanded
} from 'react-table'
import type { Column } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type { DataType, ReactTableUIProps } from '../utilities/interface'
import { createDefaultColumns } from '../utilities'
import { DefaultColumnFilter } from '../filters'
import useManualPagination from './useManualPagination'
import getUseExpandedColumn from './useExpandedColumn'

/** Core */
export const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
) => {
  const useExpandedColumn = getUseExpandedColumn(tableProps)

  const {
    data = [],
    columns = createDefaultColumns(data),
    tableOptions = {},
    filterOptions = {},
    sortByOptions = {},
    paginationOptions = {},
    expandedOptions = {}
  } = tableProps

  const {
    initialState: initialPaginationState,
    disablePagination,
    ...paginationTableOptions
  } = paginationOptions
  const {
    initialState: initialExpandedState,
    ...expandedTableOptions
  } = expandedOptions

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
      ...expandedTableOptions,
      initialState: {
        ...initialPaginationState,
        ...initialExpandedState
      }
    },
    useFilters,
    useSortBy,
    useExpanded,
    useExpandedColumn,
    disablePagination ? () => {} : usePagination,
    useFlexLayout,
    useSticky
  )

  const tableContext = { tableInstance, tableProps }

  useManualPagination(tableContext)

  return tableContext
}

export default useReactTableUI
