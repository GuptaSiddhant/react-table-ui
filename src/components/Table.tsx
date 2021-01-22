import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from '../utilities'
import type { DataType, ElementRef, TableContext } from '../utilities/interface'
import Head from '../components/Head'
import Body from '../components/Body'
import Foot from '../components/Foot'

const StyledTable = styled.div`
  height: 100%;
  min-width: 100%;
  overflow: scroll;
  border: 1px solid #ddd;
  &,
  > * {
    box-sizing: border-box;
  }
`

const Table = <Data extends DataType>(
  props: TableContext<Data>,
  ref: ElementRef
): JSX.Element => {
  const { getTableProps } = props.tableInstance
  return (
    <StyledTable
      ref={ref}
      className={createClassName('table sticky')}
      {...getTableProps()}
    >
      <Head {...props} />
      <Body {...props} />
      <Foot {...props} />
    </StyledTable>
  )
}

export default React.forwardRef<HTMLDivElement, any>(Table)
