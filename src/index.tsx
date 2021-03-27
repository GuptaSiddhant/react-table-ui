import * as React from 'react'
import useReactTableUI from './logic/useReactTableUI'
import type { DataType, ReactTableUIProps } from './types'
import Table from './components/Table'
import Pagination from './components/Pagination'
import {
  useHandleTableSetterRef,
  useTableSetterRef,
  UseTableSetterRefProps
} from './logic/useTableSetterRef'

const ReactTableUI = <Data extends DataType>({
  tableRef,
  ...tableProps
}: ReactTableUIProps<Data> & {
  tableRef?: React.RefObject<UseTableSetterRefProps<Data>>
}): JSX.Element => {
  const context = useReactTableUI(tableProps)

  useHandleTableSetterRef(context, tableRef)

  return (
    <div>
      <Table {...context} />
      <Pagination {...context} />
    </div>
  )
}

// Export components
export { ReactTableUI as default, Table, Pagination }

// Export helpers
export { useReactTableUI, useTableSetterRef }

// Export types
export * from './types'
export type { UseTableSetterRefProps }
