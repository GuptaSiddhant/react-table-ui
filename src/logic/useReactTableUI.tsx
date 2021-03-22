import * as React from 'react'
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useRowSelect,
  useFlexLayout,
  useExpanded
} from 'react-table'
import type { Column } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type { DataType, ReactTableUIProps } from '../types'
import { createDefaultColumns } from '../utilities'
import { DefaultColumnFilter } from '../filters'
import useManualPagination from './useManualPagination'
import getUseExpandedColumn from './useExpandedColumn'
import getUseRowSelectColumn from './useRowSelectColumn'

const NOOP = () => {}

/** Core */
export const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
) => {
  const { useExpandedColumn, disableExpander } = getUseExpandedColumn(
    tableProps
  )
  const useRowSelectColumn = getUseRowSelectColumn(tableProps)

  const {
    data = [],
    columns = createDefaultColumns(data),
    tableOptions = {},
    filterOptions = {},
    sortByOptions = {},
    paginationOptions = {},
    expandedOptions = {},
    rowSelectOptions = {}
  } = tableProps

  const {
    initialState: initialSortByState,
    ...sortByTableOptions
  } = sortByOptions
  const {
    initialState: initialPaginationState,
    disablePagination,
    ...paginationTableOptions
  } = paginationOptions
  const {
    initialState: initialExpandedState,
    ...expandedTableOptions
  } = expandedOptions
  const {
    initialState: initialRowSelectState,
    disableRowSelect = false,
    ...rowSelectTableOptions
  } = rowSelectOptions

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
      ...sortByTableOptions,
      ...paginationTableOptions,
      ...expandedTableOptions,
      ...rowSelectTableOptions,
      initialState: {
        ...initialSortByState,
        ...{ pageSize: 20, ...initialPaginationState },
        ...initialExpandedState,
        ...initialRowSelectState
      }
    },
    useFilters,
    useSortBy,
    disableExpander ? NOOP : useExpanded,
    disableExpander ? NOOP : useExpandedColumn,
    disablePagination ? NOOP : usePagination,
    disableRowSelect ? NOOP : useRowSelect,
    disableRowSelect ? NOOP : useRowSelectColumn,
    useFlexLayout,
    useSticky
  )

  const tableContext = { tableInstance, tableProps }

  useManualPagination(tableContext)

  return tableContext
}

export default useReactTableUI
