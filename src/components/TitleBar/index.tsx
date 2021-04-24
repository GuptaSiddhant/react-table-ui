import * as React from 'react'

import type { DataType, TableContext } from '../../types'
import createClassName from '../../utilities/createClassName'

import GlobalFilter from './GlobalFilter'
import VisibleFilterAction from './VisibleFilterAction'
import FullscreenAction from './FullscreenAction'
import { TableActions, MultiRowActions } from './userDefinedActions'
import PreferencesAction from './PreferencesAction'

const SystemActions = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  return (
    <div className='systemActions'>
      <VisibleFilterAction {...context} />
      <FullscreenAction {...context} />
      <PreferencesAction {...context} />
    </div>
  )
}

/**
 * Title component of RTUI.
 * It contains table title and actions.
 */
const TitleBar = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  const { titleBar = true } = context.tableProps.styleOptions || {}

  return titleBar ? (
    <div className={createClassName('TitleBar')}>
      <GlobalFilter {...context} />
      <MultiRowActions {...context} />
      <TableActions {...context} />
      <SystemActions {...context} />
    </div>
  ) : (
    <div />
  )
}

export default TitleBar
