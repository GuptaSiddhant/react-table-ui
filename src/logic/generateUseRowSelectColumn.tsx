import * as React from 'react'
import type {
  Hooks,
  CellProps,
  HeaderProps,
  TableToggleCommonProps
} from 'react-table'
import systemColumns from '../utilities/systemColumns'
import type { DataType, ReactTableUIProps } from '../types'

const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  TableToggleCommonProps
>(({ indeterminate = false, ...rest }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null)
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    if (typeof resolvedRef !== 'function' && resolvedRef?.current)
      resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <div className='RowSelectCheckbox'>
      <input className='checkbox' type='checkbox' ref={resolvedRef} {...rest} />
    </div>
  )
})

const generateUseRowSelectColumn = <Data extends DataType>(
  props: ReactTableUIProps<Data>
) => {
  const { Component = IndeterminateCheckbox, selectSubRows = false } =
    props.rowSelectOptions || {}

  const Header = ({ getToggleAllRowsSelectedProps }: HeaderProps<Data>) => (
    <Component {...getToggleAllRowsSelectedProps()} />
  )

  const Cell = ({ row }: CellProps<Data>) =>
    row.depth > 0 && !selectSubRows ? null : (
      <Component {...row.getToggleRowSelectedProps()} />
    )

  return (hooks: Hooks<Data>): void => {
    hooks.visibleColumns.push((columns) => [
      {
        id: systemColumns.selection.id,
        sticky: systemColumns.selection.order < 0 ? 'left' : 'right',
        minWidth: 48,
        maxWidth: 48,
        Header,
        Cell,
        disableResizing: true,
        disableFilters: true,
        disableGlobalFilter: true,
        disableGroupBy: true,
        disableSortBy: true
      },
      ...columns
    ])
  }
}
export default generateUseRowSelectColumn
