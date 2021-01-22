import * as React from 'react'
import styled from 'styled-components'
import type { HeaderGroup } from 'react-table'
import { createClassName } from '../utilities'
import type { DataType, TableContext } from '../utilities/interface'
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
  props: TableContext<Data> & { column: HeaderGroup<Data> }
): JSX.Element => {
  const { column, tableProps } = props
  const { sortByOptions = {} } = tableProps
  const {
    descendingIndicator = '↓',
    ascendingIndicator = '↑',
    defaultIndicator = '⇅'
  } = sortByOptions

  const renderContent = column.render('Header')
  const headCellProps = column.getHeaderProps(column.getSortByToggleProps())
  const title =
    typeof renderContent === 'string' ? 'Sort ' + renderContent : 'Sort'

  return (
    <Cell
      className={createClassName('th')}
      {...headCellProps}
      title={title}
      onClick={undefined}
    >
      <div style={{ display: 'flex' }} onClick={(headCellProps as any).onClick}>
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
      <div>{column.canFilter ? column.render('Filter') : null}</div>
    </Cell>
  )
}

const Head = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const { tableInstance, tableProps } = props
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
          {headerGroup.headers.map((column) => (
            <HeadCell {...{ column, ...props }} />
          ))}
        </Row>
      ))}
    </StyledHead>
  )
}

export default Head
