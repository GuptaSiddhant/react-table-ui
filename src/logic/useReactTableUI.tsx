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
import { useSticky } from 'react-table-sticky'

import { DefaultColumnFilter } from '../components/Filters'
import { fixColumnOrder } from '../utilities/systemColumns'
import { NOOP } from '../utilities'
import type {
  TableContext,
  DataType,
  ReactTableUIProps,
  Column
} from '../types'

import generateUseExpandedColumn from './generateUseExpandedColumn'
import generateUseRowSelectColumn from './generateUseRowSelectColumn'
import generateUseRowActionColumn from './generateUseRowActionColumn'

import useManualPagination from './useManualPagination'
import useHandleStateChange from './useHandleStateChange'
import useCreateDefaultColumns from './useCreateDefaultColumns'
import useVisibleFilters from './useVisibleFilters'
import useModal from './useModal'

const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>,
  tableRef?: React.RefObject<HTMLElement>
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
    rowStateOptions = {},
    freezeOptions: { columns: freezeColumns = true } = {}
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

  const useRowSelectColumn = generateUseRowSelectColumn(tableProps)
  const useRowActionColumn = generateUseRowActionColumn(tableProps)
  const { useExpandedColumn, disableExpander } = generateUseExpandedColumn(
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
      ...{
        autoResetPage: !paginationTableOptions.manualPagination,
        ...paginationTableOptions
      },
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
        ...{ pageSize: 50, pageIndex: 0, ...initialPaginationState },
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
    useRowActionColumn,
    useFlexLayout,
    useVisibleFilters,
    useModal,
    freezeColumns ? useSticky : NOOP
  )

  const tableContext: TableContext<Data> = {
    tableInstance,
    tableProps,
    tableRef
  }

  useManualPagination(tableContext)
  useHandleStateChange(tableContext)

  return tableContext
}

export default useReactTableUI
