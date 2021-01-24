import * as React from 'react'
import { HeaderGroup } from 'react-table'
import styled from 'styled-components'
import { createClassName } from '../utilities'
import type { DataType, TableContext } from '../utilities/interface'
import Row from './Row'
import Cell from './Cell'
import Status from './Status'

const StyledFoot = styled.div`
  position: sticky;
  z-index: 5;
  width: 100%;
  bottom: 0;
  background: white;
`

const renderFooterCellContent = <Data extends DataType>(
  column: HeaderGroup<Data>
): React.ReactNode => {
  try {
    const render = column.render('Footer')
    return render
  } catch {
    return null
  }
}

const Foot = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element | null => {
  const {
    tableInstance,
    tableProps: { freezeOptions, columns }
  } = props

  const showFooter = columns?.some(function hasFooter(column): boolean {
    return !!column.Footer || !!column.columns?.some((c) => hasFooter(c))
  })

  const { headerGroups } = tableInstance
  const footerGroups = headerGroups.slice().reverse()

  const freezeFoot = freezeOptions?.footer !== false

  const classNames = 'tfoot footer ' + (freezeFoot ? 'sticky' : '')

  return (
    <StyledFoot className={createClassName(classNames)} role='rowgroup'>
      {showFooter &&
        footerGroups.map((group) => {
          const rowHasFooter = group.headers.some(({ Footer }) =>
            typeof Footer === 'function'
              ? Footer.name !== 'emptyRenderer'
              : !!Footer
          )
          return rowHasFooter ? (
            <Row {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <Cell {...column.getHeaderProps()}>
                  {renderFooterCellContent<Data>(column)}
                </Cell>
              ))}
            </Row>
          ) : null
        })}
      <Status {...props} />
    </StyledFoot>
  )
}

export default Foot
