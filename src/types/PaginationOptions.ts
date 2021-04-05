import type { FC, ReactNode } from 'react'
import type {
  UsePaginationOptions,
  UsePaginationState,
  UsePaginationInstanceProps
} from 'react-table'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for pagination options. */
export interface PaginationOptions<Data extends DataType>
  extends UsePaginationOptions<Data> {
  /** Initial settings of pagination */
  initialState?: Partial<UsePaginationState<Data>>

  /** Disable pagination. @default false */
  disablePagination?: boolean

  /** Reset pagination when data changes (sorting, filtering, etc.).
   *  @default true */
  autoResetPage?: boolean

  /** Count expanded sub-rows while calculating rows on a page.
   *  @default true  */
  paginateExpandedRows?: boolean

  /** Callback executed when page changes (all pagination changes).
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<UsePaginationState<Data>>

  // -----------------
  // Manual pagination

  /** Manually paginate data using external methods. */
  manualPagination?: boolean

  /** Number of pages available. Required for manual pagination. */
  pageCount?: number
  /**
   * Callback to fetch more data when `manualPagination` is enabled.
   * It receives current pagination state as parameter.
   * It should be wrapped in `React.useCallback`.
   */
  fetchData?: (paginationState: UsePaginationState<Data>) => void

  // ----------
  // Components

  /** Custom component to be rendered for pagination.
   * Overrides all indicators. */
  Component?: PaginationComponent<Data>

  /** Indicator/icon used in action/button to
   * navigate to the next page. @default '▶️' */
  nextPageIndicator?: ReactNode

  /** Indicator/icon used in action/button to
   * navigate to the previous page. @default '◀️' */
  previousPageIndicator?: ReactNode

  /** Indicator/icon used in action/button to
   * navigate to the first page. @default '⏮️' */
  firstPageIndicator?: ReactNode

  /** Indicator/icon used in action/button to
   * navigate to the last page. @default '⏭️' */
  lastPageIndicator?: ReactNode
}

export type PaginationComponent<Data extends DataType> = FC<
  UsePaginationInstanceProps<Data> &
    UsePaginationState<Data> & {
      status: string
      isLoading: boolean
    }
>

export default PaginationOptions
