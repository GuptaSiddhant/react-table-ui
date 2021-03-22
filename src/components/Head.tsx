import * as React from 'react'
import type { HeaderGroup } from 'react-table'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
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
        title,
        className
      }}
      style={{
        ...headCellProps.style,
        cursor: 'inherit',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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

const Head = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const { tableInstance, tableProps } = props
  const { headerGroups } = tableInstance
  const { freezeOptions } = tableProps

  const freezeHead = freezeOptions?.header !== false
  const classNames = 'thead header ' + (freezeHead ? 'sticky' : '')
  const stylesHead: React.CSSProperties = {
    position: freezeHead ? 'sticky' : 'relative',
    zIndex: 5,
    width: '100%',
    top: 0
  }

  return (
    <div
      className={createClassName(classNames)}
      role='rowgroup'
      style={stylesHead}
    >
      {headerGroups.map(({ getHeaderGroupProps, headers }) => (
        <div {...getHeaderGroupProps()} className={createClassName('tr')}>
          {headers.map((column) => (
            <HeadCell
              key={column.getHeaderProps().key || ''}
              {...{ column, ...props }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Head
