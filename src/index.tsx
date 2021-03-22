import * as React from 'react'
import useReactTableUI from './logic/useReactTableUI'
import type { DataType, ReactTableUIProps } from './types'
import Table from './components/Table'
import Pagination from './components/Pagination'

const ReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): JSX.Element => {
  const context = useReactTableUI(tableProps)
  return (
    <div>
      <Table {...context} />
      <Pagination {...context} />
    </div>
  )
}

export { ReactTableUI as default, useReactTableUI, Table, Pagination }

export * from './types'
