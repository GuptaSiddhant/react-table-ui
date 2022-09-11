import * as React from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button'

import systemColumns from '../utilities/systemColumns'

import type {
  DataType,
  ReactTableUIProps,
  SingleRowAction,
  Hooks,
  CellProps,
  Row
} from '../types'

export default function generateUseRowActionColumn<Data extends DataType>(
  props: ReactTableUIProps<Data>
) {
  const { singleRowActions = [] } = props.actionOptions || {}

  const Cell = ({ row }: CellProps<Data>) => (
    <ActionMenu actions={singleRowActions} row={row} />
  )

  return (hooks: Hooks<Data>): void => {
    if (singleRowActions.length > 0)
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: systemColumns.action.id,
          sticky: systemColumns.action.order < 0 ? 'left' : 'right',
          minWidth: 48,
          maxWidth: 48,
          Header: '',
          Cell,
          disableResizing: true,
          disableFilters: true,
          disableGlobalFilter: true,
          disableGroupBy: true,
          disableSortBy: true
        }
      ])
  }
}

function ActionMenu<Data extends DataType>({
  actions,
  row
}: {
  actions: SingleRowAction<Data>[]
  row: Row<Data>
}) {
  return (
    <Menu>
      <MenuButton className='Button RowAction' title='Action'>
        <div className='button-content'>•••</div>
      </MenuButton>
      <MenuList>
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onSelect={() => action.onClick(row.original, row)}
            about={action.tooltip}
          >
            {action.children}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
