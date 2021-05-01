import * as React from 'react'
import type { Hooks, CellProps, Row } from 'react-table'

import systemColumns from '../utilities/systemColumns'
import useReachUI from '../utilities/useReachUI'
import type { DataType, ReactTableUIProps, SingleRowAction } from '../types'

const ActionMenu = <Data extends DataType>({
  actions,
  row
}: {
  actions: SingleRowAction<Data>[]
  row: Row<Data>
}) => {
  const ReachMenu = useReachUI('menu')

  if (!ReachMenu) return null

  const { Menu, MenuButton, MenuList, MenuItem } = ReachMenu

  return (
    <Menu>
      <MenuButton className='Button RowAction' title='Action'>
        <div className='button-content'>•••</div>
      </MenuButton>
      <MenuList >
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

const generateUseRowActionColumn = <Data extends DataType>(
  props: ReactTableUIProps<Data>
) => {
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
export default generateUseRowActionColumn
