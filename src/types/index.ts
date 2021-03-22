import type { ReactNode } from 'react'
import type {
  Column,
  TableInstance,
  UseTableOptions,
  UseSortByOptions,
  UseFiltersOptions,
  UseExpandedOptions,
  UseExpandedState,
  UseSortByState,
  UseRowSelectOptions,
  UseRowSelectState,
  TableToggleCommonProps
} from 'react-table'

import DataType from './DataType'
import PaginationOptions from './PaginationOptions'

export { Column, DataType }

export * from './PaginationOptions'

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

interface SortingOptions<Data extends DataType> extends UseSortByOptions<Data> {
  /** Indicator when column is not sorted. @default '⇅' */
  defaultIndicator?: ReactNode
  /** Indicator when column is sorted in ascending order. @default '↑' */
  ascendingIndicator?: ReactNode
  /** Indicator when column is sorted in descending order. @default '↓' */
  descendingIndicator?: ReactNode
  /** Initial settings of sorting */
  initialState?: Partial<UseSortByState<Data>>
}

interface LoadingOptions {
  /** Loading state. @default false */
  isLoading?: boolean
  /** Component rendered during loading. @default Spinner */
  loadingIndicator?: ReactNode
  /** If true, loading is done in background.
   * Loading indicator is not shown if there is data on screen.
   * @default true */
  backgroundLoading?: boolean
  /** Loading status is shown in status bar @default true */
  showLoadingStatus?: boolean
}

interface ExpandedOptions<Data extends DataType>
  extends UseExpandedOptions<Data> {
  /** Initial settings of expanded. */
  initialState?: Partial<UseExpandedState<Data>>
  /** Indicator for collapsed row. @default '→' */
  collapsedIndicator?: ReactNode
  /** Indicator for expanded row. @default '↓' */
  expandedIndicator?: ReactNode
}

interface RowSelectOptions<Data extends DataType>
  extends UseRowSelectOptions<Data> {
  /** Disable row selection. @default false */
  disableRowSelect?: boolean
  /** Initial settings of rowSelect. */
  initialState?: Partial<UseRowSelectState<Data>>
  /** Component to render to denote row selection */
  Checkbox?: React.FC<TableToggleCommonProps>
}

interface FreezeOptions {
  /** @default true */ header?: boolean
  /** @default true */ footer?: boolean
}

export type ElementRef<E extends Element = HTMLDivElement> =
  | ((instance: E | null) => void)
  | React.RefObject<E>
  | null
  | undefined

export default TableContext
