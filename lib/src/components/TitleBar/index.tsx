import * as React from 'react'

import type { DataType } from '../../types'
import clsx from '../../utilities/clsx'

import GlobalFilter from './GlobalFilter'
import VisibleFilterAction from './VisibleFilterAction'

import { TableActions, MultiRowActions } from './userDefinedActions'
import PreferencesAction from './PreferencesAction'
import useTableContext from '../../context'

/**
 * Title component of RTUI.
 * It contains table title and actions.
 */
export default function TitleBar<Data extends DataType>(): JSX.Element | null {
  const context = useTableContext<Data>()
  const { titleBar = true } = context.tableProps.styleOptions || {}

  return titleBar ? (
    <div className={clsx('TitleBar')}>
      <GlobalFilter />
      <MultiRowActions />
      <TableActions />
      <SystemActions />
    </div>
  ) : (
    <div />
  )
}

function SystemActions(): JSX.Element | null {
  return (
    <div className='systemActions'>
      <VisibleFilterAction />
      {/* <FullscreenAction {...context} /> */}
      <PreferencesAction />
    </div>
  )
}
