import * as React from 'react'
import clsx from '../utilities/clsx'
import Cell from '../common/Cell'
import { checkIfSystemColumn } from '../utilities/systemColumns'
import type { DataType, TableContext, Row } from '../types'

export default function Body<Data extends DataType>(
  context: TableContext<Data>
): JSX.Element {
  const {
    rows,
    page,
    getTableBodyProps,
    prepareRow,
    totalColumnsWidth
  } = context.tableInstance

  return (
    <div className={clsx('TBody body')} {...getTableBodyProps()}>
      {(page || rows).map((row) => {
        prepareRow(row)

        return (
          <React.Fragment key={row.id}>
            <BodyRow row={row} />
            {row.isExpanded && (
              <SubComponent row={row} totalColumnsWidth={totalColumnsWidth} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function SubComponent<Data extends DataType>({
  row,
  totalColumnsWidth
}: {
  row: Row<Data>
  totalColumnsWidth: number
}): JSX.Element | null {
  const subComponent: React.ReactNode = row.original.subComponent
  const rowProps = row.getRowProps()

  return subComponent ? (
    <div
      key={rowProps.key + '_subComponent'}
      className={clsx('tr subComponent')}
      style={{ minWidth: totalColumnsWidth + 'px', maxWidth: '100%' }}
    >
      <div className='content'>{subComponent}</div>
    </div>
  ) : null
}

function BodyRow<Data extends DataType>({
  row
}: {
  row: Row<Data>
}): JSX.Element {
  const rowProps = row.getRowProps()
  const isRowSelected = row.isSelected

  return (
    <div
      {...rowProps}
      tabIndex={-1}
      className={clsx('tr', 'Row', isRowSelected ? 'selected' : '')}
    >
      {row.cells.map((cell) => {
        const isSystemColumn = checkIfSystemColumn(cell.column.id)
        const cellContent = cell.render('Cell') as React.ReactNode

        return (
          <Cell
            {...cell.getCellProps()}
            className={isSystemColumn ? 'systemColumn noSpacing' : ''}
            key={cell.column.id}
          >
            {cellContent}
          </Cell>
        )
      })}
    </div>
  )
}
