import type {
  IdType,
  UseColumnOrderState,
  UseResizeColumnsOptions,
  UseResizeColumnsState
} from './ReactTable'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for Column options.
 * @category Options */
export interface ColumnOptions<Data extends DataType>
  extends UseResizeColumnsOptions<Data> {
  /** Initial settings of row-select. */
  initialState?: Partial<ColumnState<Data>>

  /** Disable columns ordering.
   * @default false */
  disableOrdering?: boolean

  /** Disable columns resizing.
   * @default false */
  disableResizing?: boolean

  /** Reset hidden columns when columns is changed.
   * @default true */
  autoResetHiddenColumns?: boolean

  /** Callback executed when column's state is changed .
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<ColumnState<Data>>

  /** Callback executed when column order is changed .
   *  The function must be wrapped in useCallback hook. */
  onOrderStateChange?: StateChangeHandler<ColumnState<Data>['columnOrder']>

  /** Callback executed when column size is changed .
   *  The function must be wrapped in useCallback hook. */
  onResizeStateChange?: StateChangeHandler<ColumnState<Data>['columnResizing']>

  /** Callback executed when column's visibility is changed .
   *  The function must be wrapped in useCallback hook. */
  onVisibilityStateChange?: StateChangeHandler<
    ColumnState<Data>['hiddenColumns']
  >

  // ----------
  // Components
}

/** Type interface for Column options state 
 * {
 *  columnResizing: {
        startX?: number;
        columnWidth: number;
        headerIdWidths: Record<string, number>;
        columnWidths: any;
        isResizingColumn?: string;
    },
    columnOrder: Array<IdType<D>>,
    hiddenColumns: Array<IdType<D>>,
 * }   
 */
export interface ColumnState<Data extends DataType>
  extends UseColumnOrderState<Data>,
    UseResizeColumnsState<Data> {
  /** Hide columns by providing column's ID in an array. */
  hiddenColumns: IdType<Data>[]
}

export default ColumnOptions
