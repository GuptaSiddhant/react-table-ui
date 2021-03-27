import { useEffect } from 'react'
import { TableContext, DataType } from '../types'
import type {
  UseRowStateState,
  UseGlobalFiltersState,
  UseGroupByState
} from 'react-table'

const useHandleStateChange = <Data extends DataType>({
  tableInstance: { state },
  tableProps: {
    tableOptions,
    sortByOptions,
    filtersOptions,
    expandedOptions,
    rowSelectOptions,
    paginationOptions,
    columnOptions
  }
}: TableContext<Data>) => {
  const {
    expanded,
    selectedRowIds,
    sortBy,
    filters,
    pageIndex,
    pageSize,
    rowState,
    columnOrder,
    globalFilter,
    groupBy,
    columnResizing,
    hiddenColumns = []
  } = state

  /** @todo Remove */
  const rowStateOptions = {
    onStateChange: (_: UseRowStateState<Data>) => {}
  }
  const globalFilterOptions = {
    onStateChange: (_: UseGlobalFiltersState<Data>) => {}
  }
  const groupingOptions = {
    onStateChange: (_: UseGroupByState<Data>) => {}
  }

  // Table
  useEffect(() => {
    tableOptions?.onStateChange?.(state)
  }, [tableOptions?.onStateChange, state])

  // Sorting
  useEffect(() => {
    sortByOptions?.onStateChange?.({ sortBy })
  }, [sortByOptions?.onStateChange, sortBy])

  // Filtering
  useEffect(() => {
    filtersOptions?.onStateChange?.({ filters })
  }, [filtersOptions?.onStateChange, filters])

  // Global filtering
  useEffect(() => {
    globalFilterOptions?.onStateChange?.({ globalFilter })
  }, [globalFilterOptions?.onStateChange, globalFilter])

  // Expanded row
  useEffect(() => {
    expandedOptions?.onStateChange?.({ expanded })
  }, [expandedOptions?.onStateChange, expanded])

  // Row-select
  useEffect(() => {
    rowSelectOptions?.onStateChange?.({ selectedRowIds })
  }, [rowSelectOptions?.onStateChange, selectedRowIds])

  // Row-state
  useEffect(() => {
    rowStateOptions?.onStateChange?.({ rowState })
  }, [rowStateOptions?.onStateChange, rowState])

  // Group by
  useEffect(() => {
    groupingOptions?.onStateChange?.({ groupBy })
  }, [groupingOptions?.onStateChange, groupBy])

  // Pagination
  useEffect(() => {
    paginationOptions?.onStateChange?.({ pageIndex, pageSize })
  }, [paginationOptions?.onStateChange, pageIndex, pageSize])

  // Column order, resize, hidden
  useEffect(() => {
    columnOptions?.onStateChange?.({
      columnOrder,
      columnResizing,
      hiddenColumns
    })
  }, [columnOptions?.onStateChange, columnOrder, columnResizing, hiddenColumns])
}

export default useHandleStateChange
