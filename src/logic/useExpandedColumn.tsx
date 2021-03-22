import * as React from 'react'
import type { Hooks, CellProps, HeaderProps, Column } from 'react-table'
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
    id: 'expander',
    minWidth: 10,
    maxWidth: 50,
    sticky: 'left',
    Header,
    Cell
  }

  return {
    useExpandedColumn: (hooks: Hooks<Data>): void => {
      hooks.visibleColumns.push((columns) => [expanderColumn, ...columns])
    },
    disableExpander
  }
}
export default getUseExpandedColumn
