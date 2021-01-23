import * as React from 'react'
import { useTable, useSortBy, useFilters, useFlexLayout } from 'react-table'
import type { Column } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type { DataType, ReactTableUIProps } from '../utilities/interface'
import { createDefaultColumns } from '../utilities'
import { DefaultColumnFilter } from '../filters'

/** Core */
export const useReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
) => {
  const {
    data,
    columns = createDefaultColumns(data),
    tableOptions,
    filterOptions,
    sortByOptions
  } = tableProps

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
      ...sortByOptions
    },
    useFilters,
    useSortBy,
    useFlexLayout,
    useSticky
  )

  const tableState = { tableInstance, tableProps }
  return tableState
}

export default useReactTableUI
