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
  tableSetterRef,
  ...tableProps
}: ReactTableUIProps<Data> & {
  tableSetterRef?: React.RefObject<UseTableSetterRefProps<Data>>
}): JSX.Element => {
  const context = useReactTableUI(tableProps)

  useHandleTableSetterRef(context, tableSetterRef)

  return (
    <div>
      <Table {...context} />
      <Pagination {...context} />
    </div>
  )
}

// Export components
export default ReactTableUI
export { Table, Pagination }

// Export helpers
export { useReactTableUI, useTableSetterRef }

// Export types
export * from './types'
export type { UseTableSetterRefProps }
