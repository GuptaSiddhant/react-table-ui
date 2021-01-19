import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from 'utilities'
import { useTableContext } from 'utilities/Context'
import type { DataType } from 'utilities/interface'
import Row from 'components/Row'
import Cell from 'components/Cell'

const StyledHead = styled.div`
  position: sticky;
  z-index: 5;
  width: 100%;
  top: 0;
`

const Head = <Data extends DataType>(): JSX.Element => {
  const { tableInstance } = useTableContext<Data>()
  const { headerGroups } = tableInstance
  return (
    <StyledHead className={createClassName('thead header')} role='rowgroup'>
      {headerGroups.map((headerGroup) => (
        <Row {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <Cell.Header {...column.getHeaderProps()}>
              {column.render('Header')}
            </Cell.Header>
          ))}
        </Row>
      ))}
    </StyledHead>
  )
}

export default Head
