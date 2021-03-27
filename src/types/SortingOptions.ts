import type { FC, ReactNode, MouseEvent } from 'react'
import type {
  UseSortByOptions,
  UseSortByState,
  Row,
  SortByFn,
  UseSortByColumnProps
} from 'react-table'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for sorting options. */
export interface SortingOptions<Data extends DataType>
  extends UseSortByOptions<Data> {
  /** Initial settings of sorting.
   *  List of objects containing column id and order preference.
   *  @example { sortBy: [{ id: 'columnsId', desc: false }] } */
  initialState?: UseSortByState<Data>

  /** Disable sorting for table. @default false */
  disableSortBy?: boolean

  /** Enable sorting for all columns,
   * regardless if they have a valid accessor. @default false */
  defaultCanSort?: boolean

  /** If true, the un-sorted state will not be available
   *  to columns once they have been sorted. @default false */
  disableSortRemove?: boolean

  /** Reset sorting when data is changed. @default true */
  autoResetSortBy?: boolean

  /** Manual sorting with custom logic, eg. server-side.
   * @default false @see orderByFn */
  manualSortBy?: boolean

  /** Allows overriding or adding additional sort types for columns to use.
   *  If a column's sort type isn't found on this object,
   *  it will default to using the built-in sort types. Must be memoised. */
  sortTypes?: Record<string, SortByFn<Data>>

  // ----------
  // Multi-sort - Sorting with "shift" key pressed.

  /** Disables multi-sorting for the entire table. @default false */
  disableMultiSort?: boolean

  /** Limit on max number of columns for multi-sort. @default Infinite */
  maxMultiSortColCount?: number

  /** If true, the un-sorted state will not be available
   *  to multi-sorted columns. @default false */
  disabledMultiRemove?: boolean

  /** Allows to override default multi-sort detection behaviour.
   *  Receives mouse-event as param. */
  isMultiSortEvent?: (e: MouseEvent) => boolean

  /** Composing multiple sorting functions together for multi-sorting */
  orderByFn?: (
    rows: Array<Row<Data>>,
    sortFns: Array<SortByFn<Data>>,
    directions: boolean[]
  ) => Array<Row<Data>>

  /** Callback executed when columns are sorted.
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<UseSortByState<Data>>

  // ----------
  // Components

  /** Custom component to manage all sorting buttons.
   *  It overrides all sorting indicators. */
  Component?: SortingComponent<Data>

  /** Indicator when column is not sorted.
   *  Used in default sorting component. @default '⇅' */
  defaultIndicator?: ReactNode

  /** Indicator when column is sorted in ascending order.
   *  Used in default sorting component. @default '↓' */
  ascendingIndicator?: ReactNode

  /** Indicator when column is sorted in descending order.
   *  Used in default sorting component. @default '↑' */
  descendingIndicator?: ReactNode
}

export type SortingComponent<Data extends DataType> = FC<
  UseSortByColumnProps<Data> & { onClick: (e: MouseEvent) => void }
>

export default SortingOptions
