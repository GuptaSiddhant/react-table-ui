import * as React from 'react'
import { HeaderGroup } from 'react-table'
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

const renderFooter = <Data extends DataType>(
  column: HeaderGroup<Data>
): React.ReactNode => {
  try {
    const render = column.render('Footer')
    return render
  } catch {
    return null
  }
}

const Foot = <Data extends DataType>(): JSX.Element | null => {
  const { tableInstance, tableProps } = useTableContext<Data>()

  const showFooter = tableProps.columns?.some((column) => !!column.Footer)

  const { headerGroups } = tableInstance
  const footerGroups = headerGroups.slice().reverse()

  console.log(footerGroups)

  return showFooter ? (
    <StyledFoot className={createClassName('tfoot footer')} role='rowgroup'>
      {footerGroups.map((group) => (
        <Row {...group.getHeaderGroupProps()}>
          {group.headers.map((column) => (
            <Cell {...column.getHeaderProps()}>
              {renderFooter<Data>(column)}
            </Cell>
          ))}
        </Row>
      ))}
    </StyledFoot>
  ) : null
}

export default Foot
