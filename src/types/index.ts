import type { Column, TableInstance } from 'react-table'
import DataType from './DataType'
import ReactTableUIProps from './ReactTableUIProps'

/**
 * Context of the Table,
 * made available to each component and helper.
 */
interface TableContext<Data extends DataType> {
  /** Initiated instance of react-table. */
  tableInstance: TableInstance<Data>

  /** Props passed by user to react-table. */
  tableProps: ReactTableUIProps<Data>
}

export default TableContext

export { Column, DataType, TableContext }
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
