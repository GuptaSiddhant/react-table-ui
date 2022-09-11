import * as React from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button'

import type { DataType } from '../../types'
import useFullscreenAction from '../../logic/useFullscreenAction'
import Icon from '../../common/Icon'
import useTableContext from '../../context'

const defaultPreferencesIndicator = <Icon name='sliders' />

export default function PreferencesAction<
  Data extends DataType
>(): JSX.Element | null {
  const context = useTableContext<Data>()
  const { setModal } = context.tableInstance
  const text = context.tableProps.localeOptions?.text
  const fullScreenAction = useFullscreenAction<Data>(context)

  const handleOpenPreferences = () =>
    setModal({
      title: text?.tablePreferences || 'Table preferences',
      children: (
        <div>
          <PageSizePreference />
        </div>
      )
    })

  return (
    <Menu>
      <MenuButton className='Button RowAction' title='Table preferences'>
        <div className='button-content'>•••</div>
      </MenuButton>
      <MenuList>
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

function PageSizePreference<Data extends DataType>(): JSX.Element | null {
  const { tableInstance, tableProps } = useTableContext<Data>()
  const {
    state: { pageSize },
    setPageSize
  } = tableInstance
  const { locale, text } = tableProps.localeOptions || {}
  const { pageSizes = [10, 20, 50, 75, 100, 150] } =
    tableProps.paginationOptions || {}

  return (
    <div>
      {text?.pageSize || 'Page size'}
      <select
        name='pageSize'
        defaultValue={pageSize}
        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
      >
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size.toLocaleString(locale)}
          </option>
        ))}
      </select>
    </div>
  )
}
