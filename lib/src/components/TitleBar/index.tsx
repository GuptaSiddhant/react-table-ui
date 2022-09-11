import * as React from 'react'

import type { DataType, TableContext } from '../../types'
import clsx from '../../utilities/clsx'

import GlobalFilter from './GlobalFilter'
import VisibleFilterAction from './VisibleFilterAction'

import { TableActions, MultiRowActions } from './userDefinedActions'
import PreferencesAction from './PreferencesAction'

/**
 * Title component of RTUI.
 * It contains table title and actions.
 */
export default function TitleBar<Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null {
  const { titleBar = true } = context.tableProps.styleOptions || {}

  return titleBar ? (
    <div className={clsx('TitleBar')}>
      <GlobalFilter {...context} />
      <MultiRowActions {...context} />
      <TableActions {...context} />
      <SystemActions {...context} />
    </div>
  ) : (
    <div />
  )
}

function SystemActions<Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null {
  return (
    <div className='systemActions'>
      <VisibleFilterAction {...context} />
      {/* <FullscreenAction {...context} /> */}
      <PreferencesAction {...context} />
    </div>
  )
}
