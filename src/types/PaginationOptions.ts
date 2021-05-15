import type { FC, ReactNode } from 'react'
import type {
  UsePaginationOptions,
  UsePaginationState,
  UsePaginationInstanceProps
} from './ReactTable'
import type { DataType, StateChangeHandler } from './DataType'

export type PaginationOptions<Data extends DataType> =
  | ManualPaginationOptions<Data>
  | AutoPaginationOptions<Data>

interface ManualPaginationOptions<Data extends DataType>
  extends CommonPaginationOptions<Data> {
  /** Manually paginate data using external methods. */
  manualPagination?: true

  /** Number of pages available. Required for manual pagination. */
  pageCount: number

  /** Number of total records available across all pages.
   * If not provided, an estimation is used in the Status. */
  recordCount?: number

  /**
   * Callback to fetch more data when `manualPagination` is enabled.
   * It receives current pagination state as parameter.
   * It should be wrapped in `React.useCallback`.
   */
  fetchData: (paginationState: UsePaginationState<Data>) => void
}

interface AutoPaginationOptions<Data extends DataType>
  extends CommonPaginationOptions<Data> {
  manualPagination?: undefined
  pageCount?: undefined
  fetchData?: undefined
  recordCount?: undefined
}

/** Type interface for pagination options.
 * @category Options */
interface CommonPaginationOptions<Data extends DataType>
  extends UsePaginationOptions<Data> {
  /** Initial settings of pagination */
  initialState?: Partial<UsePaginationState<Data>>

  /** Disable pagination.
   *  @default false */
  disablePagination?: boolean

  /** Reset pagination when data changes (sorting, filtering, etc.).
   *  @default true for client-side pagination
   *  @default false for manual-pagination. */
  autoResetPage?: boolean

  /** Count expanded sub-rows while calculating rows on a page.
   *  @default true  */
  paginateExpandedRows?: boolean

  /** Callback executed when page changes (all pagination changes).
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<UsePaginationState<Data>>

  // ----------
  // Components

  /** Custom component to be rendered for pagination.
   * Overrides all indicators.
   * @category Custom Component  */
  Component?: PaginationComponent<Data>

  /** Indicator/icon used in action/button to
   * navigate to the next page.   
   * @category Custom Component */
  nextPageIndicator?: ReactNode

  /** Indicator/icon used in action/button to
   * navigate to the previous page.   
   * @category Custom Component */
  previousPageIndicator?: ReactNode

  /** Indicator/icon used in action/button to
   * navigate to the first page.   
   * @category Custom Component */
  firstPageIndicator?: ReactNode

  /** Indicator/icon used in action/button to
   * navigate to the last page.   
   * @category Custom Component */
  lastPageIndicator?: ReactNode
}

export type PaginationComponent<Data extends DataType> = FC<
  UsePaginationInstanceProps<Data> &
    UsePaginationState<Data> & {
      loading: boolean
    }
>

export default PaginationOptions
