import * as React from 'react'

import type { DataType, TableContext } from '../../types'
import Button from '../../common/Button'
import Icon from '../../common/Icon'

const defaultPreferencesIndicator = <Icon name='sliders' />

const PageSizePreference = <Data extends DataType>({
  tableInstance
}: TableContext<Data>): JSX.Element | null => {
  const {
    state: { pageSize },
    setPageSize
  } = tableInstance

  return (
    <div>
      Page size
      <select
        name='pageSize'
        defaultValue={pageSize}
        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
      >
        {[10, 20, 50, 75, 100, 150].map((size) => (
          <option key={size} value={size}>
            {size}
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

  const handleOpenPreferences = () =>
    setModal({
      title: 'Table preferences',
      children: (
        <div>
          <PageSizePreference {...context} />
        </div>
      )
    })

  return (
    <Button
      key='preferences'
      onClick={handleOpenPreferences}
      title='Table preferences'
    >
      {defaultPreferencesIndicator}
    </Button>
  )
}

export default PreferencesAction
