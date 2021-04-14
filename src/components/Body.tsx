import * as React from 'react'
import type { Row } from 'react-table'
import type { DataType, TableContext } from '../types'
import createClassName from '../utilities/createClassName'
import Cell from '../common/Cell'
import { checkIfSystemColumn } from '../utilities/systemColumns'

const SubComponent = <Data extends DataType>({
  row,
  totalColumnsWidth
}: {
  row: Row<Data>
  totalColumnsWidth: number
}): JSX.Element | null => {
  const subComponent: React.ReactNode = row.original.subComponent
  const rowProps = row.getRowProps()

  return subComponent ? (
    <div
      key={rowProps.key + '_subComponent'}
      className={createClassName('tr subComponent')}
      style={{ minWidth: totalColumnsWidth + 'px', maxWidth: '100%' }}
    >
      <div className='content'>{subComponent}</div>
    </div>
  ) : null
}

const BodyRow = <Data extends DataType>({
  row
}: {
  row: Row<Data>
}): JSX.Element => {
  const rowProps = row.getRowProps()
  const isRowSelected = row.isSelected

  return (
    <div
      {...rowProps}
      tabIndex={-1}
      className={createClassName('tr', 'Row', isRowSelected ? 'selected' : '')}
    >
      {row.cells.map((cell) => {
        const isSystemColumn = checkIfSystemColumn(cell.column.id)
        return (
          <Cell
            {...cell.getCellProps()}
            className={isSystemColumn ? 'noSpacing' : ''}
          >
            {cell.render('Cell')}
          </Cell>
        )
      })}
    </div>
  )
}

const Body = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element => {
  const {
    rows,
    page,
    getTableBodyProps,
    prepareRow,
    totalColumnsWidth
  } = context.tableInstance

  return (
    <div className={createClassName('TBody body')} {...getTableBodyProps()}>
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

export default Body
