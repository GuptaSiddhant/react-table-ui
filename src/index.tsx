import * as React from 'react'
import type { UseSortByOptions } from 'react-table'
import useReactTableUI from './logic/useReactTableUI'
import type { DataType, ReactTableUIProps } from './utilities/interface'
import Table from './components/Table'

const ReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): JSX.Element => {
  return <Table {...useReactTableUI(tableProps)} />
}

export default ReactTableUI

export { useReactTableUI, Table as ReactTableUI }

export type { ReactTableUIProps, UseSortByOptions }
