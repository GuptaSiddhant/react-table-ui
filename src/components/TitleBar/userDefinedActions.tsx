import * as React from 'react'

import type { DataType, TableContext } from '../../types'
import createClassName from '../../utilities/createClassName'
import IconButton from '../../common/IconButton'

export const TableActions = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  const { actionOptions: { tableActions = [] } = {} } = context.tableProps

  if (tableActions.length === 0) return null

  return (
    <div className='TableActions'>
      {tableActions.map((action) => (
        <IconButton
          key={action.id}
          onClick={() => action.onClick(context)}
          title={action.tooltip}
        >
          {action.children}
        </IconButton>
      ))}
      <div className='separator' />
    </div>
  )
}

export const MultiRowActions = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  const { actionOptions: { multiRowActions = [] } = {} } = context.tableProps
  const { selectedFlatRows } = context.tableInstance

  if (multiRowActions.length === 0) return null

  const data: Data[] = selectedFlatRows.map((row) => row.original)
  const disabled = selectedFlatRows.length === 0

  return (
    <div
      className={createClassName('MultiRowActions', disabled ? 'disabled' : '')}
    >
      {multiRowActions.map((action) => (
        <IconButton
          disabled={disabled}
          key={action.id}
          onClick={() => action.onClick(data, selectedFlatRows)}
          title={action.tooltip}
        >
          {action.children}
        </IconButton>
      ))}
      <div className='separator' />
    </div>
  )
}
