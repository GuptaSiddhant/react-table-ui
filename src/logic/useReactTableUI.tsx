import { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useRowSelect,
  useFlexLayout,
  useExpanded,
  useColumnOrder,
  useResizeColumns,
  useGlobalFilter,
  useRowState
} from 'react-table'
import type { Column } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type { TableContext, DataType, ReactTableUIProps } from '../types'
import { createDefaultColumns, NOOP } from '../utilities'
import { DefaultColumnFilter } from '../components/Filters'
import useManualPagination from './useManualPagination'
import getUseExpandedColumn from './useExpandedColumn'
import getUseRowSelectColumn from './useRowSelectColumn'
import useHandleStateChange from './useHandleStateChange'
import { fixColumnOrder } from './systemColumns'

/** Core */
export const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): TableContext<Data> => {
  const {
    data = [],
    columns = createDefaultColumns(data),
    tableOptions = {},
    filtersOptions = {},
    globalFilterOptions = {},
    sortByOptions = {},
    paginationOptions = {},
    expandedOptions = {},
    rowSelectOptions = {},
    columnOptions = {},
    rowStateOptions = {}
  } = tableProps

  const {
    initialState: initialFiltersState,
    DefaultComponent: DefaultFilterComponent,
    disableFilters,
    ...filtersTableOptions
  } = filtersOptions

  const {
    initialState: initialGlobalFilterState,
    disableGlobalFilter,
    ...globalFilterTableOptions
  } = globalFilterOptions

  const {
    initialState: initialSortByState,
    disableSortBy,
    ...sortByTableOptions
  } = sortByOptions

  const {
    initialState: initialExpandedState,
    ...expandedTableOptions
  } = expandedOptions

  const {
    initialState: initialRowSelectState,
    disableRowSelect = false,
    ...rowSelectTableOptions
  } = rowSelectOptions

  const {
    initialState: initialPaginationState,
    disablePagination,
    ...paginationTableOptions
  } = paginationOptions

  const {
    initialState: initialColumnState,
    disableOrdering,
    disableResizing,
    ...columnTableOptions
  } = columnOptions

  const {
    initialState: initialRowStateState,
    disableRowState,
    ...rowStateTableOptions
  } = rowStateOptions

  const defaultColumn: Partial<Column<Data>> = useMemo(
    () => ({
      Filter: DefaultFilterComponent || DefaultColumnFilter
    }),
    []
  )

  const useRowSelectColumn = getUseRowSelectColumn(tableProps)
  const { useExpandedColumn, disableExpander } = getUseExpandedColumn(
    tableProps
  )

  // Main hook call
  const tableInstance = useTable<Data>(
    {
      data,
      columns,
      defaultColumn,
      ...tableOptions,
      ...filtersTableOptions,
      ...globalFilterTableOptions,
      ...sortByTableOptions,
      ...paginationTableOptions,
      ...expandedTableOptions,
      ...rowSelectTableOptions,
      ...columnTableOptions,
      ...rowStateTableOptions,
      initialState: {
        ...(tableOptions?.initialState || {}),
        ...initialSortByState,
        ...initialFiltersState,
        ...initialGlobalFilterState,
        ...initialExpandedState,
        ...initialRowSelectState,
        ...initialRowStateState,
        ...{ pageSize: 20, pageIndex: 0, ...initialPaginationState },
        ...{
          ...initialColumnState,
          columnOrder: fixColumnOrder(initialColumnState?.columnOrder, columns)
        }
      }
    },
    disableFilters ? NOOP : useFilters,
    disableGlobalFilter ? NOOP : useGlobalFilter,
    disableSortBy ? NOOP : useSortBy,
    disableExpander ? NOOP : useExpanded,
    disableExpander ? NOOP : useExpandedColumn,
    disablePagination ? NOOP : usePagination,
    disableRowSelect ? NOOP : useRowSelect,
    disableRowSelect ? NOOP : useRowSelectColumn,
    disableRowState ? NOOP : useRowState,
    disableOrdering ? NOOP : useColumnOrder,
    disableResizing ? NOOP : useResizeColumns,
    useFlexLayout,
    useSticky
  )

  const tableContext = { tableInstance, tableProps }

  useManualPagination(tableContext)
  useHandleStateChange(tableContext)

  return tableContext
}

export default useReactTableUI
