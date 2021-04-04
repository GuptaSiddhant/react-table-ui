import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import GlobalFilter from './GlobalFilter'
import IconButton from '../common/IconButton'

/**
 * Title component of RTUI.
 * It contains table title and actions.
 */
const TitleBar = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  //   const { tableProps } = context
  //   const { title = 'Table' } = tableProps

  return (
    <div className={createClassName('TitleBar')}>
      <GlobalFilter {...context} />
      <div className='end'><IconButton>O</IconButton></div>
    </div>
  )
}

export default TitleBar
