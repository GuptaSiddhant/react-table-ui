import * as React from 'react'

import type { DataType, TableContext } from '../../types'
import Button from '../../common/Button'
import Icon from '../../common/Icon'

export default function VisibleFilterAction<Data extends DataType>({
  tableInstance,
  tableProps
}: TableContext<Data>): JSX.Element | null {
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
  const text = tableProps.localeOptions?.text

  if (disableFilters || alwaysShowFilters) return null

  return (
    <Button
      onClick={toggleFiltersVisible}
      title={
        text?.toggleColumnFilters ||
        (filtersVisible
          ? text?.hideColumnFilters || 'Hide column filters'
          : text?.showColumnFilters || 'Show column filters')
      }
    >
      {filtersVisible
        ? hideFiltersActionIndicator || <Icon name='x' />
        : showFiltersActionIndicator || <Icon name='filter' />}
    </Button>
  )
}
