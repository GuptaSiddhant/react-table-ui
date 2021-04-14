import * as React from 'react'

import type { DataType, TableContext } from '../../types'

import IconButton from '../../common/IconButton'

const VisibleFilterAction = <Data extends DataType>({
  tableInstance,
  tableProps
}: TableContext<Data>): JSX.Element | null => {
  const {
    state: { filtersVisible },
    toggleFiltersVisible
  } = tableInstance
  const {
    alwaysShowFilters,
    disableFilters,
    showFiltersActionIndicator,
    hideFiltersActionIndicator
  } = tableProps.filtersOptions || {}

  if (disableFilters || alwaysShowFilters) return null

  return (
    <IconButton
      onClick={toggleFiltersVisible}
      title={filtersVisible ? 'Hide column filters' : 'Show column filters'}
    >
      {filtersVisible
        ? hideFiltersActionIndicator || '❌'
        : showFiltersActionIndicator || '👁️'}
    </IconButton>
  )
}

export default VisibleFilterAction
