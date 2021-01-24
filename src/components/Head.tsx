import * as React from 'react'
import styled from 'styled-components'
import type { HeaderGroup } from 'react-table'
import { createClassName } from '../utilities'
import type { DataType, TableContext } from '../utilities/interface'
import Row from './Row'
import Cell from './Cell'

type HeadCellProps<Data extends DataType> = TableContext<Data> & {
  column: HeaderGroup<Data>
}

const HeadFilter = <Data extends DataType>(
  props: HeadCellProps<Data>
): JSX.Element | null => {
  const { column } = props
  if (!column.canFilter) return null
  return <div>{column.render('Filter')}</div>
}

const HeadCell = <Data extends DataType>(
  props: HeadCellProps<Data>
): JSX.Element | null => {
  const { column, tableProps } = props
  const { sortByOptions = {} } = tableProps
  const {
    descendingIndicator = '↓',
    ascendingIndicator = '↑',
    defaultIndicator = '⇅'
  } = sortByOptions

  const renderContent = column.render('Header')
  const headCellProps = column.getHeaderProps(column.getSortByToggleProps())
  const className = createClassName('th')
  const title = (() => {
    let titleArray: string[] = []
    if (column.canSort) titleArray.push('Sort')
    if (typeof renderContent === 'string') titleArray.push(renderContent)
    return titleArray.join(' ')
  })()

  return (
    <Cell
      {...{
        ...headCellProps,
        onClick: undefined,
        style: {
          ...headCellProps.style,
          cursor: 'inherit',
          fontWeight: 'bold'
        },
        title,
        className
      }}
    >
      <div style={{ display: 'flex' }}>
        {renderContent}
        {column.canSort ? (
          <div
            style={{ marginLeft: '8px', cursor: 'pointer' }}
            onClick={(headCellProps as any).onClick}
          >
            {column.isSorted
              ? column.isSortedDesc
                ? descendingIndicator
                : ascendingIndicator
              : defaultIndicator}
          </div>
        ) : null}
      </div>
      <HeadFilter {...props} />
    </Cell>
  )
}

const StyledHead = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  top: 0;

  &.sticky {
    position: sticky;
  }
`

const Head = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const { tableInstance, tableProps } = props
  const { headerGroups } = tableInstance
  const { freezeOptions } = tableProps

  const freezeHead = freezeOptions?.header !== false

  const classNames = 'thead header ' + (freezeHead ? 'sticky' : '')

  return (
    <StyledHead className={createClassName(classNames)} role='rowgroup'>
      {headerGroups.map((headerGroup) => (
        <Row {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <HeadCell
              key={column.getHeaderProps().key || ''}
              {...{ column, ...props }}
            />
          ))}
        </Row>
      ))}
    </StyledHead>
  )
}

export default Head
