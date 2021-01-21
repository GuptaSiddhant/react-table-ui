import * as React from 'react'
import type { UseSortByOptions } from 'react-table'
import useReactTableUI from './useReactTableUI'
import type { DataType, ReactTableUIProps } from './utilities/interface'

const ReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): JSX.Element => {
  const { TableWrapper, Table } = useReactTableUI(tableProps)

  return (
    <TableWrapper>
      <Table />
    </TableWrapper>
  )
}

export default ReactTableUI

export { useReactTableUI }

export type { ReactTableUIProps, UseSortByOptions }
