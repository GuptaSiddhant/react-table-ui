import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import GlobalFilter from './GlobalFilter'
import IconButton from '../common/IconButton'

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
    <IconButton onClick={toggleFiltersVisible} title={filtersVisible
      ? 'Hide column filters'
      : 'Show column filters'}>
      {filtersVisible
        ? hideFiltersActionIndicator || '👀'
        : showFiltersActionIndicator || '👁️'}
    </IconButton>
  )
}

/**
 * Title component of RTUI.
 * It contains table title and actions.
 */
const TitleBar = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  return (
    <div className={createClassName('TitleBar')}>
      <GlobalFilter {...context} />
      <div className='end'>
        <VisibleFilterAction {...context} />
      </div>
    </div>
  )
}

export default TitleBar
