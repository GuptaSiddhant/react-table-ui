import * as React from 'react'
import { createClassName } from 'utilities'
import type { DataType, TableComponentProps } from 'utilities/interface'

const Body = <Data extends DataType>(
  props: TableComponentProps<Data>
): JSX.Element => {
  const { rows, prepareRow, getTableBodyProps } = props.tableInstance
  return (
    <div {...getTableBodyProps()} className={createClassName('tbody')}>
      {
        // Loop over the table rows
        rows.map((row) => {
          // Prepare the row for display
          prepareRow(row)
          return (
            // Apply the row props
            <div {...row.getRowProps()} className={createClassName('tr')}>
              {
                // Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  return (
                    <div
                      {...cell.getCellProps()}
                      className={createClassName('td')}
                    >
                      {
                        // Render the cell contents
                        cell.render('Cell')
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Body
