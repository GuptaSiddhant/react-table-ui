import * as React from 'react'
import type { HeaderGroup } from 'react-table'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import type { SortingComponent } from '../types/SortingOptions'
import Cell from './Cell'

type HeadCellProps<Data extends DataType> = TableContext<Data> & {
  column: HeaderGroup<Data>
}

const createSortComponent = <Data extends DataType>({
  tableProps
}: HeadCellProps<Data>): SortingComponent<Data> => {
  const {
    Component,
    descendingIndicator = '↑',
    ascendingIndicator = '↓',
    defaultIndicator = '⇅'
  } = tableProps.sortByOptions || {}

  const DefaultSortComponent: SortingComponent<Data> = ({
    canSort,
    isSorted,
    isSortedDesc,
    onClick,
    title
  }) =>
    canSort ? (
      <div
        style={{ marginLeft: '8px', cursor: 'pointer' }}
        onClick={onClick}
        title={title}
      >
        {isSorted
          ? isSortedDesc
            ? descendingIndicator
            : ascendingIndicator
          : defaultIndicator}
      </div>
    ) : null

  return Component || DefaultSortComponent
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

  const { disableResizing = false } = tableProps.columnOptions || {}

  const SortComponent = createSortComponent(props)
  const renderContent = column.render('Header')
  const renderContentString =
    typeof renderContent === 'string'
      ? renderContent
      : renderContent?.toString() || ''
  const headCellProps = column.getHeaderProps(column.getSortByToggleProps())
  const className = createClassName('th')

  return (
    <Cell
      {...{
        ...headCellProps,
        onClick: undefined,
        className,
        title: renderContentString
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
        <SortComponent
          {...column}
          onClick={(column.getSortByToggleProps() as any).onClick}
          column={column}
          title={`Sort ${renderContentString}`}
        />
        {!disableResizing && !column.disableResizing && (
          <div
            {...column?.getResizerProps?.()}
            title={`Resize ${renderContentString}`}
            className={createClassName(
              'resizer',
              column.isResizing ? 'isResizing' : ''
            )}
          />
        )}
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
