import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import Cell from '../common/Cell'
import { checkIfSystemColumn } from '../utilities/systemColumns'

const Body = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element => {
  const {
    rows,
    page,
    prepareRow,
    getTableBodyProps,
    totalColumnsWidth
  } = context.tableInstance

  return (
    <div className={createClassName('TBody body')} {...getTableBodyProps()}>
      {(page || rows).map((row) => {
        prepareRow(row)
        const subComponent: React.ReactNode = row.original.subComponent
        const rowProps = row.getRowProps()
        const isRowSelected = row.isSelected

        return (
          <React.Fragment key={rowProps.key}>
            <div
              {...rowProps}
              className={createClassName(
                'tr',
                'Row',
                isRowSelected ? 'selected' : ''
              )}
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
            {subComponent && row.isExpanded && (
              <div
                key={rowProps.key + '_subComponent'}
                className={createClassName('tr subComponent')}
                style={{ minWidth: totalColumnsWidth + 'px', maxWidth: '100%' }}
              >
                <div className='content'>{subComponent}</div>
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Body
