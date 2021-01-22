import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from '../utilities'
import type { DataType, TableContext } from '../utilities/interface'
import Row from './Row'
import Cell from './Cell'

const StyledBody = styled.div`
  position: relative;
  z-index: 0;
`

const Body = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const { tableInstance } = props
  const { rows, prepareRow, getTableBodyProps } = tableInstance
  return (
    <StyledBody
      className={createClassName('tbody body')}
      {...getTableBodyProps()}
    >
      {rows.map((row) => {
        prepareRow(row)
        return (
          <Row {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
            })}
          </Row>
        )
      })}
    </StyledBody>
  )
}

export default Body
