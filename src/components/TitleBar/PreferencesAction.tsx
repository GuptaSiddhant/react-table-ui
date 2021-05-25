import * as React from 'react'

import type { DataType, TableContext } from '../../types'
import useFullscreenAction from './FullscreenAction'
import Icon from '../../common/Icon'
import useReachUI from '../../utilities/useReachUI'

const defaultPreferencesIndicator = <Icon name='sliders' />

const PageSizePreference = <Data extends DataType>({
  tableInstance,
  tableProps
}: TableContext<Data>): JSX.Element | null => {
  const {
    state: { pageSize },
    setPageSize
  } = tableInstance
  const { locale, text } = tableProps.localeOptions || {}

  return (
    <div>
      {text?.pageSize || 'Page size'}
      <select
        name='pageSize'
        defaultValue={pageSize}
        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
      >
        {[10, 20, 50, 75, 100, 150].map((size) => (
          <option key={size} value={size}>
            {size.toLocaleString(locale)}
          </option>
        ))}
      </select>
    </div>
  )
}

const PreferencesAction = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  const { setModal } = context.tableInstance
  const text = context.tableProps.localeOptions?.text
  const fullScreenAction = useFullscreenAction<Data>(context)

  const ReachMenu = useReachUI('menu')
  if (!ReachMenu) return null
  const { Menu, MenuButton, MenuList, MenuItem } = ReachMenu

  const handleOpenPreferences = () =>
    setModal({
      title: text?.tablePreferences || 'Table preferences',
      children: (
        <div>
          <PageSizePreference {...context} />
        </div>
      )
    })

  return (
    <Menu>
      <MenuButton className='Button RowAction' title='Table preferences'>
        <div className='button-content'>•••</div>
      </MenuButton>
      <MenuList portal={true}>
        {fullScreenAction && (
          <MenuItem onSelect={() => fullScreenAction.onClick!()}>
            {fullScreenAction.children}
            {fullScreenAction.title}
          </MenuItem>
        )}
        <MenuItem onSelect={handleOpenPreferences}>
          {defaultPreferencesIndicator}
          {text?.tablePreferences || 'Table preferences'}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default PreferencesAction
