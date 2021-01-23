import * as React from 'react'
import useReactTableUI from './logic/useReactTableUI'
import type { DataType, ReactTableUIProps } from './utilities/interface'
import Table from './components/Table'
import Pagination from './components/Pagination'

const ReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): JSX.Element => {
  return <Table {...useReactTableUI(tableProps)} />
}

export default ReactTableUI

export { useReactTableUI, Table, Pagination }

export type { ReactTableUIProps }
