import * as React from 'react'
import type { UseGlobalFiltersInstanceProps } from 'react-table'
import { TableContext, DataType } from '../types'
import { DefaultGlobalFilter } from '../components/Filters'

const useGlobalFilterComponent = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  const {
    rows,
    state: { globalFilter },
    setGlobalFilter,
    flatRows,
    globalFilteredFlatRows,
    globalFilteredRows,
    globalFilteredRowsById,
    preGlobalFilteredFlatRows,
    preGlobalFilteredRows,
    preGlobalFilteredRowsById,
    rowsById
  } = context.tableInstance
  const { globalFilterOptions = {} } = context.tableProps

  const {
    Component: GlobalFilter = DefaultGlobalFilter,
    disableGlobalFilter
  } = globalFilterOptions

  const globalFilterProps: UseGlobalFiltersInstanceProps<Data> & {
    globalFilterValue: string
  } = {
    globalFilterValue: globalFilter,
    flatRows,
    globalFilteredFlatRows,
    globalFilteredRows,
    globalFilteredRowsById,
    preGlobalFilteredFlatRows,
    preGlobalFilteredRows,
    preGlobalFilteredRowsById,
    rows,
    rowsById,
    setGlobalFilter
  }

  return disableGlobalFilter ? null : <GlobalFilter {...globalFilterProps} />
}

export default useGlobalFilterComponent
