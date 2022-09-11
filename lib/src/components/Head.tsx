import * as React from 'react'

import clsx from '../utilities/clsx'
import Cell from '../common/Cell'
import { checkIfSystemColumn } from '../utilities/systemColumns'
import type {
  DataType,
  HeaderGroup,
  ReactTableUIProps,
  SortingComponent
} from '../types'
import useTableContext from '../context'

export default function Head<Data extends DataType>(): JSX.Element {
  const context = useTableContext<Data>()
  const { tableInstance, tableProps } = context
  const { headerGroups, state } = tableInstance
  const { freezeOptions } = tableProps
  const freezeHead = freezeOptions?.header !== false

  const filtersHeaderGroup = headerGroups[headerGroups.length - 1]
  const { filtersVisible } = state

  return (
    <div
      className={clsx('THead', 'header', freezeHead ? 'sticky' : '')}
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

interface HeadCellProps<Data extends DataType> {
  column: HeaderGroup<Data>
}

function HeadFilterCell<Data extends DataType>({
  column
}: HeadCellProps<Data>): JSX.Element | null {
  const renderContent = column.render('Header')
  const renderContentString =
    typeof renderContent === 'string'
      ? renderContent
      : renderContent?.toString() || ''
  const headCellProps = column.getHeaderProps(column.getSortByToggleProps())
  const isSystemColumn = checkIfSystemColumn(column)
  const columnFilter = column.render('Filter') as React.ReactNode

  return (
    <Cell
      {...{
        ...headCellProps,
        onClick: undefined,
        className: clsx('th', isSystemColumn ? 'noSpacing' : ''),
        title: renderContentString
      }}
      style={{ ...headCellProps.style, cursor: 'initial' }}
    >
      {!column.canFilter ? null : <div className='Filter'>{columnFilter}</div>}
    </Cell>
  )
}

function HeadCell<Data extends DataType>({
  column
}: HeadCellProps<Data>): JSX.Element | null {
  const { tableProps } = useTableContext<Data>()
  const { disableResizing = false } = tableProps.columnOptions || {}

  const SortComponent = createSortComponent(tableProps)
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
        className: clsx('th', isSystemColumn ? 'noSpacing' : ''),
        title: renderContentString
      }}
      style={{ ...headCellProps.style, cursor: 'initial' }}
    >
      <>
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
            className={clsx('resizer', column.isResizing ? 'isResizing' : '')}
          />
        )}
      </>
    </Cell>
  )
}

function HeaderRow<Data extends DataType>(props: {
  headerGroup: HeaderGroup<Data>
}): JSX.Element {
  const { getHeaderGroupProps, headers } = props.headerGroup

  return (
    <div {...getHeaderGroupProps()} className={clsx('tr', 'Row')}>
      {headers.map((column) => (
        <HeadCell key={column.getHeaderProps().key || ''} column={column} />
      ))}
    </div>
  )
}

function FilterRow<Data extends DataType>(props: {
  headerGroup: HeaderGroup<Data>
}): JSX.Element {
  const { getHeaderGroupProps, headers } = props.headerGroup

  return (
    <div {...getHeaderGroupProps()} className={clsx('tr', 'Row', 'FilterRow')}>
      {headers.map((column) => (
        <HeadFilterCell
          key={column.getHeaderProps().key || ''}
          column={column}
        />
      ))}
    </div>
  )
}

function createSortComponent<Data extends DataType>(
  tableProps: ReactTableUIProps<Data>
): SortingComponent<Data> {
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
