import type { RefObject } from 'react'
import type { Column, TableInstance } from 'react-table'
import type DataType from './DataType'
import type ReactTableUIProps from './ReactTableUIProps'

/**
 * Context of the Table,
 * made available to each component and helper.
 */
interface TableContext<Data extends DataType> {
  /** Initiated instance of react-table.
   * @see [React Table Docs](https://react-table.tanstack.com/docs/api/useTable#instance-properties) */
  tableInstance: TableInstance<Data>

  /** Props passed by user to react-table. */
  tableProps: ReactTableUIProps<Data>

  /** Ref to React Table UI component. */
  tableRef?: RefObject<HTMLElement>
}

// export default TableContext

export type { Column, DataType, TableContext }
export * from './ReactTableUIProps'
export * from './SortingOptions'
export * from './FiltersOptions'
export * from './GlobalFilterOptions'
export * from './ExpandedOptions'
export * from './RowSelectOptions'
export * from './PaginationOptions'
export * from './OtherOptions'
export * from './RowStateOptions'
export * from './TableOptions'
export * from './ActionOptions'
