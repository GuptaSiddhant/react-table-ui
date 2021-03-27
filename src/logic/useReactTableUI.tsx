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
  useResizeColumns
} from 'react-table'
import type { Column } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type { TableContext, DataType, ReactTableUIProps } from '../types'
import { createDefaultColumns, NOOP } from '../utilities'
import { DefaultColumnFilter } from '../filters'
import useManualPagination from './useManualPagination'
import getUseExpandedColumn from './useExpandedColumn'
import getUseRowSelectColumn from './useRowSelectColumn'
import useHandleStateChange from './handleChangeHooks'
import { fixColumnOrder } from './systemColumns'

/** Core */
export const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): TableContext<Data> => {
  const {
    data = [],
    columns = createDefaultColumns(data),
    tableOptions,
    filtersOptions,
    sortByOptions,
    paginationOptions,
    expandedOptions,
    rowSelectOptions,
    columnOptions
  } = tableProps

  const {
    initialState: initialFiltersState,
    DefaultComponent: DefaultFilterComponent,
    disableFilters,
    ...filtersTableOptions
  } = filtersOptions || {}

  const {
    initialState: initialSortByState,
    disableSortBy,
    ...sortByTableOptions
  } = sortByOptions || {}

  const { initialState: initialExpandedState, ...expandedTableOptions } =
    expandedOptions || {}

  const {
    initialState: initialRowSelectState,
    disableRowSelect = false,
    ...rowSelectTableOptions
  } = rowSelectOptions || {}

  const {
    initialState: initialPaginationState,
    disablePagination,
    ...paginationTableOptions
  } = paginationOptions || {}

  const {
    initialState: initialColumnState,
    disableOrdering,
    disableResizing,
    ...columnTableOptions
  } = columnOptions || {}

  const defaultColumn: Partial<Column<Data>> = useMemo(
    () => ({
      Filter: DefaultFilterComponent || DefaultColumnFilter
    }),
    []
  )

  const { useExpandedColumn, disableExpander } = getUseExpandedColumn(
    tableProps
  )

  const useRowSelectColumn = getUseRowSelectColumn(tableProps)

  const tableInstance = useTable<Data>(
    {
      data,
      columns,
      defaultColumn,
      ...tableOptions,
      ...filtersTableOptions,
      ...sortByTableOptions,
      ...paginationTableOptions,
      ...expandedTableOptions,
      ...rowSelectTableOptions,
      ...columnTableOptions,
      initialState: {
        ...(tableOptions?.initialState || {}),
        ...initialSortByState,
        ...initialFiltersState,
        ...initialExpandedState,
        ...initialRowSelectState,
        ...{ pageSize: 20, pageIndex: 0, ...initialPaginationState },
        ...{
          ...initialColumnState,          
          columnOrder: fixColumnOrder(initialColumnState?.columnOrder, columns)
        }
      }
    },
    disableFilters ? NOOP : useFilters,
    disableSortBy ? NOOP : useSortBy,
    disableExpander ? NOOP : useExpanded,
    disableExpander ? NOOP : useExpandedColumn,
    disablePagination ? NOOP : usePagination,
    disableRowSelect ? NOOP : useRowSelect,
    disableRowSelect ? NOOP : useRowSelectColumn,
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
