import * as React from 'react'

import type { DataType } from '../../types'
import clsx from '../../utilities/clsx'
import Button from '../../common/Button'
import useTableContext from '../../context'

export function TableActions<Data extends DataType>(): JSX.Element | null {
  const context = useTableContext<Data>()
  const { actionOptions: { tableActions = [] } = {} } = context.tableProps

  if (tableActions.length === 0) return null

  return (
    <div className='TableActions'>
      {tableActions.map((action) => (
        <Button
          key={action.id}
          onClick={() => action.onClick(context)}
          title={action.tooltip}
        >
          {action.children}
        </Button>
      ))}
      <div className='separator' />
    </div>
  )
}

export function MultiRowActions<Data extends DataType>(): JSX.Element | null {
  const context = useTableContext<Data>()
  const { actionOptions: { multiRowActions = [] } = {} } = context.tableProps
  const { selectedFlatRows } = context.tableInstance

  if (multiRowActions.length === 0) return null

  const data: Data[] = selectedFlatRows.map((row) => row.original)
  const disabled = selectedFlatRows.length === 0

  return (
    <div className={clsx('MultiRowActions', disabled ? 'disabled' : '')}>
      {multiRowActions.map((action) => (
        <Button
          disabled={disabled}
          key={action.id}
          onClick={() => action.onClick(data, selectedFlatRows)}
          title={action.tooltip}
        >
          {action.children}
        </Button>
      ))}
      <div className='separator' />
    </div>
  )
}
