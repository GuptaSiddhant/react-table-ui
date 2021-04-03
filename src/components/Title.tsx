import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import GlobalFilter from './GlobalFilter'

/**
 * Title component of RTUI.
 * It contains table title and actions.
 */
const Title = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  //   const { tableProps } = context
  //   const { title = 'Table' } = tableProps

  return (
    <div className={createClassName('Title')}>
      <div className='start'>
        <GlobalFilter {...context} />
      </div>
      {/* <div className='end'>{globalFilterComponent}</div> */}
    </div>
  )
}

export default Title
