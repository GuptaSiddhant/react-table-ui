import * as React from 'react'
import type { Hooks, CellProps, HeaderProps } from 'react-table'
import type { DataType, ReactTableUIProps } from '../utilities/interface'

const getUseExpandedColumn = <Data extends DataType>(
  props: ReactTableUIProps<Data>
) => {
  const { collapsedIndicator = '▶️', expandedIndicator = '🔽' } =
    props.expandedOptions || {}

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

  return (hooks: Hooks<Data>): void => {
    hooks.visibleColumns.push((columns) => [
      {
        id: 'expander',
        minWidth: 10,
        maxWidth: 50,
        sticky: 'left',
        Header,
        Cell
      },
      ...columns
    ])
  }
}
export default getUseExpandedColumn
