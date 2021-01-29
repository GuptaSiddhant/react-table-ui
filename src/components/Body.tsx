import * as React from 'react'
import { createClassName } from '../utilities'
import type { DataType, TableContext } from '../utilities/interface'
import Cell from './Cell'

const Body = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const { tableInstance } = props
  const { rows, page, prepareRow, getTableBodyProps } = tableInstance
  return (
    <div
      className={createClassName('tbody body')}
      style={{ position: 'relative', zIndex: 0 }}
      {...getTableBodyProps()}
    >
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
              >
                {subComponent}
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Body
