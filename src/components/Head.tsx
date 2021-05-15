import * as React from 'react'

import createClassName from '../utilities/createClassName'
import Cell from '../common/Cell'
import { checkIfSystemColumn } from '../utilities/systemColumns'
import type {
  DataType,
  TableContext,
  HeaderGroup,
  SortingComponent
} from '../types'

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
        className='Sort'
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

const HeadFilterCell = <Data extends DataType>(
  props: HeadCellProps<Data>
): JSX.Element | null => {
  const { column } = props

  const renderContent = column.render('Header')
  const renderContentString =
    typeof renderContent === 'string'
      ? renderContent
      : renderContent?.toString() || ''
  const headCellProps = column.getHeaderProps(column.getSortByToggleProps())
  const isSystemColumn = checkIfSystemColumn(column)

  return (
    <Cell
      {...{
        ...headCellProps,
        onClick: undefined,
        className: createClassName('th', isSystemColumn ? 'noSpacing' : ''),
        title: renderContentString
      }}
      style={{ ...headCellProps.style, cursor: 'initial' }}
    >
      {!column.canFilter ? null : (
        <div className='Filter'>{column.render('Filter')}</div>
      )}
    </Cell>
  )
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
  const isSystemColumn = checkIfSystemColumn(column)

  return (
    <Cell
      {...{
        ...headCellProps,
        onClick: undefined,
        className: createClassName('th', isSystemColumn ? 'noSpacing' : ''),
        title: renderContentString
      }}
      style={{ ...headCellProps.style, cursor: 'initial' }}
    >
      {renderContent}
      <SortComponent
        {...column}
        onClick={(column.getSortByToggleProps() as any).onClick}
        column={column}
        title={`Sort ${renderContentString}`}
      />
      {!disableResizing && !column.disableResizing && !isSystemColumn && (
        <div
          {...column?.getResizerProps?.()}
          title={`Resize ${renderContentString}`}
          className={createClassName(
            'resizer',
            column.isResizing ? 'isResizing' : ''
          )}
        />
      )}
    </Cell>
  )
}

const HeaderRow = <Data extends DataType>(
  props: TableContext<Data> & {
    headerGroup: HeaderGroup<Data>
  }
): JSX.Element => {
  const { headerGroup, ...context } = props
  const { getHeaderGroupProps, headers } = headerGroup

  return (
    <div {...getHeaderGroupProps()} className={createClassName('tr', 'Row')}>
      {headers.map((column) => (
        <HeadCell
          key={column.getHeaderProps().key || ''}
          {...{ column, ...context }}
        />
      ))}
    </div>
  )
}

const FilterRow = <Data extends DataType>(
  props: TableContext<Data> & {
    headerGroup: HeaderGroup<Data>
  }
): JSX.Element => {
  const { headerGroup, ...context } = props
  const { getHeaderGroupProps, headers } = headerGroup

  return (
    <div
      {...getHeaderGroupProps()}
      className={createClassName('tr', 'Row', 'FilterRow')}
    >
      {headers.map((column) => (
        <HeadFilterCell
          key={column.getHeaderProps().key || ''}
          {...{ column, ...context }}
        />
      ))}
    </div>
  )
}

const Head = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element => {
  const { tableInstance, tableProps } = context
  const { headerGroups, state } = tableInstance
  const { freezeOptions } = tableProps
  const freezeHead = freezeOptions?.header !== false

  const filtersHeaderGroup = headerGroups[headerGroups.length - 1]
  const { filtersVisible } = state

  return (
    <div
      className={createClassName('THead', 'header', freezeHead ? 'sticky' : '')}
      role='rowgroup'
    >
      {headerGroups.map((headerGroup, index) => (
        <HeaderRow key={index} headerGroup={headerGroup} {...context} />
      ))}
      {filtersVisible && (
        <FilterRow
          key='filterRow'
          headerGroup={filtersHeaderGroup}
          {...context}
        />
      )}
    </div>
  )
}

export default Head
