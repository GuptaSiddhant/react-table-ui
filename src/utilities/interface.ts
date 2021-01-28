import type { ReactNode } from 'react'
import type {
  Column,
  TableInstance,
  UseTableOptions,
  UseSortByOptions,
  UseFiltersOptions,
  UsePaginationOptions,
  UsePaginationState,
  UseExpandedOptions,
  UseExpandedState,
  UseSortByState,
  UseRowSelectOptions,
  UseRowSelectState,
  TableToggleCommonProps
} from 'react-table'

export interface DataType {
  /** Select data-row by default. */
  isSelected?: boolean
  /** Always expanded data-row, regardless of state. */
  expanded?: boolean
  /** Sub rows visible when expanded. */
  subRows?: DataType[]
  /** Custom component shown when row is expanded. */
  subComponent?: ReactNode
  /** Custom data properties. */
  [key: string]: any
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

export interface TableContext<Data extends DataType> {
  tableInstance: TableInstance<Data>
  tableProps: ReactTableUIProps<Data>
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

interface PaginationOptions<Data extends DataType>
  extends UsePaginationOptions<Data> {
  /** Disable pagination. @default false */
  disablePagination?: boolean
  /** Initial settings of pagination */
  initialState?: Partial<UsePaginationState<Data>>
  /** Callback to fetch more data when `manualPagination` is enabled.
   * It receives current pagination state as parameter.
   * It should be wrapped in `React.useCallback`. */
  fetchMoreData?: (paginationState: UsePaginationState<Data>) => void
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
  /** Indicator for collapsed row. @default '▶️' */
  collapsedIndicator?: ReactNode
  /** Indicator for expanded row. @default '🔽' */
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
