import type { ReactNode } from 'react'
import type {
  Column,
  TableInstance,
  UseTableOptions,
  UseSortByOptions,
  UseFiltersOptions,
  UsePaginationOptions,
  UsePaginationState
} from 'react-table'

export type DataType = Record<string, any>

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
  sortByOptions?: UseSortByOptions<Data> & SortingOptions

  /** Manages filtering of the table columns.
   * @see [RT useFilters API - Table options](https://react-table.tanstack.com/docs/api/useFilters#table-options) */
  filterOptions?: UseFiltersOptions<Data>

  /** Manages pagination of the table.
   * @see [RT usePagination API - Table options](https://react-table.tanstack.com/docs/api/usePagination#table-options) */
  paginationOptions?: UsePaginationOptions<Data> & PaginationOptions<Data>

  /** Freeze headers to the top and footers to the bottom while scrolling. @default true for both */
  freezeOptions?: { header?: boolean; footer?: boolean }
}

export interface TableContext<Data extends DataType> {
  tableInstance: TableInstance<Data>
  tableProps: ReactTableUIProps<Data>
}

export type ElementRef<E extends Element = HTMLDivElement> =
  | ((instance: E | null) => void)
  | React.RefObject<E>
  | null
  | undefined

interface SortingOptions {
  /** @default '⇅' */
  defaultIndicator?: ReactNode
  /** @default '↑' */
  ascendingIndicator?: ReactNode
  /** @default '↓' */
  descendingIndicator?: ReactNode
}

interface PaginationOptions<Data extends DataType> {
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
  /** Component rendered during loading.
   * @default Spinner */
  loadingIndicator?: JSX.Element
  /** If true, loading is done in background.
   * Loading indicator is not shown if there is data on screen.
   * @default true */
  backgroundLoading?: boolean
  /** Loading status is shown in status bar @default true */
  showLoadingStatus?: boolean
}
