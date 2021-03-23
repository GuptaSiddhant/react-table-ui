import type { FC } from 'react'
import type {
  UsePaginationOptions,
  UsePaginationState,
  UsePaginationInstanceProps
} from 'react-table'
import type DataType from './DataType'

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

  /** Custom component to be rendered for pagination. */
  Component?: PaginationComponent<Data>
}

export type PaginationComponent<Data extends DataType> = FC<
  UsePaginationInstanceProps<Data> &
    UsePaginationState<Data> & {
      status: string
      isLoading: boolean
    }
>

export default PaginationOptions
