import type {
  Column,
  TableInstance,
  UseTableOptions,
  UseFiltersOptions
} from 'react-table'

import DataType from './DataType'
import SortingOptions from './SortingOptions'
import ExpandedOptions from './ExpandedOptions'
import RowSelectOptions from './RowSelectOptions'
import PaginationOptions from './PaginationOptions'
import { LoadingOptions, FreezeOptions } from './OtherOptions'

export { Column, DataType }
export * from './SortingOptions'
export * from './ExpandedOptions'
export * from './RowSelectOptions'
export * from './PaginationOptions'
export * from './OtherOptions'

export interface TableContext<Data extends DataType> {
  /** Initiated instance of react-table. */
  tableInstance: TableInstance<Data>
  /** Props passed by user to react-table. */
  tableProps: ReactTableUIProps<Data>
}

/** Props supported by React Table UI. */
export interface ReactTableUIProps<Data extends DataType> {
  /** Memoised data-array of the table.
   * The data object should be structured as column:value pair. */
  data: Data[]

  /** Memoised column definitions of the table. (Optional, can be generated from keys in `data` object).
   * Each column object can define its data accessor, properties and behavior. */
  columns?: Column<Data>[]

  /** Manage loading state of table. */
  loadingOptions?: LoadingOptions

  /** useTable Table options
   * @see [RT useTable API - Table options](https://react-table.tanstack.com/docs/api/useTable#table-options) */
  tableOptions?: Omit<UseTableOptions<Data>, 'columns' | 'data'>

  /** Manages sorting of the table columns.
   * @see [RT useSortBy API - Table options](https://react-table.tanstack.com/docs/api/useSortBy#table-options) */
  sortByOptions?: SortingOptions<Data>

  /** Manages filtering of the table columns.
   * @see [RT useFilters API - Table options](https://react-table.tanstack.com/docs/api/useFilters#table-options) */
  filterOptions?: UseFiltersOptions<Data>

  /** Manages pagination of the table.
   * @see [RT usePagination API - Table options](https://react-table.tanstack.com/docs/api/usePagination#table-options) */
  paginationOptions?: PaginationOptions<Data>

  /** Manages pagination of the table.
   * @see [RT usePagination API - Table options](https://react-table.tanstack.com/docs/api/usePagination#table-options) */
  expandedOptions?: ExpandedOptions<Data>

  /** Manages row-selection of the table.
   * @see [RT useRowSelect API - Table options](https://react-table.tanstack.com/docs/api/useRowSelect#table-options) */
  rowSelectOptions?: RowSelectOptions<Data>

  /** Freeze headers to the top and footers to the bottom while scrolling. */
  freezeOptions?: FreezeOptions
}

export default TableContext
