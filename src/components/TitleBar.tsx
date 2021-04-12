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

const TableActions = <Data extends DataType>(
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
          title={action.label}
        >
          {action.icon}
        </IconButton>
      ))}
      <div className='separator' />
    </div>
  )
}

const MultiRowActions = <Data extends DataType>(
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
          title={action.label}
        >
          {action.icon}
        </IconButton>
      ))}
      <div className='separator' />
    </div>
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
      <MultiRowActions {...context} />
      <TableActions {...context} />
      <div className='systemActions'>
        <VisibleFilterAction {...context} />
      </div>
    </div>
  )
}

export default TitleBar
