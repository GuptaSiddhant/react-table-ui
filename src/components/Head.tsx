import * as React from 'react'
import { createClassName } from 'utilities'
import type { DataType, TableComponentProps } from 'utilities/interface'

const Head = <Data extends DataType>(
  props: TableComponentProps<Data>
): JSX.Element => {
  const { headerGroups } = props.tableInstance
  return (
    <div className={createClassName('thead header')} role='rowgroup'>
      {
        // Loop over the header rows
        headerGroups.map((headerGroup) => (
          // Apply the header row props
          <div
            {...headerGroup.getHeaderGroupProps()}
            className={createClassName('tr')}
          >
            {
              // Loop over the headers in each row
              headerGroup.headers.map((column) => (
                // Apply the header cell props
                <div
                  {...column.getHeaderProps()}
                  className={createClassName('th')}
                >
                  {
                    // Render the header
                    column.render('Header')
                  }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Head
