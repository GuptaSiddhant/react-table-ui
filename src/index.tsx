import * as React from 'react'
import { useTable, useFlexLayout } from 'react-table'
import { useSticky } from 'react-table-sticky'
import type { DataType, ReactTableUIProps } from 'utilities/interface'
import { createDefaultColumns, createClassName } from 'utilities'
import Head from 'components/Head'
import Body from 'components/Body'
import TableContainer from 'style/TableContainer'

const ReactTableUI = <Data extends DataType>(
  props: ReactTableUIProps<Data>
): JSX.Element => {
  const { data, columns = createDefaultColumns(data) } = props
  const tableInstance = useTable({ data, columns }, useFlexLayout, useSticky)

  const { getTableProps } = tableInstance
  console.log(getTableProps())

  return (
    // apply the table props
    <TableContainer>
      <div className={createClassName('table sticky')} {...getTableProps()}>
        <Head tableInstance={tableInstance} tableProps={props} />
        {/* Apply the table body props */}
        <Body tableInstance={tableInstance} tableProps={props} />
      </div>
    </TableContainer>
  )
}

export default ReactTableUI
