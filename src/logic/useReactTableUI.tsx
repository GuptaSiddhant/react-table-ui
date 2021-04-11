import { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useRowSelect,
  useExpanded,
  useColumnOrder,
  useResizeColumns,
  useGlobalFilter,
  useRowState,
  useFlexLayout
} from 'react-table'
import type { Column } from 'react-table'
import { useSticky } from 'react-table-sticky'

import type { TableContext, DataType, ReactTableUIProps } from '../types'
import { DefaultColumnFilter } from '../components/Filters'
import { fixColumnOrder } from '../utilities/systemColumns'
import { NOOP } from '../utilities'

import useManualPagination from './useManualPagination'
import getUseExpandedColumn from './useExpandedColumn'
import getUseRowSelectColumn from './useRowSelectColumn'
import useHandleStateChange from './useHandleStateChange'
import useCreateDefaultColumns from './useCreateDefaultColumns'
import useVisibleFilters from './useVisibleFilters'

const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): TableContext<Data> => {
  const {
    data = [],
    columns = useCreateDefaultColumns(data),
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
    ...filtersTableOptions
  } = filtersOptions

  const {
    initialState: initialGlobalFilterState,
    ...globalFilterTableOptions
  } = globalFilterOptions

  const {
    initialState: initialSortByState,
    ...sortByTableOptions
  } = sortByOptions

  const {
    initialState: initialExpandedState,
    ...expandedTableOptions
  } = expandedOptions

  const {
    initialState: initialRowSelectState,
    ...rowSelectTableOptions
  } = rowSelectOptions

  const {
    initialState: initialPaginationState,
    ...paginationTableOptions
  } = paginationOptions

  const {
    initialState: initialColumnState,
    ...columnTableOptions
  } = columnOptions

  const {
    initialState: initialRowStateState,
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
        ...{ pageSize: 100, pageIndex: 0, ...initialPaginationState },
        ...{
          ...initialColumnState,
          columnOrder: fixColumnOrder(initialColumnState?.columnOrder, columns)
        }
      }
    },
    filtersOptions.disableFilters ? NOOP : useFilters,
    globalFilterOptions.disableGlobalFilter ? NOOP : useGlobalFilter,
    sortByOptions.disableSortBy ? NOOP : useSortBy,
    disableExpander ? NOOP : useExpanded,
    disableExpander ? NOOP : useExpandedColumn,
    paginationOptions.disablePagination ? NOOP : usePagination,
    rowSelectOptions.disableRowSelect ? NOOP : useRowSelect,
    rowSelectOptions.disableRowSelect ? NOOP : useRowSelectColumn,
    rowStateOptions.disableRowState ? NOOP : useRowState,
    columnOptions.disableOrdering ? NOOP : useColumnOrder,
    columnOptions.disableResizing ? NOOP : useResizeColumns,
    useFlexLayout,
    useVisibleFilters,
    useSticky
  )

  const tableContext = { tableInstance, tableProps }

  useManualPagination(tableContext)
  useHandleStateChange(tableContext)

  return tableContext
}

export default useReactTableUI
