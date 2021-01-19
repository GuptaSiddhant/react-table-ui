import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from 'utilities'
import { useTableContext } from 'utilities/Context'
import type { DataType } from 'utilities/interface'
import Row from 'components/Row'
import Cell from 'components/Cell'

const StyledFoot = styled.div`
  position: sticky;
  z-index: 5;
  width: 100%;
  bottom: 0;
`

const Foot = <Data extends DataType>(): JSX.Element => {
  const { tableInstance } = useTableContext<Data>()
  const { headerGroups } = tableInstance
  const footerGroups = headerGroups.slice().reverse()
  return (
    <StyledFoot className={createClassName('tfoot footer')} role='rowgroup'>
      {footerGroups.map((group) => (
        <Row {...group.getHeaderGroupProps()}>
          {group.headers.map((column) => (
            <Cell {...column.getHeaderProps()}>{column.render('Footer')}</Cell>
          ))}
        </Row>
      ))}
    </StyledFoot>
  )
}

export default Foot
