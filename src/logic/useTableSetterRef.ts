import { useImperativeHandle, useRef } from 'react'
import type { TableInstance } from 'react-table'
import type { DataType, TableContext } from '../types'

export interface UseTableSetterRefProps<Data extends DataType> {
  setAllFilters: TableInstance<Data>['setAllFilters']
  setCellState: TableInstance<Data>['setCellState']
  setColumnOrder: TableInstance<Data>['setColumnOrder']
  setFilter: TableInstance<Data>['setFilter']
  setGlobalFilter: TableInstance<Data>['setGlobalFilter']
  setHiddenColumns: TableInstance<Data>['setHiddenColumns']
  setPageSize: TableInstance<Data>['setPageSize']
  setRowState: TableInstance<Data>['setRowState']
  setSortBy: TableInstance<Data>['setSortBy']
  setVisibleFilters: TableInstance<Data>['setVisibleFilters']
}

export const useHandleTableSetterRef = <Data extends DataType>(
  { tableInstance }: TableContext<Data>,
  tableRef?: React.RefObject<UseTableSetterRefProps<Data>>
) => {
  const {
    setAllFilters,
    setCellState,
    setColumnOrder,
    setFilter,
    setGlobalFilter,
    setHiddenColumns,
    setPageSize,
    setRowState,
    setSortBy,
    setVisibleFilters
  } = tableInstance

  useImperativeHandle(tableRef, () => ({
    setAllFilters,
    setCellState,
    setColumnOrder,
    setFilter,
    setGlobalFilter,
    setHiddenColumns,
    setPageSize,
    setRowState,
    setSortBy,
    setVisibleFilters
  }))
}

/**
 * Hook to generate a table ref which can be passed to ReactTableUI component.
 * This ref holds all the setter functions provided by table instance.
 * @see UseTableSetterRefProps
 */
export const useTableSetterRef = <Data extends DataType>() =>
  useRef<UseTableSetterRefProps<Data>>(null)
