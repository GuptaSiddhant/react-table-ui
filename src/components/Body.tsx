import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import Cell from '../common/Cell'

const Body = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const { tableInstance } = props
  const {
    rows,
    page,
    prepareRow,
    getTableBodyProps,
    totalColumnsWidth
  } = tableInstance
  return (
    <div className={createClassName('TBody body')} {...getTableBodyProps()}>
      {(page || rows).map((row) => {
        prepareRow(row)
        const subComponent: React.ReactNode = row.original.subComponent
        const rowProps = row.getRowProps()
        return (
          <React.Fragment key={rowProps.key}>
            <div {...rowProps} className={createClassName('tr')}>
              {row.cells.map((cell) => {
                return (
                  <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
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
