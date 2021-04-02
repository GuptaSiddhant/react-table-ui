import * as React from 'react'
import type { Hooks, CellProps, HeaderProps, Column } from 'react-table'
import systemColumns from '../utilities/systemColumns'
import type { DataType, ReactTableUIProps } from '../types'

const getUseExpandedColumn = <Data extends DataType>(
  props: ReactTableUIProps<Data>
) => {
  const { collapsedIndicator = '→', expandedIndicator = '↓' } =
    props.expandedOptions || {}

  const disableExpander = !props.data.some(
    (d) => d.subRows?.length || d.subComponent
  )

  const Header = ({
    getToggleAllRowsExpandedProps,
    isAllRowsExpanded
  }: HeaderProps<Data>) => (
    <span {...getToggleAllRowsExpandedProps()}>
      {isAllRowsExpanded ? expandedIndicator : collapsedIndicator}
    </span>
  )

  const Cell = ({ row }: CellProps<Data>) =>
    row.canExpand || row.original.subComponent ? (
      <span
        {...row.getToggleRowExpandedProps({
          style: { paddingLeft: `${row.depth}rem` }
        })}
      >
        {row.isExpanded ? expandedIndicator : collapsedIndicator}
      </span>
    ) : null

  const expanderColumn: Column<Data> = {
    id: systemColumns.expander.id,
    sticky: systemColumns.expander.order < 0 ? 'left' : 'right',
    minWidth: 50,
    maxWidth: 50,
    Header,
    Cell,
    disableResizing: true
  }

  return {
    useExpandedColumn: (hooks: Hooks<Data>): void => {
      hooks.visibleColumns.push((columns) => [expanderColumn, ...columns])
    },
    disableExpander
  }
}
export default getUseExpandedColumn
