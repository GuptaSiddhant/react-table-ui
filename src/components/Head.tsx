import * as React from 'react'
import styled from 'styled-components'
import type { HeaderGroup } from 'react-table'
import { createClassName } from '../utilities'
import { useTableContext } from '../utilities/Context'
import type { DataType } from '../utilities/interface'
import Row from './Row'
import Cell from './Cell'

const StyledHead = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  top: 0;

  &.sticky {
    position: sticky;
  }
`

const HeadCell = <Data extends DataType>(
  column: HeaderGroup<Data>
): JSX.Element => {
  const { tableProps } = useTableContext<Data>()
  const { sortByOptions = {} } = tableProps
  const {
    descendingIndicator = '↓',
    ascendingIndicator = '↑',
    defaultIndicator = '⥮'
  } = sortByOptions

  const renderContent = column.render('Header')
  const headCellProps = column.getHeaderProps(column.getSortByToggleProps())
  const title =
    typeof renderContent === 'string' ? 'Sort ' + renderContent : 'Sort'
  console.log(headCellProps)

  return (
    <Cell className={createClassName('th')} {...headCellProps} title={title}>
      <div style={{ display: 'flex' }}>
        {renderContent}
        {column.canSort ? (
          <div style={{ marginLeft: '8px' }}>
            {column.isSorted
              ? column.isSortedDesc
                ? descendingIndicator
                : ascendingIndicator
              : defaultIndicator}
          </div>
        ) : null}
      </div>
    </Cell>
  )
}

const Head = <Data extends DataType>(): JSX.Element => {
  const { tableInstance, tableProps } = useTableContext<Data>()
  const { headerGroups } = tableInstance
  const { stickyHeaders = true } = tableProps

  const stickyHead =
    stickyHeaders === true ||
    (stickyHeaders !== false && stickyHeaders?.header !== false)

  const classNames = 'thead header ' + (stickyHead ? 'sticky' : '')

  return (
    <StyledHead className={createClassName(classNames)} role='rowgroup'>
      {headerGroups.map((headerGroup) => (
        <Row {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(HeadCell)}
        </Row>
      ))}
    </StyledHead>
  )
}

export default Head
