import * as React from 'react'
import { Hooks, CellProps } from 'react-table'

import systemColumns from '../utilities/systemColumns'
import type { DataType, ReactTableUIProps, SingleRowAction } from '../types'

const useReachUI = (type: 'menu') => {
  const [reach, setReach] = React.useState<object | null>(null)

  React.useEffect(() => {
    let isMounted = true
    const handleSetReach = (mod: any) => isMounted && setReach(mod)
    switch (type) {
      case 'menu':
        import('@reach/menu-button').then(handleSetReach).catch(console.error)
        break
    }

    return () => {
      isMounted = false
    }
  }, [type])

  switch (type) {
    case 'menu':
      return reach as typeof import('@reach/menu-button/dist/declarations/src')
    default:
      return null
  }
}

const ActionMenu = <Data extends DataType>({
  actions,
  data
}: {
  actions: SingleRowAction<Data>[]
  data: Data
}) => {
  const ReachMenu = useReachUI('menu')

  if (!ReachMenu) return null

  const { Menu, MenuButton, MenuList, MenuItem } = ReachMenu

  return (
    <Menu>
      <MenuButton className='IconButton' title='Action'>
        <div className='button-content'>•••</div>
      </MenuButton>
      <MenuList>
        {actions.map((action) => (
          <MenuItem key={action.id} onSelect={() => action.onClick(data)}>
            <div>{action.label}</div>
            {action.icon && <div>{action.icon}</div>}
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

  const Cell = ({ row: { original } }: CellProps<Data>) => (
    <ActionMenu actions={singleRowActions} data={original} />
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
