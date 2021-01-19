import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from 'utilities'
import { useTableContext } from 'utilities/Context'
import type { DataType, ElementRef } from 'utilities/interface'
import Head from 'components/Head'
import Body from 'components/Body'

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

const Table = <Data extends DataType>(_: any, ref: ElementRef): JSX.Element => {
  const { tableInstance } = useTableContext<Data>()
  const { getTableProps } = tableInstance
  return (
    <StyledTable
      ref={ref}
      className={createClassName('table sticky')}
      {...getTableProps()}
    >
      <Head />
      <Body />
    </StyledTable>
  )
}

export default React.forwardRef<HTMLDivElement, any>(Table)
