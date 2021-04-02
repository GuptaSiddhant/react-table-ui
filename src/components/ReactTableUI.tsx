import * as React from 'react'
import type { UseGlobalFiltersInstanceProps } from 'react-table'

import useReactTableUI from '../logic/useReactTableUI'
import type { DataType, ReactTableUIProps } from '../types'
import {
  useHandleTableSetterRef,
  UseTableSetterRefProps
} from '../logic/useTableSetterRef'
import createClassName from '../utilities/createClassName'
import Table from './Table'
import Pagination from './Pagination'
import { DefaultGlobalFilter } from './Filters'

const ReactTableUI = <Data extends DataType>({
  tableSetterRef,
  ...tableProps
}: ReactTableUIProps<Data> & {
  tableSetterRef?: React.RefObject<UseTableSetterRefProps<Data>>
}): JSX.Element => {
  const context = useReactTableUI(tableProps)
  useHandleTableSetterRef(context, tableSetterRef)

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

  return (
    <div className={createClassName()}>
      {!disableGlobalFilter && <GlobalFilter {...globalFilterProps} />}
      <Table {...context} />
      <Pagination {...context} />
    </div>
  )
}

export default ReactTableUI
